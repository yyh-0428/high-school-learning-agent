import { Separator } from "@/components/ui/separator";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--brand-orange)] uppercase">
          <Separator className="w-6 bg-[var(--brand-orange)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-[var(--brand-dark)] sm:text-4xl font-heading">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--brand-dark)]/70">
          {description}
        </p>
      )}
    </div>
  );
}
