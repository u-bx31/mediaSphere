"use client";
import { mediaOptions } from "@/constants";
import { GripHorizontalIcon, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AccountLinksValidation } from "@/lib/validations/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { ItemInterface, ReactSortable } from "react-sortablejs";
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
import { SocialLink } from "@/constants/types";
import SocialLinksComponents from "../shared/SocialLinksComponents";

const LinksForm = ({ account, user }: any) => {
	
	const currentAccount = JSON.parse(account);
	const path = usePathname();

	const accountLinks: (SocialLink | undefined)[] =
		currentAccount.links.social &&
		Object.keys(currentAccount.links.social)?.map((k) =>
			mediaOptions.find((b) => b.value === k)
		);

	const [mediaLinks, setMediaLinks] = useState<(SocialLink | ItemInterface |undefined)[]>(
		accountLinks || []
	);

	const val =
		mediaLinks.map((vl) => ({
			[vl?.value]: currentAccount.links.social[vl?.value],
		})) || [];

	const form = useForm<z.infer<typeof AccountLinksValidation>>({
		resolver: zodResolver(AccountLinksValidation),
		defaultValues: {
			arra1: val || [],
		},
	});

	let Options = mediaOptions.filter(
		(link) => !mediaLinks.find((v1) => link.value === v1?.value)
	);

	const handleAddingLinks = (val: any) => {
		setMediaLinks((prev) => [...prev, val]);
	};

	async function onSubmit(data: z.infer<typeof AccountLinksValidation>) {
		await updateLinksAccount({
			userId: user,
			data: data.arra1,
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

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<SocialLinksComponents
							form={form}
							links={mediaLinks}
							setLinks={setMediaLinks}
						/>
						<SubmitButton className={"!w-full !p-3 !mt-4"}>Save</SubmitButton>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LinksForm;
