"use client";
import { UserAccount } from "@/constants/types";
import {
	ArrowDownRightFromSquareIcon,
	Link2,
	LinkIcon,
	Loader2Icon,
	MapPin,
	UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import AccountCard from "../cards/AccountCard";
import Phone from "./PhoneSvg";
import { VerifyCount } from "./tools/VerCount";

const AccountComponent = ({ userAccount,linksCount }: any) => {
	const currentAccount: UserAccount = JSON.parse(userAccount);
	const accountLinksCount = JSON.parse(linksCount);

	const [loading, setLoading] = useState(true);

	const { push } = useRouter();

	useEffect(() => {
		if (!currentAccount) {
			push("/account/info");
		}
		setLoading(false);
	}, []);

	return (
		<div className="flex flex-row gap-2 mt-5 justify-center w-full">
			<div className="flex flex-col gap-5 w-full">
				<AccountCard currentAccount={currentAccount} loading={loading} />
				<div className="flex flex-col gap-5  bg-white rounded-xl overflow-hidden w-full p-2 sm:p-5">
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
								<div
									key={link.title}
									className="w-full flex flex-col xs:flex-row gap-4 items-center justify-between bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl p-3 sm:p-5">
									<div className="flex flex-row gap-3 items-center order-2 xs:order-1">
										<Link2 className="w-6 h-6 stroke-green-600  hidden xs:flex" />
										<div className="flex flex-col gap-1 items-center xs:items-start">
											<h3 className="text-base break-words font-bold">{link.title}</h3>
											<Link
												href={link.url}
												className="text-green-700  w-48 sm:w-80 md:w-full lg:w-[450px] xl:w-full text-center xs:text-start">
												<p className="w-full break-words">{link.url}</p>
											</Link>
										</div>
									</div>
									<div className="flex flex-row gap-2 w-full justify-end order-1 xs:order-2">
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
			<Phone currentAccount={currentAccount} loading={loading} />
		</div>
	);
};

export default AccountComponent;
