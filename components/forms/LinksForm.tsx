"use client";
import { mediaOptions } from "@/constants";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { AccountLinksValidation } from "@/lib/validations/account";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

interface SocialLink {
	label: string;
	value: any;
	icon: any;
	placeholder: string;
}

const LinksForm = ({ account }: any) => {
	const currentAccount = JSON.parse(account);

	const [mediaLinks, setMediaLinks] = useState<SocialLink[]>([]);

	let Options = mediaOptions.filter(
		(link) => !mediaLinks.find((v1) => link.value === v1.value)
	);

	const handleAddingLinks = (val: any) => {
		setMediaLinks((prev) => [...prev, val]);
	};

	const handleRemoveOptions = (val: any) => {
		setMediaLinks(mediaLinks.filter((vl) => vl.value !== val));
	};

	const form = useForm<z.infer<typeof AccountLinksValidation>>({
		resolver: zodResolver(AccountLinksValidation),
		defaultValues: {
			email: currentAccount?.links?.email || "",
			phone: currentAccount?.links?.phone || "",
			instagram: currentAccount?.links?.instagram || "",
			telegram: currentAccount?.links || "",
			github: currentAccount?.links || "",
			whatsapp: currentAccount?.links || "",
			ticktock: currentAccount?.links || "",
			youtube: currentAccount?.links || "",
		},
	});

	async function onSubmit(data: z.infer<typeof AccountLinksValidation>) {}
	return (
		<div className="bg-white rounded-xl overflow-hidden w-full lg:w-[1000px] relative">
			<div className="p-5 flex flex-col gap-2">
				<div className="flex flex-wrap gap-2">
					{Options.map((vals) => {
						return (
							<button
								className="flex flex-row gap-1 items-center p-2 bg-gray-100 rounded-md hover:bg-slate-200"
								onClick={() => handleAddingLinks(vals)}>
								<div className="">{vals.icon}</div>
								<p>{vals.label.slice(0, 1).toUpperCase() + vals.label.slice(1)}</p>
								<div className="">
									<Plus className="w-5 h-5 stroke-black" />
								</div>
							</button>
						);
					})}
				</div>
				{/* //TODO: add form for those inputs and add validation to each of them */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="!w-100 flex flex-col gap-3 mx-8 mt-5">
						{mediaLinks.map((vl: SocialLink, index) => {
							return (
								<div className="!w-100 flex flex-row gap-3 items-center" key={index}>
									<div className="">{vl.icon}</div>
									<FormField
										control={form.control}
										name={vl.value}
										render={({ field }) => {
											return (
												<FormItem className="!w-full">
													<FormControl >
														<Input
															className="!w-full text-start p-4 "
															placeholder={vl.placeholder}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											);
										}}
									/>

									<button
										className="bg-red-500 rounded-full p-1"
										onClick={() => handleRemoveOptions(vl.value)}>
										<X className="w-3 h-3 stroke-white" />
									</button>
								</div>
							);
						})}
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LinksForm;
