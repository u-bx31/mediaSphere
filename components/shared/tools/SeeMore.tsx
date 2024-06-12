import React, { useState } from "react";

const SeeMore = ({
	text,
	maxLength,
	className,
}: {
	text: string;
	maxLength: number;
	className: string;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};
	const isTextLong = text.length > maxLength;
	return (
		<div className={className}>
			<p className="inline">
				{isExpanded || !isTextLong ? text : `${text.slice(0, maxLength)}...`}
			</p>
			{isTextLong && (
				<button
					className="ml-2 text-blue-500 hover:underline focus:outline-none"
					onClick={toggleExpanded}>
					{isExpanded ? "See Less" : "See More"}
				</button>
			)}
		</div>
	);
};

export default SeeMore;
