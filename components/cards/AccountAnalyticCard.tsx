import { UserAccount } from "@/constants/types";
import { ArrowDownRightFromSquareIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import LinksCountCard from "./LinkCountCard";

const AccountAnalyticCard = ({
	currentAccount,
	accountLinksCount,
	loading,
}: {
	currentAccount: UserAccount;
	accountLinksCount: any;
	loading: boolean;
}) => {
	return (
		<div className="flex flex-col gap-5  bg-white rounded-xl overflow-hidden w-full p-2 sm:p-5 relative">
			{loading && (
				<div className="bg-white/70 backdrop-blur-sm absolute h-full w-full flex flex-col gap-3 items-center justify-center z-40 transition-all ease-linear">
					<Loader2Icon className="w-8 h-8 animate-spin" />
					<h1>Loading your data . . .</h1>
				</div>
			)}
			<div className="flex flex-row justify-between">
				<h1 className="text-lg font-bold">Links Views Count</h1>
				<Link href={"/analytics"} className="flex flex-row gap-1 items-center">
					<p className="text-sm text-green-600 ">More analytics</p>
					<ArrowDownRightFromSquareIcon className="w-5 h-5 stroke-green-600 " />
				</Link>
			</div>
			{currentAccount.links?.custom.map(
				(link: { title: string; url: string; icon: string }) => {
					return (
						<LinksCountCard
							accountLinksCount={accountLinksCount}
							title={link.title}
							url={link.url}
						/>
					);
				}
			)}
		</div>
	);
};

export default AccountAnalyticCard;
