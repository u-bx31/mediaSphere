"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PencilRuler } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({
	options,
	className,
	buttonClassName,
}: {
	className?: string;
	buttonClassName?: string;
	options: { label: string; value: string; icon: any }[];
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	const currentOptions = options || [];
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-[200px] justify-between ${buttonClassName}`}>
					{value ? (
						options.find((option: any) => option.value === value)?.icon
					) : (
						<PencilRuler className="w-5 h-5 stroke-black" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className={`w-[200px] p-0 ${className}`}>
				<Command>
					<CommandGroup>
						{currentOptions &&
							currentOptions?.map((option: any) => {
								return (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);
										}}>
										<div className="flex flex-row gap-2">
											{option.icon}
											<span>{option.label}</span>
										</div>
									</CommandItem>
								);
							})}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
