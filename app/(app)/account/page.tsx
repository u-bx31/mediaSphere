import AccountComponent from "@/components/shared/AccountComponent";
import { findUserAccount } from "@/lib/actions/account.action";
import { GetLinksViewsCount } from "@/lib/actions/event.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id || "");
	const { data: account } = await findUserAccount(user?.id || "");
	const linksCount = account ? await GetLinksViewsCount(account?.userName) : {};
	return (
		<div className="md:container flex flex-col justify-center items-center w-full px-4 md:px-auto">
			<AccountComponent
				userAccount={JSON.stringify(account)}
				linksCount={JSON.stringify(linksCount)}
			/>
		</div>
	);
};

export default Page;
