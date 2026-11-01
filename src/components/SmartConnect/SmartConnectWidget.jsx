import React, { useState } from 'react';
import { Sparkles, Minus, X, RotateCcw } from 'lucide-react';
import SmartConnectChat, { INITIAL_WELCOME_MESSAGE } from './SmartConnectChat';
import './SmartConnect.css';

export default function SmartConnectWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME_MESSAGE]);

  const handleClear = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 1. Floating Launch Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-pulse-subtle">
          <button
            type="button"
            onClick={handleToggleOpen}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-primary via-[#004c52] to-primary text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
            aria-label="Open SmartConnect AI Assistant"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-4 h-4 text-primary-fixed" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-primary rounded-full animate-pulse" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-[10px] font-black uppercase tracking-wider text-primary-fixed-dim">
                Cynbit AI
              </div>
              <div className="text-xs font-bold font-headline leading-tight">
                SmartConnect AI
              </div>
            </div>

            <span className="inline-flex items-center justify-center px-2 py-0.5 text-[9px] font-extrabold uppercase bg-white/15 rounded-full border border-white/10 text-primary-fixed">
              Ask AI
            </span>
          </button>
        </div>
      )}

      {/* 2. Floating Assistant Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[620px] max-h-[88vh]'
          }`}
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 96, 103, 0.28)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-[#004d53] to-primary p-4 text-white flex items-center justify-between shadow-xs select-none">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => isMinimized && setIsMinimized(false)}
            >
              <div className="w-9 h-9 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-primary-fixed" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline font-bold text-sm tracking-wide">
                    SmartConnect AI
                  </h3>
                  <span className="flex items-center gap-1 text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-white/75 font-body">
                  Cynbit Technologies Intelligent Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                title="Clear conversation"
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label={isMinimized ? 'Expand window' : 'Minimize window'}
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Body (Active conversation) */}
          {!isMinimized && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <SmartConnectChat
                messages={messages}
                setMessages={setMessages}
                onMinimize={() => setIsMinimized(true)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

