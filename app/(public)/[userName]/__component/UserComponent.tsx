"use client";
import { SocialLink, UserAccount } from "@/constants/types";
import { LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { mediaOptions } from "@/constants";
import Link from "next/link";
import SeeMore from "@/components/shared/tools/SeeMore";
import { VerifyLink } from "@/components/shared/tools/VerLink";
import LinkCard from "@/components/cards/LinkCard";

const defaultUser = {
	createdBy: "",
	userName: "",
	location: "",
	displayName: "",
	image: "",
	bio: "",
	background: {
		type: "",
		value: "",
	},
	links: {
		social: { link: "" },
		custom: [{ icon: "", title: "", url: "" }],
	},
	state: "",
};

const UserComponent = ({ account = defaultUser }: { account: any }) => {
	const currentAccount: UserAccount = JSON.parse(account);
	const theme = "default-theme";

	const accountLinks: (SocialLink | undefined)[] =
		currentAccount?.links?.social! &&
		Object.keys(currentAccount?.links?.social)?.map((k) =>
			mediaOptions.find((b) => b.value === k)
		);

	return (
		<div
			className={`${theme} ${
				theme == "default-theme" && "h-screen"
			} background flex flex-col w-full`}>
			{/* Background section */}
			<div className="h-fit ">
				{theme == "default-theme" && (
					<div
						className={`${
							currentAccount.background?.type == "color" ? "bg-gray-400" : ""
						}  w-full h-[150px] md:h-[250px]`}>
						{currentAccount.background?.type == "image" && (
							<Image
								src={
									currentAccount?.background.value
										? currentAccount?.background.value
										: "/assets/svgs/profile.svg"
								}
								alt="avatar"
								width={1980}
								height={1440}
								priority={currentAccount?.background.value != ""}
								className={`${
									currentAccount?.background.value ? "!w-full !h-full" : "!w-12 !h-12"
								} object-cover `}
							/>
						)}
					</div>
				)}
			</div>
			<div className="bg-white  h-full flex flex-col gap-3 rounded-t-xl -translate-y-3">
				<div className="flex flex-col gap-4  -translate-y-9  md:-translate-y-12  ">
					{/* Avatar section */}
					<div
						className={`${theme} avatar mx-auto w-[120px] h-[120px] md:w-[140px] md:h-[140px]`}>
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
					{/* Account info section */}
					<div className="flex flex-col gap-2 items-center justify-center ">
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
							className={`${theme} info-description !w-full sm:!w-[350px] md:!w-[400px] px-2 sm:px-0`}
							text={currentAccount?.bio || ""}
							maxLength={100}
						/>
					</div>
					{/* social media links section */}
					<div className="flex flex-wrap gap-4 justify-center w-[260px] mx-auto">
						{accountLinks?.map((vl) => {
							const { value, icon }: { value: string; icon: JSX.Element } = vl!;
							return (
								<Link
									href={VerifyLink(value, currentAccount.links?.social[value])}
									className={`${theme} social-links w-8 h-8  md:w-10 md:h-10`}>
									{icon}
								</Link>
							);
						})}
					</div>
					{/* Links section */}
					<div className="flex flex-col gap-6 items-center w-full xs:w-[400px] sm:w-[550px] md:w-[600px] lg:w-[800px]  h-full mx-auto justify-start mt-5 mb-5 px-4 xs:px-0">
						{currentAccount.links?.custom.map((link) => {
							return (
								<LinkCard
									withAction={true}
									currentUserName={currentAccount.userName || ""}
									title={link.title || "Title"}
									link={link.url || ""}
									theme={"default-theme"}
									image={link.icon || ""}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserComponent;
