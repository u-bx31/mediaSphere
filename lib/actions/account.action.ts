"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Account from "../models/account.model";
import { revalidatePath } from "next/cache";

interface AccountUserProps {
	userId: string;
	userName: string;
	path?: string;
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
		const data = await Account.findOne({ createdBy: currentUser?._id }).then(
			(res) => {
				return res;
			}
		);
		return { data };
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
	const userAccount = await Account.findOne({ userName: userName });
	if (userAccount) {
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
	path: string;
}) {
	ConnectionToDb();
	const user = await User.findOne({ id: userId });

	const userAccount = await Account.findOne({ userName: userName });
	if (userAccount && userAccount?.createdBy.toString() != user?._id.toString()) {
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
				).then(() => {
					revalidatePath(path);
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
}

export async function updateLinksAccount({
	userId,
	data,
	path,
}: {
	userId: string;
	data: any;
	path: string;
}) {
	ConnectionToDb();
	const user = await User.findOne({ id: userId });
	const userAccount = await Account.findOne({ userName: user?.userName });
	try {
		if (user) {
			let currentState = "links";

			if (userAccount?.state == "completed") {
				currentState = "completed";
			}
			const combinedObject = data.reduce((acc: any, obj: any) => {
				// Extract the key and value from the object
				const [key, value] = Object.entries(obj)[0];
				// Assign the value to the key in the accumulator object
				acc[key] = value;
				return acc;
			}, {});

			await Account.findOneAndUpdate(
				{ createdBy: user?._id },
				{
					links: { social: combinedObject },
					state: currentState,
				},
				{ upsert: true }
			).then(() => {
				revalidatePath(path);
			});
		} else {
			return {
				message: "This user not found",
			};
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user links :${error.message}`);
	}

	return false;
}

const ConnectionToDb = () => {
	try {
		return connectToDB();
	} catch (error: any) {
		throw new Error(`Failed to connect to mongoDB :${error.message}`);
	}
};
