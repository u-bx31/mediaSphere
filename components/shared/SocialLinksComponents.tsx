"use client";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { GripHorizontalIcon, X } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SocialLink } from "@/constants/types";
import { Dispatch, SetStateAction } from "react";

const SocialLinksComponents = ({
	links,
	setLinks,
	form,
}: {
	links: (SocialLink | ItemInterface | undefined)[];
	setLinks: Dispatch<SetStateAction<(SocialLink | ItemInterface | undefined)[]>>;
	form: any;
}) => {
	const { move } = useFieldArray({
		control: form.control,
		name: "social",
	});

	const handleRemoveOptions = (val: string, index: number) => {
		setLinks(links.filter((vl) => vl?.value !== val));
		form.control._formValues.social?.splice(index, 1);
		((form.control._fields.social ?? []) as unknown as Array<any>).splice(index, 1);
	};

	return (
		<ReactSortable
			list={links as ItemInterface[]}
			setList={setLinks}
			animation={200}
			delayOnTouchOnly
			delay={2}
			onEnd={(cl) => {
				move(cl.oldIndex as number, cl.newIndex as number);
			}}
			handle=".handle"
			ghostClass="opacity-5"
			className="!w-100 flex flex-col gap-3 mx-8 mt-5 ">
			{links?.map((vl, index: number) => {
				return (
					<div className="!w-100 flex flex-row gap-3 items-center" key={vl?.value}>
						<GripHorizontalIcon className="w-5 h-5 stroke-gray-400 handle cursor-pointer" />
						<div className="">{vl?.icon}</div>
						<FormField
							control={form.control}
							name={`social.${index}.${vl?.value}`}
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
							className="group bg-white hover:bg-red-500/80 border border-red-500 hover:border-red-500/60 !h-100 rounded-full p-1 transition-all"
							onClick={() => handleRemoveOptions(vl?.value, index)}>
							<X className="w-3 h-3 stroke-red-500 group-hover:stroke-white stroke-[3]" />
						</button>
					</div>
				);
			})}
		</ReactSortable>
	);
};

export default SocialLinksComponents;
