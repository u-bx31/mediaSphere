"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import SubmitButton from "../shared/SubmitButton";
import { AccountValidation } from "@/lib/validations/account";
import { Textarea } from "@/components/ui/textarea";

const ProfileForm = () => {
	const form = useForm<z.infer<typeof AccountValidation>>({
		resolver: zodResolver(AccountValidation),
		defaultValues: {
			userName: "",
			displayName: "",
			location: "",
			bio: "",
		},
	});
	async function onSubmit(data: z.infer<typeof AccountValidation>) {}
	return (
		<div className="bg-white rounded-xl w-full lg:w-[1000px]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="w-full bg-gray-200 h-40 md:h-52">bg</div>
					<div className="flex items-center justify-center -translate-y-9  md:-translate-y-12">
						<div className="bg-gray-200 h-24 w-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md">
							av
						</div>
					</div>
					<div className="flex flex-col gap-3 !pt-0 p-5 md:px-10">
						<FormField
							control={form.control}
							name="userName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>UserName</FormLabel>
									<FormControl>
										<Input
											className="w-full text-start p-4 "
											placeholder="Username"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="displayName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>DisplayName</FormLabel>
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
									<FormLabel>Location</FormLabel>
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
									<FormLabel>bio</FormLabel>
									<FormControl>
										<Textarea rows={5} placeholder="Type your message here." />
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
