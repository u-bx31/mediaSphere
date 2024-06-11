"use client";
import { UserAccount } from "@/constants/types";
import { Loader2Icon, MapPin, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AccountCard from "../cards/AccountCard";
import Phone from "./PhoneSvg";

const AccountComponent = ({ userAccount }: any) => {
	const currentAccount: UserAccount = JSON.parse(userAccount);

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
			<div className="flex flex-col w-full">
				<AccountCard currentAccount={currentAccount} loading={loading} />
			</div>
			<Phone />
		</div>
	);
};

export default AccountComponent;
