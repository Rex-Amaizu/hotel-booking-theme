"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/global/Header";
import styles from "@/styles/admin/Admin.module.css";
import headerStyles from "@/styles/header/SecondHeader.module.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import HotelCount from "@/components/hotel/HotelCount";
import HotelGroup from "@/components/hotel/HotelGroup";
import { retrieveChains, retrieveHotels } from "@/services/api/LocalStorage";
import { hotelContext } from "@/services/store/HotelContext";
import CreateHotelForm from "@/components/admin/forms/create/CreateHotelForm";
import { CircularProgress, Stack } from "@mui/material";
import { useMedia } from "@/hooks/useResponsive";

const page = () => {
  // states
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const mobileDevice = useMedia("(max-width: 480px)");

  // getting context states required here
  const { hotelChains, setHotels, hotels, setHotelChains } =
    useContext(hotelContext);

  // initiating the router
  const router = useRouter();

  // function to open create form
  const onClickCreateHandler = () => {
    setOpenCreate(true);
  };

  // function to redirect to the edit page
  const onClickEditHandler = () => {
    router.push("/admin/edit");
  };

  // function to close hotel form
  const closeCreateHandler = () => {
    setOpenCreate(false);
  };

  // router tp home page
  const goHome = () => {
    router.push("/");
  };

  useEffect(() => {
    // retrieving hotels data and hotelChains data from localStorage
    const storageChains = retrieveChains("chains");
    const storageHotels = retrieveHotels("hotels");

    // validating the storageHotels value
    if (!storageHotels || storageHotels === null) {
      setLoading(false);
      return;
    } else {
      // setting local storage value in hotels context state
      setHotels(storageHotels);
      setLoading(false);
    }

    if (!storageChains || storageChains === null) {
      setLoading(false);
      return;
    } else {
      // setting local storage value in hotel chains context state
      setHotelChains(storageChains);
      setLoading(false);
    }
  }, [loading]);

  // getting the numnber of hotels and hotel chains
  const hotelCount = hotels.length;
  const chainCount = hotelChains.length;

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
    <>
      <Header
        buttonText2="Edit Hotel"
        buttonText="Create Hotel"
        onClick={onClickCreateHandler}
        onClick2={onClickEditHandler}
      />
      <div className={headerStyles.container}>
        <div
          id=""
          className="flex flex-row gap-1 cursor-pointer items-center justify-center w-auto h-[40px]"
          onClick={goHome}
        >
          <IoArrowBackCircleSharp
            style={
              mobileDevice
                ? {
                    color: "white",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }
                : {
                    color: "white",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }
            }
          />
          <label className="text-white font-bold text-sm sm:text-lg cursor-pointer">
            Go To Home
          </label>
        </div>
      </div>
      {!loading && hotels.length === 0 && !openCreate ? (
        <div className="w-full flex items-center justify-center text-xs ms:text-base lg:text-xl sl:text-5xl text-red-900 text-center pt-10">
          NO HOTEL REGISTERED!! CLICK MANAGE HOTELS TO REGISTER A HOTEL.
        </div>
      ) : (
        <React.Fragment>
          {openCreate ? (
            <CreateHotelForm onClose={closeCreateHandler} />
          ) : (
            <>
              <div className={styles.container}>
                <div className="flex flex-row gap-2 justify-center mt-5 mb-3 flex-wrap h-auto flex-1 basis-2/6">
                  <HotelCount
                    hotelCount={hotelCount}
                    hotelChainCount={chainCount}
                  />
                </div>
                <div className="flex flex-row gap-2 justify-center mt-5 mb-3 flex-wrap h-auto flex-1 basis-2/6">
                  {hotelChains.map((c) => (
                    <HotelGroup name={c.name} id={c.id} key={c.id} />
                  ))}
                </div>
              </div>
            </>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default page;
