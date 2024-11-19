import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataObject {
  Day: string;
  Age: string;
  Gender: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
}

// const data: DataObject[] = [
//   {
//     Day: "4/10/2022",
//     Age: "15-25",
//     Gender: "Male",
//     A: "880",
//     B: "815",
//     C: "825",
//     D: "444",
//     E: "154",
//     F: "859",
//   },
//   {
//     Day: "4/10/2022",
//     Age: ">25",
//     Gender: "Male",
//     A: "955",
//     B: "674",
//     C: "427",
//     D: "401",
//     E: "820",
//     F: "311",
//   },
//   {
//     Day: "4/10/2022",
//     Age: "15-25",
//     Gender: "Female",
//     A: "777",
//     B: "711",
//     C: "817",
//     D: "167",
//     E: "85",
//     F: "704",
//   },
//   {
//     Day: "4/10/2022",
//     Age: ">25",
//     Gender: "Female",
//     A: "895",
//     B: "236",
//     C: "276",
//     D: "373",
//     E: "840",
//     F: "891",
//   },
//   {
//     Day: "5/10/2022",
//     Age: "15-25",
//     Gender: "Male",
//     A: "504",
//     B: "95",
//     C: "597",
//     D: "812",
//     E: "408",
//     F: "102",
//   },
// ];

// No need to aggregate as strings are not mathematically summed.
const aggregateData = (data: DataObject[]) => {
  return [
    { name: "A", total: data.map((d) => d.A).join(", ") },
    { name: "B", total: data.map((d) => d.B).join(", ") },
    { name: "C", total: data.map((d) => d.C).join(", ") },
    { name: "D", total: data.map((d) => d.D).join(", ") },
    { name: "E", total: data.map((d) => d.E).join(", ") },
    { name: "F", total: data.map((d) => d.F).join(", ") },
  ];
};

const transformedData = aggregateData(data);

const MyHorizontalBarChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      layout="vertical"
      data={transformedData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default MyHorizontalBarChart;
