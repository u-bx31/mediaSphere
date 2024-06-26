"use client";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const Chart = ({ data }: { data: any }) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 10,
					bottom: 5,
				}}>
				<CartesianGrid strokeDasharray="1 3" />
				<XAxis axisLine={false} dataKey="_id" tickMargin={15} />
				<YAxis axisLine={false} tickMargin={10} />
				<Tooltip />
				<Line
					type="monotone"
					dataKey="count"
					strokeWidth={2}
					stroke="#0ead58"
					activeDot={{ r: 4 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Chart;
