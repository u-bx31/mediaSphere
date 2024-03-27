import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

let previousImageData: string | null = null;

export function isBase64Image(imageData: string) {
	// Check if imageData has changed
	if (imageData === previousImageData) {
		console.log("Image data has not changed.");
		return false; // Image data has not changed
	}

	const base64Regex = /^data:image\/(png|jpe?g|webp);base64,/;
	const isBase64 = base64Regex.test(imageData);

	// Update previousImageData with current imageData
	previousImageData = imageData;

	return isBase64;
}
