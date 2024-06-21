import Account from "../models/account.model";
import Event from "../models/event";
import { connectToDB } from "../mongoose";

export async function GetViewsCount(userName: string) {
	ConnectionToDb();

	const userAccount = await Account.findOne({ userName: userName });

	if (!userAccount) {
		throw new Error(`This UserName not exist`);
	} else {
		try {
			const count = await Event.aggregate([
				{
					$match: {
						type: "view",
						target: userName,
					},
				},
				{
					$group: {
						_id: {
							$dateToString: {
								date: "$createdAt",
								format: "%Y-%m-%d",
							},
						},
						count: {
							$count: {},
						},
					},
				},
				{
					$sort: { _id: 1 },
				},
			]);
			return count;
		} catch (error: any) {
			throw new Error(`Failed to fetch user :${error}`);
		}
	}
}

export async function GetLinksViewsCount(userName: string) {
	ConnectionToDb();

	const userAccount = await Account.findOne({ userName: userName });

	if (!userAccount) {
		throw new Error(`This UserName not exist`);
	} else {
		try {
			const count = await Event.find({
				userAccount: userName,
				type: "click",
			});
			return count;
		} catch (error: any) {
			throw new Error(`Failed to fetch user :${error}`);
		}
	}
}
export async function AddEventAction({
	userName,
	eventType,
	eventTarget,
}: {
	userName: string;
	eventType: string;
	eventTarget: string;
}) {
	ConnectionToDb();

	const userAccount = await Account.findOne({ userName: userName });

	if (!userAccount) {
		throw new Error(`This UserName not exist`);
	} else {
		try {
			await Event.create({
				type: eventType,
				userAccount: userName,
				target: eventTarget,
			});
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
