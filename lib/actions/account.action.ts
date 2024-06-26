"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Account from "../models/account.model";
import { revalidatePath } from "next/cache";
import { UserAccount } from "@/constants/types";

export async function findUserAccount(userId: string) {
	ConnectionToDb();
	const currentUser = await User.findOne({ id: userId });
	if (!currentUser) {
		return {
			message: "This user not found",
		};
	}
	try {
		const data = await Account.findOne({
			createdBy: currentUser?._id,
		}).then((res: UserAccount) => {
			return res;
		});
		return { data };
	} catch (error: any) {
		throw new Error(`Failed to fetch user :${error}`);
	}
}

export async function findUserAccountByUserName(userName: string) {
	ConnectionToDb();

	try {
		const userAccount = await Account.findOne({ userName: userName }).then(
			(res: UserAccount) => {
				return res;
			}
		);

		if (!userAccount) {
			return {
				message: "This userName not found",
				statueCode: 404,
			};
		} else {
			return { data: userAccount };
		}
	} catch (error: any) {
		throw new Error(`Failed to fetch userAccount :${error}`);
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
						location: location,
						displayName: displayName,
						image: avatar,
						background: {
							type: bgType.toLowerCase(),
							value: bgValue?.toString(),
						},
						bio: bio?.toLowerCase(),
						state: userAccount?.state || "links",
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
			const combinedObject = data?.social.reduce((acc: any, obj: any) => {
				// Extract the key and value from the object
				const [key, value] = Object.entries(obj)[0];
				// Assign the value to the key in the accumulator object
				acc[key] = value;
				return acc;
			}, {});

			await Account.findOneAndUpdate(
				{ createdBy: user?._id },
				{
					links: { social: combinedObject, custom: data.custom },
					state: "completed",
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
