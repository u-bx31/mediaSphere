"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const AccountForm = () => {
	//FIXME: make it load faster 
	const target_username =
		typeof window !== "undefined" && localStorage.getItem("target_username") || '';

	const form = useForm<z.infer<typeof userNameValidation>>({
		resolver: zodResolver(userNameValidation),
		defaultValues: {
			userName: "" || target_username?.toString(),
		},
	});
	function onSubmit(data: z.infer<typeof userNameValidation>) {}
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
				<Button type="submit" className="w-full">
					Create
				</Button>
			</form>
		</Form>
	);
};

export default AccountForm;
