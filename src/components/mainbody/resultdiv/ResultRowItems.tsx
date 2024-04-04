import React from "react";
import Image from "next/image";
import { useMedia } from "@/hooks/useResponsive";

interface Props {
  picture?: string;
  label?: string;
  bgColor?: string;
  labelColor?: string;
  height: string;
  width: string;
  getShow: any;
}

const ResultRowItems = ({
  picture,
  label,
  bgColor,
  labelColor,
  width,
  height,
  getShow,
}: Props) => {
  const belowTabDevice = useMedia("(max-width: 720px)");
  return (
    <div
      className={`flex flex-row ${height} gap-2 items-center justify-center ${bgColor} ${width} rounded-3xl`}
    >
      <label className={`${labelColor} text-ss mdx:text-sm font-semibold`}>
        {label}
      </label>

      {picture === null || picture === undefined ? null : (
        <Image
          className="h-[10px] mdx:h-[15px] w-[12px] mdx:w-[18px] cursor-pointer"
          src={picture}
          alt="locationIcon"
          width={belowTabDevice ? 10 : 15}
          height={belowTabDevice ? 8 : 12}
          onClick={getShow}
        />
      )}
    </div>
  );
};

export default ResultRowItems;
