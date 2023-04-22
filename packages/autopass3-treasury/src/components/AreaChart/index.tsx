import {
  Area,
  AreaChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { YieldData } from "@/data";
import { AxisText } from "./style";

const InvestmentAreaChart = () => {
  console.log(YieldData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={YieldData}
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient> */}
        </defs>
        <XAxis
          dataKey="duration"
          name="No. Years"
          axisLine
          interval="preserveStartEnd"
          type="number"
        >
          <Label
            content={<AxisText>No. of Years</AxisText>}
            position="insideBottom"
          />
        </XAxis>
        <YAxis dataKey="yield" />
        <Tooltip />
        <Area
          type="linear"
          dataKey="yield"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InvestmentAreaChart;
