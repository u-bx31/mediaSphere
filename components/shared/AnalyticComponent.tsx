"use client";
import { UserAccount } from "@/constants/types";
import Chart from "./Chart";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { VerifyCount } from "./tools/VerCount";
import { isToday } from "date-fns";
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
								<div
									key={link.title}
									className="w-full flex flex-col xs:flex-row gap-4 items-center justify-between bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl p-3 sm:p-5">
									<div className="flex flex-row gap-3 items-center order-2 xs:order-1">
										<Link2 className="w-6 h-6 stroke-blue-500 hidden xs:flex" />
										<div className="flex flex-col gap-1 items-center xs:items-start">
											<h3 className="text-base break-words font-bold">{link.title}</h3>
											<Link
												href={link.url}
												className="text-blue-500 w-48 sm:w-80 md:w-full lg:w-[450px] xl:w-full text-center xs:text-start">
												<p className="w-full break-words">{link.url}</p>
											</Link>
										</div>
									</div>
									<div className="flex flex-row gap-2 w-full justify-end order-1 xs:order-2">
										<div className="bg-secondary w-full xs:w-16 p-3 flex flex-col items-center justify-center rounded-lg">
											<p className="text-sm font-semibold">today</p>
											<p>
												{VerifyCount(
													accountLinksCount.filter(
														(c: any) => c.target === link.url && isToday(c.createdAt)
													).length
												)}
											</p>
										</div>
										<div className="bg-secondary p-3 w-full xs:w-16 flex flex-col items-center justify-center rounded-lg">
											<p className="text-sm font-semibold">total</p>
											<p>
												{VerifyCount(
													accountLinksCount.filter((c: any) => c.target === link.url).length
												)}
											</p>
										</div>
									</div>
								</div>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
};

export default AnalyticComponent;
