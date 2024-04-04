import React from "react";
import styles from "@/styles/header/SideHeader.module.css";
import ProfileComponent from "./sideheaderchildren/ProfileComponent";
import Dashboard from "./sideheaderchildren/Dashboard";
import Flights from "./sideheaderchildren/Flights";
import Wallet from "./sideheaderchildren/Wallet";
import Custom from "./sideheaderchildren/Custom";
import ActiveUsers from "./sideheaderchildren/ActiveUsers";
import { useMedia } from "@/hooks/useResponsive";
import Navbar from "./sideheaderchildren/Navbar";

const customData = [
  {
    customImg: "/assets/images/reportsIcon.png",
    label: "REPORTS",
  },
  {
    customImg: "/assets/images/statisticsIcon.png",
    label: "STATISTICS",
  },
  {
    customImg: "/assets/images/settingsIcon.png",
    label: "SETTINGS",
  },
];

const SideHeader = () => {
  const tabletDevice = useMedia("(max-width: 976px)");
  return (
    <>
      {tabletDevice ? (
        <Navbar />
      ) : (
        <div className={styles.container}>
          <ProfileComponent />
          <Dashboard />
          <Flights />
          <Wallet />
          {customData.map((data: any) => (
            <Custom customImg={data.customImg} label={data.label} />
          ))}
          <ActiveUsers />
        </div>
      )}
    </>
  );
};

export default SideHeader;
