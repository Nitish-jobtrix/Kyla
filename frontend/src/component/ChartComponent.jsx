import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const data = [
  {
    name: "January",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Febuary",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "August",
    uv: 2400,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "September",
    uv: 1700,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "October",
    uv: 3300,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "November",
    uv: 2030,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "December",
    uv: 3900,
    pv: 4300,
    amt: 2100,
  },
];

const ChartComponent = () => {
  return (
    <ChartContainer>
      <h3>Monthly Applicants</h3>
      <br></br>
    <ResponsiveContainer width="100%" aspect="3">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ChartComponent;



const ChartContainer=styled.div`
background:white;
padding:20px;
border-radius:10px;
width:69%;
`