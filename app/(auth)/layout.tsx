import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Authentication",
	description: `Authentication in ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={`bg-gray-50 w-100 min-h-screen`}>
			{children}
		</div>
	);
}
