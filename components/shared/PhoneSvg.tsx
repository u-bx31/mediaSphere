"use client";
import { SocialLink, UserAccount } from "@/constants/types";
import { LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SeeMore from "./tools/SeeMore";
import LinkCard from "../cards/LinkCard";
import { mediaOptions } from "@/constants";
import { ItemInterface } from "react-sortablejs";
import Link from "next/link";

export default function Phone({
	currentAccount,
}: {
	currentAccount: UserAccount;
}) {
	const accountLinks: (SocialLink | undefined)[] =
		currentAccount?.links?.social! &&
		Object.keys(currentAccount?.links?.social)?.map((k) =>
			mediaOptions.find((b) => b.value === k)
		);

	return (
		<div className="relative items-start min-h-[90dvh] max-h-full lg:flex w-1/2 justify-center hidden pl-2 xl:pl-5">
			<div className="absolute z-10 bg-white rounded-[50px] w-[300px] border-[10px] border-black overflow-hidden">
				<div className="flex flex-col gap-3 overflow-auto w-full h-[600px] scrollbar-hide">
					<div className="relative !h-52">
						<div className="bg-gray-400 w-full h-[120px] rounded-t-xl"> </div>
						<div className=" mx-auto w-[120px] h-[120px] border-4 border-white rounded-full shadow-md -translate-y-9  md:-translate-y-12  ">
							{
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
							}
						</div>
					</div>
					<div className="flex flex-col items-center justify-center ">
						<h1 className="text-lg font-black">
							{currentAccount?.displayName || "FullName"}
						</h1>
						<div className="flex flex-col items-start">
							<div className="flex items-center flex-row gap-1">
								<MapPin className="w-4 h-4 stroke-[2px]" />
								<p className="text-base">{currentAccount?.location || "-"}</p>
							</div>
							<div className="flex items-center flex-row gap-1">
								<LinkIcon className="w-4 h-4 stroke-[2px]" />
								<p className="text-base">{currentAccount?.userName || "-"}</p>
							</div>
						</div>
						<SeeMore
							className="mt-2 text-base font-semibold text-center w-[220px]"
							text={currentAccount.bio}
							maxLength={200}
						/>
					</div>

					<div className="flex flex-wrap gap-4 justify-center w-[260px] mx-auto">
						{accountLinks.map((vl) => {
							const { value, icon }: { value: string; icon: JSX.Element } = vl!;
							return (
								<Link href={currentAccount.links?.social[value]} className="w-7 h-7">
									{icon}
								</Link>
							);
						})}
					</div>

					<div className="flex flex-col gap-3 items-center w-[260px] h-full mx-auto justify-start mt-5 mb-5">
						{currentAccount.links?.custom.map((link) => {
							return (
								<LinkCard
									title={link.title || "Title"}
									link={link.url || ""}
									image={link.icon || ""}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
