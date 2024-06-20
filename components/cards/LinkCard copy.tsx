import { AddEventAction } from "@/lib/actions/event.actions";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent } from "react";

const LinkCard = ({
	title,
	cardClassName,
	imgClassName,
	theme = "default-theme",
	currentUserName,
	image,
	withAction,
	link,
}: {
	title: string;
	link: string;
	image?: string;
	theme: string;
	currentUserName?: string;
	cardClassName?: string;
	withAction?: boolean;
	imgClassName?: string;
}) => {
	const handleClick = async (li: any) => {
		if (withAction) {
			try {
				await AddEventAction({
					userName: currentUserName || "",
					eventType: "click",
					eventTarget: link,
				});
			} catch (error) {
				console.error("Error executing action:", error);
			}
		}
	};
	return (
		<Link
			target="_blank"
			href={link || ""}
			className={`${theme} links-card ${cardClassName}`}
			onClick={() => handleClick(link)}>
			{image && (
				<div className={`${theme} links-card-image ${imgClassName}`}>
					<Image
						src={image ? image : "/assets/svgs/profile.svg"}
						alt="avatar"
						width={1980}
						height={900}
						priority={image != ""}
						className={`!w-full !h-full object-cover rounded-lg`}
					/>
				</div>
			)}
			<div
				className={`flex flex-row gap-2 items-center ${image ? "pl-0" : "pl-4"} `}>
				<LinkIcon className={`${theme} links-card-icon`} />
				<p className={`${theme} links-card-title`}>{title}</p>
			</div>
		</Link>
	);
};

export default LinkCard;
