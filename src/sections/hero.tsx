"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 24, opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-description", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-actions", { y: 24, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-visual", { scale: 0.92, opacity: 0, duration: 1 }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--brand-light)] grain"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[var(--brand-orange)]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-[var(--brand-blue)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--brand-light-gray)] bg-[var(--card)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-orange)] shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              高中生专属 AI 学习伙伴
            </span>

            <h1 className="hero-title mt-6 text-balance text-4xl font-bold tracking-tight text-[var(--brand-dark)] sm:text-5xl lg:text-6xl font-heading">
              换一种方式
              <br />
              <span className="text-[var(--brand-orange)]">爱上学习</span>
            </h1>

            <p className="hero-description mt-6 max-w-lg text-lg leading-relaxed text-[var(--brand-dark)]/70 sm:text-xl">
              学伴小智陪你探索间隔重复、主动回忆、费曼技巧等科学学习方法。
              从迷茫到清晰，从被动到主动，让每一次努力都更有方向。
            </p>

            <div className="hero-actions mt-10 flex flex-wrap gap-4">
              <a href="#chat">
                <Button
                  size="lg"
                  className="rounded-full bg-[var(--brand-dark)] px-8 text-[var(--brand-light)] hover:bg-[var(--brand-dark)]/90"
                >
                  和小智聊聊
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#methods">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-[var(--brand-dark)] px-8 text-[var(--brand-dark)] hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)]"
                >
                  探索学习方法
                </Button>
              </a>
            </div>

            <div className="hero-actions mt-10 flex items-center gap-6 text-sm text-[var(--brand-mid-gray)]">
              <div className="flex -space-x-2">
                {["bg-[var(--brand-orange)]", "bg-[var(--brand-blue)]", "bg-[var(--brand-green)]"].map(
                  (color, i) => (
                    <span
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--brand-light)] text-xs font-bold text-[var(--brand-light)] ${color}`}
                    >
                      {["数", "英", "物"][i]}
                    </span>
                  )
                )}
              </div>
              <p>覆盖高考核心科目 · 8 种科学方法</p>
            </div>
          </div>

          <div className="hero-visual relative">
            <div className="relative rounded-3xl border border-[var(--brand-light-gray)] bg-[var(--card)] p-8 shadow-2xl shadow-[var(--brand-dark)]/5">
              <div className="absolute -top-4 -left-4 rounded-2xl bg-[var(--brand-orange)] px-4 py-2 text-sm font-bold text-[var(--brand-light)] shadow-lg">
                今日推荐
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-dark)] text-[var(--brand-light)]">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[var(--brand-dark)] font-heading">
                      间隔重复法
                    </p>
                    <p className="text-sm text-[var(--brand-mid-gray)]">
                      在遗忘发生前精准复习
                    </p>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl bg-[var(--brand-light-gray)]/40 p-5">
                  <div className="h-2 w-3/4 rounded-full bg-[var(--brand-mid-gray)]/20" />
                  <div className="h-2 w-1/2 rounded-full bg-[var(--brand-mid-gray)]/20" />
                  <div className="h-2 w-5/6 rounded-full bg-[var(--brand-mid-gray)]/20" />
                </div>
                <div className="flex gap-3">
                  <span className="rounded-full bg-[var(--brand-green)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-green)]">
                    英语
                  </span>
                  <span className="rounded-full bg-[var(--brand-blue)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                    语文
                  </span>
                  <span className="rounded-full bg-[var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-orange)]">
                    20 分钟
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 hidden rounded-2xl border border-[var(--brand-light-gray)] bg-[var(--card)] p-5 shadow-xl lg:block">
              <p className="text-sm font-semibold text-[var(--brand-dark)]">本周专注</p>
              <p className="mt-1 text-3xl font-bold text-[var(--brand-orange)] font-heading">
                12.5h
              </p>
              <div className="mt-3 flex gap-1">
                {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm bg-[var(--brand-orange)]"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
