import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const SubmitButton = ({ children, className, loading,disable }: any) => {
	return (
		<button
			disabled={disable}
			type="submit"
			className={`flex items-center justify-center gap-x-2 py-4 px-4 mt-3 w-auto text-sm  text-white font-bold bg-primary hover:bg-primary/90 transition-all duration-150 rounded-lg sm:mt-0 disabled:cursor-not-allowed disabled:bg-primary/70 ${className}`}>
			{loading ? (
				<Loader2 className="w-5 h-5 stroke-white animate-spin" />
			) : (
				children
			)}
		</button>
	);
};

export default SubmitButton;
