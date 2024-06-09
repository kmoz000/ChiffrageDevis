import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "kmoz-flex kmoz-h-9 kmoz-w-full kmoz-rounded-md kmoz-border kmoz-border-input kmoz-bg-transparent kmoz-px-3 kmoz-py-1 kmoz-text-sm kmoz-shadow-sm kmoz-transition-colors file:kmoz-border-0 file:kmoz-bg-transparent file:kmoz-text-sm file:kmoz-font-medium placeholder:kmoz-text-muted-foreground focus-visible:kmoz-outline-none focus-visible:kmoz-ring-1 focus-visible:kmoz-ring-ring disabled:kmoz-cursor-not-allowed disabled:kmoz-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
