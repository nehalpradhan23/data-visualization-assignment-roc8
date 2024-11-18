"use client";
import { useGlobalContext } from "@/context/ContextApi";

export default function Home() {
  const {
    formattedDataObject: { formattedData },
  } = useGlobalContext();

  console.log(formattedData);

  return (
    <div className="">
      <div className="">
        {formattedData?.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  );
}
