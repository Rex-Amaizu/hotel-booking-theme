"use client";
import Header from "@/components/global/Header";
import React, { useState, useContext, useEffect } from "react";
import headerStyles from "@/styles/header/SecondHeader.module.css";
import styles from "@/styles/admin/EditHotels.module.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  retrieveChains,
  retrieveHotels,
  saveHotels,
} from "@/services/api/LocalStorage";
import { hotelContext } from "@/services/store/HotelContext";
import HotelCard from "@/components/hotel/HotelCard";
import EditChainForm from "@/components/admin/forms/edit/EditChainForm";
import EditHotelForm from "@/components/admin/forms/edit/EditHotelForm";
import { Button, CircularProgress, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMedia } from "@/hooks/useResponsive";

const page = () => {
  // states unique to page
  const [openEditChainForm, setOpenEditChainForm] = useState<boolean>(false);
  const [openEditHotelForm, setOpenEditHotelForm] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const mobileDevice = useMedia("(max-width: 480px)");

  // getting context states required
  const {
    setHotels,
    setHotelChains,
    hotels,
    setHotelId,
    isLoading,
    setIsLoading,
  } = useContext(hotelContext);

  // initiating router
  const router = useRouter();

  // handling opening and closing of form
  const onClickEditHandler = () => {
    setOpenEditChainForm(true);
    setOpenEditHotelForm(false);
  };

  // handling closing of editChain form
  const closeEditChain = () => {
    setOpenEditChainForm(false);
  };

  // handling closing of editHotel form
  const closeEditHotel = () => {
    setOpenEditHotelForm(false);
  };

  // routing back to previous url
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    // retrieving hotels and hotel chains from localStorage
    const storageHotels = retrieveHotels("hotels");
    const storageChains = retrieveChains("chains");

    // validating retrievd localStorage hotels
    if (!storageHotels || storageHotels === null) return;

    // setting storage Hotels to a constant value and setting hotels state to allhotels
    const allHotels = storageHotels;
    setHotels(allHotels);

    // validating retrievd localStorage hotel chains
    if (!storageChains || storageChains === null) return;

    // setting storage Hotel chiains to a constant value and setting hotelChains state to allChains
    const allChains = storageChains;
    setHotelChains(allChains);
  }, []);

  useEffect(() => {
    const deleteNow = () => {
      if (deleteId !== "") {
        // find the index of hotel with id === deleteId
        const index = hotels.findIndex((obj) => obj.id === deleteId);

        // delete the hotel with id === deleteId by slicing from array
        const newData = [...hotels.slice(0, index), ...hotels.slice(index + 1)];

        // setting hotels state to newData to update hotels array and saving to local Storage
        saveHotels(newData);
        setHotels(newData);
        setIsLoading(false);
        toast.success("Hotel Deleted Successfully", {
          toastId: "delete-msg",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // set deleteId to empty string after deleting
        setDeleteId("");
      }
    };

    // calling deleteNow function
    deleteNow();
  }, [deleteId, isLoading]);

  if (isLoading)
    return (
      <div className={styles.loaderDiv}>
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress sx={{ color: "#ff8000" }} />
        </Stack>
      </div>
    );

  return (
    <div>
      <Header buttonText="Edit Hotel Chain" onClick={onClickEditHandler} />
      <div className={headerStyles.container}>
        <div
          id=""
          className="flex flex-row gap-1 cursor-pointer items-center justify-center w-auto h-[40px]"
          onClick={goBack}
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
            Go Back
          </label>
        </div>
      </div>
      <ToastContainer />

      {openEditChainForm ? (
        <EditChainForm onClose={closeEditChain} />
      ) : (
        <React.Fragment>
          {openEditHotelForm && <EditHotelForm onClose={closeEditHotel} />}
          {!openEditHotelForm && (
            <div className={styles.hotelDiv}>
              {hotels.map((data) => (
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
                  <div className="mt-1 flex flex-row gap-2 mb-2 pr-2 pl-2 w-full">
                    <Button
                      className="h-[50px] bg-[#ff8000] text-white text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
                      onClick={() => {
                        setHotelId(data.id);
                        setOpenEditHotelForm(true);
                      }}
                    >
                      Edit Hotel
                    </Button>
                    <Button
                      className="h-[50px] bg-red-600 text-white text-xs font-bold w-full hover:bg-red-800"
                      onClick={() => {
                        setIsLoading(true);
                        setDeleteId(data.id);
                      }}
                    >
                      Delete Hotel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default page;
