import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  MessageCircle, 
  Plus, 
  Send, 
  User, 
  Menu, 
  X, 
  Clock,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../backend";
import ProtectedRoute from "../components/ProtectedRoute";
import { 
  useGetChatHistory, 
  useSendMessage, 
  useGetChatSessions 
} from "../hooks/useQueries";
import { getChatbotResponse } from "../utils/chatbotResponses";

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(timestamp: number | string): string {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

const WELCOME_MESSAGE =
  "Hello! I'm Sarthi AI, your educational and career guidance assistant. I can help you with:\n\n• Career path suggestions\n• Subject recommendations\n• Study tips and strategies\n• Scholarship and internship guidance\n• Exam preparation advice\n\nWhat would you like to know today?";

const SUGGESTED_QUESTIONS = [
  "What career suits me if I love Mathematics?",
  "How do I prepare for JEE/NEET?",
  "Which scholarships are available for engineering students?",
  "What skills should I learn for a tech career?",
];

export default function Chatbot() {
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    // Try to get the last active session from localStorage or generate new
    const saved = localStorage.getItem('lastChatSessionId');
    return saved || crypto.randomUUID();
  });

  const { data: chatHistory, isLoading: isHistoryLoading } = useGetChatHistory(currentSessionId);
  const { data: sessions = [], isLoading: isSessionsLoading } = useGetChatSessions();
  const sendMessage = useSendMessage();
  
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<
    Array<{ sender: string; message: string; timestamp: number }>
  >([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastSyncedSessionId = useRef<string | null>(null);

  // Sync currentSessionId to localStorage
  useEffect(() => {
    localStorage.setItem('lastChatSessionId', currentSessionId);
  }, [currentSessionId]);

  // Load history into local messages when session changes or history loads
  useEffect(() => {
    if (!isHistoryLoading) {
      // Sync messages if session changed
      if (currentSessionId !== lastSyncedSessionId.current) {
        if (chatHistory && chatHistory.length > 0) {
          setLocalMessages(
            chatHistory.map((m) => ({
              sender: m.sender,
              message: m.message,
              timestamp: typeof m.timestamp === "bigint"
                ? Number(m.timestamp / 1_000_000n)
                : new Date(m.timestamp as any).getTime(),
            }))
          );
        } else {
          setLocalMessages([]);
        }
        lastSyncedSessionId.current = currentSessionId;
      }
    }
  }, [chatHistory, currentSessionId, isHistoryLoading]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const handleSend = (messageText?: string) => {
    const text = (messageText ?? input).trim();
    if (!text) return;

    const userMsg = {
      sender: "User",
      message: text,
      timestamp: Date.now(),
    };
    
    setLocalMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate bot response client-side for immediate feedback
    const responseText = getChatbotResponse(text);
    const botMsg = {
      sender: "Chatbot",
      message: responseText,
      timestamp: Date.now() + 100,
    };
    
    // Simulate thinking delay for bot feel
    setTimeout(() => {
      setLocalMessages((prev) => [...prev, botMsg]);
    }, 600);

    // Persist to backend
    sendMessage.mutate({ message: text, sessionId: currentSessionId });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleSend();
    }
  };

  const handleNewChat = () => {
    const newId = crypto.randomUUID();
    setCurrentSessionId(newId);
    setLocalMessages([]);
    setSidebarOpen(false);
  };

  const selectSession = (id: string) => {
    setCurrentSessionId(id);
    setSidebarOpen(false);
  };

  // Group sessions by date
  const groupedSessions = React.useMemo(() => {
    const groups: Record<string, typeof sessions> = {};
    sessions.forEach(session => {
      const date = formatDate(session.latestTimestamp);
      if (!groups[date]) groups[date] = [];
      groups[date].push(session);
    });
    return Object.entries(groups);
  }, [sessions]);

  // Group messages for display
  const groupedMessages = React.useMemo(() => {
    const groups: Array<{ date: string; messages: typeof localMessages }> = [];
    let currentDate = "";
    for (const msg of localMessages) {
      const date = formatDate(msg.timestamp);
      if (date !== currentDate) {
        currentDate = date;
        groups.push({ date, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    }
    return groups;
  }, [localMessages]);

  return (
    <ProtectedRoute>
      <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-background">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transition-transform duration-300 transform lg:relative lg:translate-x-0 flex flex-col
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" /> History
            </h2>
            <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden" 
                onClick={() => setSidebarOpen(false)}
            >
                <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4">
            <Button 
              onClick={handleNewChat}
              className="w-full justify-start gap-2 bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm transition-all active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-6">
              {isSessionsLoading ? (
                <div className="space-y-3 px-2">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
                </div>
              ) : groupedSessions.length === 0 ? (
                <div className="text-center py-12 px-4 opacity-40">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3" />
                  <p className="text-xs font-medium">No conversations yet</p>
                </div>
              ) : (
                groupedSessions.map(([date, group]) => (
                  <div key={date} className="space-y-1">
                    <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-2">
                      {date}
                    </h3>
                    {group.map(session => (
                      <button
                        key={session.sessionId}
                        onClick={() => selectSession(session.sessionId)}
                        className={`
                          w-full text-left p-3 rounded-xl text-sm transition-all group flex items-start gap-3 border
                          ${currentSessionId === session.sessionId 
                            ? 'bg-teal-500/10 text-teal-600 border-teal-500/30' 
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground border-transparent'}
                        `}
                      >
                        <MessageCircle className={`h-4 w-4 mt-0.5 shrink-0 transition-colors ${currentSessionId === session.sessionId ? 'text-teal-500' : 'text-muted-foreground/40'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate leading-tight">
                            {session.firstUserMessage || session.preview || "Untitled Chat"}
                          </p>
                          <p className="text-[10px] opacity-60 mt-1 flex items-center gap-1">
                            {session.messageCount} messages
                          </p>
                        </div>
                        <ChevronRight className={`h-4 w-4 shrink-0 transition-all ${currentSessionId === session.sessionId ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <section className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 bg-background/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden hover:bg-muted"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/10">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-foreground">Sarthi AI</h1>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Messages Area */}
          <main className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-12 space-y-10">
                {localMessages.length === 0 && !isHistoryLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 rounded-[2rem] bg-teal-600/10 flex items-center justify-center mb-8 shadow-[0_20px_50px_rgba(13,148,136,0.1)]">
                      <Bot className="h-12 w-12 text-teal-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                      Welcome to Sarthi AI
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-12">
                      {WELCOME_MESSAGE}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          type="button"
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-left p-5 rounded-3xl border border-border bg-card hover:border-teal-500/50 hover:bg-teal-500/5 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 active:scale-[0.98]"
                        >
                          <p className="text-sm font-semibold text-muted-foreground group-hover:text-foreground line-clamp-2">{q}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12 pb-8">
                    {groupedMessages.map((group) => (
                      <div key={group.date} className="space-y-8">
                        <div className="flex items-center gap-6">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-2">
                            {group.date}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                        </div>
                        
                        {group.messages.map((msg, idx) => {
                          const isUser = msg.sender === "User";
                          return (
                            <div
                              key={`${msg.timestamp}-${idx}`}
                              className={`flex gap-4 group animate-in slide-in-from-bottom-4 duration-500 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <div className={`
                                w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center shadow-md transition-transform group-hover:scale-110
                                ${isUser ? "bg-amber-500 text-white" : "bg-teal-600 text-white"}
                              `}>
                                {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                              </div>
                              
                              <div className={`flex flex-col gap-2 max-w-[85%] sm:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
                                <div className={`
                                  px-5 py-3.5 rounded-3xl text-[15px] leading-[1.6] shadow-sm transition-shadow hover:shadow-md
                                  ${isUser 
                                    ? "bg-teal-600 text-white rounded-tr-none" 
                                    : "bg-card border border-border text-foreground rounded-tl-none font-medium text-muted-foreground/90"}
                                `}>
                                  {msg.message}
                                </div>
                                <span className="text-[10px] text-muted-foreground font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity px-2">
                                  {formatTime(msg.timestamp)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
                
                {isHistoryLoading && localMessages.length === 0 && (
                  <div className="space-y-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`flex gap-4 ${i === 2 ? "flex-row-reverse" : ""}`}>
                        <Skeleton className="w-9 h-9 rounded-2xl shrink-0" />
                        <Skeleton className="h-20 w-[60%] rounded-3xl" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </main>

          {/* Input Area */}
          <footer className="p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
              <div className="relative group p-[2px] rounded-[2rem] bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-teal-500/20 hover:via-teal-600/20 hover:to-teal-500/20 transition-all duration-700">
                <div className="relative bg-card border border-border rounded-[1.9rem] p-3 shadow-xl shadow-black/5 transition-all focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500/50">
                  <div className="flex gap-4 items-end">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Sarthi AI anything..."
                      className="flex-1 min-h-[50px] max-h-48 border-0 focus-visible:ring-0 bg-transparent text-[15px] py-3 px-4 resize-none placeholder:text-muted-foreground/50 placeholder:font-medium"
                      rows={1}
                    />
                    <Button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="h-12 w-12 shrink-0 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-xl shadow-teal-500/20 transition-all active:scale-90 disabled:opacity-20"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-center text-muted-foreground/40 mt-4 font-bold tracking-[0.05em] uppercase">
                 Sarthi · AI powered career guidance
              </p>
            </div>
          </footer>
        </section>
      </div>
    </ProtectedRoute>
  );
}
