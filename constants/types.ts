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
		social: { [key: string]: any };
		custom: { icon: string; title: string; url: string }[];
	};
	state: string;
}
