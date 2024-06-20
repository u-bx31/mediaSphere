"use client";
import Chart from "./Chart";

const AnalyticComponent = ({viewCount}: any) => {

	const data = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];
	return (
		<div className="flex flex-col w-full bg-white rounded-xl p-2 md:p-10 mt-5">
			<div className="flex flex-col gap-4">
				<h1 className="text-lg font-bold">Account Views </h1>
				<div className=" w-full h-[400px] ">
					<Chart data={viewCount || [{ _id: "", count: 0 }]} />
				</div>
			</div>
		</div>
	);
};

export default AnalyticComponent;
