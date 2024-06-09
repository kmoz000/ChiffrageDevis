import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-h-9 kmoz-w-full kmoz-items-center kmoz-justify-between kmoz-whitespace-nowrap kmoz-rounded-md kmoz-border kmoz-border-input kmoz-bg-transparent kmoz-px-3 kmoz-py-2 kmoz-text-sm kmoz-shadow-sm kmoz-ring-offset-background placeholder:kmoz-text-muted-foreground focus:kmoz-outline-none focus:kmoz-ring-1 focus:kmoz-ring-ring disabled:kmoz-cursor-not-allowed disabled:kmoz-opacity-50 [&>span]:kmoz-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="kmoz-h-4 kmoz-w-4 kmoz-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-cursor-default kmoz-items-center kmoz-justify-center kmoz-py-1",
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-cursor-default kmoz-items-center kmoz-justify-center kmoz-py-1",
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "kmoz-relative kmoz-z-50 kmoz-max-h-96 kmoz-min-w-[8rem] kmoz-overflow-hidden kmoz-rounded-md kmoz-border kmoz-bg-popover kmoz-text-popover-foreground kmoz-shadow-md data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-animate-out data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0 data-[state=closed]:kmoz-zoom-out-95 data-[state=open]:kmoz-zoom-in-95 data-[side=bottom]:kmoz-slide-in-from-top-2 data-[side=left]:kmoz-slide-in-from-right-2 data-[side=right]:kmoz-slide-in-from-left-2 data-[side=top]:kmoz-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:kmoz-translate-y-1 data-[side=left]:kmoz--translate-x-1 data-[side=right]:kmoz-translate-x-1 data-[side=top]:kmoz--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "kmoz-p-1",
          position === "popper" &&
            "kmoz-h-[var(--radix-select-trigger-height)] kmoz-w-full kmoz-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-w-full kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-py-1.5 kmoz-pl-2 kmoz-pr-8 kmoz-text-sm kmoz-outline-none focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      className
    )}
    {...props}
  >
    <span className="kmoz-absolute kmoz-right-2 kmoz-flex kmoz-h-3.5 kmoz-w-3.5 kmoz-items-center kmoz-justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="kmoz-h-4 kmoz-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("kmoz--mx-1 kmoz-my-1 kmoz-h-px kmoz-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
