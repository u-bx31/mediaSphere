import { ImagePlus } from "lucide-react";
import { useRef } from "react";

const ImageUpload = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<button className="!w-[40px] !h-[35px]" onClick={() => inputRef.current?.click()}>
				<ImagePlus
					className={`w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 stroke-black z-10`}
				/>
			</button>
			<input
				ref={inputRef}
				id="uploadImg"
				name="uploadImg"
				type="file"
				className="hidden"
			/>
		</>
	);
};
export default ImageUpload;
