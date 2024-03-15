import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children, className }: any) => {
	const { pending } = useFormStatus();
	return (
		<button type="submit"
			className={`flex items-center justify-center gap-x-2 py-4 px-4 mt-3 w-auto text-sm  text-white font-bold bg-primary hover:bg-primary/90 transition-all duration-150 rounded-lg sm:mt-0 ${className}`}>
			{pending && <Loader2 className="w-5 h-5 stroke-white animate-spin" />}
			{children}
		</button>
	);
};

export default SubmitButton;
