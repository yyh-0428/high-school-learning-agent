import * as React from "react"

import { cn } from "@/lib/utils"

export interface LiquidGlassInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  placeholder?: string
  disabled?: boolean
  children?: React.ReactNode
  className?: string
}

function LiquidGlassInput({
  value,
  onChange,
  onSend,
  placeholder = "发消息",
  disabled = false,
  children,
  className,
}: LiquidGlassInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [leftSlot, rightSlot] = React.Children.toArray(children)

  React.useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSend()
      }
    }
  }

  return (
    <div className={cn("relative z-10 w-full px-3 pb-4 pt-2 sm:px-4", className)}>
      <div
        className={cn(
          "liquid-glass liquid-glass-shimmer",
          "mx-auto w-full max-w-2xl rounded-[1.75rem] p-1.5 sm:p-2",
          "transition-all duration-200",
          "focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]"
        )}
      >
        <div className="relative z-[2] flex items-end gap-1.5 sm:gap-2">
          {leftSlot ? (
            <div className="flex shrink-0 items-center pb-1.5 pl-1">
              {leftSlot}
            </div>
          ) : null}

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            aria-label={placeholder}
            className={cn(
              "flex-1 min-h-[2.5rem] max-h-32 resize-none bg-transparent py-2.5 px-1",
              "text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70",
              "outline-none focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />

          {rightSlot ? (
            <div className="flex shrink-0 items-center pb-1.5 pr-1">
              {rightSlot}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { LiquidGlassInput }
