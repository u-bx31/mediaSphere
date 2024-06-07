import LinksForm from "@/components/forms/LinksForm";
import { Button } from "@/components/ui/button";
import { findUserAccount } from "@/lib/actions/account.action";
import { currentUser } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async () => {
	const user = await currentUser();
	const { data: account } = await findUserAccount(user?.id || "");
	return (
		<div className="md:container p-2 md:p-5">
			<div className="flex flex-col gap-12 items-center justify-center">
				<div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between w-full items-center ">
					<div className="w-40 order-2 md:order-first">
						{account?.state === "completed" && (
							<Link href={"/account"}>
								<Button variant={"outline"} className="group rounded-full">
									<div className="flex flex-row items-center gap-1 ">
										<ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-all stroke-[2px]" />
										<span className="font-bold">Back to account</span>
									</div>
								</Button>
							</Link>
						)}
					</div>
					<h1 className="text-lg sm:text-xl font-bold ">Your profile Links</h1>
					<span className="w-40 "> </span>
				</div>

				<LinksForm account={JSON.stringify(account)} user={user?.id} />
			</div>
		</div>
	);
};

export default Page;
