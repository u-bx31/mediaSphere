"use client";
import { UserAccount } from "@/constants/types";
import { ArrowDownRightFromSquareIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountCard from "../cards/AccountCard";
import Phone from "./PhoneSvg";
import LinksCountCard from "../cards/LinkCountCard";
import AccountAnalyticCard from "../cards/AccountAnalyticCard";

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
				<AccountAnalyticCard
					accountLinksCount={accountLinksCount}
					currentAccount={currentAccount}
					loading={loading}
				/>
			</div>
			<Phone currentAccount={currentAccount} loading={loading} />
		</div>
	);
};

export default AccountComponent;
