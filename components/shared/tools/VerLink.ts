export const VerifyLink = (key: string, value: string) => {
	if (key === "mobile") {
		return "tel:" + value;
	}
	if (key === "email") {
		return "mailto:" + value;
	}
	return value;
};
