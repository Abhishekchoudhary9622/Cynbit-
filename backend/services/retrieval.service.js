import { cynbitKnowledgeBase } from './knowledge.service.js';

export class RetrievalService {
  constructor() {
    this.knowledge = cynbitKnowledgeBase;
  }

  /**
   * Tokenize and normalize query text
   */
  tokenize(text) {
    if (!text || typeof text !== 'string') return [];
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !this.isStopWord(w));
  }

  isStopWord(word) {
    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'with', 
      'for', 'to', 'of', 'by', 'that', 'this', 'it', 'from', 'as', 'be', 'are',
      'can', 'you', 'me', 'my', 'how', 'what', 'who', 'where', 'when', 'why',
      'tell', 'about', 'please', 'help', 'do', 'does', 'did', 'have', 'has'
    ]);
    return stopWords.has(word);
  }

  /**
   * Compute BM25/TF-IDF style relevance score between query tokens and a chunk
   */
  scoreChunk(queryTokens, chunk) {
    if (queryTokens.length === 0) return 0;

    const titleTokens = this.tokenize(chunk.title);
    const contentTokens = this.tokenize(chunk.content);
    const keywords = (chunk.keywords || []).map(k => k.toLowerCase());

    let score = 0;
    const queryStr = queryTokens.join(' ');
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();

    // Exact phrase match bonus
    if (lowerTitle.includes(queryStr)) score += 15;
    if (lowerContent.includes(queryStr)) score += 8;

    for (const token of queryTokens) {
      // Direct keyword tag match
      if (keywords.includes(token)) {
        score += 8;
      }

      // Title occurrence
      const inTitle = titleTokens.filter(t => t === token || t.includes(token)).length;
      score += inTitle * 5;

      // Content occurrence
      const inContent = contentTokens.filter(t => t === token || t.includes(token)).length;
      score += Math.min(inContent * 1.5, 9); // capped to avoid frequency skew
    }

    // Normalized by content length logarithm
    const lengthNorm = Math.log(contentTokens.length + 10) / Math.log(50);
    return score / lengthNorm;
  }

  /**
   * Retrieve top K relevant chunks for a user query
   */
  retrieve(query, limit = 4, threshold = 1.5) {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }

    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) {
      return [];
    }

    const scored = this.knowledge.map(chunk => ({
      chunk,
      score: this.scoreChunk(queryTokens, chunk)
    }));

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    const relevant = scored
      .filter(item => item.score >= threshold)
      .slice(0, limit)
      .map(item => ({
        ...item.chunk,
        relevanceScore: Math.round(item.score * 100) / 100
      }));

    return relevant;
  }
}

export const retrievalService = new RetrievalService();

