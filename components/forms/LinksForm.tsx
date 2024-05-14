"use client";
import { mediaOptions } from "@/constants";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AccountLinksValidation } from "@/lib/validations/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import SubmitButton from "../shared/SubmitButton";
import { updateLinksAccount } from "@/lib/actions/account.action";
import { usePathname } from "next/navigation";

interface SocialLink {
	label: string;
	value: any;
	icon: JSX.Element;
	placeholder?: string;
}

const LinksForm = ({ account, user }: any) => {
	const currentAccount = JSON.parse(account);
	const path = usePathname();
	const accountLinks: (SocialLink | undefined)[] = Object.keys(
		currentAccount.links.social
	).map((k) => mediaOptions.find((b) => b.value === k));
	const [mediaLinks, setMediaLinks] =
		useState<(SocialLink | undefined)[]>(accountLinks);

	const form = useForm<z.infer<typeof AccountLinksValidation>>({
		resolver: zodResolver(AccountLinksValidation),
		defaultValues: {
			email: currentAccount?.links?.social?.email,
			mobile: currentAccount?.links?.social?.mobile,
			instagram: currentAccount?.links?.social?.instagram,
			telegram: currentAccount?.links?.social?.telegram,
			github: currentAccount?.links?.social?.github,
			whatsapp: currentAccount?.links?.social?.whatsapp,
			youtube: currentAccount?.links?.social.youtube,
		},
	});

	let Options = mediaOptions.filter(
		(link) => !mediaLinks.find((v1) => link.value === v1?.value)
	);

	const handleAddingLinks = (val: any) => {
		setMediaLinks((prev) => [...prev, val]);
	};

	const handleRemoveOptions = (val: string) => {
		setMediaLinks(mediaLinks.filter((vl) => vl?.value !== val));
		form.control._formValues[val] = undefined;
		delete form.control._fields[val];
	};

	async function onSubmit(data: z.infer<typeof AccountLinksValidation>) {
		console.log("submit", data);
		await updateLinksAccount({
			userId: user,
			data: data,
			path: path,
		});
		alert("done");
	}
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
						{mediaLinks.map((vl: SocialLink | undefined) => {
							return (
								<div
									className="!w-100 flex flex-row gap-3 items-center"
									key={vl?.value}>
									<div className="">{vl?.icon}</div>
									<FormField
										control={form.control}
										name={vl?.value}
										render={({ field }) => {
											return (
												<FormItem className="!w-full">
													<FormControl>
														<Input
															className="!w-full text-start p-4 "
															placeholder={vl?.placeholder}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											);
										}}
									/>

									<button
										type="button"
										className="bg-red-500 rounded-full p-1"
										onClick={() => handleRemoveOptions(vl?.value)}>
										<X className="w-3 h-3 stroke-white" />
									</button>
								</div>
							);
						})}
						<SubmitButton className={"!w-full !p-3 !mt-4"}>Save</SubmitButton>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LinksForm;
