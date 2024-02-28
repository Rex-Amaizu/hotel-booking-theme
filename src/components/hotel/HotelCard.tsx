import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRating } from "@/hooks/useRating";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineStarHalf,
} from "react-icons/md";

// Defining the prop types
interface Props {
  name: string;
  city: string;
  country: string;
  address: string;
  picture: string;
  id: string;
  chain: string;
  ranking?: string;
}

const HotelCard = ({
  name,
  city,
  country,
  address,
  picture,
  id,
  chain,
  ranking,
}: Props) => {
  const router = useRouter();

  // dynamic router to show specific card
  const onClickHandler = () => {
    router.push("/hotel-details/" + id);
  };

  return (
    <>
      <div
        className="pb-2 cursor-pointer pl-3 pr-3 lg:pl-2 lg:pr-2 sl:pl-1 sl:pr-1"
        onClick={onClickHandler}
        key={id}
      >
        <Image
          className="rounded-xl"
          src={picture}
          alt="hotel pic"
          width={800}
          height={800}
          style={{ width: "400px", height: "300px" }}
        />

        <label className="text-black font-bold text-xs">{name}</label>
        <p className="text-[#808080] font-bold text-xs">
          {city}, {country}
        </p>

        {ranking !== undefined && (
          <div className="flex flex-row gap-[1px]" key={id}>
            {Array(useRating(Number(ranking))?.[0]).fill(
              <MdOutlineStar className="text-[#ff8000]" />
            )}
            {Array(useRating(Number(ranking))?.[1]).fill(
              <MdOutlineStarHalf className="text-[#ff8000]" />
            )}
            {Array(useRating(Number(ranking))?.[2]).fill(
              <MdOutlineStarBorder className="text-[#ff8000]" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HotelCard;
