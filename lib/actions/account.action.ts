"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Account from "../models/account.model";

interface AccountUserProps {
	userId: string;
	userName: string;
	path?: string;
}

export async function fetchAccount(userId: string) {
	ConnectionToDb();
	try {
		const user = await User.findOne({ id: userId });
		return await Account.findOne({ createdBy: user?._id });
	} catch (error: any) {
		throw new Error(`Failed to fetch user :${error}`);
	}
}

export async function findUserAccount(userId: string) {
	ConnectionToDb();
	const currentUser = await User.findOne({ id: userId });
	if (!currentUser) {
		return {
			message: "This user not found",
		};
	}
	try {
		return await Account.findOne({ createdBy: currentUser._id });
	} catch (error: any) {
		throw new Error(`Failed to fetch user :${error}`);
	}
}

export async function CreateUserAccount({
	userId,
	userName,
	path,
}: AccountUserProps) {
	ConnectionToDb();
	const user = await User.findOne({ id: userId });
	const currentUsername = await Account.findOne({ userName: userName });
	if (currentUsername) {
		return {
			message: "This userName already taken",
		};
	}
	try {
		if (user) {
			await Account.create({
				userName: userName?.toLowerCase(),
				createdBy: user?._id,
			});
		} else {
			return {
				message: "This user not found",
			};
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user :${error.message}`);
	}
}

export async function UpdateUserAccount({
	userId,
	userName,
	location,
	displayName,
	bgType,
	bgValue,
	avatar,
	bio,
	path,
}: {
	userId: string;
	userName: string;
	displayName: string;
	avatar: string;
	bgType: string;
	bgValue: string;
	location?: string;
	bio?: string;
	path?: string;
}) {
	ConnectionToDb();
	const user = await User.findOne({ id: userId });

	const currentUsername = await Account.findOne({ userName: userName });
	if (
		currentUsername &&
		currentUsername?.createdBy.toString() != user?._id.toString()
	) {
		return {
			message: "This userName already taken",
		};
	} else {
		try {
			if (user) {
				await Account.findOneAndUpdate(
					{ createdBy: user?._id },
					{
						userName: userName?.toLowerCase(),
						location: location?.toLowerCase(),
						displayName: displayName?.toLowerCase(),
						image: avatar.toLocaleLowerCase(),
						background: {
							type: bgType.toLowerCase(),
							value: bgValue?.toString(),
						},
						bio: bio?.toLowerCase(),
					},
					{ upsert: true }
				);
			} else {
				return {
					message: "This user not found",
				};
			}
		} catch (error: any) {
			throw new Error(`Failed to create/update user :${error.message}`);
		}
	}
}

const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to connect to mongoDB :${error.message}`);
	}
};
