import HeroForm from "@/components/forms/HeroForm";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user = await currentUser();
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
						<HeroForm user={JSON.stringify(user)} />
					</div>
				</div>
			</section>
		</div>
	);
}
