"use client";

import { useState } from "react";
import { Check, Plus, Trash2, Clock, BookOpen, Brain, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type StudyPlanItem } from "@/lib/types";

const initialPlan: StudyPlanItem[] = [
  {
    id: "1",
    time: "19:00-19:40",
    subject: "数学",
    method: "限时做选填专项 + 订正错题",
    goal: "掌握三角函数图像变换常见题型",
    break: "休息10分钟，喝水/远眺",
    completed: false,
  },
  {
    id: "2",
    time: "19:50-20:30",
    subject: "英语",
    method: "间隔重复背高频词 30 个",
    goal: "新词20个 + 复习旧词60个",
    break: "起身活动5分钟",
    completed: false,
  },
  {
    id: "3",
    time: "20:35-21:15",
    subject: "物理",
    method: "费曼技巧讲解牛顿第二定律",
    goal: "能用大白话讲清 F=ma 的应用场景",
    break: "闭目养神5分钟",
    completed: false,
  },
];

export function StudyPlan() {
  const [items, setItems] = useState<StudyPlanItem[]>(initialPlan);

  const toggleComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        time: "",
        subject: "",
        method: "",
        goal: "",
        break: "",
        completed: false,
      },
    ]);
  };

  const updateItem = (
    id: string,
    field: Exclude<keyof StudyPlanItem, "id" | "completed">,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <Card className="overflow-hidden border-[var(--brand-light-gray)] bg-[var(--card)]">
      <CardHeader className="border-b border-[var(--brand-light-gray)] bg-[var(--brand-light-gray)]/30 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-[var(--brand-dark)] font-heading">
              今日学习计划
            </h3>
            <p className="text-sm text-[var(--brand-mid-gray)]">
              完成 {completedCount} / {items.length} 项 · 保持节奏
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 overflow-hidden rounded-full bg-[var(--brand-light-gray)]">
              <div
                className="h-full rounded-full bg-[var(--brand-green)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-[var(--brand-dark)]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[var(--brand-light-gray)]">
          {items.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col gap-3 p-5 transition-colors hover:bg-[var(--brand-light-gray)]/20 sm:flex-row sm:items-start ${
                item.completed ? "bg-[var(--brand-green)]/5" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleComplete(item.id)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  item.completed
                    ? "border-[var(--brand-green)] bg-[var(--brand-green)] text-[var(--brand-light)]"
                    : "border-[var(--brand-light-gray)] text-transparent hover:border-[var(--brand-green)]"
                }`}
                aria-label={item.completed ? "标记为未完成" : "标记为已完成"}
              >
                <Check className="h-4 w-4" />
              </button>

              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-medium text-[var(--brand-mid-gray)]">
                    <Clock className="h-3 w-3" /> 时间
                  </label>
                  <Input
                    value={item.time}
                    onChange={(e) => updateItem(item.id, "time", e.target.value)}
                    placeholder="19:00-19:40"
                    className="h-8 border-[var(--brand-light-gray)] bg-transparent text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-medium text-[var(--brand-mid-gray)]">
                    <BookOpen className="h-3 w-3" /> 科目
                  </label>
                  <Input
                    value={item.subject}
                    onChange={(e) =>
                      updateItem(item.id, "subject", e.target.value)
                    }
                    placeholder="数学"
                    className="h-8 border-[var(--brand-light-gray)] bg-transparent text-sm"
                  />
                </div>
                <div className="space-y-1 lg:col-span-2">
                  <label className="flex items-center gap-1 text-xs font-medium text-[var(--brand-mid-gray)]">
                    <Brain className="h-3 w-3" /> 学习方法
                  </label>
                  <Input
                    value={item.method}
                    onChange={(e) =>
                      updateItem(item.id, "method", e.target.value)
                    }
                    placeholder="番茄工作法"
                    className="h-8 border-[var(--brand-light-gray)] bg-transparent text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-medium text-[var(--brand-mid-gray)]">
                    <Coffee className="h-3 w-3" /> 目标
                  </label>
                  <Input
                    value={item.goal}
                    onChange={(e) => updateItem(item.id, "goal", e.target.value)}
                    placeholder="掌握三角函数"
                    className="h-8 border-[var(--brand-light-gray)] bg-transparent text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-medium text-[var(--brand-mid-gray)]">
                    <Coffee className="h-3 w-3" /> 休息安排
                  </label>
                  <Input
                    value={item.break}
                    onChange={(e) => updateItem(item.id, "break", e.target.value)}
                    placeholder="休息5分钟"
                    className="h-8 border-[var(--brand-light-gray)] bg-transparent text-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-md p-2 text-[var(--brand-mid-gray)] opacity-0 transition-opacity hover:bg-[var(--brand-light-gray)] hover:text-destructive focus:opacity-100 group-hover:opacity-100"
                aria-label="删除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--brand-light-gray)] px-6 py-4">
          <Badge
            variant="outline"
            className="border-[var(--brand-light-gray)] text-[var(--brand-dark)]/70"
          >
            建议每项 30-50 分钟
          </Badge>
          <Button
            onClick={addItem}
            variant="outline"
            size="sm"
            className="gap-1 rounded-full border-[var(--brand-dark)] text-[var(--brand-dark)] hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)]"
          >
            <Plus className="h-4 w-4" />
            添加任务
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
