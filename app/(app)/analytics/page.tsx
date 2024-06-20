import AnalyticComponent from "@/components/shared/AnalyticComponent";
import { findUserAccount } from "@/lib/actions/account.action";
import { GetViewsCount } from "@/lib/actions/event.actions";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
	const user = await currentUser();
	const { data: account } = await findUserAccount(user?.id || "");
	const viewCount = account ? await GetViewsCount(account?.userName) : {};

	return (
		<div className="md:container flex flex-col justify-center items-center w-full px-4 md:px-auto">
			<AnalyticComponent viewCount={viewCount}/>
		</div>
	);
};

export default Page;
