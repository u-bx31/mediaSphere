import LinksForm from "@/components/forms/LinksForm";

const Page = () => {
	return (
		<div className="md:container p-2 md:p-5">
			<div className="flex flex-col gap-12 items-center justify-center">
				<h1 className="text-xl font-bold">Your profile Links</h1>

				<LinksForm />
			</div>
		</div>
	);
};

export default Page;
