import React, { useContext } from "react";
import styles from "@/styles/mainbody/searchdiv/SearchDiv.module.css";
import RowOne from "./RowOne";
import RowTwo from "./RowTwo";
import { hotelContext } from "@/services/store/HotelContext";

const SearchDiv = () => {
  const { user } = useContext(hotelContext);
  return (
    <div className={styles.container}>
      <RowOne />
      <RowTwo />
    </div>
  );
};

export default SearchDiv;
