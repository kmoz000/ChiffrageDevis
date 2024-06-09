import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "kmoz-fixed kmoz-inset-0 kmoz-z-50 kmoz-bg-black/80 kmoz- data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-animate-out data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "kmoz-fixed kmoz-left-[50%] kmoz-top-[50%] kmoz-z-50 kmoz-grid kmoz-w-full kmoz-max-w-lg kmoz-translate-x-[-50%] kmoz-translate-y-[-50%] kmoz-gap-4 kmoz-border kmoz-bg-background kmoz-p-6 kmoz-shadow-lg kmoz-duration-200 data-[state=open]:kmoz-animate-in data-[state=closed]:kmoz-animate-out data-[state=closed]:kmoz-fade-out-0 data-[state=open]:kmoz-fade-in-0 data-[state=closed]:kmoz-zoom-out-95 data-[state=open]:kmoz-zoom-in-95 data-[state=closed]:kmoz-slide-out-to-left-1/2 data-[state=closed]:kmoz-slide-out-to-top-[48%] data-[state=open]:kmoz-slide-in-from-left-1/2 data-[state=open]:kmoz-slide-in-from-top-[48%] sm:kmoz-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="kmoz-absolute kmoz-right-4 kmoz-top-4 kmoz-rounded-sm kmoz-opacity-70 kmoz-ring-offset-background kmoz-transition-opacity hover:kmoz-opacity-100 focus:kmoz-outline-none focus:kmoz-ring-2 focus:kmoz-ring-ring focus:kmoz-ring-offset-2 disabled:kmoz-pointer-events-none data-[state=open]:kmoz-bg-accent data-[state=open]:kmoz-text-muted-foreground">
        <Cross2Icon className="kmoz-h-4 kmoz-w-4" />
        <span className="kmoz-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "kmoz-flex kmoz-flex-col kmoz-space-y-1.5 kmoz-text-center sm:kmoz-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "kmoz-flex kmoz-flex-col-reverse sm:kmoz-flex-row sm:kmoz-justify-end sm:kmoz-space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "kmoz-text-lg kmoz-font-semibold kmoz-leading-none kmoz-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("kmoz-text-sm kmoz-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
