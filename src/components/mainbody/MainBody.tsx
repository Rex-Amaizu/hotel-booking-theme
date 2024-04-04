import React from "react";
import styles from "@/styles/mainbody/MainBody.module.css";
import SearchDiv from "./searchdiv/SearchDiv";
import ResultRow from "./resultdiv/ResultRow";
import FlightItinerary from "./flightitinerary/FlightItinerary";

const MainBody = () => {
  return (
    <div className={styles.container}>
      <SearchDiv />
      <ResultRow />
      <FlightItinerary />
    </div>
  );
};

export default MainBody;
