import React, { useEffect, useState } from "react";

interface Props {
  text: string;
  id: number;
  isId: number;
}

const Trip = ({ text, id, isId }: Props) => {
  const [activeId, setActiveId] = useState<number>(0);
  useEffect(() => {
    setActiveId(isId);
  }, [isId]);
  return (
    <div
      className={`${
        activeId === id
          ? "text-white bg-[#425c5a]"
          : "text-[#425c5a] bg-[#e1eceb]"
      } flex items-center justify-center text-sxs mdx:text-ss sl:text-xs xl:text-sm font-semibold h-[40px] w-[50px] mdx:w-[80px] xl:w-[110px] rounded-3xl cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default Trip;
