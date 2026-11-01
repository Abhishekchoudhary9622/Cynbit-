import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { chatService } from './services/chat.service.js';
import { recommendationService } from './services/recommendation.service.js';
import { retrievalService } from './services/retrieval.service.js';
import { caseStudyService } from './services/caseStudy.service.js';
import { leadService } from './services/lead.service.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Request logging (sanitized, avoiding logging private customer query text)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[SmartConnect API] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check
app.get('/api/smartconnect/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SmartConnect AI Backend Proxy',
    ml_upstream: process.env.SMARTCONNECT_ML_API_URL || 'http://127.0.0.1:8001/chat',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// 1. Conversational Chat Endpoint (Proxies to Python FastAPI ML backend)
app.post('/api/smartconnect/chat', async (req, res) => {
  try {
    // Support both { query, history, top_k } and { message, conversationHistory }
    const rawQuery = req.body.query || req.body.message;
    const rawHistory = req.body.history || req.body.conversationHistory || [];
    const topK = req.body.top_k || 5;

    if (!rawQuery || typeof rawQuery !== 'string' || rawQuery.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Query or message parameter is required and must be a non-empty string.'
      });
    }

    const query = rawQuery.trim().slice(0, 3000);
    const history = Array.isArray(rawHistory)
      ? rawHistory.slice(-12).map(turn => ({
          role: turn.role === 'user' ? 'user' : 'assistant',
          content: String(turn.content || '').slice(0, 2000)
        }))
      : [];

    const pythonApiUrl = process.env.SMARTCONNECT_ML_API_URL || 'http://127.0.0.1:8001/chat';

    try {
      // Forward to Python FastAPI with timeout controller (25s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const mlResponse = await fetch(pythonApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          top_k: topK,
          history
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (mlResponse.ok) {
        const mlData = await mlResponse.json();
        if (mlData.reply) {
          return res.json({
            success: true,
            assistant: mlData.assistant || 'SmartConnect AI',
            reply: mlData.reply,
            intent: mlData.intent,
            recommendations: mlData.recommendations || [],
            related_resources: mlData.related_resources || [],
            sources: mlData.sources || [],
            llm_status: mlData.llm_status,
            disclaimer: mlData.disclaimer,
            data: mlData
          });
        }
      }
      console.warn(`[SmartConnect Proxy] Python API responded with status ${mlResponse ? mlResponse.status : 'unknown'}`);
    } catch (proxyError) {
      console.warn(`[SmartConnect Proxy] Python API unreachable at ${pythonApiUrl}: ${proxyError.message}. Using resilient fallback.`);
    }

    // Graceful Fallback if Python API is unreachable
    const fallbackResult = await chatService.processMessage({
      message: query,
      conversationHistory: history
    });

    const isGeneral = (fallbackResult.intent === 'general_qa');
    return res.json({
      success: true,
      assistant: 'SmartConnect AI',
      reply: fallbackResult.message,
      intent: { primary_intent: isGeneral ? 'General Knowledge' : (fallbackResult.intent || 'General Query') },
      recommendations: isGeneral ? [] : (fallbackResult.recommendations || []),
      related_resources: isGeneral ? [] : (fallbackResult.caseStudies || []),
      sources: isGeneral ? [] : (fallbackResult.sources || []),
      leadBlueprint: fallbackResult.leadBlueprint || null,
      llm_status: fallbackResult.llm_status || 'offline_fallback',
      disclaimer: isGeneral ? null : (fallbackResult.disclaimer || null),
      data: fallbackResult
    });
  } catch (error) {
    console.error('[SmartConnect Chat Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your request. Please try again.'
    });
  }
});

// 2. Structured Recommendation Endpoint
app.post('/api/smartconnect/recommend', (req, res) => {
  try {
    const { requirementText, extractedRequirements, limit = 2 } = req.body;

    if (!requirementText || typeof requirementText !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'requirementText is required and must be a string.'
      });
    }

    const recommendations = recommendationService.getRecommendations(
      requirementText,
      extractedRequirements,
      limit
    );

    return res.json({
      success: true,
      data: {
        recommendations,
        count: recommendations.length
      }
    });
  } catch (error) {
    console.error('[SmartConnect Recommend Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute recommendations.'
    });
  }
});

// 3. Knowledge Base Search / Retrieval Endpoint
app.post('/api/smartconnect/search', (req, res) => {
  try {
    const { query, limit = 4 } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query parameter is required.'
      });
    }

    const results = retrievalService.retrieve(query, limit);

    return res.json({
      success: true,
      data: {
        query,
        results,
        count: results.length
      }
    });
  } catch (error) {
    console.error('[SmartConnect Search Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Search operation failed.'
    });
  }
});

// 4. Case Studies Search Endpoint
app.post('/api/smartconnect/case-studies', (req, res) => {
  try {
    const { query, limit = 3 } = req.body;
    const results = caseStudyService.searchCaseStudies(query || '', limit);

    return res.json({
      success: true,
      data: {
        caseStudies: results,
        count: results.length
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve case studies.'
    });
  }
});

// 5. Lead Summary & Handoff Preparation Endpoint
app.post('/api/smartconnect/lead-summary', (req, res) => {
  try {
    const { conversationHistory = [], requirements = {} } = req.body;

    const leadBlueprint = leadService.generateLeadSummary({
      conversationHistory,
      requirements
    });

    return res.json({
      success: true,
      data: leadBlueprint
    });
  } catch (error) {
    console.error('[SmartConnect Lead Summary Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate lead summary.'
    });
  }
});

// Global 404 for API
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Serve static frontend build from dist/ for production deployments (e.g. Render, Railway)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback for React Router in Express 5
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.originalUrl.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start server if executed directly as main script
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('server.js') || 
  fileURLToPath(import.meta.url) === process.argv[1]
);

if (isDirectRun || process.env.RUN_STANDALONE === 'true') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SmartConnect AI] Server listening on http://127.0.0.1:${PORT}`);
  });
}

export default app;
