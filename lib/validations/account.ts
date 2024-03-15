import { z } from "zod";

export const AccountValidation = z.object({
	userName: z.string().min(2).max(30),
	displayName: z.string().min(2).max(30),
	location: z.string().min(2).max(30).optional(),
	bio: z.string().min(1).max(30000).optional(),
});