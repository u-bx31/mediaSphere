"use client";
import { ClipboardList, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Navlinks } from "@/constants";
import Logo from "@/public/assets/svgs/logo-svg.svg";
import { useState } from "react";
import Link from "next/link";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Navbar = ({ user }: any) => {
	const curentUser = JSON.parse(user);
	const { push } = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<nav className="navbar-class">
			<div
				className={`flex flex-wrap items-center justify-between mx-auto lg:p-1 `}>
				<div className="flex flex-row items-center">
					<div className="md:hidden">
						<button className="flex items-center" onClick={handleClick}>
							<svg
								className={`ham hamRotate ham4 ${isOpen && "active"} w-10 md:w-16`}
								viewBox="0 0 100 100">
								<path
									className="line top"
									d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
								/>
								<path className="line middle" d="m 70,50 h -40" />
								<path
									className="line bottom"
									d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
								/>
							</svg>
						</button>
					</div>
					<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<Logo className={"w-fit h-14 lg:w-20 lg:h-20"} />
					</a>
				</div>
				<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					<SignedIn>
						<DropdownMenu>
							<DropdownMenuTrigger className="border-none  focus-visible:ring-transparent">
								<Image
									src={curentUser?.image}
									width={46}
									height={46}
									alt="Avatar"
									className="bg-gray-400 rounded-full object-cover !w-10 !h-10 flex items-center justify-center mr-4 md:mr-0"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel className="text-center text-base font-bold">
									{curentUser?.lastName[0].toUpperCase()}.{curentUser?.firstName}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									<div className="flex flex-row items-center gap-3">
										<User className="w-5 h-5" />
										<h3 className="text-base ">Profile</h3>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									<div className="flex flex-row items-center gap-3">
										<ClipboardList className="w-5 h-5" />
										<h3 className="text-base ">My orders</h3>
									</div>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									<SignOutButton>
										<div className="flex flex-row g-2">
											<LogOut className="mr-2 h-4 w-4" />
											<span>Log out</span>
										</div>
									</SignOutButton>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SignedIn>

					<SignedOut>
						<button
							className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center mr-4 md:mr-0"
							onClick={() => push("/sign-in")}>
							<User className="w-5 h-5" />
						</button>
					</SignedOut>
				</div>
				<div
					className={`justify-between ${
						isOpen
							? "z-50 fixed flex top-[60px] bottom-0 flex-col gap-2 overflow-y-auto backdrop-blur-lg bg-white/30 shadow-inner"
							: "hidden items-center"
					} w-full md:flex md:w-auto md:order-1`}
					id="navbar-user">
					<ul className="flex flex-col gap-6 md:gap-0 font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
						{Navlinks.map((item: any,index) => {
							const isActive =
								(pathname.includes(item.route) && item.route.length > 1) ||
								pathname === item.route;
							return (
								<li key={index}>
									<Link
										href={item.route}
										className={`font-medium text-lg py-2 px-3 text-gray-400  ${
											isActive && "bg-primary !text-white md:!text-primary"
										} hover:text-primary/70 rounded md:bg-transparent  md:p-0`}
										aria-current="page">
										{item.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
