"use client";
import { mediaOptions } from "@/constants";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AccountLinksValidation } from "@/lib/validations/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ItemInterface } from "react-sortablejs";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "../shared/SubmitButton";
import { updateLinksAccount } from "@/lib/actions/account.action";
import { usePathname } from "next/navigation";
import { SocialLink } from "@/constants/types";
import SocialLinksComponents from "../shared/SocialLinksComponents";
import CustomLinksComponents from "../shared/CustomLinksComponents";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const LinksForm = ({ account, user }: any) => {
	const currentAccount = JSON.parse(account);
	const path = usePathname();

	const accountLinks: (SocialLink | undefined)[] =
		currentAccount?.links?.social &&
		Object.keys(currentAccount?.links?.social)?.map((k) =>
			mediaOptions.find((b) => b.value === k)
		);

	const [mediaLinks, setMediaLinks] = useState<
		(SocialLink | ItemInterface | undefined)[]
	>(accountLinks || []);

	const [loading, setLoading] = useState(false);

	const [uploading, setUploading] = useState({});
	const { push } = useRouter();
	const val =
		mediaLinks.map((vl) => ({
			[vl?.value]: currentAccount?.links?.social[vl?.value],
		})) || [];

	const form = useForm<z.infer<typeof AccountLinksValidation>>({
		resolver: zodResolver(AccountLinksValidation),
		defaultValues: {
			social: val || [],
			custom: currentAccount?.links?.custom,
		},
	});

	let Options = mediaOptions.filter(
		(link) => !mediaLinks.find((v1) => link.value === v1?.value)
	);

	const [fadeAnimation, setFadeAnimation] = useState<{
		enter: Number | null;
		exit: Number | null;
	}>({
		enter: null,
		exit: null,
	});

	const handleAddingLinks = (val: any) => {
		setFadeAnimation((prev) => ({ ...prev, enter: mediaLinks.length }));
		setMediaLinks((prev) => [...prev, val]);
	};
	const anyLoading = Object.values(uploading).some((isLoading) => isLoading);

	async function onSubmit(data: z.infer<typeof AccountLinksValidation>) {
		setLoading(true)
		await updateLinksAccount({
			userId: user,
			data: data,
			path: path,
		}).then(() => {
			toast({
				title: "Successfully saved new changes",
				variant: "default",
				icon: true,
			});
			setLoading(false)
			push("/account");
		});
	}
	return (
		<div className="bg-white rounded-xl overflow-hidden w-full lg:w-[1000px] relative">
			<div className="p-5 flex flex-col gap-2">
				<h1 className="text-lg font-bold ">Social Media links</h1>
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
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 ">
						<SocialLinksComponents
							fadeAnimation={fadeAnimation}
							setFadeAnimation={setFadeAnimation}
							form={form}
							links={mediaLinks}
							setLinks={setMediaLinks}
						/>
						<h1 className="text-lg font-bold mt-5">Custom Links</h1>
						<CustomLinksComponents
							form={form}
							uploading={uploading}
							setUploading={setUploading}
						/>
						<SubmitButton className={`!w-full !p-3 !mt-4 `} disable={anyLoading} loading={loading}>
							Save
						</SubmitButton>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LinksForm;
