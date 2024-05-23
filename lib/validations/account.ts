import { mediaOptions } from "@/constants";
import { z } from "zod";

export const AccountValidation = z.object({
	userName: z
		.string()
		.min(2, { message: "Username can not be empty Minimum 2 characters" })
		.max(30),
	displayName: z
		.string()
		.min(2, { message: "Display can not be empty Minimum 2 characters" })
		.max(30),
	avatar: z.string().url().optional(),
	bg_image: z.string().url().optional(),
	bg_color: z.string().optional(),
	location: z.string().max(30).optional(),
	bio: z.string().max(30000).optional(),
});

interface SocialLink {
	label: string;
	value: string;
	icon: JSX.Element;
	placeholder?: string;
	type?: "string" | "number" | "url" | "email";
}
const schemaObject: Record<string, z.ZodTypeAny> = {};
//FIXME: fix the constant schema
mediaOptions.forEach((res: SocialLink) => {
	switch (res.type) {
		case "email":
			schemaObject[res?.value] = z.string().email().optional();
			break;
		case "number":
			schemaObject[res?.value] = z.number().optional();
			break;
		case "url":
			schemaObject[res?.value] = z.string().url().optional();
			break;
		default:
			schemaObject[res?.value] = z.string().optional();
	}
});

export const AccountLinksValidation = z.object({
	social: z.array(z.object(schemaObject)),
	custom: z.array(
		z.object({
			icon: z.string().url().optional(),
			title: z.string().optional(),
			url: z.string().url().optional(),
			description: z.string().optional(),
		})
	),
});
