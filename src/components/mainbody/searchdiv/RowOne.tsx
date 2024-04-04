import React, { useContext } from "react";
import { hotelContext } from "@/services/store/HotelContext";
import TravelCities from "./TravelCities";
import styles from "@/styles/mainbody/searchdiv/RowOne.module.css";

import RowItems from "./RowItems";

const RowOne = () => {
  const { flightDetails } = useContext(hotelContext);
  const date = flightDetails.flightDate;

  const rowData = {
    locationImg: "/assets/images/calendarIcon.png",
    label: date,
    bgColor: "bg-[#e1eceb]",
    labelColor: "text-[#425c5a]",
  };

  const rowData2 = {
    locationImg: "/assets/images/userIcon.png",
    label: "TRAVELLER",
    bgColor: "bg-[#e1eceb]",
    labelColor: "text-[#425c5a]",
  };

  return (
    <div className={styles.container}>
      <TravelCities />

      <RowItems
        locationImage={rowData.locationImg}
        label={rowData.label}
        bgColor={rowData.bgColor}
        labelColor={rowData.labelColor}
      />
      <RowItems
        locationImage={rowData2.locationImg}
        label={rowData2.label}
        bgColor={rowData2.bgColor}
        labelColor={rowData2.labelColor}
      />
    </div>
  );
};

export default RowOne;
