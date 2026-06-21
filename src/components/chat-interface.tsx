"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  exampleConversations,
  getGreeting,
  getRandomGreeting,
  learningCompanion,
} from "@/lib/agent";
import { type ChatMessage } from "@/lib/types";

const fallbackResponses = [
  "这个角度很有意思。你可以多说说你现在的学习状态吗？比如最近在学哪科、卡在哪里。",
  "没问题，我们可以一点点来。先告诉我，你今天的学习目标是什么？",
  "学习路上有波动很正常。要不要我们一起把这个问题拆成更小的步骤？",
  "我建议先选一个具体的方法试试，比如番茄工作法或主动回忆，坚持一周再调整。",
];

function generateReply(input: string): string {
  const normalized = input.toLowerCase().trim();
  const matched = exampleConversations.find((conv) =>
    conv.student.toLowerCase().includes(normalized.slice(0, 10))
  );
  if (matched) return matched.agent;

  if (normalized.includes("方法") || normalized.includes("怎么学")) {
    return "学习方法因人而异。你可以先告诉我你最常学的科目和目前的痛点，我帮你推荐一个最适合的方法。";
  }
  if (normalized.includes("计划") || normalized.includes("安排")) {
    return "制定计划的关键是‘少而具体’。今晚先列出3件必须完成的事，按重要程度排序，然后我们一起填进计划表。";
  }
  if (normalized.includes("累") || normalized.includes("动力")) {
    return "累了就休息一下，别硬撑。动力像潮水，有高有低。我们今天只做一件最小的事，完成后再决定要不要继续。";
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "agent",
      content: `${getGreeting()}！${getRandomGreeting()}`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chat-bubble",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 600 + Math.random() * 400)
    );

    const reply: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "agent",
      content: generateReply(text),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, reply]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-3xl border border-[var(--brand-light-gray)] bg-[var(--card)] shadow-xl shadow-[var(--brand-dark)]/5">
      <div className="flex items-center gap-3 border-b border-[var(--brand-light-gray)] px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-orange)] text-[var(--brand-light)]">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-[var(--brand-dark)] font-heading">
            {learningCompanion.name.chinese}
          </p>
          <p className="text-xs text-[var(--brand-mid-gray)]">
            你的 AI 学习伙伴 · 随时在线
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-4">
        <div
          ref={messagesContainerRef}
          className="space-y-5"
          role="log"
          aria-live="polite"
          aria-label="聊天记录"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar
                className={`h-9 w-9 shrink-0 ${
                  msg.role === "agent"
                    ? "bg-[var(--brand-orange)] text-[var(--brand-light)]"
                    : "bg-[var(--brand-dark)] text-[var(--brand-light)]"
                }`}
              >
                <AvatarFallback>
                  {msg.role === "agent" ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={`chat-bubble max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "agent"
                    ? "rounded-tl-none bg-[var(--brand-light-gray)] text-[var(--brand-dark)]"
                    : "rounded-tr-none bg-[var(--brand-dark)] text-[var(--brand-light)]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-9 w-9 shrink-0 bg-[var(--brand-orange)] text-[var(--brand-light)]">
                <AvatarFallback>
                  <Sparkles className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-[var(--brand-light-gray)] px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--brand-mid-gray)]" />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-[var(--brand-mid-gray)]"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-[var(--brand-mid-gray)]"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-[var(--brand-light-gray)] px-6 py-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="问问小智学习方法、制定计划…"
            disabled={isTyping}
            className="flex-1 rounded-full border-[var(--brand-light-gray)] bg-[var(--brand-light-gray)]/50 px-5 focus-visible:ring-[var(--brand-orange)]"
            aria-label="输入消息"
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={isTyping}
            className="h-10 w-10 shrink-0 rounded-full bg-[var(--brand-orange)] text-[var(--brand-light)] hover:bg-[var(--brand-orange)]/90 disabled:opacity-60"
            aria-label="发送"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-[var(--brand-mid-gray)]">
          小智是演示版学习助手，回复基于预设场景。真实产品可接入大模型 API。
        </p>
      </div>
    </div>
  );
}
