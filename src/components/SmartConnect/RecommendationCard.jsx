import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, ExternalLink, Layers, CheckCircle2, Bookmark } from 'lucide-react';

/**
 * Normalizes an official Cynbit URL to an internal route if applicable
 */
function normalizeUrl(rawUrl) {
  if (!rawUrl) return '/services';
  if (rawUrl.startsWith('https://www.cynbit.in')) {
    const path = rawUrl.replace('https://www.cynbit.in', '');
    return path || '/';
  }
  return rawUrl;
}

export function ServiceRecommendationCard({ item, onLinkClick }) {
  if (!item) return null;

  const targetUrl = normalizeUrl(item.url);
  const isExternal = targetUrl.startsWith('http');

  return (
    <div className="bg-white rounded-2xl p-3.5 border border-primary/20 shadow-sm hover:border-primary/50 transition-all duration-200 space-y-2 group">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {item.category || item.type || 'Cynbit Offering'}
          </span>
          <h4 className="text-sm font-bold text-on-surface font-headline mt-1 group-hover:text-primary transition-colors">
            {item.title || item.name}
          </h4>
        </div>

        {isExternal ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-0.5 shrink-0"
          >
            Explore <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <Link
            to={targetUrl}
            onClick={onLinkClick}
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>

      {(item.why_recommended || item.matchReason || item.description) && (
        <div className="text-xs bg-surface-container/70 p-2.5 rounded-xl border border-outline-variant/20 text-on-surface leading-relaxed">
          <span className="font-bold text-primary">Why it matches: </span>
          {item.why_recommended || item.matchReason || item.description}
        </div>
      )}
    </div>
  );
}

export function RelatedResourceCard({ item, onLinkClick }) {
  if (!item) return null;

  const targetUrl = normalizeUrl(item.url);
  const isExternal = targetUrl.startsWith('http');

  return (
    <div className="bg-white rounded-2xl p-3 border border-secondary/20 shadow-xs hover:border-secondary/40 transition-all space-y-1.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
            {item.type === 'case_study' ? 'Case Study' : 'Article'} • {item.category || 'Engineering'}
          </span>
          <h5 className="text-xs font-bold text-on-surface mt-1 leading-snug">
            {item.title}
          </h5>
        </div>

        {isExternal ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
            className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-0.5 shrink-0"
          >
            View <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <Link
            to={targetUrl}
            onClick={onLinkClick}
            className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1 shrink-0"
          >
            View <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      {item.matched_text && (
        <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
          {item.matched_text}
        </p>
      )}
    </div>
  );
}

export default function RecommendationCard({ recommendations = [], relatedResources = [], onLinkClick }) {
  const hasRecs = recommendations && recommendations.length > 0;
  const hasResources = relatedResources && relatedResources.length > 0;

  if (!hasRecs && !hasResources) return null;

  return (
    <div className="w-full space-y-3 mt-2">
      {hasRecs && (
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-primary pl-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Recommended Cynbit Solutions</span>
          </div>
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <ServiceRecommendationCard key={idx} item={rec} onLinkClick={onLinkClick} />
            ))}
          </div>
        </div>
      )}

      {hasResources && (
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-secondary pl-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Related Case Studies & Resources</span>
          </div>
          <div className="space-y-2">
            {relatedResources.slice(0, 3).map((res, idx) => (
              <RelatedResourceCard key={idx} item={res} onLinkClick={onLinkClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

