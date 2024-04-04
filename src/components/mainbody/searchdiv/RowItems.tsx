import React from "react";
import Image from "next/image";

interface Props {
  locationImage?: string;
  label?: string;
  bgColor?: string;
  labelColor?: string;
}

const RowItems = ({ locationImage, label, bgColor, labelColor }: Props) => {
  return (
    <div
      className={`flex flex-col sm:flex-row h-[50px] gap-1 md:gap-2 items-center justify-center ${bgColor} w-[90px] mdx:w-[140px] sl:w-[200px] rounded-3xl`}
    >
      {locationImage === null || locationImage === undefined ? null : (
        <Image
          className="h-[15px] mdx:h-[20px] sl:h-[25px] w-[15px] mdx:w-[20px] sl:w-[25px]"
          src={locationImage}
          alt="locationIcon"
          width={20}
          height={20}
        />
      )}
      <label
        className={`${labelColor} text-sxs sm:text-ss sl:text-xs font-semibold`}
      >
        {label}
      </label>
    </div>
  );
};

export default RowItems;
