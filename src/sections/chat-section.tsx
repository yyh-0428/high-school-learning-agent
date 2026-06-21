"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { ChatInterface } from "@/components/chat-interface";
import { MessageCircle, Lightbulb, Calendar, Heart } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "随时答疑",
    description: "学习方法、知识点、心态调整，有问必答。",
  },
  {
    icon: Lightbulb,
    title: "方法推荐",
    description: "根据科目和痛点，推荐最适合的学习策略。",
  },
  {
    icon: Calendar,
    title: "计划拆解",
    description: "把大目标拆成每天可执行的小步骤。",
  },
  {
    icon: Heart,
    title: "情绪支持",
    description: "考试焦虑、动力低谷时，陪你一起度过。",
  },
];

export function ChatSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: ".chat-reveal" });

  return (
    <section
      id="chat"
      ref={ref}
      className="relative overflow-hidden bg-[var(--brand-dark)] py-24 text-[var(--brand-light)] sm:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-[var(--brand-blue)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="chat-reveal lg:col-span-2">
            <SectionHeader
              align="left"
              eyebrow="AI 对话"
              title="不会的时候，先问问小智"
              description="小智不是标准答案库，而是陪你思考的伙伴。它会倾听你的困惑，引导你找到适合自己的方法。"
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="chat-reveal flex items-start gap-4 rounded-2xl border border-[var(--brand-light)]/10 bg-[var(--brand-light)]/5 p-4 transition-colors hover:bg-[var(--brand-light)]/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-orange)] text-[var(--brand-light)]">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-heading">{feature.title}</h3>
                    <p className="mt-1 text-sm text-[var(--brand-light)]/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-reveal lg:col-span-3">
            <ChatInterface />
          </div>
        </div>
      </div>
    </section>
  );
}
