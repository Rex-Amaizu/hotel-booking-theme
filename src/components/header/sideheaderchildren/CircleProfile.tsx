import React from "react";
import Image from "next/image";
import styles from "@/styles/header/CircleProfile.module.css";
import ProfileImg from "../../../../public/assets/images/profileImage.png";

const CircleProfile = () => {
  return (
    <div className={styles.circleContainer}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}>
        {" "}
        <Image
          className="h-[70px] w-[70px] rounded-[50%] absolute"
          src={ProfileImg}
          alt="profile"
        />
      </div>
    </div>
  );
};

export default CircleProfile;
