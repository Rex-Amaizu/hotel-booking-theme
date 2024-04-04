import React, { useContext } from "react";
import { hotelContext } from "@/services/store/HotelContext";
import styles from "@/styles/mainbody/searchdiv/RowTwo.module.css";
import RowItems from "./RowItems";
import FlightType from "./FlightType";

const RowTwo = () => {
  const { flightDetails } = useContext(hotelContext);

  const flyClass = flightDetails.flightClass;

  const rowData = {
    locationImg: "/assets/images/firstClassIcon.png",
    label: flyClass,
    bgColor: "bg-[#e1eceb]",
    labelColor: "text-[#425c5a]",
  };

  const rowData2 = {
    locationImg: "",
    label: "SEARCH",
    bgColor: "bg-[#d6a217]",
    labelColor: "text-[#ffffff]",
  };
  return (
    <div className={styles.container}>
      <FlightType />
      <RowItems
        locationImage={rowData.locationImg}
        label={rowData.label}
        bgColor={rowData.bgColor}
        labelColor={rowData.labelColor}
      />
      <RowItems
        label={rowData2.label}
        bgColor={rowData2.bgColor}
        labelColor={rowData2.labelColor}
      />
    </div>
  );
};

export default RowTwo;
