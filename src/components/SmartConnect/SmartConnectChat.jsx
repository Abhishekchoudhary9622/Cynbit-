import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle, RefreshCw, Cpu } from 'lucide-react';
import MessageBubble from './MessageBubble';
import SuggestedQuestions, { DEFAULT_SUGGESTED_QUESTIONS } from './SuggestedQuestions';
import { sendChatMessage } from './services/smartConnectApi';
import { useModal } from '../../context/ModalContext';

export const INITIAL_WELCOME_MESSAGE = {
  id: 'welcome-0',
  role: 'assistant',
  content: "Hi! I'm SmartConnect AI. I can help you explore Cynbit's services, understand our products, find relevant projects and discover solutions for your business. How can I help you today?",
  sources: [],
  recommendations: [],
  related_resources: []
};

export default function SmartConnectChat({
  messages,
  setMessages,
  onMinimize,
}) {
  const { openModal } = useModal();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSend = async (overrideText = null) => {
    const textToSend = (overrideText !== null ? overrideText : inputText).trim();
    if (!textToSend || isLoading) return;

    setErrorState(null);
    setInputText('');

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // Format conversation history for API
    const historyPayload = newMessages
      .filter(m => m.id !== 'welcome-0')
      .map(m => ({
        role: m.role,
        content: m.content,
      }));

    try {
      const response = await sendChatMessage({
        query: textToSend,
        history: historyPayload,
        top_k: 5,
      });

      // Offer contact handoff / lead blueprint ONLY when explicitly provided by backend or requested by user
      let leadBlueprint = response.leadBlueprint || null;
      const lower = textToSend.toLowerCase();
      const explicitContactRequest = lower.includes('hire cynbit') || lower.includes('contact cynbit') ||
        lower.includes('work with cynbit') || lower.includes('book a demo') || lower.includes('schedule a call') ||
        lower.includes('request a quote');

      if (!leadBlueprint && explicitContactRequest && response.recommendations && response.recommendations.length > 0) {
        const topRec = response.recommendations[0];
        leadBlueprint = {
          summary: {
            industry: response.intent?.primary_intent || 'Business Systems',
            problem: textToSend.slice(0, 150),
            suggestedOffering: topRec.title || 'Autonomous AI Agents & Custom Software Development',
          },
          prefillData: {
            service: topRec.title || 'Autonomous AI Agents',
            message: `[SmartConnect AI Project Blueprint]\n• Problem Scope: ${textToSend}\n• Recommended Offering: ${topRec.title}\n• Intent Category: ${response.intent?.primary_intent || 'AI & Cloud'}`,
          },
        };
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        recommendations: response.recommendations || [],
        related_resources: response.related_resources || [],
        sources: response.sources || [],
        llm_status: response.llm_status,
        disclaimer: response.disclaimer,
        leadBlueprint,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('SmartConnectChat error:', err);
      setErrorState(err.message || 'Unable to connect to the assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleHandoffClick = (blueprint) => {
    if (!blueprint?.prefillData) return;
    openModal(
      'Review Architecture Scope',
      'general',
      blueprint.prefillData
    );
  };

  const lastMessage = messages[messages.length - 1];
  const isInitialState = messages.length === 1 && messages[0].id === 'welcome-0';

  return (
    <div className="flex flex-col h-full bg-surface-container-low/40">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 smartconnect-scroll">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onLinkClick={onMinimize}
            onHandoffClick={handleHandoffClick}
          />
        ))}

        {/* Suggested Questions: display initially or when conversation is active */}
        {isInitialState && !isLoading && (
          <SuggestedQuestions
            questions={DEFAULT_SUGGESTED_QUESTIONS}
            onSelectQuestion={(q) => handleSend(q)}
            disabled={isLoading}
          />
        )}

        {/* Loading / Typing Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2 animate-fade-scale">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            </div>
            <div className="bg-white border border-outline-variant/30 rounded-2xl rounded-tl-none p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-on-surface-variant font-medium ml-2">SmartConnect AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Banner with Retry */}
        {errorState && (
          <div className="p-3 rounded-2xl bg-error/10 border border-error/30 text-error text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorState}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const lastUser = [...messages].reverse().find(m => m.role === 'user');
                if (lastUser) handleSend(lastUser.content);
              }}
              className="font-bold underline ml-2 flex items-center gap-1 hover:text-error/80 shrink-0"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-outline-variant/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type any question or business requirement..."
            disabled={isLoading}
            className="flex-1 bg-surface-container px-4 py-2.5 rounded-full text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/20 transition-all placeholder:text-on-surface-variant/60 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container disabled:opacity-40 disabled:hover:bg-primary transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="text-[10px] text-center text-on-surface-variant/60 mt-1.5 flex items-center justify-center gap-1">
          <span>Grounded in Cynbit's verified architecture & case studies</span>
        </div>
      </div>
    </div>
  );
}

