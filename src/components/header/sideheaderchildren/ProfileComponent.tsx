import React, { useContext } from "react";
import { hotelContext } from "@/services/store/HotelContext";
import styles from "@/styles/header/ProfileComponent.module.css";
import CircleProfile from "./CircleProfile";

const ProfileComponent = () => {
  const { user } = useContext(hotelContext);
  return (
    <div className={styles.container}>
      <CircleProfile />
      <label className="text-white text-base font-semibold">
        {user.travellerName}
      </label>
      <p className="text-white text-xs font-light">{user.travellerEmail}</p>
    </div>
  );
};

export default ProfileComponent;
