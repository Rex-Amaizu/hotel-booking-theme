"use client";
import { retrieveChains, retrieveHotels } from "@/services/api/LocalStorage";
import { hotelContext } from "@/services/store/HotelContext";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import headerStyles from "@/styles/header/SecondHeader.module.css";
import styles from "@/styles/hotel/HotelChainBrands.module.css";
import Header from "@/components/global/Header";
import HotelCard from "@/components/hotel/HotelCard";
import { useMedia } from "@/hooks/useResponsive";

const page = () => {
  const mobileDevice = useMedia("(max-width: 480px)");

  // getting context states
  const { chainBrands, setChainBrands, chain, setChain } =
    useContext(hotelContext);

  // initiating router
  const router = useRouter();

  // getting the params obj and retrieving th id
  const idObj = useParams();
  const { id } = idObj;

  useEffect(() => {
    // retrieving hotels and hotel chains data from localstorage
    const storageHotels = retrieveHotels("hotels");
    const storageChains = retrieveChains("chains");

    // validating localstorage hotels data
    if (!storageHotels || storageHotels === null) return;

    // validating/ returning all hotels with matching chain id from local storage data
    const filteredHotels = storageHotels.filter(function (h) {
      return h.chain === id;
    });

    // validating filteredHotels and setting data to chainBrands context state
    if (filteredHotels !== null) setChainBrands(filteredHotels);

    // validating localstorage hotel chains data
    if (!storageChains || storageChains === null) return;

    // validating/ returning first hotel chain with matching chain id from local storage data
    const mainChain = storageChains.find((obj) => {
      return obj.id === id;
    });

    // validating and setting mainchain to chain context state
    if (mainChain) setChain(mainChain);
  }, []);

  // router to home
  const onClickHandler = () => {
    router.push("/");
  };

  // router to admin
  const onClickHandler2 = () => {
    router.push("/admin");
  };

  return (
    <div className="flex flex-col w-full pb-10">
      <Header
        buttonText="Go To Home"
        onClick={onClickHandler}
        onClick2={onClickHandler2}
        buttonText2="Go To Admin"
      />
      <div className={headerStyles.container}>
        <div
          id=""
          className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center justify-center w-4/5 md:w-3/5 h-[40px]"
        >
          <label className="text-white italic font-bold text-base sm:text-xl">
            {chain?.name}
            {!mobileDevice && ":"}
          </label>
          <p className="text-[#808080] font-bold text-sm sm:text-base">
            {" "}
            See List Of Hotel Brands
          </p>
        </div>
      </div>
      <React.Fragment>
        <div className={styles.hotelDiv}>
          {chainBrands.map((data) => (
            <div
              className="flex flex-col gap-1 shadow-smBoxWhite items-center"
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
      </React.Fragment>
    </div>
  );
};

export default page;
