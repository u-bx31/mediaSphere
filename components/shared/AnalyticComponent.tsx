"use client";
import { UserAccount } from "@/constants/types";
import Chart from "./Chart";
import LinksCountCard from "../cards/LinkCountCard";
const AnalyticComponent = ({ viewCount, linksCount, account }: any) => {
	const currentAccount: UserAccount = JSON.parse(account);
	const accountViewCount = JSON.parse(viewCount);
	const accountLinksCount = JSON.parse(linksCount);

	return (
		<div className="flex flex-col gap-5 w-full bg-white rounded-xl p-2 md:p-10 mt-5 mb-5">
			<div className="flex flex-col gap-4">
				<h1 className="text-lg font-bold">Account Views </h1>
				<div className=" w-full h-[400px] ">
					<Chart data={accountViewCount || [{ _id: "", count: 0 }]} />
				</div>
			</div>
			<div className="flex flex-col gap-4 mt-5">
				<h1 className="text-lg font-bold">Links Views </h1>
				<div className="flex flex-col gap-3">
					{currentAccount.links?.custom.map(
						(link: { title: string; url: string; icon: string }) => {
							return (
								<LinksCountCard
									accountLinksCount={accountLinksCount}
									title={link.title}
									url={link.url}
									todaySection
								/>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
};

export default AnalyticComponent;
