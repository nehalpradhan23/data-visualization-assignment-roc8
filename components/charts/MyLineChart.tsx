import { useGlobalContext } from "@/context/ContextApi";
import { SheetDataObject } from "@/types/types";
import { getDate } from "@/utils/getDate";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MyLineChart = () => {
  const {
    selectedBarValueObject: { selectedBarValue },
    formattedDataObject: { formattedData },
  } = useGlobalContext();

  const getLineChartData = (category: string) => {
    return formattedData.map((entry) => ({
      // Day: entry.Day,
      Day: getDate(entry.Day),
      Value: parseInt(entry[category as keyof SheetDataObject] as string, 10),
    }));
  };

  const lineChartData = selectedBarValue
    ? getLineChartData(selectedBarValue)
    : [];
  // console.log("line chart data: ", lineChartData);

  // const getDate= getDate()
  // ==============================
  return (
    <div className="px-3 md:px-10 mt-5 max-md:h-[200px] h-[300px]">
      <ResponsiveContainer width="100%">
        {/* <ResponsiveContainer width="100%" height={300}> */}
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip /> <Legend />
          <Line type="monotone" dataKey="Value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
