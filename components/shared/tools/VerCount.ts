export const VerifyCount = (number: number) => {
	if (number >= 1000000) {
		return `${(number / 1000000).toFixed(1)}m`;
	} else if (number >= 1000) {
		return `${(number / 1000).toFixed(1)}k`;
	}else if(number == 0){
		return '-'
	} 
	else {
		return number.toString();
	}
};
