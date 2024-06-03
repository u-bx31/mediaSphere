"use client";
import { UserAccount } from "@/constants/types";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
		<div className="flex flex-col gap-5 mt-5 items-center bg-white rounded-xl overflow-hidden w-full lg:w-[1000px] relative h-100 ">
			{loading && (
				<div className="bg-white/70 backdrop-blur-sm absolute h-full w-full flex flex-col gap-3 items-center justify-center z-10 transition-all ease-linear">
					<Loader2Icon className="w-8 h-8 animate-spin" />
					<h1>Loading your data . . .</h1>
				</div>
			)}
			<h1 className="text-2xl text-primary font-extrabold mx-auto md:text-4xl">
				Welcome {currentAccount?.userName || "userName"} to your account
			</h1>
			<p className="text-base text-gray-800">
				This username will identified your account and also will be displayed as
				your link{" "}
			</p>
			<Link href={"/account/info?edit=true"}>Account Information</Link>
			<Link href={"/account/links?edit=true"}>Account Links</Link>
		</div>
	);
};

export default AccountComponent;
