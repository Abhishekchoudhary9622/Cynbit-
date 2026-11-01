from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import requests


def _load_project_env() -> None:
    """Load simple KEY=value entries from the project-root and ml_service .env files."""
    for parent_levels in (2, 3):
        try:
            project_root = Path(__file__).resolve().parents[parent_levels]
            for env_path in [project_root / ".env", project_root / "ml_service" / ".env"]:
                if env_path.is_file():
                    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
                        line = raw_line.strip()
                        if not line or line.startswith("#") or "=" not in line:
                            continue
                        key, value = line.split("=", 1)
                        key = key.strip()
                        value = value.strip().strip("\"'")
                        if key and key not in os.environ:
                            os.environ[key] = value
        except Exception:
            pass


class LLMClient:
    """Robust Gemini client with multi-key rotation, native + OpenAI endpoint support, and realistic timeouts."""

    def __init__(self) -> None:
        _load_project_env()
        candidates = [
            os.getenv("GEMINI_API_KEY"),
            os.getenv("GEMINI_API_KEY_FALLBACK"),
            os.getenv("SMARTCONNECT_LLM_API_KEY"),
        ]
        seen = set()
        self.api_keys: list[str] = []
        for k in candidates:
            if k and k.strip() and k.strip() not in seen:
                seen.add(k.strip())
                self.api_keys.append(k.strip())

        # Primary preferred model: gemini-3.5-flash (verified active quota)
        # Fallback candidate models if primary fails
        env_model = os.getenv("GEMINI_MODEL") or os.getenv("SMARTCONNECT_LLM_MODEL") or "gemini-3.5-flash"
        self.model = env_model.strip()
        self.candidate_models = [self.model]
        for m in ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.8-flash"]:
            if m not in self.candidate_models:
                self.candidate_models.append(m)

        self.base_url = os.getenv(
            "SMARTCONNECT_LLM_BASE_URL",
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        ).strip()
        # Generous timeout (25s) to allow deep reasoning without premature aborts
        self.timeout = float(os.getenv("SMARTCONNECT_LLM_TIMEOUT", "25.0"))
        self.max_tokens = int(os.getenv("SMARTCONNECT_LLM_MAX_TOKENS", "1500"))

    @property
    def is_configured(self) -> bool:
        return bool(self.api_keys)

    def _call_openai_compat(self, key: str, model: str, messages: list[dict[str, str]]) -> str:
        url = self.base_url
        response = requests.post(
            url,
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": messages,
                "temperature": 0.4,
                "max_tokens": self.max_tokens,
            },
            timeout=self.timeout,
        )
        if response.status_code == 200:
            payload: dict[str, Any] = response.json()
            content = payload["choices"][0]["message"]["content"]
            if isinstance(content, str) and content.strip():
                return content.strip()
        raise RuntimeError(f"OpenAI compat HTTP {response.status_code}: {response.text[:200]}")

    def _call_native_gemini(self, key: str, model: str, messages: list[dict[str, str]]) -> str:
        # Convert OpenAI messages to Gemini native contents
        native_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        
        system_instruction = None
        contents = []
        for m in messages:
            role = m.get("role")
            content = m.get("content", "")
            if role == "system":
                system_instruction = {"parts": [{"text": content}]}
            elif role == "user":
                contents.append({"role": "user", "parts": [{"text": content}]})
            elif role == "assistant":
                contents.append({"role": "model", "parts": [{"text": content}]})

        body: dict[str, Any] = {
            "contents": contents,
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": self.max_tokens,
            }
        }
        if system_instruction:
            body["systemInstruction"] = system_instruction

        response = requests.post(
            native_url,
            headers={"Content-Type": "application/json"},
            json=body,
            timeout=self.timeout,
        )
        if response.status_code == 200:
            payload = response.json()
            candidates = payload.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts and "text" in parts[0]:
                    text = parts[0]["text"]
                    if isinstance(text, str) and text.strip():
                        return text.strip()
        raise RuntimeError(f"Native Gemini HTTP {response.status_code}: {response.text[:200]}")

    def generate(self, messages: list[dict[str, str]]) -> str:
        if not self.is_configured:
            raise RuntimeError("LLM is not configured: No valid Gemini API keys found.")

        last_error = None

        # Iterate through keys and models
        for key in self.api_keys:
            for model in self.candidate_models:
                # 1. Try OpenAI-compatible endpoint
                try:
                    return self._call_openai_compat(key, model, messages)
                except Exception as exc:
                    last_error = exc

                # 2. Try Native Gemini endpoint
                try:
                    return self._call_native_gemini(key, model, messages)
                except Exception as exc:
                    last_error = exc

        raise last_error or RuntimeError("All LLM keys and models failed.")
