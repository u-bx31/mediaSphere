"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AccountComponent = ({ userAccount }: any) => {
	const currentAccount = JSON.parse(userAccount);
	console.log(currentAccount);
	const { push } = useRouter();

	useEffect(() => {
		if (!currentAccount.data || currentAccount?.data?.state == "info") {
			push("/account/info");
		} else if (currentAccount?.data?.state == "links") {
			push("/account/links");
		}
	}, []);
	return (
		<div className="flex flex-col gap-5 mt-5 items-center">
			<h1 className="text-2xl text-primary font-extrabold mx-auto md:text-4xl">
				Choose your username
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
