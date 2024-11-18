"use client";
import { MyBarChart } from "@/components/BarChart";
import { useGlobalContext } from "@/context/ContextApi";

export default function Home() {
  const {
    formattedDataObject: { formattedData },
  } = useGlobalContext();

  console.log(formattedData);

  // {"Day":"4/10/2022","Age":"15-25","Gender":"Male","A":"880","B":"815","C":"825","D":"444","E":"154","F":"859"}
  // {"Day":"4/10/2022","Age":">25","Gender":"Male","A":"955","B":"674","C":"427","D":"401","E":"820","F":"311"}
  // {"Day":"4/10/2022","Age":"15-25","Gender":"Female","A":"777","B":"711","C":"817","D":"167","E":"85","F":"704"}
  // {"Day":"4/10/2022","Age":">25","Gender":"Female","A":"895","B":"236","C":"276","D":"373","E":"840","F":"891"}

  return (
    <div className="">
      <div className="">
        {formattedData?.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div>
      {/* <MyBarChart /> */}
    </div>
  );
}
