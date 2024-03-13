"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface UserProps {
	userId: string;
	firstName: string;
	lastName: string;
	userName: string;
	image: string;
	phoneNumber?: string;
	path: string;
}

export async function fetchUser(userId: string) {
	ConnectionToDb();
	try {
		return await User.findOne({ id: userId });
	} catch (error: any) {
		throw new Error(`Failed to fetch user :${error}`);
	}
}

export async function UpdateUser({
	userId,
	firstName,
	lastName,
	userName,
	image,
	phoneNumber,
	path,
}: UserProps): Promise<void> {
	ConnectionToDb();
	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				firstName: firstName?.toLowerCase(),
				lastName: lastName?.toLowerCase(),
				username : userName?.toLowerCase(),
				image: image,
				phoneNumber: phoneNumber,
				onBoarded : true,
			},
			{ upsert: true }
		);
		if (path == "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user :${error.message}`);
	}
}

const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to connect to mongoDB :${error.message}`);
	}
};
