import React from "react";
import Image from "next/image";
import styles from "@/styles/header/Custom.module.css";

interface Props {
  customImg: string;
  label: string;
}

const Custom = ({ customImg, label }: Props) => {
  return (
    <div className={styles.container}>
      <Image
        className="h-[25px] w-[30px]"
        src={customImg}
        alt="custom icon"
        width={30}
        height={25}
      />
      <label className="text-white text-sm font-medium">{label}</label>
    </div>
  );
};

export default Custom;
