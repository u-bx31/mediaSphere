"use client";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { GripHorizontalIcon, PlusCircleIcon, PlusIcon, X } from "lucide-react";
import {
	UseFieldArrayReplace,
	UseFormReturn,
	useFieldArray,
} from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SocialLink } from "@/constants/types";
import { Dispatch, SetStateAction, useState } from "react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";
import { Button } from "../ui/button";

const CustomLinksComponents = ({ form }: { form: any }) => {
	const [icon, setIcon] = useState<{ file: File[]; url: string }>({
		file: [],
		url: "",
	});
	const { move, fields, remove, replace, append } = useFieldArray({
		control: form.control,
		name: "custom",
	});
	const [links, setLinks] = useState(fields);
	const linksEmpty = fields.length > 1;

	const AddNewCustomLink = () => {
		append({
			icon: "",
			title: "",
			url: "http://localhost:3000/account/links",
			description: "",
		});
	};
	return (
		<>
			<ReactSortable
				list={links}
				setList={setLinks}
				animation={200}
				delayOnTouchOnly
				delay={2}
				onEnd={(cl) => {
					move(cl.oldIndex as number, cl.newIndex as number);
				}}
				handle=".handle"
				ghostClass="opacity-5"
				className="!w-100 flex flex-col gap-3 mx-8  ">
				{fields?.map((vl: any, index: number) => {
					return (
						<div
							className="!w-100 !h-full flex flex-row gap-4 items-center"
							key={vl?.id}>
							{linksEmpty && (
								<GripHorizontalIcon className="w-5 h-5 stroke-gray-400 handle cursor-pointer" />
							)}
							<div className="">
								<FormField
									control={form.control}
									name={`custom.${index}.icon`}
									render={({ field }) => {
										return (
											<FormItem className="flex items-center justify-center">
												<FormLabel className="bg-gray-200 h-16 w-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md relative group cursor-pointer">
													{/* TODO: lazy load the image */}
													<Image
														src={field.value ? field.value : "/assets/svgs/profile.svg"}
														alt="avatar"
														width={1980}
														height={900}
														priority={field.value != ""}
														className={`${
															field?.value ? "rounded-full !w-full !h-full" : "!w-9 !h-9"
														} object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
													/>
													<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full hidden group-hover:block group-hover:bg-gray-400 group-hover:bg-opacity-[60%] ">
														<PlusCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-gray-900 stroke-2  " />
													</div>
												</FormLabel>
												<ImageUpload
													setFiles={(value: any) =>
														setIcon((prev) => ({ ...prev, file: value }))
													}
													form={form}
													action={field.onChange}
												/>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="flex flex-col !w-full gap-1">
								<FormField
									control={form.control}
									name={`custom.${index}.title`}
									render={({ field }) => {
										return (
											<FormItem className="!w-full">
												<FormLabel className="font-semibold">Title</FormLabel>
												<FormControl>
													<Input
														className="!w-full text-start p-4 "
														placeholder="Title"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
								<FormField
									control={form.control}
									name={`custom.${index}.url`}
									render={({ field }) => {
										return (
											<FormItem className="!w-full">
												<FormLabel className="font-semibold">Your Link</FormLabel>
												<FormControl>
													<Input
														className="!w-full text-start p-4 "
														placeholder="https://example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
								<FormField
									control={form.control}
									name={`custom.${index}.description`}
									render={({ field }) => {
										return (
											<FormItem className="!w-full">
												<FormLabel className="font-semibold">Description</FormLabel>
												<FormControl>
													<Input
														className="!w-full text-start p-4 "
														placeholder="Description"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>

							<button
								type="button"
								className="group bg-white hover:bg-red-500/80 border border-red-500 hover:border-red-500/60 !h-100 rounded-full p-1 transition-all "
								onClick={() => remove(index)}>
								<X className="w-3 h-3 stroke-red-500 group-hover:stroke-white stroke-[3]" />
							</button>
						</div>
					);
				})}
			</ReactSortable>
			<Button
				type="button"
				variant="outline"
				className="!w-fit mx-auto rounded-full px-6 mt-4 gap-1"
				onClick={() => AddNewCustomLink()}>
				<p className="font-semibold text-base text-primary/80">add link</p>
				<PlusIcon className="w-5 h-5 stroke-primary/80 stroke-2" />
			</Button>
		</>
	);
};

export default CustomLinksComponents;
