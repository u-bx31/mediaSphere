"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import SubmitButton from "../shared/SubmitButton";
import { AccountValidation } from "@/lib/validations/account";
import { Textarea } from "@/components/ui/textarea";
import { UpdateUserAccount } from "@/lib/actions/account.action";
import { useEffect, useRef, useState } from "react";
import {
	ImageIcon,
	ImagePlus,
	Loader2Icon,
	PenLineIcon,
	PlusCircleIcon,
	SwatchBook,
} from "lucide-react";
import { ComboboxDemo } from "../ui/combobox";
import ColorPicker from "../shared/ColorPicker";
import ImageUpload from "../shared/ImageUpload";
import { toast } from "../ui/use-toast";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

const ProfileForm = ({ user, account }: any) => {
	const currentUser = JSON.parse(user);
	const currentAccount = JSON.parse(account);

	const [loading, setLoading] = useState(true);
	const [bgImage, setBgImage] = useState<File[]>([]);
	const [avatar, setAvatar] = useState<File[]>([]);
	const [darkColors, setDarkColors] = useState(false);

	const [backgroundType, setBackgroundType] = useState(
		currentAccount.background.type || ""
	);
	const [backgroundValue, setBackgroundValue] = useState(
		currentAccount.background.value || ""
	);
	const { startUpload } = useUploadThing('imageUploader');

	//FIXME: change loading to be server side
	useEffect(() => {
		if (currentAccount || currentUser) {
			setLoading(false);
		}
	}, [currentAccount, currentUser]);
	const options = [
		{
			value: "color",
			label: "Color",
			icon: <SwatchBook className="w-5 h-5 stroke-black" />,
		},
		{
			value: "image",
			label: "Image",
			icon: <ImageIcon className="w-5 h-5 stroke-black" />,
		},
	];

	const form = useForm<z.infer<typeof AccountValidation>>({
		resolver: zodResolver(AccountValidation),
		defaultValues: {
			userName: currentAccount?.userName || "",
			avatar: currentAccount?.image || currentUser?.image || "",
			displayName: currentAccount?.displayName || "",
			location: currentAccount?.location || "",
			bio: currentAccount?.bio || "",
		},
	});

	async function onSubmit(data: z.infer<typeof AccountValidation>) {
		const blob = data.avatar?.toString();

		const hasImageChanged = isBase64Image(blob || '');

		if (hasImageChanged) {
			const imgRes = await startUpload(avatar);
			console.log('imgres',imgRes);
			if (imgRes && imgRes[0].url) {
				data.avatar = imgRes[0].url;
			}
		}

		const res = await UpdateUserAccount({
			userId: currentUser?.id,
			userName: data.userName?.toString(),
			displayName: data.displayName?.toString(),
			bgType: backgroundType,
			avatar: data.avatar?.toString() || "",
			bgValue: backgroundValue,
			location: data.location?.toString(),
			bio: data.bio?.toString(),
		});
		if (res?.message) {
			form.control.setError("userName", {
				type: "manual",
				message: res?.message,
			});
		} else {
			toast({
				title: "Successfully saved new changes",
				variant: "default",
				icon: true,
			});
		}
	}
	return (
		<div className="bg-white rounded-xl overflow-hidden w-full lg:w-[1000px] relative">
			{loading && (
				<div className="bg-white/70 backdrop-blur-sm absolute h-full w-full flex flex-col gap-3 items-center justify-center z-10 transition-all ease-linear">
					<Loader2Icon className="w-8 h-8 animate-spin" />
					<h1>Loading your data . . .</h1>
				</div>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div
						style={{ backgroundColor: backgroundValue || "#f0f0f0" }}
						className="w-full h-40 md:h-52 relative transition-all ease-linear">
						{/* FIXME: fix state */}
						{backgroundType == "image" && (
							<div className="bg-gray-400 !w-full !h-full">
								<Image
									src={ "/assets/svgs/profile.svg"}
									alt="avatar"
									width={86}
									height={86}
									className={` ${
										bgImage
											? "object-cover !w-full !h-full"
											: "!w-12 !h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
									}  `}
								/>
							</div>
						)}

						<ComboboxDemo
							className="!w-[100px]"
							buttonClassName="!w-[50px] absolute top-2 right-2 !rounded-full"
							options={options}
							value={backgroundType}
							setValue={setBackgroundType}
						/>

						{/* bg picker */}
						{backgroundType && (
							<div className="!w-[40px] !h-[35px] absolute top-14 right-2 !rounded-full bg-white overflow-hidden text-center shadow-sm border-white border-2 cursor-pointer hover:bg-white/80 hover:border-white/60">
								{backgroundType === "color" ? (
									// Color Picker
									<ColorPicker
										darkColors={darkColors}
										backgroundValue={backgroundValue}
										currentAccount={currentAccount}
										setBackgroundValue={setBackgroundValue}
									/>
								) : (
									// Image Upload
									<FormField
										control={form.control}
										name="bg_image"
										render={({ field }) => (
											<FormItem className="flex flex-col items-center">
												<FormLabel className="!w-[40px] !h-[35px] relative group cursor-pointer">
													<ImagePlus
														className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-black z-10`}
													/>
												</FormLabel>
												<ImageUpload
													setFiles={setBgImage}
													form={form}
													filed={field}
													action={field.onChange}
												/>
											</FormItem>
										)}
									/>
								)}
							</div>
						)}
					</div>

					{/* Start avatarCard */}
					<div className="flex items-center justify-center -translate-y-9  md:-translate-y-12">
						<FormField
							control={form.control}
							name="avatar"
							render={({ field }) => (
								<FormItem className="flex items-center justify-center">
									<FormLabel className="bg-gray-200 h-24 w-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md relative group cursor-pointer">
										{/* TODO: lazy load the image */}
										<Image
											src={field.value ? field.value : "/assets/svgs/profile.svg"}
											alt="avatar"
											width={86}
											height={86}
											priority={field.value != ""}
											className={`${
												field?.value ? "rounded-full !w-full !h-full" : "!w-12 !h-12"
											} object-cover `}
										/>
										<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full hidden group-hover:block group-hover:bg-gray-400 group-hover:bg-opacity-[60%] ">
											<PlusCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-gray-900 stroke-2  " />
										</div>
									</FormLabel>
									<ImageUpload
										setFiles={setAvatar}
										form={form}
										filed={field}
										action={field.onChange}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* End avatarCard */}
					<div className="flex flex-col gap-3 !pt-0 p-5 md:px-10">
						<FormField
							control={form.control}
							name="userName"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel className="font-semibold">UserName</FormLabel>
										<FormControl>
											<Input
												className="w-full text-start p-4 "
												placeholder="Username"
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
							name="displayName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">DisplayName</FormLabel>
									<FormControl>
										<Input
											className="w-full text-start p-4 "
											placeholder="Full name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Location</FormLabel>
									<FormControl>
										<Input
											className="w-full text-start p-4 "
											placeholder="location"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">bio</FormLabel>
									<FormControl>
										<Textarea rows={5} placeholder="Type your message here." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<SubmitButton className={"!w-full !p-3 !mt-4"}>Save</SubmitButton>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default ProfileForm;
