import React, { useState } from "react";
import styles from "@/styles/mainbody/flightitinerary/Stop.module.css";
import FlightTrip from "./FlightTrip";
import PriceAction from "./PriceAction";

const tripData = [
  {
    text: "NON STOP",
    id: 1,
  },
  {
    text: "ONE STOP",
    id: 2,
  },
  {
    text: "MORE STOP",
    id: 3,
  },
];

const Stop = () => {
  const [active, setActive] = useState<number>(1);
  return (
    <div className={styles.container}>
      <div className="flex flex-row w-full items-center justify-between">
        {tripData.map((t) => (
          <div
            onClick={() => {
              setActive(t.id);
            }}
          >
            <FlightTrip text={t.text} key={t.id} id={t.id} isId={active} />
          </div>
        ))}
      </div>
      <label className="text-sm font-semibold text-white pr-3 pl-3 mt-3">
        PRICE
      </label>
      <PriceAction />
    </div>
  );
};

export default Stop;
