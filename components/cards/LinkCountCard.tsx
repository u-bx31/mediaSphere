import { Link2 } from "lucide-react";
import { VerifyCount } from "../shared/tools/VerCount";
import Link from "next/link";
import { isToday } from "date-fns";

const LinksCountCard = ({
	accountLinksCount,
	title,
	url,
	todaySection,
}: {
	accountLinksCount: Array<Object>;
	title: string;
	url: string;
	todaySection?: boolean;
}) => {
	return (
		<div
			key={title}
			className="relative w-full h-fit flex flex-col xs:flex-row gap-4 items-center justify-between  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl p-3 sm:p-5">
			<div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] z-10"></div>
			<div className="flex flex-row gap-3 items-center order-2 xs:order-1">
				<Link2 className="w-6 h-6 stroke-blue-500 hidden xs:flex" />
				<div className="flex flex-col gap-1 items-center xs:items-start">
					<h3 className="text-base break-words font-bold">{title}</h3>
					<Link
						href={url}
						className="text-blue-500 w-48 sm:w-80 md:w-full lg:w-[450px] xl:w-full text-center xs:text-start">
						<p className="w-full break-words">{url}</p>
					</Link>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full justify-end order-1 xs:order-2">
				{todaySection && (
					<div className="bg-secondary w-full xs:w-16 p-3 flex flex-col items-center justify-center rounded-lg">
						<p className="text-sm font-semibold">today</p>
						<p>
							{VerifyCount(
								accountLinksCount.filter(
									(c: any) => c.target === url && isToday(c.createdAt)
								).length
							)}
						</p>
					</div>
				)}
				<div className="bg-secondary p-3 w-full xs:w-16 flex flex-col items-center justify-center rounded-lg">
					<p className="text-sm font-semibold">total</p>
					<p>
						{VerifyCount(
							accountLinksCount.filter((c: any) => c.target === url).length
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default LinksCountCard;
