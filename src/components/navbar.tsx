"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Compass,
  Calendar,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "学习方法", href: "#methods", icon: Compass },
  { label: "AI 对话", href: "#chat", icon: MessageCircle },
  { label: "计划", href: "#plan", icon: Calendar },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[var(--brand-light)]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2 text-[var(--brand-dark)] font-heading"
          aria-label="学伴小智首页"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-orange)] text-[var(--brand-light)]">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">学伴小智</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[var(--brand-dark)]/80 transition-colors hover:bg-[var(--brand-light-gray)] hover:text-[var(--brand-dark)]"
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#chat" className="hidden md:inline-flex">
            <Button
              size="sm"
              className="rounded-full bg-[var(--brand-dark)] px-5 text-[var(--brand-light)] hover:bg-[var(--brand-dark)]/90"
            >
              开始学习
            </Button>
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-[var(--brand-light-gray)] px-6 py-4 md:hidden"
          aria-label="移动端导航"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--brand-dark)]/80 transition-colors hover:bg-[var(--brand-light-gray)] hover:text-[var(--brand-dark)]"
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </a>
            ))}
            <a
              href="#chat"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--brand-dark)] px-5 py-2 text-sm font-medium text-[var(--brand-light)] hover:bg-[var(--brand-dark)]/90"
            >
              开始学习
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
