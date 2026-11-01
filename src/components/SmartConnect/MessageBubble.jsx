import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import RecommendationCard from './RecommendationCard';

/**
 * Normalizes URLs to internal routes where applicable
 */
function normalizeUrl(url) {
  if (!url) return '/';
  if (url.startsWith('https://www.cynbit.in')) {
    return url.replace('https://www.cynbit.in', '') || '/';
  }
  return url;
}

/**
 * Code Block with syntax styling and interactive copy button
 */
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="smartconnect-codeblock my-2">
      <div className="smartconnect-codeblock-header">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1 text-[11px] hover:text-white transition-colors bg-white/10 px-2 py-0.5 rounded-md active:scale-95"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="smartconnect-codeblock-content">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Custom Markdown Parser for formatted assistant replies
 */
function FormattedContent({ text, onLinkClick }) {
  if (!text) return null;

  // Split content by code blocks: ```lang ... ```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <TextSection 
          key={`text-${lastIndex}`} 
          text={text.substring(lastIndex, match.index)} 
          onLinkClick={onLinkClick} 
        />
      );
    }
    const language = match[1] || 'code';
    const code = match[2];
    elements.push(
      <CodeBlock 
        key={`code-${match.index}`} 
        code={code.trimEnd()} 
        language={language} 
      />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(
      <TextSection 
        key={`text-${lastIndex}`} 
        text={text.substring(lastIndex)} 
        onLinkClick={onLinkClick} 
      />
    );
  }

  return <div className="space-y-2">{elements}</div>;
}

/**
 * Text section parser handling paragraphs, lists, bolding, inline code and links
 */
function TextSection({ text, onLinkClick }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-on-surface">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Heading 3: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-bold text-sm text-primary font-headline mt-2 mb-1">
              {renderInlineStyles(trimmed.replace('### ', ''), onLinkClick)}
            </h4>
          );
        }

        // Heading 2: ## Title
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-bold text-base text-primary font-headline mt-2 mb-1">
              {renderInlineStyles(trimmed.replace('## ', ''), onLinkClick)}
            </h3>
          );
        }

        // Bullet line
        if (/^[-*•]\s+/.test(trimmed)) {
          const content = trimmed.replace(/^[-*•]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-primary font-bold mt-1 text-xs">•</span>
              <div className="flex-1">{renderInlineStyles(content, onLinkClick)}</div>
            </div>
          );
        }

        // Numbered list: 1. Item
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-primary font-bold font-mono text-xs mt-0.5">{numMatch[1]}.</span>
              <div className="flex-1">{renderInlineStyles(numMatch[2], onLinkClick)}</div>
            </div>
          );
        }

        return <p key={idx}>{renderInlineStyles(line, onLinkClick)}</p>;
      })}
    </div>
  );
}

/**
 * Handles inline bolding, inline code, and clickable markdown links
 */
function renderInlineStyles(str, onLinkClick) {
  if (!str) return null;

  // Split by markdown link regex: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBoldAndCode(str.substring(lastIndex, match.index)));
    }
    const label = match[1];
    const url = normalizeUrl(match[2]);
    const isExternal = url.startsWith('http');

    if (isExternal) {
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold underline hover:text-primary-container inline-flex items-center gap-0.5"
        >
          {label}
          <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline" />
        </a>
      );
    } else {
      parts.push(
        <Link
          key={`link-${match.index}`}
          to={url}
          onClick={onLinkClick}
          className="text-primary font-bold underline hover:text-primary-container inline-flex items-center gap-0.5"
        >
          {label}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < str.length) {
    parts.push(renderBoldAndCode(str.substring(lastIndex)));
  }

  return parts;
}

/**
 * Handles bold **text** and inline `code`
 */
function renderBoldAndCode(str) {
  // Pattern matching **bold** or `code`
  const tokenRegex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const elements = [];
  let last = 0;
  let match;

  while ((match = tokenRegex.exec(str)) !== null) {
    if (match.index > last) {
      elements.push(str.substring(last, match.index));
    }
    if (match[2]) {
      // Bold
      elements.push(
        <strong key={`bold-${match.index}`} className="font-bold text-on-surface">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Inline code
      elements.push(
        <code
          key={`inline-${match.index}`}
          className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono text-[11px] font-semibold border border-outline-variant/30"
        >
          {match[3]}
        </code>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < str.length) {
    elements.push(str.substring(last));
  }
  return elements;
}

export default function MessageBubble({ message, onLinkClick, onHandoffClick }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 animate-fade-scale`}>
      {/* Bubble */}
      <div
        className={`max-w-[88%] sm:max-w-[84%] rounded-2xl p-3.5 shadow-xs ${
          isUser
            ? 'bg-primary text-white rounded-tr-none'
            : 'bg-white text-on-surface border border-outline-variant/30 rounded-tl-none'
        }`}
      >
        {isUser ? (
          <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <FormattedContent text={message.content} onLinkClick={onLinkClick} />
        )}
      </div>

      {/* Verified Sources Tags */}
      {!isUser && message.sources && message.sources.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 pl-1 max-w-[88%]">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Grounded in:
          </span>
          {message.sources.slice(0, 4).map((source, idx) => (
            <Link
              key={idx}
              to={normalizeUrl(source.url)}
              onClick={onLinkClick}
              className="text-[10px] bg-white border border-outline-variant/40 hover:border-primary px-2 py-0.5 rounded-full text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>{source.title}</span>
              <ChevronRight className="w-2.5 h-2.5 text-outline" />
            </Link>
          ))}
        </div>
      )}

      {/* Structured Recommendation & Resource Cards (Only shown when available) */}
      {!isUser && (message.recommendations?.length > 0 || message.related_resources?.length > 0) && (
        <div className="w-full max-w-[92%]">
          <RecommendationCard
            recommendations={message.recommendations}
            relatedResources={message.related_resources}
            onLinkClick={onLinkClick}
          />
        </div>
      )}

      {/* Smart Contact Blueprint Handoff Card (if blueprint or contact option exists) */}
      {!isUser && message.leadBlueprint && (
        <div className="w-full max-w-[95%] bg-gradient-to-br from-primary/5 via-white to-primary/10 rounded-2xl p-4 border border-primary/30 shadow-md space-y-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-wider text-primary font-headline">
                Project Blueprint Summary
              </span>
            </div>
            <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full">
              Ready for Review
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-on-surface bg-white/80 p-3 rounded-xl border border-outline-variant/30">
            <div>
              <span className="text-on-surface-variant font-semibold">Domain: </span>
              <span className="font-bold">{message.leadBlueprint.summary?.industry || 'Custom Architecture'}</span>
            </div>
            <div>
              <span className="text-on-surface-variant font-semibold">Challenge: </span>
              <span>{message.leadBlueprint.summary?.problem || 'Business Process Optimization'}</span>
            </div>
            <div>
              <span className="text-on-surface-variant font-semibold">Recommended: </span>
              <span className="font-bold text-primary">{message.leadBlueprint.summary?.suggestedOffering || 'Autonomous AI Agents'}</span>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant">
            Would you like to discuss this with the Cynbit team? You can transfer this summary directly to our inquiry form.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={() => onHandoffClick && onHandoffClick(message.leadBlueprint)}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-xl text-xs font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-xs group active:scale-95"
            >
              <span>Transfer to Contact Form</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/contact"
              onClick={onLinkClick}
              className="py-2 px-3 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface bg-surface-container flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors"
            >
              Open Contact Page
            </Link>
          </div>
        </div>
      )}

      {/* Prototype Disclaimer if attached */}
      {!isUser && message.disclaimer && (
        <div className="text-[10px] text-on-surface-variant/60 pl-1 max-w-[88%] flex items-start gap-1">
          <Info className="w-3 h-3 shrink-0 mt-0.5" />
          <span>{message.disclaimer}</span>
        </div>
      )}
    </div>
  );
}

