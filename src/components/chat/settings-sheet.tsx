"use client"

import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import {
  X,
  ChevronRight,
  User,
  Database,
  Globe,
  Monitor,
  Type,
  RefreshCw,
  FileText,
  HelpCircle,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SettingsSheetProps {
  isOpen: boolean
  onClose: () => void
}

interface SettingsItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
}

interface SettingsGroup {
  title: string
  items: SettingsItem[]
}

const settingsGroups: SettingsGroup[] = [
  {
    title: "账户",
    items: [
      {
        label: "账号管理",
        icon: User,
        action: () => console.log("账号管理"),
      },
      {
        label: "数据管理",
        icon: Database,
        action: () => console.log("数据管理"),
      },
    ],
  },
  {
    title: "应用",
    items: [
      {
        label: "语言",
        icon: Globe,
        action: () => console.log("语言"),
      },
      {
        label: "外观",
        icon: Monitor,
        action: () => console.log("外观"),
      },
      {
        label: "字体大小",
        icon: Type,
        action: () => console.log("字体大小"),
      },
    ],
  },
  {
    title: "关于",
    items: [
      {
        label: "检查更新",
        icon: RefreshCw,
        action: () => console.log("检查更新"),
      },
      {
        label: "服务协议",
        icon: FileText,
        action: () => console.log("服务协议"),
      },
      {
        label: "帮助与反馈",
        icon: HelpCircle,
        action: () => console.log("帮助与反馈"),
      },
      {
        label: "退出登录",
        icon: LogOut,
        action: () => alert("退出登录"),
      },
    ],
  },
]

export function SettingsSheet({ isOpen, onClose }: SettingsSheetProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className="fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs"
        />
        <Dialog.Popup
          className={cn(
            "fixed z-50 flex flex-col bg-popover text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0",
            // Mobile: full-height sheet sliding in from the right
            "max-sm:inset-y-0 max-sm:right-0 max-sm:h-full max-sm:w-full max-sm:data-starting-style:translate-x-[2.5rem] max-sm:data-ending-style:translate-x-[2.5rem]",
            // Desktop: centered sheet dialog
            "sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[80vh] sm:w-80 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border sm:data-starting-style:scale-95 sm:data-ending-style:scale-95"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Dialog.Title className="font-heading text-lg">设置</Dialog.Title>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Dialog.Description className="sr-only">
              应用设置菜单
            </Dialog.Description>

            <ScrollArea className="flex-1">
              <div className="py-2">
                {settingsGroups.map((group, groupIndex) => (
                  <div key={group.title}>
                    {groupIndex > 0 && <Separator className="my-2" />}
                    <h3 className="px-4 py-2 text-xs font-medium text-muted-foreground">
                      {group.title}
                    </h3>
                    <div>
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            item.action()
                            onClose()
                          }}
                          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
