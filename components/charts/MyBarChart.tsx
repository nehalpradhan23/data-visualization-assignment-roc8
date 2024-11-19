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
  LabelList,
  Brush,
  ReferenceLine,
} from "recharts";

export const MyBarChart = () => {
  const {
    formattedDataObject: { formattedData },
    selectedBarValueObject: { selectedBarValue, setSelectedBarValue },
  } = useGlobalContext();

  // aggregate data ============================
  const aggregateData = (data: SheetDataObject[]) => {
    const result: { [key: string]: number } = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    data.forEach((entry) => {
      result.A += parseInt(entry.A, 10);
      result.B += parseInt(entry.B, 10);
      result.C += parseInt(entry.C, 10);
      result.D += parseInt(entry.D, 10);
      result.E += parseInt(entry.E, 10);
      result.F += parseInt(entry.F, 10);
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
  // ------------------------------------------
  const transformedData = aggregateData(formattedData);
  console.log("transformed data: ", transformedData);

  const handleBarClick = (data: any) => {
    console.log(data);
    setSelectedBarValue(data.name);
  };

  // ===================================================
  return (
    <div className="w-[40%] max-md:w-full max-lg:w-[60%]">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          layout="vertical"
          data={transformedData}
          margin={{
            top: 20,
            right: 40,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill="blue"
            barSize={20}
            onClick={handleBarClick}
          >
            <LabelList dataKey="total" position="right" />
          </Bar>
          {/* <Brush dataKey="name" height={30} stroke="#8884d8" />{" "}
          <ReferenceLine x="someValue" stroke="red" label="Min" />{" "}
          <ReferenceLine x="someValue" stroke="red" label="Max" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
