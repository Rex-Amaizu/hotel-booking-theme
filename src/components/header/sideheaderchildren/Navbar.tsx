import React, { useState } from "react";
import styles from "@/styles/header/Navbar.module.css";
import Dashboard from "./Dashboard";
import Flights from "./Flights";
import Wallet from "./Wallet";
import Custom from "./Custom";
import ActiveUsers from "./ActiveUsers";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfileComponentMobile from "./ProfileComponetMobile";

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

const Navbar = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const toggleNavbar = () => {
    setNavbar(!navbar);
  };
  return (
    <div className="flex flex-col">
      <GiHamburgerMenu
        onClick={toggleNavbar}
        style={{
          cursor: "pointer",
          width: "50px",
          height: "50px",
          color: "#3d5654",
        }}
      />
      {navbar && (
        <div className={styles.container}>
          <ProfileComponentMobile showNav={toggleNavbar} />
          <Dashboard />
          <Flights />
          <Wallet />
          {customData.map((data: any) => (
            <Custom customImg={data.customImg} label={data.label} />
          ))}
          <ActiveUsers />
        </div>
      )}
    </div>
  );
};

export default Navbar;
