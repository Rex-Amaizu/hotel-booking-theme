import React, { useState } from "react";
import styles from "@/styles/mainbody/searchdiv/FlightType.module.css";
import Trip from "./Trip";

const tripData = [
  {
    text: "ONE WAY",
    id: 1,
  },
  {
    text: "ROUND TRIP",
    id: 2,
  },
  {
    text: "MULTI CITY",
    id: 3,
  },
];

const FlightType = () => {
  const [active, setActive] = useState<number>(1);

  return (
    <div className={styles.container}>
      {tripData.map((t) => (
        <div
          onClick={() => {
            setActive(t.id);
          }}
        >
          <Trip text={t.text} key={t.id} id={t.id} isId={active} />
        </div>
      ))}
    </div>
  );
};

export default FlightType;
