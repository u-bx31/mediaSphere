import AccountForm from "@/components/forms/AccountForm";

const Page = () => {
	return (
		<div className="container flex flex-col justify-center items-center">
			<div className="flex flex-col gap-5 mt-5 items-center">
				<h1 className="text-2xl text-primary font-extrabold mx-auto md:text-4xl">
					Choose your username
				</h1>
				<p className="text-base text-gray-800">This username will identified your account and also will be displayed as your link  </p>

				<AccountForm />
			</div>
		</div>
	);
};

export default Page;
