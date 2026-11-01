import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export const DEFAULT_SUGGESTED_QUESTIONS = [
  "What services does Cynbit offer?",
  "Which solution is suitable for my business?",
  "Tell me about Cynbit's products.",
  "Show relevant case studies.",
  "I want to build an AI-powered application.",
  "How can I contact Cynbit?"
];

export default function SuggestedQuestions({ onSelectQuestion, disabled = false, questions = DEFAULT_SUGGESTED_QUESTIONS }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary pl-1">
        <Sparkles className="w-3 h-3" />
        <span>Suggested Questions</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectQuestion(q)}
            className="text-left text-xs bg-white hover:bg-primary/5 active:scale-95 text-primary border border-primary/20 hover:border-primary/50 px-3 py-1.5 rounded-full font-semibold transition-all duration-150 shadow-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span>{q}</span>
            <ChevronRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

