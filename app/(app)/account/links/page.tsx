import LinksForm from "@/components/forms/LinksForm";
import { findUserAccount } from "@/lib/actions/account.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
	const user = await currentUser();
	const { data: account } = await findUserAccount(user?.id || "");
	return (
		<div className="md:container p-2 md:p-5">
			<div className="flex flex-col gap-12 items-center justify-center">
				<h1 className="text-xl font-bold">Your profile Links</h1>

				<LinksForm account={JSON.stringify(account)} />
			</div>
		</div>
	);
};

export default Page;
