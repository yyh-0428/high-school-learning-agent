"use client"

import * as React from "react"
import { Search, Plus, MoreHorizontal, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export interface Conversation {
  id: string
  title: string
  updatedAt: Date
}

interface HistoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  conversations: Conversation[]
  currentId?: string
  onSelect: (id: string) => void
  onCreate: () => void
  onOpenSettings: () => void
}

function isToday(date: Date): boolean {
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

function isWithinLast30Days(date: Date): boolean {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)
  return date >= start && date <= now
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

interface GroupedConversations {
  today: Conversation[]
  recent: Conversation[]
  older: Conversation[]
}

function groupConversations(
  conversations: Conversation[]
): GroupedConversations {
  const today: Conversation[] = []
  const recent: Conversation[] = []
  const older: Conversation[] = []

  for (const conversation of conversations) {
    if (isToday(conversation.updatedAt)) {
      today.push(conversation)
    } else if (isWithinLast30Days(conversation.updatedAt)) {
      recent.push(conversation)
    } else {
      older.push(conversation)
    }
  }

  return { today, recent, older }
}

export function HistoryDrawer({
  isOpen,
  onClose,
  conversations,
  currentId,
  onSelect,
  onCreate,
  onOpenSettings,
}: HistoryDrawerProps) {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return conversations
    return conversations.filter((conversation) =>
      conversation.title.toLowerCase().includes(trimmed)
    )
  }, [conversations, query])

  const { today, recent, older } = React.useMemo(
    () => groupConversations(filtered),
    [filtered]
  )

  const handleSelect = (id: string) => {
    onSelect(id)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="!w-full p-0 sm:!w-80">
        <div className="flex h-full flex-col bg-card">
          <SheetHeader className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-heading text-lg">对话历史</SheetTitle>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={onCreate}
                aria-label="新建对话"
              >
                <Plus />
              </Button>
            </div>
            <SheetDescription className="sr-only">
              浏览并切换历史对话
            </SheetDescription>
          </SheetHeader>

          <div className="px-4 py-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索对话内容…"
                className="pl-9"
                aria-label="搜索对话内容"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 px-2 py-2">
            <div className="space-y-4">
              {today.length > 0 && (
                <ConversationGroup title="今天">
                  {today.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      active={conversation.id === currentId}
                      onClick={() => handleSelect(conversation.id)}
                    />
                  ))}
                </ConversationGroup>
              )}

              {recent.length > 0 && (
                <ConversationGroup title="30 天内">
                  {recent.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      active={conversation.id === currentId}
                      onClick={() => handleSelect(conversation.id)}
                    />
                  ))}
                </ConversationGroup>
              )}

              {older.length > 0 && (
                <ConversationGroup title="更早">
                  {older.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      active={conversation.id === currentId}
                      onClick={() => handleSelect(conversation.id)}
                    />
                  ))}
                </ConversationGroup>
              )}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  未找到匹配对话
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">我</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onOpenSettings}
              aria-label="打开设置"
            >
              <MoreHorizontal />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ConversationGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

function ConversationItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg px-2 py-2 text-left transition-colors",
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      <p className="truncate text-sm font-medium">{conversation.title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {formatDate(conversation.updatedAt)}
      </p>
    </button>
  )
}
