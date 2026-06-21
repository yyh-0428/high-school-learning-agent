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
  placeholder = "发消息或按住说话",
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
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSend()
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex justify-center p-3 sm:p-4 pointer-events-none",
        className
      )}
    >
      <div
        className={cn(
          "liquid-glass liquid-glass-shimmer",
          "pointer-events-auto w-full max-w-3xl rounded-[2.25rem] p-2 sm:p-3",
          "transition-shadow duration-200 focus-within:ring-2 focus-within:ring-ring/40"
        )}
      >
        <div className="relative flex items-end gap-2 sm:gap-3">
          {leftSlot ? (
            <div className="flex shrink-0 items-center pb-1.5" aria-hidden={false}>
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
              "flex-1 min-h-11 max-h-40 resize-none bg-transparent py-3 px-2",
              "text-base leading-relaxed text-foreground placeholder:text-muted-foreground",
              "outline-none focus:outline-none caret-ring",
              "disabled:cursor-not-allowed disabled:opacity-60",
              "selection:bg-ring/30"
            )}
          />

          {rightSlot ? (
            <div className="flex shrink-0 items-center pb-1.5" aria-hidden={false}>
              {rightSlot}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { LiquidGlassInput }
