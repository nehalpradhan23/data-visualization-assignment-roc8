import { useGlobalContext } from "@/context/ContextApi";
import { SheetDataObject } from "@/types/types";
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

export const MyBarChart = () => {
  const {
    formattedDataObject: { formattedData },
  } = useGlobalContext();

  interface DataObject {
    Day: string;
    Age: string;
    Gender: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
  }
  const aggregateData = (data: DataObject[]) => {
    const result: { [key: string]: number } = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    data.forEach((entry) => {
      result.A += entry.A;
      result.B += entry.B;
      result.C += entry.C;
      result.D += entry.D;
      result.E += entry.E;
      result.F += entry.F;
    });
    return [
      { name: "A", total: result.A },
      { name: "B", total: result.B },
      { name: "C", total: result.C },
      { name: "D", total: result.D },
      { name: "E", total: result.E },
      { name: "F", total: result.F },
    ];
  };

  const transformedData = aggregateData(formattedData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      {" "}
      <BarChart
        layout="vertical"
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {" "}
        <CartesianGrid strokeDasharray="3 3" /> <XAxis type="number" />{" "}
        <YAxis type="category" dataKey="name" /> <Tooltip /> <Legend />{" "}
        <Bar dataKey="total" fill="#8884d8" />{" "}
      </BarChart>{" "}
    </ResponsiveContainer>
  );
};
