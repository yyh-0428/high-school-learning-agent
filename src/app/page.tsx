"use client";

import { useRef, useState, useEffect } from "react";
import { Plus, ArrowUp, SquarePen, Image as ImageIcon, FileText, Camera } from "lucide-react";

import { LiquidGlassInput } from "@/components/chat/liquid-glass-input";
import { HistoryDrawer } from "@/components/chat/history-drawer";
import { SettingsSheet } from "@/components/chat/settings-sheet";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

const suggestions = [
  { text: "帮我讲解牛顿第二定律" },
  { text: "制定一周期末复习计划" },
  { text: "背单词总是忘怎么办" },
  { text: "最近学习没动力，想聊聊" },
];

/** DeepSeek 风格侧边栏图标：两条横线 */
function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6.5H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 13.5H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
  const [uploadOpen, setUploadOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    sendMessage(inputValue);
  };

  const handleSuggestion = (text: string) => {
    setInputValue(text);
  };

  const handleNewChat = () => {
    createConversation();
    setInputValue("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputValue(`[已上传: ${file.name}]`);
    }
    setUploadOpen(false);
    e.target.value = "";
  };

  const isEmpty = messages.length === 0;

  // 当前对话标题
  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );
  const chatTitle = currentConversation?.title;

  return (
    <div className="relative flex h-dvh w-full flex-col bg-background">
      {/* 背景光晕 */}
      <div className="glass-backdrop" />

      {/* 顶部栏：固定不滚动 */}
      <header className="relative z-20 flex shrink-0 items-center justify-between px-3 pt-3 pb-1 sm:px-4 sm:pt-4">
        <button
          type="button"
          onClick={() => setHistoryOpen(true)}
          aria-label="打开对话历史"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SidebarIcon className="h-5 w-5" />
        </button>

        {/* 对话标题 */}
        <div className="flex-1 px-2 text-center">
          {chatTitle && !isEmpty ? (
            <p className="truncate text-sm font-medium text-foreground">
              {chatTitle}
            </p>
          ) : null}
        </div>

        {/* 右上角新建对话 */}
        <button
          type="button"
          onClick={handleNewChat}
          aria-label="新建对话"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SquarePen className="h-5 w-5" />
        </button>
      </header>

      {/* 消息区域：可滚动 */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto"
      >
        <div className="mx-auto flex min-h-full max-w-2xl flex-col px-4">
          {isEmpty ? (
            /* 空状态：居中欢迎 + 建议词 */
            <div className="flex flex-1 flex-col items-center justify-center py-16">
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
                    className="rounded-xl border border-border/60 bg-card/50 p-3 text-left text-[13px] leading-snug text-foreground/80 transition-all hover:border-border hover:bg-muted/50 hover:text-foreground"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5 py-6">
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

      {/* 底部输入区：固定不滚动 */}
      <div className="relative z-20 shrink-0">
        {/* 上传菜单弹层 */}
        {uploadOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setUploadOpen(false)}
            />
            <div className="absolute bottom-full left-3 z-40 mb-2 w-44 overflow-hidden rounded-2xl border border-border bg-popover py-1 shadow-lg sm:left-4">
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                上传图片
              </button>
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                上传文件
              </button>
              <button
                type="button"
                onClick={() => setUploadOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Camera className="h-4 w-4 text-muted-foreground" />
                拍摄
              </button>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,application/pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
        />

        <LiquidGlassInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          disabled={isTyping}
        >
          {/* 左侧：加号上传按钮 */}
          <button
            type="button"
            onClick={() => setUploadOpen((v) => !v)}
            aria-label="上传图片或文件"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Plus className="h-5 w-5" />
          </button>

          {/* 右侧：发送按钮 */}
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
      </div>

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
