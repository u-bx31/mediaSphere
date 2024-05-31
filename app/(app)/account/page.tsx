import AccountComponent from "@/components/shared/AccountComponent";
import { findUserAccount } from "@/lib/actions/account.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id || "");
	const userAccount = await findUserAccount(user?.id || "");

	return (
		<div className="container flex flex-col justify-center items-center">
			<AccountComponent userAccount={JSON.stringify(userAccount)}  />
		</div>
	);
};

export default Page;
