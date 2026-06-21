"use client";

import { useRef, useState, useEffect } from "react";
import { Menu, Sparkles, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LiquidGlassInput } from "@/components/chat/liquid-glass-input";
import { HistoryDrawer } from "@/components/chat/history-drawer";
import { SettingsSheet } from "@/components/chat/settings-sheet";
import { useChat } from "@/hooks/use-chat";
import { type ChatMode } from "@/lib/types";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: "📚", text: "帮我讲解牛顿第二定律" },
  { icon: "📝", text: "制定一周期末复习计划" },
  { icon: "💡", text: "背单词总是忘怎么办" },
  { icon: "🎯", text: "最近学习没动力，想聊聊" },
];

export default function Home() {
  const {
    messages,
    inputValue,
    isTyping,
    conversations,
    currentConversationId,
    setInputValue,
    sendMessage,
    createConversation,
    selectConversation,
  } = useChat();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("quick");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    sendMessage(inputValue, mode);
  };

  const handleSuggestion = (text: string) => {
    setInputValue(text);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="relative flex h-dvh w-full flex-col bg-background">
      {/* 背景光晕（为液态玻璃提供折射素材） */}
      <div className="glass-backdrop" />

      {/* 左上角：对话历史入口 */}
      <header className="relative z-20 flex items-center px-3 pt-3 sm:px-4 sm:pt-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setHistoryOpen(true)}
          aria-label="打开对话历史"
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {/* 消息区域 */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto"
      >
        <div className="mx-auto flex min-h-full max-w-2xl flex-col px-4">
          {isEmpty ? (
            /* 空状态：居中欢迎 + 建议词卡片 */
            <div className="flex flex-1 flex-col items-center justify-center py-16">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 text-2xl">
                ✨
              </div>
              <h1 className="mb-2 text-xl font-semibold text-foreground">
                有什么可以帮你？
              </h1>
              <p className="mb-8 text-sm text-muted-foreground">
                试试以下话题，或直接输入你的问题
              </p>
              <div className="grid w-full max-w-md grid-cols-2 gap-2.5">
                {suggestions.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => handleSuggestion(s.text)}
                    className="group flex items-start gap-2.5 rounded-xl border border-border/60 bg-card/50 p-3 text-left transition-all hover:border-border hover:bg-muted/50 hover:shadow-sm"
                  >
                    <span className="text-lg leading-none">{s.icon}</span>
                    <span className="text-[13px] leading-snug text-foreground/80 group-hover:text-foreground">
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 对话列表 */
            <div className="space-y-5 py-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "agent" && (
                    <div className="mr-2.5 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 text-xs">
                      ✨
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] whitespace-pre-wrap px-4 py-2.5 text-[15px] leading-relaxed sm:max-w-[75%]",
                      msg.role === "user"
                        ? "rounded-2xl rounded-tr-md bg-foreground text-background"
                        : "rounded-2xl rounded-tl-md bg-muted/60 text-foreground"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="mr-2.5 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 text-xs">
                    ✨
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-muted/60 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 底部输入区 */}
      <LiquidGlassInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        disabled={isTyping}
      >
        <button
          type="button"
          onClick={() => setMode((m) => (m === "quick" ? "deep" : "quick"))}
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors",
            mode === "deep"
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">
            {mode === "deep" ? "深度思考" : "快速回答"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          aria-label="发送"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all",
            inputValue.trim() && !isTyping
              ? "bg-foreground text-background hover:scale-105 active:scale-95"
              : "bg-muted text-muted-foreground/40"
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </LiquidGlassInput>

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        conversations={conversations}
        currentId={currentConversationId ?? undefined}
        onSelect={(id) => {
          selectConversation(id);
          setHistoryOpen(false);
        }}
        onCreate={() => {
          createConversation();
          setHistoryOpen(false);
        }}
        onOpenSettings={() => {
          setHistoryOpen(false);
          setSettingsOpen(true);
        }}
      />

      <SettingsSheet
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
