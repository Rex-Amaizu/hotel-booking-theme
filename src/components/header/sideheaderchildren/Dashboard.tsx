import React from "react";
import Image from "next/image";
import styles from "@/styles/header/Dashboard.module.css";
import HomeImg from "../../../../public/assets/images/homeIcon.png";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Image className="h-[25px] w-[30px]" src={HomeImg} alt="home" />
      <label className="text-white text-sm font-medium">DASHBOARD</label>
    </div>
  );
};

export default Dashboard;
