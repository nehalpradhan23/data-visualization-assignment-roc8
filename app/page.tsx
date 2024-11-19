"use client";
import { MyBarChart } from "@/components/charts/MyBarChart";
import { MyLineChart } from "@/components/charts/MyLineChart";
import { Filters } from "@/components/filters/Filters";
import { useGlobalContext } from "@/context/ContextApi";

export default function Home() {
  const {
    formattedDataObject: { formattedData },
    selectedBarValueObject: { selectedBarValue },
  } = useGlobalContext();

  // console.log("formatted data: ", formattedData);

  // {"Day":"4/10/2022","Age":"15-25","Gender":"Male","A":"880","B":"815","C":"825","D":"444","E":"154","F":"859"}
  // {"Day":"4/10/2022","Age":">25","Gender":"Male","A":"955","B":"674","C":"427","D":"401","E":"820","F":"311"}
  // {"Day":"4/10/2022","Age":"15-25","Gender":"Female","A":"777","B":"711","C":"817","D":"167","E":"85","F":"704"}
  // {"Day":"4/10/2022","Age":">25","Gender":"Female","A":"895","B":"236","C":"276","D":"373","E":"840","F":"891"}

  return (
    <div className="">
      {/* <div className="">
        {formattedData?.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div> */}
      <div className="flex w-full">
        <MyBarChart />
        <Filters />
        {/* {selectedBarValue && <Filters />} */}
      </div>
      {selectedBarValue && (
        <div className="">
          <div className="text-center text-3xl font-bold">
            Line chart for: {selectedBarValue}
          </div>
          <MyLineChart />
        </div>
      )}
    </div>
  );
}
