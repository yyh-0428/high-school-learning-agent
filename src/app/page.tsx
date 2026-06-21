"use client";

import { useState } from "react";
import { Menu, Sparkles, ArrowUp, StopCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LiquidGlassInput } from "@/components/chat/liquid-glass-input";
import { HistoryDrawer } from "@/components/chat/history-drawer";
import { SettingsSheet } from "@/components/chat/settings-sheet";
import { useChat } from "@/hooks/use-chat";
import { type ChatMode } from "@/lib/types";
import { cn } from "@/lib/utils";

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

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    sendMessage(inputValue, mode);
  };

  return (
    <div className="relative flex h-dvh w-full flex-col bg-background">
      <header className="absolute left-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setHistoryOpen(true)}
          aria-label="打开对话历史"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      <ScrollArea className="flex-1 px-4">
        <div className="mx-auto flex min-h-[calc(100dvh-12rem)] max-w-3xl flex-col justify-end py-6">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground/60">开始对话吧</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed sm:max-w-[75%]",
                      msg.role === "user"
                        ? "bg-foreground text-background"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                    思考中…
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      <LiquidGlassInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        disabled={isTyping}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setMode((m) => (m === "quick" ? "deep" : "quick"))}
          className={cn(
            "gap-1.5 rounded-full whitespace-nowrap text-xs sm:text-sm",
            mode === "deep" && "bg-primary/10 text-primary hover:bg-primary/15"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">
            {mode === "deep" ? "深度思考" : "快速模式"}
          </span>
          <span className="sm:hidden">
            {mode === "deep" ? "深" : "快"}
          </span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          aria-label={isTyping ? "停止" : "发送"}
        >
          {isTyping ? (
            <StopCircle className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
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
