import React, { useEffect, useContext, ChangeEvent, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "@/styles/admin/EditChain.module.css";
import { Button, CircularProgress, FormControl, Stack } from "@mui/material";
import {
  retrieveChains,
  retrieveHotels,
  saveChains,
  saveHotels,
} from "@/services/api/LocalStorage";
import { hotelContext } from "@/services/store/HotelContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditChainModal from "./EditChainModal";

// defining prop types
interface Props {
  onClose: ({ string }: any | null) => void;
}

const EditChainForm = ({ onClose }: Props) => {
  // state unique to editting hotel chain
  const [updateName, setUpdateName] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // getting context states
  const {
    setHotelChains,
    hotelChains,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    setHotels,
    hotels,
    setUpdateId,
    showModal,
    setShowModal,
  } = useContext(hotelContext);

  useEffect(() => {
    // retrieving localstorage hotel chains
    const storageChains = retrieveChains("chains");

    // validating retrieved hotel chains
    if (!storageChains || storageChains === null) return;

    // setting storageChains to a constant value and setting hotelChains state to constant chains
    const chains = storageChains;
    setHotelChains(chains);

    // retrieving hotels from localStorage
    const storageHotels = retrieveHotels("hotels");

    // validating retrieved hotels
    if (!storageHotels || storageHotels === null) return;

    // setting storageHotels to constant and setting hotels state to allHotels
    const allHotels = storageHotels;
    setHotels(allHotels);
  }, []);

  useEffect(() => {
    const deleteNow = () => {
      if (deleteId === "") return;

      // finding the index of hotel chain with id === deletedId from array of hotel chains
      const index = hotelChains.findIndex((obj) => obj.id === deleteId);

      if (index === null) return;

      // slicing the hotelchain with id === deletedId from hotelChains array
      const newData = [
        ...hotelChains.slice(0, index),
        ...hotelChains.slice(index + 1),
      ];

      // saving hotel chains to localstorage adn updating the hotelChains context state
      saveChains(newData);
      setHotelChains(newData);

      setLoading(false);
      setMessage("Hotel Chain Deleted Successfully");

      // finding the removing the deleted hotel chain id from all exisiting hotel
      const modifiedHotels = hotels.map((obj) => {
        if (obj.chain === deleteId) {
          return { ...obj, chain: "" };
        }
        return obj;
      });

      // saving hotels to localstorage and updating the hotels context state
      saveHotels(modifiedHotels);
      setHotels(modifiedHotels);

      // setting the deleteId state to empty strings
      setDeleteId("");
    };

    // calling deleteNow function
    deleteNow();
  }, [loading]);

  useEffect(() => {
    if (message === "") return;

    toast.success(message, {
      toastId: "msg",
    });

    setMessage("");
  }, [message]);

  return (
    <React.Fragment>
      {loading && (
        <div className="flex w-full items-center justify-center">
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress sx={{ color: "#ff8000" }} />
          </Stack>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.formBody}>
          <div className="w-full pl-5 pr-5 flex flex-row justify-between">
            <label>Create Hotel Form</label>
            <IoIosCloseCircle
              onClick={onClose}
              className="text-[#ff8000] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-3 w-full items-center">
            {hotelChains.map((c) => (
              <div className={styles.chain} key={c.id}>
                <label>{c.name}</label>
                <div className={styles.rightDiv} key={c.id}>
                  <div className={styles.formDiv}>
                    <FormControl className="w-[55%] sm:w-[35%] lg:w-[30%] h-[30px] sm:h-[40px] rounded mt-1">
                      <Button
                        type="button"
                        disabled={false}
                        className="h-[30px] sm:h-[40px] bg-[#ff8000] text-white text-sxs sm:text-ss sl:text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
                        onClick={() => {
                          setUpdateId(c.id);
                          setUpdateName(c.name);
                          setShowModal(true);
                        }}
                      >
                        UPDATE CHAIN
                      </Button>
                    </FormControl>
                  </div>
                  <FormControl className="w-[45%] sm:w-[25%] lg:w-[20%] h-[30px] sm:h-[40px] rounded mt-1">
                    <Button
                      type="button"
                      disabled={false}
                      onClick={() => {
                        setDeleteId(c.id);
                        setLoading(true);
                      }}
                      className="h-[30px] sm:h-[40px] bg-red-600 text-white text-sxs sm:text-ss sl:text-xs  font-bold w-full hover:bg-red-800 disabled:bg-[lightgray]"
                    >
                      DELETE CHAIN
                    </Button>
                  </FormControl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && <EditChainModal />}
    </React.Fragment>
  );
};

export default EditChainForm;
