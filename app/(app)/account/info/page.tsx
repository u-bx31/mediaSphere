import ProfileForm from "@/components/forms/ProfileForm";
import { Button } from "@/components/ui/button";
import { findUserAccount } from "@/lib/actions/account.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";

const Page = async () => {
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id || "");
	const { data: account } = await findUserAccount(user?.id || "");

	return (
		<div className="md:container p-2 md:p-5">
			<div className="flex flex-col gap-12 items-center justify-center">
				<div className="flex flex-col md:flex-row gap-3 justify-center md:justify-between w-full items-center ">
					<div className="w-40 order-2 md:order-first">
						{account?.state === "completed" && (
							<Button variant={"linkHover1"} className="group">
								<div className="flex flex-row items-center gap-1 ">
									<ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-all stroke-[2px]" />
									<span className="font-bold">Back to account</span>
								</div>

							</Button>
						)}
					</div>
					<h1 className="text-lg sm:text-xl font-bold ">Customize your profile</h1>
					<span className="w-40 "> </span>
				</div>

				<ProfileForm
					user={JSON.stringify(userInfo)}
					account={JSON.stringify(account)}
				/>
			</div>
		</div>
	);
};
export default Page;
