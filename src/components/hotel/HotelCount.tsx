import React from "react";
import styles from "@/styles/hotel/HotelCount.module.css";

interface Props {
  hotelCount: number;
  hotelChainCount: number;
}

const HotelCount = ({ hotelChainCount, hotelCount }: Props) => {
  return (
    <>
      <div className={styles.body}>
        <div>
          <h1>{hotelChainCount}</h1>
          <p>Hotel Chain(s)</p>
        </div>
        <div>
          <h1>{hotelCount}</h1>
          <p>Hotel(s)</p>
        </div>
      </div>
    </>
  );
};

export default HotelCount;
