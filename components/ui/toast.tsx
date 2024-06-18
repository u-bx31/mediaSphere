"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;
//TODO: work on position
const toastPs = cva(
	"fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 ",
	{
		variants: {
			position: {
				topCenter: "top-[calc(var(--navBar-height)+20px)] items-center ",
				topLeft: "top-[calc(var(--navBar-height)+20px)] items-start ",
				topRight: "top-[calc(var(--navBar-height)+20px)] items-end ",
				bottomCenter:
					"top-[calc(var(--navBar-height)+20px)] sm:bottom-0 items-center",
				bottomLeft: "top-[calc(var(--navBar-height)+20px)] sm:bottom-0 items-start",
				bottomRight: "top-[calc(var(--navBar-height)+20px)] sm:bottom-0 items-end",
			},
		},
		defaultVariants: {
			position: "bottomRight",
		},
	}
);

const ToastViewport = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> &
		VariantProps<typeof toastPs>
>(({ className, position, ...props }, ref) => (
	<ToastPrimitives.Viewport
		ref={ref}
		className={cn(toastPs({ position }), className)}
		{...props}
	/>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
	"w-full md:max-w-[420px] group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ",
	{
		variants: {
			variant: {
				default: "border bg-background text-foreground",
				destructive:
					"destructive group border-destructive bg-destructive text-destructive-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);
//TODO: work on animation of each position
const toastAnimation = cva(
	"data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 ",
	{
		variants: {
			position: {
				topCenter:
					"data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
				topRight:
					"data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
				topLeft:
					"data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-left-full",
				bottomCenter:
					"data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
				bottomRight:
					"data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
				bottomLeft:
					"data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-left-full",
			},
		},
		defaultVariants: {
			position: "bottomRight",
		},
	}
);

const Toast = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
		VariantProps<typeof toastVariants> &
		VariantProps<typeof toastPs> &
		VariantProps<typeof toastAnimation>
>(({ className, variant, position, ...props }, ref) => {
	return (
		<ToastPrimitives.Root
			ref={ref}
			className={cn(
				toastVariants({ variant }),
				toastAnimation({ position }),
				className
			)}
			{...props}
		/>
	);
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Action>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Action
		ref={ref}
		className={cn(
			"inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
			className
		)}
		{...props}
	/>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Close>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Close
		ref={ref}
		className={cn(
			"absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
			className
		)}
		toast-close=""
		{...props}>
		<X className="h-4 w-4" />
	</ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Title>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Title
		ref={ref}
		className={cn("text-sm font-semibold", className)}
		{...props}
	/>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Description>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Description
		ref={ref}
		className={cn("text-sm opacity-90", className)}
		{...props}
	/>
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
	type ToastProps,
	type ToastActionElement,
	ToastProvider,
	ToastViewport,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastAction,
};
