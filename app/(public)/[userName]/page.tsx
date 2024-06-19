import { findUserAccountByUserName } from "@/lib/actions/account.action";
import { notFound } from "next/navigation";

const UserLink = async ({ params }: { params: { userName: string } }) => {
	const data = await findUserAccountByUserName(params.userName);

	if(data.statueCode == 404){
		notFound()
	}
	return (
		<div>
			<h1>Hello {params.userName}</h1>
		</div>
	);
};

export default UserLink;
