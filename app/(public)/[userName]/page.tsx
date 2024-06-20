import { findUserAccountByUserName } from "@/lib/actions/account.action";
import { AddEventAction } from "@/lib/actions/event.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UserComponent from "./__component/UserComponent";

export async function generateMetadata({
	params,
}: {
	params: { userName: string };
}): Promise<Metadata> {
	const data = await findUserAccountByUserName(params.userName);
	if (data.statueCode != 404) {
		return {
			title: data.data?.userName,
		};
	}
	return {
		title: "",
	};
}
const defaultUser = {
	userName: "",
	location: "",
	background: "",
	state: "",
	bio: "",
	createdBy: "",
	image: "",
	displayName: "",
	links: [],
};

const UserLink = async ({ params }: { params: { userName: string } }) => {
	const currentAccount = await findUserAccountByUserName(params.userName);

	if (currentAccount.statueCode == 404) {
		notFound();
	} else {
		// await AddEventAction({
		// 	userName: params.userName,
		// 	eventType: "view",
		// 	eventTarget: params.userName,
		// });
	}
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<UserComponent account={JSON.stringify(currentAccount?.data)} />
		</div>
	);
};

export default UserLink;
