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
	ImagePlus,
	Loader2Icon,
	PenLineIcon,
	PlusCircleIcon,
} from "lucide-react";
import { ComboboxDemo } from "../ui/combobox";
import ImageUpload from "../shared/ImageUpload";
import { toast } from "../ui/use-toast";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import { options } from "@/constants";
import { UserAccount } from "@/constants/types";

type Background = {
	type: string;
	value: string;
	imgFile: File[];
	url: string;
	colorValue: string;
};

const ProfileForm = ({ user, account }: any) => {
	const currentUser = JSON.parse(user);

	const currentAccount: UserAccount = JSON.parse(account);

	const target_username =
		(typeof window !== "undefined" && localStorage.getItem("target_username")) ||
		"";
	const [loading, setLoading] = useState({
		form: true,
		button: false,
	});

	const [avatar, setAvatar] = useState<{ file: File[]; url: string }>({
		file: [],
		url: "",
	});

	const [background, setBackground] = useState<Background>({
		type: currentAccount?.background.type || "color",
		value: currentAccount?.background?.value || "",
		imgFile: [],
		url:
			(currentAccount?.background?.type == "image" &&
				currentAccount?.background?.value.toString()) ||
			"",
		colorValue:
			currentAccount?.background.type == "color"
				? currentAccount?.background?.value
				: "#f0f0f0",
	});

	const { startUpload } = useUploadThing("imageUploader", {
		onUploadError: () => {
			setLoading((prev) => ({ ...prev, button: false }));
			toast({
				title: "Something wrong on your image.",
				description: "Make sue that the image not above 4MB",
				variant: "destructive",
			});
		},
	});
	const path = usePathname();
	const { push } = useRouter();

	useEffect(() => {
		setBackground((prev) => ({
			...prev,
			type: currentAccount?.background.type || "color",
		}));
		if (currentAccount || currentUser) {
			setLoading((prev) => ({ ...prev, form: false }));
		}
	}, []);

	const form = useForm<z.infer<typeof AccountValidation>>({
		resolver: zodResolver(AccountValidation),
		defaultValues: {
			userName: currentAccount?.userName || target_username || "",
			avatar: currentAccount?.image || currentUser?.image || "",
			displayName: currentAccount?.displayName || "",
			location: currentAccount?.location || "",
			bio: currentAccount?.bio || "",
		},
	});

	async function onSubmit(data: z.infer<typeof AccountValidation>) {
		setLoading((prev) => ({ ...prev, button: true }));
		const lav_upload =
			(typeof window !== "undefined" && localStorage.getItem("lav_upload")) || "";

		const accountImage = currentAccount?.image;
		const currentAvatar = avatar.url || data.avatar!;

		const hasAvatarChanged =
			(accountImage || currentAvatar) &&
			lav_upload !== data.avatar &&
			isBase64Image(currentAvatar, accountImage);



			
		const lbg_upload =
			(typeof window !== "undefined" && localStorage.getItem("lbg_upload")) || "";

		const accountBackgroundImage = currentAccount?.background.value;
		const currentBackgroundImage = background.url || data.bg_image!;

		const hasBgImageChanged =
			(accountBackgroundImage || currentBackgroundImage) &&
			isBase64Image(currentBackgroundImage, accountBackgroundImage) &&
			lbg_upload !== currentBackgroundImage;

		let imgRes: any;

		if (hasAvatarChanged) {
			try {
				imgRes = await startUpload(avatar.file);
				if (imgRes && imgRes[0].url) {
					localStorage.setItem("lav_upload", data.avatar!);
					setAvatar((prev) => ({ ...prev, url: imgRes[0].url.toString() }));
					data.avatar = imgRes[0].url;
				}
			} catch (error: any) {
				console.log("upload avatar", error);
			}
		} else {
			data.avatar = currentAccount.image;
		}


		if (hasBgImageChanged) {
			try {
				imgRes = await startUpload(background.imgFile);
				if (imgRes && imgRes[0].url) {
					localStorage.setItem("lbg_upload", data.bg_image!);
					setBackground((prev) => ({ ...prev, url: imgRes[0].url.toString() }));
					data.bg_image = imgRes[0].url;
				}
			} catch (error: any) {
				console.log("upload banner", error);
			}
		} else {
			data.bg_image = accountBackgroundImage;
		}

		if (imgRes) {
			setLoading((prev) => ({ ...prev, button: false }));
		}

		if (background.type === "image" && background.url == "") {
			setLoading((prev) => ({ ...prev, button: false }));
			toast({
				title: "Background image can't be empty",
				variant: "destructive",
			});
		} else {
			await UpdateUserAccount({
				userId: currentUser?.id,
				userName: data.userName?.toString(),
				displayName: data.displayName?.toString(),
				bgType: background.type || "color",
				avatar: avatar.url || data.avatar || "",
				bgValue:
					background.type === "image" ? data.bg_image! : background.colorValue || "",
				location: data.location?.toString(),
				bio: data.bio?.toString(),
				path: path,
			}).then((res) => {
				setLoading((prev) => ({ ...prev, button: false }));
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
					target_username && localStorage.removeItem("target_username");
					/*
						verify if account state complete then we don't use push
					*/
					// push("/account/links");
				}
			});
		}
	}
	return (
		<div className="bg-white rounded-xl overflow-hidden w-full lg:w-[1000px] relative">
			{loading.form && (
				<div className="bg-white/70 backdrop-blur-sm absolute h-full w-full flex flex-col gap-3 items-center justify-center z-10 transition-all ease-linear">
					<Loader2Icon className="w-8 h-8 animate-spin" />
					<h1>Loading your data . . .</h1>
				</div>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div
						style={{
							backgroundColor:
								background.colorValue ||
								(currentAccount?.background.type == "color" &&
									currentAccount?.background.value) ||
								"#f0f0f0",
						}}
						className="w-full h-40 md:h-52 relative transition-all ease-linear">
						{/* Banner option :Image */}
						{background.type == "image" && (
							<div className="bg-gray-400 !w-full !h-full">
								<Image
									src={background.url ? background.url : "/assets/svgs/profile.svg"}
									alt="avatar"
									width={1980}
									height={800}
									priority={background.url != ""}
									className={` ${
										background.url
											? "object-cover !w-fu1ll !h-full"
											: "!w-12 !h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
									}  `}
								/>
							</div>
						)}

						<ComboboxDemo
							className="!w-[100px]"
							buttonClassName="!w-[50px] absolute top-2 right-2 !rounded-full"
							options={options}
							value={background.type}
							setValue={(val: string) => {
								setBackground((prev) => ({ ...prev, type: val }));
							}}
						/>

						{/* bg picker */}
						{background.type && (
							<div className="!w-[40px] !h-[35px] absolute top-14 right-2 !rounded-full bg-white overflow-hidden text-center shadow-sm border-gray-200 border-2 cursor-pointer hover:bg-white/80 ">
								{background.type === "color" ? (
									// Color Picker
									<FormField
										control={form.control}
										name="bg_color"
										render={({ field }) => {
											return (
												<FormItem className="flex flex-col  items-center">
													<FormLabel className="!w-[40px] !h-[35px] relative group cursor-pointer">
														<PenLineIcon
															className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-black z-0`}
														/>
													</FormLabel>
													<FormControl>
														<Input
															type="color"
															className="absolute w-100 h-[10px] -top-1 -left-1 -z-10 bg-transparent"
															{...field}
															defaultValue={currentAccount?.background.value}
															onChange={(e: any) => {
																setBackground((prev) => ({
																	...prev,
																	colorValue: e.target.value,
																}));
															}}
														/>
													</FormControl>
												</FormItem>
											);
										}}
									/>
								) : (
									// Image Upload
									<FormField
										control={form.control}
										name="bg_image"
										render={({ field }) => {
											return (
												<FormItem className="flex flex-col items-center">
													<FormLabel className="!w-[40px] !h-[35px] relative group cursor-pointer">
														<ImagePlus
															className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-black z-0`}
														/>
													</FormLabel>
													<ImageUpload
														setBg={(val: string) => {
															setBackground((prev) => ({ ...prev, url: val }));
														}}
														setFiles={(val: File[]) => {
															setBackground((prev) => ({ ...prev, imgFile: val }));
														}}
														form={form}
														action={field.onChange}
													/>
												</FormItem>
											);
										}}
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
											width={1980}
											height={900}
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
										setFiles={(value: any) =>
											setAvatar((prev) => ({ ...prev, file: value }))
										}
										form={form}
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
						<SubmitButton className={"!w-full !p-3 !mt-4"} loading={loading.button}>
							Save
						</SubmitButton>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default ProfileForm;
