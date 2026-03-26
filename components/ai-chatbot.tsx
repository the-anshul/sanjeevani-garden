"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Languages, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  language?: "en" | "hi";
}
// Local fallback responses if backend is unreachable
const generateLocalFallback = (text: string, language: "en" | "hi") => {
  const msg = text.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("नमस्ते")) {
    return language === "en"
      ? "Hello! I'm having trouble connecting to my brain right now, but I can still help with basic questions. Ask me about herbs like Tulsi or Neem!"
      : "नमस्ते! मुझे अभी अपने सिस्टम से जुड़ने में थोड़ी समस्या हो रही है, लेकिन मैं फिर भी बुनियादी मदद कर सकता हूँ। मुझसे तुलसी या नीम जैसी जड़ी-बूटियों के बारे में पूछें!";
  }

  if (msg.includes("tulsi") || msg.includes("basil")) {
    return language === "en"
      ? "Tulsi (Holy Basil) is great for respiratory health and immunity. You can boil its leaves with ginger for a healing tea."
      : "तुलसी श्वसन स्वास्थ्य और प्रतिरक्षा के लिए बेहतरीन है। आप इसके पत्तों को अदरक के साथ उबालकर चाय बना सकते हैं।";
  }

  return language === "en"
    ? "I'm currently in offline mode. Please check if the backend server is running for full AI features. You can ask about herbs like Tulsi, Neem, or Aloe Vera."
    : "मैं अभी ऑफलाइन मोड में हूँ। पूरी एआई सुविधाओं के लिए कृपया जांचें कि सर्वर चल रहा है या नहीं। आप तुलसी, नीम या एलोवेरा जैसी जड़ी-बूटियों के बारे में पूछ सकते हैं।";
};



export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I am your Sanjeevani Garden assistant. I can help you learn about herbs and translate between English and Hindi. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      language: "en",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi">("en");
  const [isAIAvailable, setIsAIAvailable] = useState<boolean | null>(null); // null = unknown, true = AI, false = fallback
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ----------------------------
  // SEND MESSAGE
  // ----------------------------
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      language: currentLanguage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      let reply = "";

      // Call backend AI chat endpoint
      try {
        const response = await fetch("/api/health/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages
              .map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.content }))
              .concat([{ role: "user", content: inputMessage }]),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          reply = data.reply;
          setIsAIAvailable(data.provider !== 'database' && data.provider !== 'general');
        } else {
          throw new Error("Backend AI failed");
        }
      } catch (err) {
        console.warn("Backend AI failed, using local fallback:", err);
        reply = generateLocalFallback(inputMessage, currentLanguage);
        setIsAIAvailable(false);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        sender: "bot",
        timestamp: new Date(),
        language: currentLanguage,
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg animate-pulse"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[92vw] h-[540px] z-50">
          <Card className="h-full flex flex-col shadow-2xl border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-lg">Sanjeevani AI Assistant</CardTitle>
                </div>
                {isAIAvailable === false && (
                  <div className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                    DEMO MODE
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="ml-1 text-xs">{currentLanguage.toUpperCase()}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {msg.sender === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                        <span className="text-xs opacity-70">
                          {msg.sender === "user" ? "You" : "AI Assistant"}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="h-3 w-3" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-3 bg-white">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      currentLanguage === "en"
                        ? "Ask about herbs or translations..."
                        : "जड़ी-बूटियों या अनुवाद के बारे में पूछें..."
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    className="flex-1"
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
