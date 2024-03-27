import { ChangeEvent } from "react";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const ImageUpload = ({ setFiles, setBg, field, action }: any) => {
	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();
		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));
			if (!file.type.includes("image")) return;
			fileReader.onload = async (e) => {
				const imageDataUrl = e.target?.result?.toString() || "";
				fieldChange(imageDataUrl);
				setBg(imageDataUrl);
			};
			fileReader.readAsDataURL(file);
		}
	};
	return (
		<>
			<FormControl>
				<Input
					className="account-form_image-input hidden"
					type="file"
					placeholder="Upload your profile image"
					accept="image/*"
					onChange={(e) => handleImage(e, action)}
				/>
			</FormControl>
		</>
	);
};
export default ImageUpload;
