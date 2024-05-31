"use client";
import { ClipboardList, Loader2, User, UserCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateUser } from "@/lib/actions/user.action";

export default function OnboardingComponent({ user }: any) {
	const lUser = JSON.parse(user.toString());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const { push } = useRouter();
	useEffect(() => {
		const createUser = async () => {
			await UpdateUser({
				userId: lUser.id,
				firstName: lUser.firstName,
				lastName: lUser.lastName,
				userName: lUser.lastName,
				image: lUser.image || "",
				path: "",
			})
			.then(() => {
				setLoading(false);
				setTimeout(() => {
					push("/account/info");
				}, 4000);
			})
			.catch((error) => {
				console.error("Error updating user:", error);
				setError(true)
			});
		};
		createUser()
	}, []);

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<div className="bg-green-400 p-8 border-4 border-green-200 rounded-full">
				{loading ? (
					<Loader2 className="w-10 h-10 stroke-white animate-spin " />
				) : (
					<UserCheck2 className="w-10 h-10 stroke-white stroke-[3px] transition-all ease-in" />
				)}
			</div>
			{error && <p className="text-base text-red-500">reload your page</p>}
		</div>
	);
}
