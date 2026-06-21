"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SectionHeader } from "@/components/section-header";
import { MethodCard } from "@/components/method-card";
import { learningMethods } from "@/lib/data";

export function MethodExplorer() {
  const ref = useScrollReveal<HTMLElement>({ selector: ".method-card" });

  return (
    <section
      id="methods"
      ref={ref}
      className="bg-[var(--brand-light)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="学习方法库"
          title="8 种科学方法，找到适合你的那一款"
          description="每一门学科都有更聪明的打开方式。这些方法经过认知科学验证，帮你用更少时间获得更扎实的理解。"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningMethods.map((method, index) => (
            <div key={method.id} className="method-card">
              <MethodCard method={method} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
