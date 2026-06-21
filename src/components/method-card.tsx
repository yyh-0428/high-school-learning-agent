"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { iconNodes } from "@/components/icons";
import { type LearningMethod } from "@/lib/types";

interface MethodCardProps {
  method: LearningMethod;
  index: number;
}

const difficultyMap = {
  beginner: { label: "入门", color: "bg-[var(--brand-green)]/10 text-[var(--brand-green)]" },
  intermediate: { label: "进阶", color: "bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]" },
  advanced: { label: "挑战", color: "bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]" },
};

export function MethodCard({ method, index }: MethodCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 20px 40px -12px rgba(20, 20, 19, 0.12)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 0 0 0 rgba(20, 20, 19, 0)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Card
      ref={cardRef}
      className="group relative overflow-hidden border-[var(--brand-light-gray)] bg-[var(--card)] transition-colors hover:border-[var(--brand-orange)]/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-orange)] via-[var(--brand-blue)] to-[var(--brand-green)] opacity-0 transition-opacity group-hover:opacity-100" />
      <CardHeader className="pb-3">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-dark)] text-[var(--brand-light)]">
          {iconNodes[method.icon] ?? iconNodes.Sparkles}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[var(--brand-dark)] font-heading">
              {method.title.zh}
            </h3>
            <p className="text-sm font-medium text-[var(--brand-mid-gray)]">
              {method.title.en}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`text-xs ${difficultyMap[method.difficulty].color}`}
          >
            {difficultyMap[method.difficulty].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm font-medium leading-relaxed text-[var(--brand-orange)]">
          {method.hook}
        </p>
        <p className="text-sm leading-relaxed text-[var(--brand-dark)]/70">
          {method.description}
        </p>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-semibold text-[var(--brand-dark)] underline-offset-4 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "收起步骤" : "查看步骤"}
        </button>

        {expanded && (
          <ol className="space-y-2 border-t border-[var(--brand-light-gray)] pt-4">
            {method.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-[var(--brand-dark)]/80"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-light-gray)] text-xs font-bold text-[var(--brand-dark)]">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-medium text-[var(--brand-mid-gray)]">
            推荐科目:
          </span>
          {method.recommendedSubjects.slice(0, 4).map((subject) => (
            <Badge
              key={subject}
              variant="outline"
              className="border-[var(--brand-light-gray)] text-xs text-[var(--brand-dark)]/70"
            >
              {subject}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="border-[var(--brand-light-gray)] text-xs text-[var(--brand-dark)]/70"
          >
            {method.timePerSession}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
