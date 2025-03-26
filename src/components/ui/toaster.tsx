import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const toast = React.useCallback(
    (props: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      context.addToast({ id, ...props })
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        context.removeToast(id)
      }, 5000)
    },
    [context]
  )

  return { toast }
}

export function Toaster() {
  const { toasts, removeToast } = React.useContext(ToastContext)

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:bottom-8 md:right-8">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex w-full max-w-md items-center justify-between space-x-4 rounded-md border p-4 shadow-md",
            toast.variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border bg-background text-foreground"
          )}
        >
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm">{toast.description}</div>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="rounded-full p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export { ToastContext }
