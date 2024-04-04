import React, { useContext } from "react";
import Image from "next/image";
import { hotelContext } from "@/services/store/HotelContext";
import styles from "@/styles/mainbody/searchdiv/TravelCities.module.css";
import RowItems from "./RowItems";
import TwoWayImg from "../../../../public/assets/images/twoWayIcon.png";

const TravelCities = () => {
  const { flightDetails } = useContext(hotelContext);

  const depCity = flightDetails.departureCity;
  const depAirport = flightDetails.destinationAirport;
  const desCity = flightDetails.destinationCity;
  const desAirport = flightDetails.destinationAirport;
  const depCityLabel = depCity + " " + depAirport;
  const desCityLabel = desCity + " " + desAirport;

  const rowData = {
    locationImg: "/assets/images/locationIcon.png",
    label: depCityLabel,
    bgColor: "bg-[#e1eceb]",
    labelColor: "text-[#425c5a]",
  };

  const rowData2 = {
    locationImg: "/assets/images/locationIcon.png",
    label: desCityLabel,
    bgColor: "bg-[#e1eceb]",
    labelColor: "text-[#425c5a]",
  };
  return (
    <div className={styles.container}>
      <RowItems
        locationImage={rowData.locationImg}
        label={rowData.label}
        bgColor={rowData.bgColor}
        labelColor={rowData.labelColor}
      />
      <Image
        className="h-[15px] mdx:h-[20px] sl:h-[40px] w-[20px] mdx:w-[30px] sl:w-[50px]"
        src={TwoWayImg}
        alt="two way"
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

export default TravelCities;
