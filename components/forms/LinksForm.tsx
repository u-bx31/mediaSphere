"use client";
import { mediaOptions } from "@/constants";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

interface SocialLink {
	label: string;
	value: string;
	icons: any;
}

const LinksForm = () => {
	const [mediaLinks, setMediaLinks] = useState<SocialLink[]>([]);

	let Options = mediaOptions.filter(
		(link) => !mediaLinks.find((v1) => link.value === v1.value)
	);

	const handleAddingLinks = (val: any) => {
		setMediaLinks((prev) => [...prev, val]);
	};

	const handleRemoveOptions = (val: any) => {
		setMediaLinks(mediaLinks.filter((vl) => vl.value !== val));
	};
	return (
		<div className="bg-white rounded-xl overflow-hidden w-full lg:w-[1000px] relative">
			<div className="p-5 flex flex-col gap-2">
				<div className="flex flex-wrap gap-2">
					{Options.map((vals) => {
						return (
							<button
								className="flex flex-row gap-1 items-center p-2 bg-gray-100 rounded-md hover:bg-slate-200"
								onClick={() => handleAddingLinks(vals)}>
								<div className="">{vals.icon}</div>
								<p>{vals.label.slice(0, 1).toUpperCase() + vals.label.slice(1)}</p>
								<div className="">
									<Plus className="w-5 h-5 stroke-black" />
								</div>
							</button>
						);
					})}
				</div>
				<div className="w-100 flex flex-col gap-3 mx-8 mt-5">
					{mediaLinks.map((vl: any,index) => {
						return (
							<div className=" w-100 flex flex-row gap-3 items-center" key={index}>
								<div className="">{vl.icon}</div>
								<Input type="text" className="w-full " />
								<button
									className="bg-red-500 rounded-full p-1"
									onClick={() => handleRemoveOptions(vl.value)}>
									<X className="w-3 h-3 stroke-white" />
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default LinksForm;
