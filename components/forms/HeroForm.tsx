"use client";
import { MoveRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SubmitButton from "../shared/SubmitButton";

const HeroForm = () => {
	const { push } = useRouter();
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const userName = formData.get("userName") as string;
		if (userName.length < 2 || userName.length > 20) {
			toast({
				title: "Validation error",
				description: "The username must be at least between 6  and 20 characters",
				variant: "destructive",
			});
		} else {
			window.localStorage.setItem("target_username", userName);
			push("/sign-up");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="justify-center  gap-x-1 sm:flex">
			<div className="bg-white flex flex-row items-center rounded-md">
				<p className="px-2 text-base font-bold">media-sphere/</p>
				<input
					type="text"
					id="userName"
					name="userName"
					placeholder="Username"
					className="w-full pr-3 py-4 text-gray-400 bg-white border-none focus:border-gray-300 duration-150 outline-none rounded-lg sm:max-w-sm sm:w-auto"
				/>
			</div>
			<SubmitButton className={'!w-full md:!w-[200px]'}>
				Get started for free
				<MoveRight className="w-5 h-5 stroke-white" />
			</SubmitButton>
			{/* <button className="flex items-center justify-center gap-x-2 py-4 px-4 mt-3 w-full text-sm  text-white font-bold bg-primary hover:bg-primary/90 transition-all duration-150 rounded-lg sm:mt-0 sm:w-auto"></button> */}
		</form>
	);
};

export default HeroForm;
