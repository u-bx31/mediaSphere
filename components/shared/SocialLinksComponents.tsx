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
	form: UseFormReturn<
		{
			arra1: {
				[x: string]: any;
			}[];
		},
		any,
		undefined
	>;
}) => {
	const { move } = useFieldArray({
		control: form.control,
		name: "arra1",
	});

	const handleRemoveOptions = (val: string, index: number) => {
		setLinks(links.filter((vl) => vl?.value !== val));
		form.control._formValues.arra1?.splice(index, 1);
		((form.control._fields.arra1 ?? []) as unknown as Array<any>).splice(index, 1);
		console.log(form);
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
							name={`arra1.${index}.${vl?.value}`}
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
							onClick={() => handleRemoveOptions(vl?.value, index)}>
							<X className="w-3 h-3 stroke-white" />
						</button>
					</div>
				);
			})}
		</ReactSortable>
	);
};

export default SocialLinksComponents;
