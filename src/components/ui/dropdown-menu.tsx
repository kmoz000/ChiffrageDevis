import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-outline-none focus:kmoz-bg-accent data-[state=open]:kmoz-bg-accent",
      inset && "kmoz-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="kmoz-ml-auto kmoz-h-4 kmoz-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "kmoz-z-50 kmoz-min-w-[8rem] kmoz-overflow-hidden kmoz-rounded-md kmoz-border kmoz-bg-popover kmoz-p-1 kmoz-text-popover-foreground kmoz-shadow-lg data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-animate-out data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0 data-[state=closed]:kmoz-zoom-out-95 data-[state=open]:kmoz-zoom-in-95 data-[side=bottom]:kmoz-slide-in-from-top-2 data-[side=left]:kmoz-slide-in-from-right-2 data-[side=right]:kmoz-slide-in-from-left-2 data-[side=top]:kmoz-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "kmoz-z-50 kmoz-min-w-[8rem] kmoz-overflow-hidden kmoz-rounded-md kmoz-border kmoz-bg-popover kmoz-p-1 kmoz-text-popover-foreground kmoz-shadow-md",
        "data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-animate-out data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0 data-[state=closed]:kmoz-zoom-out-95 data-[state=open]:kmoz-zoom-in-95 data-[side=bottom]:kmoz-slide-in-from-top-2 data-[side=left]:kmoz-slide-in-from-right-2 data-[side=right]:kmoz-slide-in-from-left-2 data-[side=top]:kmoz-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-outline-none kmoz-transition-colors focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      inset && "kmoz-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-py-1.5 kmoz-pl-8 kmoz-pr-2 kmoz-text-sm kmoz-outline-none kmoz-transition-colors focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="kmoz-absolute kmoz-left-2 kmoz-flex kmoz-h-3.5 kmoz-w-3.5 kmoz-items-center kmoz-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="kmoz-h-4 kmoz-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-py-1.5 kmoz-pl-8 kmoz-pr-2 kmoz-text-sm kmoz-outline-none kmoz-transition-colors focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      className
    )}
    {...props}
  >
    <span className="kmoz-absolute kmoz-left-2 kmoz-flex kmoz-h-3.5 kmoz-w-3.5 kmoz-items-center kmoz-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="kmoz-h-4 kmoz-w-4 kmoz-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-font-semibold",
      inset && "kmoz-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("kmoz--mx-1 kmoz-my-1 kmoz-h-px kmoz-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("kmoz-ml-auto kmoz-text-xs kmoz-tracking-widest kmoz-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
