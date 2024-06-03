export interface SocialLink {
	label: string;
	value: any;
	icon: JSX.Element;
	placeholder?: string;
}

export interface UserAccount {
	createdBy: string;
	userName: string;
	location: string;
	displayName: string;
	image: string;
	bio: string;
	background: {
		type: string;
		value: string;
	};
	links?: {
		social: object;
		custom: Array<object>;
	};
	state:string;
}
