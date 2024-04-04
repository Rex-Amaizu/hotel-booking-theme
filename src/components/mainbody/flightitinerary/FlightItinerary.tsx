import React from "react";
import FlightMap from "./FlightMap";
import styles from "@/styles/mainbody/flightitinerary/FlightItinerary.module.css";
import FlightList from "./FlightList";

const FlightItinerary = () => {
  return (
    <div className={styles.container}>
      <FlightList />
      <FlightMap />
    </div>
  );
};

export default FlightItinerary;
