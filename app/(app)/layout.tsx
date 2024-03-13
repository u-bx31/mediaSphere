
import Navbar from "@/components/shared/Navbar";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const user = await currentUser();
	const userInfo = await fetchUser(user?.id || "");
	return (
		<div className="flex flex-col gap-3">
			<Navbar user={JSON.stringify(userInfo)}/>
			{children}
		</div>
	);
}
