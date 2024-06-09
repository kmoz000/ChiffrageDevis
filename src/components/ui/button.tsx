import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "kmoz-inline-flex kmoz-items-center kmoz-justify-center kmoz-whitespace-nowrap kmoz-rounded-md kmoz-text-sm kmoz-font-medium kmoz-transition-colors focus-visible:kmoz-outline-none focus-visible:kmoz-ring-1 focus-visible:kmoz-ring-ring disabled:kmoz-pointer-events-none disabled:kmoz-opacity-50",
  {
    variants: {
      variant: {
        default:
          "kmoz-bg-primary kmoz-text-primary-foreground kmoz-shadow hover:kmoz-bg-primary/90",
        destructive:
          "kmoz-bg-destructive kmoz-text-destructive-foreground kmoz-shadow-sm hover:kmoz-bg-destructive/90",
        outline:
          "kmoz-border kmoz-border-input kmoz-bg-background kmoz-shadow-sm hover:kmoz-bg-accent hover:kmoz-text-accent-foreground",
        secondary:
          "kmoz-bg-secondary kmoz-text-secondary-foreground kmoz-shadow-sm hover:kmoz-bg-secondary/80",
        ghost: "hover:kmoz-bg-accent hover:kmoz-text-accent-foreground",
        link: "kmoz-text-primary kmoz-underline-offset-4 hover:kmoz-underline",
      },
      size: {
        default: "kmoz-h-9 kmoz-px-4 kmoz-py-2",
        sm: "kmoz-h-8 kmoz-rounded-md kmoz-px-3 kmoz-text-xs",
        lg: "kmoz-h-10 kmoz-rounded-md kmoz-px-8",
        icon: "kmoz-h-9 kmoz-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
