"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { StudyPlan } from "@/components/study-plan";

export function StudyPlanSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: ".plan-reveal" });

  return (
    <section
      id="plan"
      ref={ref}
      className="bg-[var(--brand-light)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="学习计划"
          title="把目标拆成今天就能做的事"
          description="再好的方法也需要落地。用下面的计划表安排今晚的学习，完成一项勾一项，看见自己的进步。"
        />

        <div className="plan-reveal mt-16">
          <StudyPlan />
        </div>
      </div>
    </section>
  );
}
