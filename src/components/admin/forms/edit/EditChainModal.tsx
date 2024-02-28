import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Modal from "@/components/global/Modal";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Button,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { hotelContext } from "@/services/store/HotelContext";
import { retrieveChains, saveChains } from "@/services/api/LocalStorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/admin/EditChain.module.css";

const EditChainModal = () => {
  // states unique to page
  const [updated, setUpdated] = useState<string>("");

  // getting context states
  const {
    setIsLoading,
    hotelChains,
    setHotelChains,
    updateId,
    showModal,
    setShowModal,
    isLoading,
    setMessage,
    message,
  } = useContext(hotelContext);

  useEffect(() => {
    // retrieving localstorage hotel chains
    const storageChains = retrieveChains("chains");

    // validating retrieved hotel chains
    if (!storageChains || storageChains === null) return;

    // setting storageChains to a constant value and setting hotelChains state to constant chains
    const chains = storageChains;
    setHotelChains(chains);
  }, []);

  // setting the input value
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    setUpdated(e.target.value);
  };

  //   handling submit
  const updateNow = () => {
    setIsLoading(true);
    const myArray = hotelChains;

    // setting the replacement object
    const replacingObj = { name: updated, id: updateId };

    // finding the index to be replaced
    const i = myArray.findIndex((x) => x.id === updateId);

    // replacing the object on that index with the replacement obj
    myArray[i] = replacingObj;

    // saving hotel chains to localstorage adn updating the hotelChains context state
    saveChains(myArray);
    setHotelChains(myArray);

    setIsLoading(false);
    setMessage("Hotel Chain Updated Successfully");
  };

  useEffect(() => {
    if (message === "") return;

    toast.success(message, {
      toastId: "msg",
    });

    setMessage("");
  }, [message]);

  return (
    <Modal
      isVisible={showModal}
      close={() => {
        setShowModal(false);
      }}
    >
      {isLoading && (
        <div className={styles.loaderDiv}>
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress sx={{ color: "#ff8000" }} />
          </Stack>
        </div>
      )}

      <div className="w-full pl-5 pr-5 flex flex-row justify-between h-auto mb-8">
        <label className="font-bold text-xs ms:text-sm">
          Edit Chain Name and Save
        </label>
        <IoIosCloseCircle
          onClick={() => {
            setShowModal(false);
          }}
          className="text-[#ff8000] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-8 ms:w-full">
        <FormControl className="w-full h-[40px] border-2 rounded flex justify-center items-center text-center">
          <TextField
            className="h-[40px] text-center w-full justify-center pl-5"
            aria-label="chain"
            label=""
            name="name"
            type="text"
            required={true}
            value={updated}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl className="w-full h-[40px] border-2 rounded">
          <Button
            type="button"
            disabled={false}
            className="h-[40px] bg-[#ff8000] text-white text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
            onClick={updateNow}
          >
            SAVE CHAIN
          </Button>
        </FormControl>
      </div>
    </Modal>
  );
};

export default EditChainModal;
