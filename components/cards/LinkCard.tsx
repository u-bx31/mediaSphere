import { LinkIcon, MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkCard = ({
	title,
	cardClassName,
	imgClassName,
	theme = "default-theme",
	image,
	link,
	withAction,
	currentUserName,
}: {
	title: string;
	link: string;
	image?: string;
	theme: string;
	cardClassName?: string;
	imgClassName?: string;
	withAction?: boolean;
	currentUserName?: string;
}) => {
	return (
		<Link
			target="_blank"
			href={link || ""}
			ping={
				withAction
					? `${process.env.URL}
					  api/click?rl=${btoa(link)}&u=${currentUserName}
					 `
					: undefined
			}
			className={`${theme} links-card ${cardClassName} group`}>
			<div>
				{image && (
					<div className={`${theme} links-card-image ${imgClassName}`}>
						<Image
							src={image ? image : "/assets/svgs/profile.svg"}
							alt="avatar"
							width={1980}
							height={900}
							priority={image != ""}
							className={`!w-full !h-full object-cover`}
						/>
					</div>
				)}
			</div>
			<p
				className={`${theme} links-card-title mx-auto ${
					image ? "!w-[250px] sm:!w-[320px]" : "!w-full"
				}`}>
				{title}
			</p>
			<div className={`${theme} links-card-icon-div`}>
				<MoveUpRightIcon className={`${theme} links-card-icon`} />
			</div>
		</Link>
	);
};

export default LinkCard;
