import React from "react";
import Image from "next/image";
import styles from "@/styles/header/Flights.module.css";
import FlightImg from "../../../../public/assets/images/flightIcon.png";

const Flights = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flight}>
        <Image className="h-[25px] w-[30px]" src={FlightImg} alt="flight" />
        <label className="text-[#666666] text-sm font-medium">FLIGHTS</label>
      </div>
    </div>
  );
};

export default Flights;
