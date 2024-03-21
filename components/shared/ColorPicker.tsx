import { PenLineIcon } from "lucide-react";
import { useRef } from "react";

const ColorPicker = ({
	darkColors,
	backgroundValue,
	currentAccount,
	setBackgroundValue,
}: any) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="relative w-full h-full">
			<button type="button"
				className="!w-[40px] !h-[35px]"
				onClick={() => inputRef.current?.click()}>
				<PenLineIcon
					className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
						darkColors ? "stroke-white" : "stroke-black"
					} z-0`}
				/>
			</button>
			<input
				ref={inputRef}
				name="colorPicker"
				id="colorPicker"
				type="color"
				className="absolute w-100 h-[50px] -top-1 -left-1 -z-10 bg-transparent"
				value={backgroundValue || currentAccount.background.value || "#f0f0f0"}
				onChange={(e) => {
					setBackgroundValue(e.target.value);
				}}
			/>
		</div>
	);
};
export default ColorPicker;
