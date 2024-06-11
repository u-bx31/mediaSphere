"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Phone({
	urls,
	avatar,
	firstName,
	lastName,
	email2,
	img,
	setImg,
	currentAccount,
}: any) {
	return (
		<div className="items-start min-h-[90dvh] max-h-full lg:flex w-[350px] justify-center hidden pl-2 xl:pl-5">
			<svg
				overflow="auto"
				xmlns="http://www.w3.org/2000/svg"
				width="308"
				height="632"
				fill="none"
				viewBox="0 0 308 632">
				<path
					stroke="#737373"
					d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
				/>
				<path
					fill="#fff"
					stroke="#737373"
					d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
				/>
				<foreignObject x="12" y="37" width={283} height="100%">
					<div className="bg-gray-400 w-full h-[120px] rounded-t-xl"> </div>
				</foreignObject>
				<foreignObject x="0" y="100" width={308} height="100%">
					<div className="mx-auto mb-4 w-[120px] h-[120px] border-4 border-white rounded-full shadow-md">
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
				</foreignObject>
			</svg>
		</div>
	);
}
