import Account from "../models/account.model";
import Event from "../models/event";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function findUserAccount({
	userId,
	userName,
	eventType,
	eventTarget,
}: {
	userId: string;
	userName: string;
	eventType: string;
	eventTarget: string;
}) {
	ConnectionToDb();
	const user = await User.findOne({ id: userId });

	const userAccount = await Account.findOne({ userName: userName });

	if (!userAccount) {
		throw new Error(`This UserName not exist`);
	} else {
		try {
			await Event.create({ type: eventType, target: eventTarget });
		} catch (error: any) {
			throw new Error(`Failed to fetch user :${error}`);
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
