"use client";
import React from "react";
import Image from "next/image";
import styles from "@/styles/app/App.module.css";
import MainCard from "@/components/hotel/MainCard";
import StraightWave from "../../public/assets/images/straightWave.png";
import MountainWave from "../../public/assets/images/mountainWave.png";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[1200px] items-center relative bg-[#e3f2f1]">
      {" "}
      <div className={styles.yellowCircle}></div>
      <Image
        className="hidden md:flex absolute right-0 h-full"
        src={StraightWave}
        alt="straight wave"
      />
      <Image
        className="hidden md:flex absolute left-[-150px] top-[35%]"
        src={MountainWave}
        alt="mountainWave wave"
      />
      <div className="hidden md:flex absolute bg-[#b4c8c7] h-[600px] bottom-0 left-0 right-0"></div>
      <MainCard />
    </div>
  );
}
