import React from "react";
import Image from "next/image";
import Demarcation from "./Demarcation";

interface Props {
  airLine: string;
  airLineLogoImg: string;
  from: string;
  to: string;
  flightDuration: string;
  flightType: string;
  departureTime: string;
  arrivalTime: string;
  flightPrice: string;
  lastFlight: boolean;
  firstFlight: boolean;
}

const Flightt = ({
  airLine,
  airLineLogoImg,
  from,
  to,
  flightDuration,
  flightType,
  departureTime,
  arrivalTime,
  flightPrice,
  lastFlight,
  firstFlight,
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex flex-row items-center justify-between w-full bg-white h-[155px] ${
          (lastFlight && "rounded-b-[20px]") ||
          (firstFlight && "rounded-t-[20px]") ||
          (!firstFlight && !lastFlight && "rounded-none")
        } p-5`}
      >
        <Image src={airLineLogoImg} alt="" width={60} height={50} />
        <div className="flex flex-col w-auto h-auto gap-5">
          <label className="text-[#425c5a] text-sm sl:text-base font-semibold">
            {from}
          </label>
          <p className="text-[#425c5a] text-ss sl:text-xs font-light">
            {departureTime}
          </p>
        </div>
        <div className="flex flex-col w-auto h-auto gap-[10px]">
          <h5 className="text-[#425c5a] text-sxs sl:text-ss font-medium">
            {airLine}
          </h5>
          <h3 className="text-[#d6a217] text-ss sl:text-xs font-medium">
            {flightDuration}
          </h3>
          <h2 className="text-[#425c5a] text-ss sl:text-xs font-medium">
            {flightType}
          </h2>
        </div>
        <div className="flex flex-col w-auto h-auto gap-5">
          <h1 className="text-[#425c5a] text-sm sl:text-base font-semibold">
            {to}
          </h1>
          <p className="text-[#425c5a] text-ss sl:text-xs font-light">
            {arrivalTime}
          </p>
        </div>
        <div className="flex flex-col w-auto h-auto gap-[10px] items-start">
          <label className="text-[#425c5a] text-ss sl:text-xs font-semibold self-end">
            {flightPrice}
          </label>
          <button className="flex items-center justify-center bg-[#d6a217] h-[30px] w-[60px] sl:w-[80px] text-white text-sxs sl:text-ss font-semibold rounded-2xl">
            BOOK NOW
          </button>
        </div>
      </div>
      {!lastFlight && <Demarcation />}
    </div>
  );
};

export default Flightt;
