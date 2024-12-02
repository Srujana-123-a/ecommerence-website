"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'

export function Toaster() {
  const { toasts } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        const [, ...rest] = toasts;
        useToast().dismiss(toasts[0].id);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

