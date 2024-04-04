import React from "react";
import styles from "@/styles/header/ProfileComponent.module.css";
import CircleProfile from "./CircleProfile";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Props {
  showNav: any;
}

const ProfileComponentMobile = ({ showNav }: Props) => {
  return (
    <div className={styles.container}>
      <IoCloseCircleOutline
        onClick={showNav}
        style={{
          cursor: "pointer",
          width: "50px",
          height: "50px",
          color: "white",
          alignSelf: "flex-start",
          position: "absolute",
          top: "2",
        }}
      />
      <CircleProfile />
      <label className="text-white text-base font-semibold">ALEX JOHNSON</label>
      <p className="text-white text-xs font-light">alexjohnson@gmail.com</p>
    </div>
  );
};

export default ProfileComponentMobile;
