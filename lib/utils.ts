import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string, prevImg: string) {
	// Check if imageData has changed

	if (imageData == prevImg && prevImg !== undefined) {
		return false; // Image data has not changed
	}

	const base64Regex = /^data:image\/(png|jpe?g|webp);base64,/;
	const isBase64 = base64Regex.test(imageData);

	return isBase64;
}
