import { z } from "zod";

export const AccountValidation = z.object({
	userName: z.string().min(2,{ message: "Username can not be empty Minimum 2 characters" }).max(30),
	displayName: z.string().min(2,{ message: "Display can not be empty Minimum 2 characters" }).max(30),
	avatar: z.string().url().optional(),
	bg_image : z.string().url().optional(),
	bg_color : z.string().url().optional(),
	location: z.string().max(30).optional(),
	bio: z.string().max(30000).optional(),
});