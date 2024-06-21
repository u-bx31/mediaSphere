"use client";
import { UserAccount } from "@/constants/types";
import { ArrowDownRightFromSquareIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountCard from "../cards/AccountCard";
import Phone from "./PhoneSvg";
import LinksCountCard from "../cards/LinkCountCard";

const AccountComponent = ({ userAccount, linksCount }: any) => {
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
								<LinksCountCard
									accountLinksCount={accountLinksCount}
									title={link.title}
									url={link.url}
								/>
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
