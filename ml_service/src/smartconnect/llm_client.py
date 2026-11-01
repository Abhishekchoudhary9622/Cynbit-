from __future__ import annotations

import os
import time
from pathlib import Path
from typing import Any

import requests


def _load_project_env() -> None:
    """Load simple KEY=value entries from the project-root .env without extra deps."""
    project_root = Path(__file__).resolve().parents[2]
    env_file = project_root / ".env"
    if not env_file.is_file():
        return
    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"'")
        if key and key not in os.environ:
            os.environ[key] = value


class LLMClient:
    """Small OpenAI-compatible chat-completions client with rapid key rotation and short timeouts."""

    def __init__(self) -> None:
        _load_project_env()
        # Collect all available API keys from environment variables
        candidates = [
            os.getenv("SMARTCONNECT_LLM_API_KEY"),
            os.getenv("GEMINI_API_KEY"),
            os.getenv("GEMINI_API_KEY_FALLBACK"),
        ]
        seen = set()
        self.api_keys: list[str] = []
        for k in candidates:
            if k and k not in seen:
                seen.add(k)
                self.api_keys.append(k)

        self.api_key = self.api_keys[0] if self.api_keys else None
        self.base_url = os.getenv(
            "SMARTCONNECT_LLM_BASE_URL",
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        ).strip()
        self.model = os.getenv("SMARTCONNECT_LLM_MODEL", "gemini-3.8-flash").strip()
        # Fast timeout (3s) to prevent backend/frontend proxy from aborting with 500 error
        self.timeout = float(os.getenv("SMARTCONNECT_LLM_TIMEOUT", "3.0"))
        self.max_tokens = int(os.getenv("SMARTCONNECT_LLM_MAX_TOKENS", "1200"))
        self._last_failure_time = 0.0

    @property
    def is_configured(self) -> bool:
        return bool(self.api_keys and self.base_url and self.model)

    def generate(self, messages: list[dict[str, str]]) -> str:
        if not self.is_configured:
            raise RuntimeError("LLM is not configured")

        # If network/API recently timed out or failed, back off briefly to keep responses instant
        if time.time() - self._last_failure_time < 20.0:
            raise RuntimeError("LLM temporary cooldown active")

        last_error = None
        # Try at most 2 keys with short timeout
        for key in self.api_keys[:2]:
            try:
                response = requests.post(
                    self.base_url,
                    headers={
                        "Authorization": f"Bearer {key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": self.model,
                        "messages": messages,
                        "temperature": 0.25,
                        "max_tokens": self.max_tokens,
                    },
                    timeout=self.timeout,
                )
                if response.status_code == 200:
                    payload: dict[str, Any] = response.json()
                    content = payload["choices"][0]["message"]["content"]
                    if isinstance(content, str) and content.strip():
                        return content.strip()
                last_error = RuntimeError(f"HTTP {response.status_code}: {response.text[:150]}")
            except Exception as exc:
                last_error = exc

        self._last_failure_time = time.time()
        raise last_error or RuntimeError("All LLM keys failed")
