"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userNameValidation } from "@/lib/validations/user";
import SubmitButton from "../shared/SubmitButton";
import { CreateUserAccount } from "@/lib/actions/account.action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AccountForm = ({ user }: any) => {
	const currentUser = JSON.parse(user);
	const { push } = useRouter();

	const [btnLoading, setBtnLoading] = useState(false);
	//FIXME: make it load faster
	const target_username =
		(typeof window !== "undefined" && localStorage.getItem("target_username")) ||
		"";
	const form = useForm<z.infer<typeof userNameValidation>>({
		resolver: zodResolver(userNameValidation),
		defaultValues: {
			userName: target_username?.toString() || "",
		},
	});
	async function onSubmit(data: z.infer<typeof userNameValidation>) {
		await CreateUserAccount({
			userId: currentUser?.id,
			userName: data.userName || "",
		}).then((res) => {
			if (res?.message) {
				setBtnLoading(false);
				toast({
					title: res?.message,
					variant: "destructive",
				});
			} else {
				push("/account/info");
				localStorage.removeItem("target_username");
			}
		});
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-2/3 space-y-6 text-center">
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="w-full text-center p-6 "
									placeholder="username"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitButton className={"!w-full"}>Create</SubmitButton>
			</form>
		</Form>
	);
};

export default AccountForm;
