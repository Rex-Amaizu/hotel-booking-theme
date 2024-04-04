import React, { useContext } from "react";
import styles from "@/styles/mainbody/flightitinerary/FlightMap.module.css";
import BigMap from "./BigMap";
import Stop from "./Stop";
import { hotelContext } from "@/services/store/HotelContext";

const FlightMap = () => {
  const { flightDetails } = useContext(hotelContext);
  return (
    <div className={styles.container}>
      <div className="flex flex-row justify-between w-full items-center pl-5 pr-5 pt-5">
        <h3 className="text-white text-sm font-medium">From</h3>
        <h3 className="text-white text-sm font-medium">To</h3>
      </div>
      <div className="flex flex-row justify-between w-full items-center pl-5 pr-5">
        <h1 className="text-white text-base font-semibold">
          {flightDetails.departureAirport}
        </h1>
        <h3 className="text-white text-xs font-medium">NON-STOP</h3>
        <h1 className="text-white text-base font-semibold">
          {flightDetails.destinationAirport}
        </h1>
      </div>
      <BigMap
        departureCity={flightDetails.departureCity}
        destinationCity={flightDetails.destinationCity}
      />
      <Stop />
    </div>
  );
};

export default FlightMap;
