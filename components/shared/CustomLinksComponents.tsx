"use client";
import { ReactSortable } from "react-sortablejs";
import {
	GripHorizontalIcon,
	Loader2Icon,
	PlusCircleIcon,
	PlusIcon,
	X,
} from "lucide-react";
import {
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
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUploadThing } from "@/lib/uploadthing";

const CustomLinksComponents = ({
	form,
	uploading,
	setUploading,
}: {
	form: any;
	uploading: any;
	setUploading: any;
}) => {
	const { move, fields, remove, append } = useFieldArray({
		control: form.control,
		name: "custom",
	});

	const [fadeAnimation, setFadeAnimation] = useState<{
		enter: Number | null;
		exit: Number | null;
	}>({
		enter: null,
		exit: null,
	});

	const [links, setLinks] = useState(fields);
	const linksEmpty = fields.length > 1;

	const AddNewCustomLink = () => {
		setFadeAnimation((prev) => ({ ...prev, enter: fields.length }));
		append({
			icon: "",
			title: "",
			url: "http://localhost:3000/account/links",
			description: "",
		});
	};

	const handleRemove = (index: number) => {
		setFadeAnimation((prev) => ({ ...prev, exit: index }));
		setTimeout(() => {
			remove(index);
			setFadeAnimation((prev) => ({ ...prev, exit: null }));
		}, 300);
	};

	const { startUpload } = useUploadThing("imageUploader", {
		onUploadError: (error: Error) => {
			alert("error" + error);
		},
	});
	const handleUpload = async (file: File[], index: number) => {
		try {
			const iconRes = await startUpload(file);
			if (iconRes && iconRes[0].url) {
				form.control._formValues.custom[index].icon = iconRes[0].url.toString();
				setUploading((prevLoading: any) => ({
					...prevLoading,
					[index]: false,
				}));
			}
		} catch (error) {
			console.error("Upload failed:", error);
			return null;
		}
	};
	return (
		<>
			<ReactSortable
				list={links}
				setList={setLinks}
				animation={200}
				delayOnTouchOnly
				delay={1000}
				onEnd={(cl) => {
					move(cl.oldIndex as number, cl.newIndex as number);
				}}
				handle=".handle"
				ghostClass="opacity-5"
				className="!w-100 flex flex-col gap-5 mx-8 ">
				{fields?.map((vl: any, index: number) => {
					return (
						<div
							//TODO:work on adding and removing animation
							className={`!w-100 !h-full flex flex-row gap-4 items-center ${
								fadeAnimation.exit === index && "fade-exit"
							} ${fadeAnimation.enter === index && "fade-enter"} `}
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
													<div
														className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full hidden group-hover:block group-hover:bg-gray-400 group-hover:bg-opacity-[60%] ${
															uploading[index] && "cursor-not-allowed bg-opacity-[40%] "
														} `}>
														<PlusCircleIcon
															className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-gray-900 stroke-2 ${
																uploading[index] && "bg-opacity-[70%] "
															} `}
														/>
													</div>
													{uploading[index] && (
														<div className="absolute bottom-0 right-0  w-7 h-7 rounded-full bg-white shadow-md">
															<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
																<Loader2Icon className="stroke-gray-900 stroke-[2px] animate-spin " />
															</div>
														</div>
													)}
												</FormLabel>
												<ImageUpload
													setFiles={async (value: File[]) => {
														setUploading((prevLoading: Object) => ({
															...prevLoading,
															[index]: true,
														}));

														const fileUrl = await handleUpload(value, index);

														if (!fileUrl) {
															console.error("Failed to upload file");
															return;
														}
													}}
													form={form}
													action={field.onChange}
													disabled={uploading[index]}
												/>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="flex flex-col !w-full gap-2">
								<FormField
									control={form.control}
									name={`custom.${index}.title`}
									render={({ field }) => {
										return (
											<FormItem className="!w-full">
												<FormLabel className="font-semibold">Title</FormLabel>
												<FormControl>
													<Input
														className="!w-full text-start p-4 !mt-1"
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
														className="!w-full text-start p-4 !mt-1"
														placeholder="https://example.com"
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
								onClick={() => handleRemove(index)}>
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
