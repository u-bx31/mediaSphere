import * as z from "zod";

export const userProfileValidation = z.object({
	profilePicture: z.string().url().optional(),
	email: z.string().email().min(1),
	firstName: z.string().min(3).max(30),
	lastName: z.string().min(3).max(30),
	userName: z.string().min(3).max(30),
	phoneNumber: z
		.string()
		.regex(/^\+(?:[0-9] ?){9,14}[0-9]$/,{ message: "PhoneNumber must be valid number " })
		.optional(),
});
export const userNameValidation = z.object({
	userName: z.string().min(3).max(30),
});
