"use client";

import { Card } from "@/components/interfaces/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define the structure of the chart data to represent assets and their distribution across networks
export interface ChartData {
  assetType: string; // For example: "Stable Coin", "NFT", "Token"
  polygon: number; // Value for Polygon network
  ethereum: number; // Value for Ethereum network
  mina: number; // Value for mina network
  other: number;   // Value for any other network
}

const AssetBarChart = ({ data }: { data: ChartData[] }) => {
  if (!data.length) return <p>You do not have access permission.</p>;
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="assetType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="polygon" fill="#8884d8" />
        <Bar dataKey="ethereum" fill="#82ca9d" />
        <Bar dataKey="mina" fill="#ffc658" />
        <Bar dataKey="other" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AssetPieChart = ({ data }: { data: ChartData[] }) => {
  const pieData = data.map((item) => ({
    name: item.assetType,
    value: item.polygon + item.ethereum + item.mina + item.other,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export function Charts({ data }: { data: ChartData[] }) {
  return (
    <Card className="w-full p-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold">Asset Distribution Analysis</h2>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <AssetBarChart data={data} />
          </div>
          <div className="w-1/2 pl-2">
            <AssetPieChart data={data} />
          </div>
        </div>
      </div>
    </Card>
  );
}
