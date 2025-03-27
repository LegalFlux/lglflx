import * as React from "react"

// Removed unused import: import { cn } from "@/lib/utils"

export interface ToastProps {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export interface ToastActionElement {
  altText: string
  action: React.ReactNode
}

export type Toast = ToastProps & {
  id: string
}

export const useToast = () => {
  const toast = (props: ToastProps) => {
    // Implementação simplificada para permitir a compilação
    console.log('Toast:', props)
  }

  return {
    toast,
    dismiss: () => {}, // Removed unused parameter 'toastId'
    toasts: [] as Toast[]
  }
}
