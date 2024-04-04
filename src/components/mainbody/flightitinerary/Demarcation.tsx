import React from "react";

const Demarcation = () => {
  return (
    <div className="flex flex-row w-full items-center justify-center bg-white relative">
      <div className="w-[25px] h-[25px] rounded-[50%] bg-[#e1eceb] absolute left-[-15px]"></div>
      <hr className="w-full border-dashed border-0.5 border-[#e3eeed]"></hr>
      <div className="w-[25px] h-[25px] rounded-[50%] bg-[#e1eceb] absolute right-[-15px]"></div>
    </div>
  );
};

export default Demarcation;
