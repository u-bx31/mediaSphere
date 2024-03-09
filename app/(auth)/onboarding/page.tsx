import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import OnboardingComponent from "./_components.tsx/OnboardingComp";

export const metadata: Metadata = {
	title: `Onboarding | ${process.env.NEXT_PUBLIC_APP_NAME}`,
	description: `Finish creating your account in ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

const Onboarding = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (userInfo?.onBoarded) redirect("/");

	const userData = {
		id: user?.id,
		objectId: userInfo?._id,
		firstName: userInfo?.firstName || user?.firstName,
		lastName: userInfo?.lastName || user?.lastName,
		userName: userInfo?.userName || user?.username,
		email: userInfo?.email || user?.emailAddresses[0].emailAddress,
		image: userInfo?.image || user?.imageUrl,
	};
	return (
		<main className="container flex max-w-3xl flex-col items-center justify-center h-svh">
			<h1 className="text-primary font-bold text-6xl">Onboarding</h1>
			<section className="mt-9">
				<OnboardingComponent user={JSON.stringify(userData)}/>
			</section>
		</main>
	);
};

export default Onboarding;
