"use client";

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, icon, description, action, ...props }) {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							<div className="flex flex-row gap-2 ">
								{icon && (
									<CheckCircle className="w-6 h-6 stroke-green-400  rounded-full" />
								)}
								{title && <ToastTitle>{title}</ToastTitle>}
							</div>
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport position={toasts[0]?.position} />
		</ToastProvider>
	);
}
