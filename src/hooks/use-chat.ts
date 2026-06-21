"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { generateReply } from "@/lib/agents/coordinator";
import { type ChatMessage, type ChatMode, type Conversation } from "@/lib/types";

const STORAGE_KEY = "high-school-learning-agent-chat";

interface PersistedState {
  messages: ChatMessage[];
  conversations: Conversation[];
  currentConversationId: string | null;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function makeTitle(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "新对话";
  return trimmed.length > 20 ? `${trimmed.slice(0, 20)}…` : trimmed;
}

function serializeState(state: PersistedState): string {
  return JSON.stringify({
    messages: state.messages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    })),
    conversations: state.conversations.map((conv) => ({
      ...conv,
      updatedAt: conv.updatedAt.toISOString(),
    })),
    currentConversationId: state.currentConversationId,
  });
}

function deserializeState(raw: string): PersistedState {
  const parsed = JSON.parse(raw) as {
    messages: Array<Omit<ChatMessage, "timestamp"> & { timestamp: string }>;
    conversations: Array<
      Omit<Conversation, "updatedAt"> & { updatedAt: string }
    >;
    currentConversationId: string | null;
  };

  return {
    messages: parsed.messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    })),
    conversations: parsed.conversations.map((conv) => ({
      ...conv,
      updatedAt: new Date(conv.updatedAt),
    })),
    currentConversationId: parsed.currentConversationId,
  };
}

function loadState(storageKey: string): PersistedState | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    return deserializeState(raw);
  } catch {
    return null;
  }
}

function saveState(storageKey: string, state: PersistedState): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(storageKey, serializeState(state));
  } catch {
    // Ignore storage errors (e.g., quota exceeded).
  }
}

export interface UseChatOptions {
  storageKey?: string;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  conversations: Conversation[];
  currentConversationId: string | null;
  setInputValue: (value: string) => void;
  sendMessage: (text: string, mode?: ChatMode) => Promise<void>;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const storageKey = options.storageKey ?? STORAGE_KEY;

  const [messages, setMessages] = useState<ChatMessage[]>(
    () => loadState(storageKey)?.messages ?? []
  );
  const [conversations, setConversations] = useState<Conversation[]>(
    () => loadState(storageKey)?.conversations ?? []
  );
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(() => loadState(storageKey)?.currentConversationId ?? null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Persist whenever relevant state changes.
  useEffect(() => {
    saveState(storageKey, { messages, conversations, currentConversationId });
  }, [storageKey, messages, conversations, currentConversationId]);

  const currentMessages = useMemo(() => {
    if (!currentConversationId) return [];
    const conversation = conversations.find(
      (conv) => conv.id === currentConversationId
    );
    if (!conversation) return [];
    const messageMap = new Map(messages.map((msg) => [msg.id, msg]));
    return conversation.messageIds
      .map((id) => messageMap.get(id))
      .filter((msg): msg is ChatMessage => msg !== undefined);
  }, [currentConversationId, conversations, messages]);

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "新对话",
      messageIds: [],
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setCurrentConversationId(id);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const removed = prev.find((conv) => conv.id === id);
        const next = prev.filter((conv) => conv.id !== id);

        if (removed) {
          const removedIds = new Set(removed.messageIds);
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => !removedIds.has(msg.id))
          );
        }

        if (currentConversationId === id) {
          setCurrentConversationId(next[0]?.id ?? null);
        }

        return next;
      });
    },
    [currentConversationId]
  );

  const sendMessage = useCallback(
    async (text: string, mode: ChatMode = "quick") => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      let activeConversationId = currentConversationId;
      if (!activeConversationId) {
        const newConversation: Conversation = {
          id: generateId(),
          title: makeTitle(trimmed),
          messageIds: [],
          updatedAt: new Date(),
        };
        activeConversationId = newConversation.id;
        setConversations((prev) => [newConversation, ...prev]);
        setCurrentConversationId(activeConversationId);
      }

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messageIds: [...conv.messageIds, userMessage.id],
                title:
                  conv.title === "新对话" ? makeTitle(trimmed) : conv.title,
                updatedAt: new Date(),
              }
            : conv
        )
      );
      setInputValue("");
      setIsTyping(true);

      try {
        const replyContent = await generateReply(trimmed, { mode });
        const agentMessage: ChatMessage = {
          id: generateId(),
          role: "agent",
          content: replyContent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentMessage]);
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId
              ? {
                  ...conv,
                  messageIds: [...conv.messageIds, agentMessage.id],
                  updatedAt: new Date(),
                }
              : conv
          )
        );
      } finally {
        setIsTyping(false);
      }
    },
    [currentConversationId, isTyping]
  );

  return {
    messages: currentMessages,
    inputValue,
    isTyping,
    conversations,
    currentConversationId,
    setInputValue,
    sendMessage,
    createConversation,
    selectConversation,
    deleteConversation,
  };
}
