"use client";

import { MoveRight } from "lucide-react";

export default function Home() {
	return (
		<div className="container flex flex-col justify-center items-center">
			<section className="relative">
				<div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
					<div className="space-y-5 max-w-4xl mx-auto text-center">
						<h2 className="text-4xl text-primary font-extrabold mx-auto md:text-6xl">
							Build your{" "}
							<span className="text-5xl md:text-7xl drop-shadow-[0_1.1px_1.1px_rgba(0,0,0,2)] font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.green.300),theme(colors.green.100),theme(colors.green.300))] bg-[length:200%_auto] animate-gradient">
								one link
							</span>{" "}
							for your accounts
						</h2>
						<p className="max-w-2xl text-base md:text-lg mx-auto text-white">
							Share your links, social media profiles, contact info and more on just
							one page
						</p>
						<form
							onSubmit={(e) => e.preventDefault()}
							className="justify-center  gap-x-1 sm:flex">
							<div className="bg-white flex flex-row items-center rounded-md">
								<p className="px-2 text-base font-bold">media-sphere/</p>
								<input
									type="text"
									placeholder="Enter your email"
									className="w-full px-3 py-4 text-gray-400 bg-white border focus:border-gray-300 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto"
								/>
							</div>
							<button className="flex items-center justify-center gap-x-2 py-4 px-4 mt-3 w-full text-sm  text-white font-bold bg-primary hover:bg-primary/50 transition-all duration-150 rounded-lg sm:mt-0 sm:w-auto">
								Get started for free
								<MoveRight className="w-5 h-5 stroke-white" />
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}
