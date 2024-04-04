import React from "react";
import Image from "next/image";
import styles from "@/styles/mainbody/flightitinerary/BigMap.module.css";
import BigMapImg from "../../../../public/assets/images/bigMap.png";

interface Props {
  departureCity: string;
  destinationCity: string;
}

const BigMap = ({ departureCity, destinationCity }: Props) => {
  return (
    <div className={styles.container}>
      <h1 className="text-xs sl:text-sm text-white font-semibold absolute left-[40px] xms:left-[80px] md:left-7 top-[140px] md:top-[100px]">
        {departureCity}
      </h1>
      <h2 className="text-xs sl:text-sm text-white font-semibold absolute left-[200px] sms:left-[240px] sm:left-[220px] smx:left-[230px] xms:left-[290px] ms:left-[310px] msx:left-[355px] mdx:left-[385px] md:left-[115px] ls:left-[150px] sl:left-[160px] xl:left-[185px] top-[170px] md:top-[120px]">
        {destinationCity}
      </h2>
      <Image
        className="h-[350px] md:h-[250px] w-full md:w-[250px] xl:w-[330px]"
        src={BigMapImg}
        alt="big map"
      />
    </div>
  );
};

export default BigMap;
