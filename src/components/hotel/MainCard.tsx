import React from "react";
import styles from "@/styles/hotel/MainCard.module.css";
import SideHeader from "../header/SideHeader";
import MainBody from "../mainbody/MainBody";
import { data } from "@/services/api/data";

const MainCard = () => {
  console.log("data", data);
  return (
    <div className={styles.container}>
      <SideHeader />
      <MainBody />
    </div>
  );
};

export default MainCard;
