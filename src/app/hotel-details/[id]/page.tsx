"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/global/Header";
import headerStyles from "@/styles/header/SecondHeader.module.css";
import styles from "@/styles/hotel/HotelDetails.module.css";
import HotelCard from "@/components/hotel/HotelCard";
import { fromAddress, setKey } from "react-geocode";
import GoogleMap from "@/components/global/GoogleMap";
import { hotelContext } from "@/services/store/HotelContext";
import { retrieveHotels } from "@/services/api/LocalStorage";
import { CircularProgress, Stack } from "@mui/material";
import { useMedia } from "@/hooks/useResponsive";

const page = () => {
  const [latitude, setLatitude] = useState<number>(40.712776);
  const [longitude, setLongitude] = useState<number>(-74.005974);
  const [loading, setLoading] = useState<boolean>(true);
  const mobileDevice = useMedia("(max-width: 480px)");

  // getting state values from context
  const { setHotel, hotel } = useContext(hotelContext);
  const router = useRouter();
  const idObj = useParams();
  const { id } = idObj;

  // setting geocode key
  setKey(
    process.env.NEXT_PUBLIC_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_MAPS_API_KEY
      : ""
  );

  // setting coordinates and markers
  const defaultCenter = { lat: latitude, lng: longitude };
  const markers = [
    {
      position: { lat: latitude, lng: longitude },
      content: hotel.address,
    },
  ];

  useEffect(() => {
    // retrieving hotels data from loaclstorage
    const storageHotels = retrieveHotels("hotels");

    // validating hotels data
    if (!storageHotels || storageHotels === null) return;

    // initiating a constant data for hotels
    const allHotels = storageHotels;

    // validating/fetching the hotel object that that matches params id
    const findHotel = allHotels.find((obj) => {
      return obj.id === id;
    });

    // validating hotel object
    if (!findHotel) return;

    // checking to make sure hotel object !== hotel context state
    if (findHotel === hotel) {
      return;
    } else {
      // setting hotel context state to hotel object from local storage
      setHotel(findHotel);

      // getting the coordinates of the hotel address
      fromAddress(findHotel.address)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          // setting the coordinates to state
          setLatitude(lat);
          setLongitude(lng);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [loading]);

  // function takes page back to the previous url
  const onClickHandler = () => {
    router.back();
  };

  if (Object.keys(hotel).length === 0)
    return (
      <div className="w-full flex items-center justify-center mt-5">
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress sx={{ color: "#ff8000" }} />
        </Stack>
      </div>
    );
  return (
    <>
      <Header buttonText="Go Back" onClick={onClickHandler} />
      <div className={headerStyles.container}>
        <div
          id=""
          className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center justify-center w-4/5 md:w-3/5 h-[40px]"
        >
          <label className="text-white italic font-bold text-xs ms:text-base lg:text-xl">
            {hotel?.name}
            {!mobileDevice && ":"}
          </label>
          <p className="text-[#808080] font-bold text-sxs ms:text-sm lg:text-base">
            {hotel?.address}
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <div className="w-full h-auto">
          <HotelCard
            name={hotel.name}
            city={hotel.city}
            country={hotel.country}
            address={hotel.address}
            picture={hotel.picture}
            id={hotel.id}
            chain={hotel.chain}
            ranking={hotel?.ranking}
          />
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress sx={{ color: "#ff8000" }} />
            </Stack>
          </div>
        ) : (
          <div className="w-full h-[400px]">
            <GoogleMap defaultCenter={defaultCenter} markers={markers} />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
