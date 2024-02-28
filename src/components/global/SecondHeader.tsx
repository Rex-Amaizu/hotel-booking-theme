import React from "react";
import Image from "next/image";
import styles from "../../styles/header/SecondHeader.module.css";
import SearchIconImg from "../../../public/assets/images/searchInputIcon.svg";

const SecondHeader = () => {
  return (
    <div className={styles.container}>
      <div
        id=""
        className="flex flex-row items-center w-3/5 bg-white h-[40px] rounded-xl pl-6 pr-[24px] ms-pr-[0px] shadow-smWhite"
      >
        <Image className="" src={SearchIconImg} alt="search icon" />
        <input
          className="h-[35px] w-[70%] pl-6 ms:pl-12 outline-none"
          placeholder="Search for hotels by name"
          value=""
        />
      </div>
    </div>
  );
};

export default SecondHeader;
