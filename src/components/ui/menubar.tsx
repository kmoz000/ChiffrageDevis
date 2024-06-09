import * as React from "react"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-h-9 kmoz-items-center kmoz-space-x-1 kmoz-rounded-md kmoz-border kmoz-bg-background kmoz-p-1 kmoz-shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-px-3 kmoz-py-1 kmoz-text-sm kmoz-font-medium kmoz-outline-none focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[state=open]:kmoz-bg-accent data-[state=open]:kmoz-text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-outline-none focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[state=open]:kmoz-bg-accent data-[state=open]:kmoz-text-accent-foreground",
      inset && "kmoz-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="kmoz-ml-auto kmoz-h-4 kmoz-w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "kmoz-z-50 kmoz-min-w-[8rem] kmoz-overflow-hidden kmoz-rounded-md kmoz-border kmoz-bg-popover kmoz-p-1 kmoz-text-popover-foreground kmoz-shadow-lg data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-animate-out data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0 data-[state=closed]:kmoz-zoom-out-95 data-[state=open]:kmoz-zoom-in-95 data-[side=bottom]:kmoz-slide-in-from-top-2 data-[side=left]:kmoz-slide-in-from-right-2 data-[side=right]:kmoz-slide-in-from-left-2 data-[side=top]:kmoz-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "kmoz-z-50 kmoz-min-w-[12rem] kmoz-overflow-hidden kmoz-rounded-md kmoz-border kmoz-bg-popover kmoz-p-1 kmoz-text-popover-foreground kmoz-shadow-md data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0 data-[state=closed]:kmoz-zoom-out-95 data-[state=open]:kmoz-zoom-in-95 data-[side=bottom]:kmoz-slide-in-from-top-2 data-[side=left]:kmoz-slide-in-from-right-2 data-[side=right]:kmoz-slide-in-from-left-2 data-[side=top]:kmoz-slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-outline-none focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      inset && "kmoz-pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-py-1.5 kmoz-pl-8 kmoz-pr-2 kmoz-text-sm kmoz-outline-none focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="kmoz-absolute kmoz-left-2 kmoz-flex kmoz-h-3.5 kmoz-w-3.5 kmoz-items-center kmoz-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <CheckIcon className="kmoz-h-4 kmoz-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "kmoz-relative kmoz-flex kmoz-cursor-default kmoz-select-none kmoz-items-center kmoz-rounded-sm kmoz-py-1.5 kmoz-pl-8 kmoz-pr-2 kmoz-text-sm kmoz-outline-none focus:kmoz-bg-accent focus:kmoz-text-accent-foreground data-[disabled]:kmoz-pointer-events-none data-[disabled]:kmoz-opacity-50",
      className
    )}
    {...props}
  >
    <span className="kmoz-absolute kmoz-left-2 kmoz-flex kmoz-h-3.5 kmoz-w-3.5 kmoz-items-center kmoz-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <DotFilledIcon className="kmoz-h-4 kmoz-w-4 kmoz-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "kmoz-px-2 kmoz-py-1.5 kmoz-text-sm kmoz-font-semibold",
      inset && "kmoz-pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("kmoz--mx-1 kmoz-my-1 kmoz-h-px kmoz-bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "kmoz-ml-auto kmoz-text-xs kmoz-tracking-widest kmoz-text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
