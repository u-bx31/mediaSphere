import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkCard = ({
	title,
	cardClassName,
	imgClassName,
	image,
	link,
}: {
	title: string;
	link: string;
	image?: string;
	cardClassName?: string;
	imgClassName?: string;
}) => {
	return (
		<Link
			href={link || ""}
			className={
				`flex flex-row gap-2 bg-white rounded-md  w-full h-16 shadow-[0px_0px_20px_0px_#e2e8f0] ` +
				cardClassName
			}>
			{image && (
				<div className={`w-20 h-16 bg-gray-400 rounded-lg ` + imgClassName}>
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
			<div className={`flex flex-row gap-2 items-center ${image ? 'pl-0' :'pl-4'} `}>
				<LinkIcon className="w-4 h-4" />
				<p className="text-base font-bold truncate w-[120px]">{title}</p>
			</div>
		</Link>
	);
};

export default LinkCard;
