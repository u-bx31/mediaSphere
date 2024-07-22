"use client";
import { SocialLink, UserAccount } from "@/constants/types";
import { LinkIcon, Loader2Icon, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SeeMore from "./tools/SeeMore";
import LinkCard from "../cards/LinkCard";
import { mediaOptions } from "@/constants";
import Link from "next/link";
import { VerifyLink } from "./tools/VerLink";

export default function Phone({
	currentAccount,
	loading,
}: {
	currentAccount: UserAccount;
	loading: boolean;
}) {
	const theme = "default-theme";
	const accountLinks: (SocialLink | undefined)[] =
		currentAccount?.links?.social! &&
		Object.keys(currentAccount?.links?.social)?.map((k) =>
			mediaOptions.find((b) => b.value === k)
		);

	return (
		<div className="relative items-start min-h-[90dvh] max-h-full lg:flex w-1/2 justify-center hidden pl-2 xl:pl-5">
			<div className="absolute z-10 rounded-[40px] w-[300px]  border-[10px] border-black overflow-hidden">
				{loading && (
					<div className="bg-white/70 backdrop-blur-sm absolute h-full w-full flex flex-col gap-3 items-center justify-center z-40 transition-all ease-linear">
						<Loader2Icon className="w-8 h-8 animate-spin" />
						<h1>Loading your data . . .</h1>
					</div>
				)}
				<div
					className={`${theme} background flex flex-col gap-3 overflow-auto w-full h-[600px] scrollbar-hide`}>
					<div className="relative !h-52">
						{theme == "default-theme" && (
							<div
								className={`${
									currentAccount.background.type == "color" ? "bg-gray-400" : ""
								}  w-full h-[120px] rounded-t-xl`}>
								{currentAccount.background.type == "image" && (
									<Image
										src={
											currentAccount?.background.value
												? currentAccount?.background.value
												: "/assets/svgs/profile.svg"
										}
										alt="avatar"
										width={1980}
										height={900}
										priority={currentAccount?.background.value != ""}
										className={`${
											currentAccount?.background.value ? "!w-full !h-full" : "!w-12 !h-12"
										} object-cover `}
									/>
								)}
							</div>
						)}
						<div
							className={`${theme} avatar mx-auto w-[120px] h-[120px] -translate-y-9  md:-translate-y-12  `}>
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
						<h1 className={`${theme} user-fullName`}>
							{currentAccount?.displayName || "FullName"}
						</h1>
						<div className={`${theme} info-div`}>
							<div className="flex items-center flex-row gap-1">
								<MapPin className={`${theme} info-icon`} />
								<p className={`${theme} info-text`}>
									{currentAccount?.location || "-"}
								</p>
							</div>
						</div>
						<SeeMore
							className={`${theme} info-description`}
							text={currentAccount.bio}
							maxLength={200}
						/>
					</div>

					<div className="flex flex-wrap gap-4 justify-center w-[260px] mx-auto">
						{accountLinks.map((vl) => {
							const { value, icon }: { value: string; icon: JSX.Element } = vl!;
							return (
								<Link
									href={VerifyLink(value,currentAccount.links?.social[value])}
									className={`${theme} social-links w-7 h-7`}>
									{icon}
								</Link>
							);
						})}
					</div>

					<div className="flex flex-col gap-4 items-center w-full  px-2 h-full mx-auto justify-start mt-5 mb-5">
						{currentAccount.links?.custom.map((link) => {
							return (
								<LinkCard
									title={link.title || "Title"}
									link={link.url || ""}
									theme={"default-theme"}
									image={link.icon || ""}
									cardClassName={'!h-20'}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
