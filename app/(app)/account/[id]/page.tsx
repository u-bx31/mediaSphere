import ProfileForm from "@/components/forms/ProfileForm";
import { findUserAccount } from "@/lib/actions/account.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id || "");
	const { data: account } = await findUserAccount(user?.id || "");

	return (
		<div className="md:container p-2 md:p-5">
			<div className="flex flex-col gap-12 items-center justify-center">
				<h1 className="text-xl font-bold">Customize your profile</h1>

				<ProfileForm
					user={JSON.stringify(userInfo)}
					account={JSON.stringify(account)}
				/>
			</div>
		</div>
	);
};
export default Page;
