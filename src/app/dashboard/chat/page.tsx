"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
};

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "bot",
  content: "Hi there! I'm Emerald, your personal wellness companion. How are you feeling today? You can talk to me about your cycle, mood, or anything that's on your mind.",
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = async (userText: string) => {
    setIsTyping(true);
    
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let responseText = "";
    const lowerText = userText.toLowerCase();

    if (lowerText.includes("sad") || lowerText.includes("depressed") || lowerText.includes("cry")) {
      responseText = "I'm sorry to hear you're feeling this way. It's completely okay to not be okay. Your feelings are valid. Would you like to try a quick breathing exercise or just vent a bit more?";
    } else if (lowerText.includes("anxious") || lowerText.includes("worry") || lowerText.includes("stress")) {
      responseText = "It sounds like there's a lot on your mind. Anxiety can be really tough, especially during certain cycle phases. Remember to take deep breaths. I'm here for you.";
    } else if (lowerText.includes("cramp") || lowerText.includes("pain") || lowerText.includes("hurt")) {
      responseText = "I'm sorry you're in pain. Have you tried a warm compress or some magnesium tea? If the pain is severe, please listen to your body and rest.";
    } else if (lowerText.includes("tired") || lowerText.includes("fatigue") || lowerText.includes("exhausted")) {
      responseText = "Your body might be asking for rest. During the luteal and menstrual phases, energy naturally dips. It's productive to rest when you need it.";
    } else if (lowerText.includes("happy") || lowerText.includes("good") || lowerText.includes("great")) {
      responseText = "That's wonderful to hear! I love seeing you happy. What's making your day good so far?";
    } else {
      responseText = "I hear you. Thank you for sharing that with me. I'm here to listen and support you. Tell me more about how that makes you feel.";
    }

    const botMessage: Message = {
      id: Date.now().toString(),
      role: "bot",
      content: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    generateResponse(input);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col p-4 md:p-6">
      <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Emerald AI Support</h1>
            <p className="text-xs text-muted-foreground">Always here to listen • Private & Secure</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-emerald-100 text-emerald-600"
                }`}>
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-muted rounded-tl-sm text-foreground"
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-sm text-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-background border-t border-border">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-muted/50 border border-input rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all pr-12"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            Emerald AI is a supportive companion, not a replacement for professional therapy.
          </p>
        </div>
      </div>
    </div>
  );
}
