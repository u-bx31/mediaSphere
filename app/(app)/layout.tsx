
import Navbar from "@/components/shared/Navbar";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<div className="flex flex-col gap-3">
			<Navbar />
			{children}
		</div>
	);
}
