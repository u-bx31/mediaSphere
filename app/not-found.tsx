"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center p-4 sm:p-0">
			<div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto sm:h-[350px] flex flex-col justify-center items-center bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-100 p-4 sm:p-8">
				<div className="relative">
					<h1 className="text-8xl lg:text-9xl font-extrabold text-primary tracking-widest">
						404
					</h1>
					<div className="bg-white w-[130px] px-2 text-sm rounded rotate-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
						Page Not Found
					</div>
				</div>
				<p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal mt-5 text-center">
					Sorry, we couldn't find the page you're looking for
				</p>
				<Link href="/">
					<Button variant="default" className="mt-5">
						Back to Home page
					</Button>
				</Link>
			</div>
		</main>
	);
}
