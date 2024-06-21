"use client";

import { UserAccount } from "@/constants/types";
import {
	Link2Icon,
	LinkIcon,
	Loader2Icon,
	MapPin,
	UserCircle2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const AccountCard = ({
	currentAccount,
	loading,
}: {
	currentAccount: UserAccount;
	loading: boolean;
}) => {
	return (
		<div className="flex flex-col gap-5 items-center bg-white rounded-xl overflow-hidden w-full relative ">
			{loading && (
				<div className="bg-white/70 backdrop-blur-sm absolute h-full w-full flex flex-col gap-3 items-center justify-center z-40 transition-all ease-linear">
					<Loader2Icon className="w-8 h-8 animate-spin" />
					<h1>Loading your data . . .</h1>
				</div>
			)}
			<div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] z-10"></div>

			<div className="w-full flex flex-col sm:flex-row gap-4 lg:gap-10 my-2 sm:my-5 items-center justify-center px-2 sm:px-3 z-20">
				<div className="flex flex-col sm:flex-row gap-4 lg:gap-10  items-center justify-center">
					<div className="w-24 h-24 lg:w-[117px] lg:h-28 xl:w-36 xl:h-36 rounded-full flex items-center justify-center bg-gray-400 border-4 border-white shadow-lg">
						<Image
							src={
								currentAccount?.image
									? currentAccount?.image
									: "/assets/svgs/profile.svg"
							}
							alt="avatar"
							width={1980}
							height={900}
							priority={currentAccount?.image != ""}
							className={`${
								currentAccount?.image ? "rounded-full !w-full !h-full" : "!w-12 !h-12"
							} object-cover `}
						/>
					</div>
					<div className="flex flex-col gap-3  items-center sm:items-start">
						<h1 className="text-xl text-primary text-center sm:text-start font-extrabold mx-auto xl:text-3xl transition-all">
							Welcome {currentAccount?.userName || "userName"} to your account
						</h1>
						<div className="flex flex-col gap-1 pl-2">
							<div className="flex flex-row gap-2">
								<UserCircle2 className="w-6 h-6 stroke-[2px]" />
								<h3>{currentAccount?.displayName || "-"}</h3>
							</div>
							<div className="flex flex-row gap-2">
								<MapPin className="w-6 h-6 stroke-[2px]" />
								<h3>{currentAccount?.location || "-"}</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-3 w-full sm:w-44 ">
					<Button className="w-full" variant={"ringHover"}>
						<Link className="w-full" href={currentAccount.userName}>
							<div className="flex flex-row items-center gap-1">
								<Link2Icon className="w-6 h-6 stroke-white" />
								<p className="text-lg font-semibold text-white truncate w-full">
									/{currentAccount.userName}
								</p>
							</div>
						</Link>
					</Button>
					<Button className="w-full" variant={"outline"}>
						<Link className="w-full" href={"/account/info"}>
							Account Information
						</Link>
					</Button>
					<Button className="w-full" variant={"outline"}>
						<Link className="w-full" href={"/account/links"}>
							Account Links
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AccountCard;
