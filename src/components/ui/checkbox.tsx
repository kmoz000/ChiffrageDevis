import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "kmoz-peer kmoz-h-4 kmoz-w-4 kmoz-shrink-0 kmoz-rounded-sm kmoz-border kmoz-border-primary kmoz-shadow focus-visible:kmoz-outline-none focus-visible:kmoz-ring-1 focus-visible:kmoz-ring-ring disabled:kmoz-cursor-not-allowed disabled:kmoz-opacity-50 data-[state=checked]:kmoz-bg-primary data-[state=checked]:kmoz-text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("kmoz-flex kmoz-items-center kmoz-justify-center kmoz-text-current")}
    >
      <CheckIcon className="kmoz-h-4 kmoz-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
