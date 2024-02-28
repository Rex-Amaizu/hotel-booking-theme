"use client";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/global/Header";
import SearchIconImg from "../../public/assets/images/searchInputIcon.svg";
import styles from "@/styles/app/App.module.css";
import headerStyles from "@/styles/header/SecondHeader.module.css";
import HotelCard from "@/components/hotel/HotelCard";
import HotelGroup from "@/components/hotel/HotelGroup";
import { retrieveChains, retrieveHotels } from "@/services/api/LocalStorage";
import { hotelContext } from "@/services/store/HotelContext";
import { CircularProgress, Stack } from "@mui/material";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAllActive, setIsAllActive] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // fetching context states
  const { setHotels, hotels, setHotelChains, hotelChains } =
    useContext(hotelContext);

  // initiating router
  const router = useRouter();

  // useEffect to make api call
  useEffect(() => {
    // retrieving local storage data
    const storageHotels = retrieveHotels("hotels");
    const storageChains = retrieveChains("chains");

    // validating retrieved hotels data
    if (!storageHotels || storageHotels === null) {
      setLoading(false);
      return;
    }

    // initiating a constant data for hotels
    const allHotels = storageHotels;

    // checking to ensure constant data !== hotels context state
    if (allHotels === hotels) {
      setLoading(false);
      return;
    } else {
      // setting hotels context state to allHotels retrieved from local storage
      setHotels(allHotels);
      setLoading(false);
    }

    // validating retrieved hotel chains data
    if (!storageChains || storageChains === null) return;

    // initiating a constant data for hotel chains
    const allChains = storageChains;

    // checking to ensure constant data !== hotelChains context state
    if (allChains === hotelChains) {
      return;
    } else {
      // setting hotels context state to allHotels retrieved from local storage
      setHotelChains(allChains);
    }

    setLoading(false);
  }, [loading]);

  // router to admin page
  const onClickHandler = () => {
    router.push("/admin");
  };

  // loader
  if (loading)
    return (
      <div className="w-full flex items-center justify-center mt-5">
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress sx={{ color: "#ff8000" }} />
        </Stack>
      </div>
    );

  return (
    <div className="flex flex-col w-full pb-10">
      <Header buttonText="Manage Hotels" onClick={onClickHandler} />
      <div className={headerStyles.container}>
        <div
          id=""
          className="flex flex-row items-center w-[80%] md:w-3/5 bg-white h-[40px] rounded-xl pl-1 sm:pl-6 pr-[24px] ms-pr-[0px] shadow-smWhite"
        >
          <Image
            className="w-[20px] h-[20px]"
            src={SearchIconImg}
            alt="search icon"
          />
          <input
            className="h-[35px] w-[90%] md:w-[70%] pl-1 sm:pl-6 ms:pl-12 text-sm sm:text-lg outline-none"
            placeholder="Search for hotels by name"
            value={searchTerm}
            onChange={(event) => {
              if (event.target.value === "") {
                setIsAllActive(true);
                setSearchTerm("");
                setIsActive("");
              } else {
                setSearchTerm(event.target.value);
                setIsActive(event.target.value);
                setIsAllActive(false);
              }
            }}
          />
        </div>
      </div>
      {!loading && hotels.length === 0 ? (
        <div className="w-full flex items-center justify-center text-xs ms:text-base lg:text-xl sl:text-5xl text-red-900 text-center pt-10">
          NO HOTEL REGISTERED!! CLICK MANAGE HOTELS TO REGISTER A HOTEL.
        </div>
      ) : (
        <React.Fragment>
          <>
            <div className="flex flex-row gap-2 justify-center mt-5 mb-3 flex-wrap h-auto flex-1 basis-2/6">
              {hotelChains.map((ch) => (
                <HotelGroup name={ch.name} id={ch.id} key={ch.id} />
              ))}
            </div>

            <div className={styles.hotelDiv}>
              {hotels
                .filter((data) => {
                  if (searchTerm == "") {
                    return data;
                  } else if (
                    data.name?.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((data) => (
                  <div
                    className={`${
                      searchTerm === isActive ||
                      isActive === data.name ||
                      isAllActive
                        ? "flex flex-col gap-1 shadow-smBoxWhite items-center"
                        : "hidden"
                    }`}
                    key={data.id}
                  >
                    <HotelCard
                      city={data.city}
                      name={data.name}
                      address={data.address}
                      country={data.country}
                      ranking={data.ranking}
                      chain={data.chain}
                      id={data.id}
                      key={data.id}
                      picture={data.picture}
                    />
                  </div>
                ))}
            </div>
          </>
        </React.Fragment>
      )}
    </div>
  );
}
