import React from "react";
import Image from "next/image";
import PriceTagImg from "../../../../public/assets/images/priceActionTag.png";

const PriceAction = () => {
  return (
    <div className="flex flex-col relative w-full h-[100px] pt-4">
      <hr className="w-full border-[#597472] border-1"></hr>
      <div className="flex flex-col items-start justify-center gap-1 w-auto absolute top-0">
        <div className="w-[100px] flex items-center justify-center">
          <div className="w-[30px] h-[30px] rounded-50g bg-[#d6a217]"></div>
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <Image
            className="w-[100px] h-[60px]"
            src={PriceTagImg}
            alt="price tag"
          />
          <p className="font-medium text-xs text-white absolute top-[30px]">
            $500
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceAction;
