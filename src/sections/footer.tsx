import { Sparkles, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--brand-light-gray)] bg-[var(--brand-light)] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 lg:flex-row lg:px-8">
        <div className="flex items-center gap-2 text-[var(--brand-dark)] font-heading">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-orange)] text-[var(--brand-light)]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-semibold">学伴小智</span>
        </div>

        <p className="text-center text-sm text-[var(--brand-mid-gray)]">
          为高中生探索新时代学习方法而构建 · 演示项目
        </p>

        <a
          href="https://github.com/yyh-0428/high-school-learning-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-[var(--brand-dark)]/80 transition-colors hover:text-[var(--brand-orange)]"
        >
          <Code className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
