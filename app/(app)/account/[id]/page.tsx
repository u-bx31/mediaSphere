import ProfileForm from "@/components/forms/ProfileForm";

const Page = () => {
	return (
		<div className="md:container p-2 md:p-5">
			<div className="flex flex-col gap-12 items-center justify-center">
				<h1 className="text-xl font-bold">Customize your profile</h1>

				<ProfileForm />
			</div>
		</div>
	);
};
export default Page;
