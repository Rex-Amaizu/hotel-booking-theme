import React, { useEffect, useState } from "react";

interface Props {
  text: string;
  id: number;
  isId: number;
}

const FlightTrip = ({ text, id, isId }: Props) => {
  const [activeId, setActiveId] = useState<number>(0);
  useEffect(() => {
    console.log("ac", isId);
    setActiveId(isId);
  }, [isId]);
  return (
    <div
      className={`${
        activeId === id ? "text-white bg-[#d6a217]" : "text-white bg-[#3d5654]"
      } flex items-center justify-center text-ss sl:text-xs xl:text-sm font-semibold h-[40px] w-[70px] sl:w-[80px] xl:w-[110px] rounded-3xl cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default FlightTrip;
