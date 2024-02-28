import { hotelContext } from "@/services/store/HotelContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/admin/EditHotels.module.css";
import {
  Box,
  Button,
  FormControl,
  LinearProgress,
  TextField,
} from "@mui/material";
import { IoIosCloseCircle } from "react-icons/io";
import {
  retrieveChains,
  retrieveHotels,
  saveHotels,
} from "@/services/api/LocalStorage";
import { THotels } from "@/utils/type";
import axios from "axios";

interface Props {
  onClose: ({ string }: any | null) => void;
}

const EditHotelForm = ({ onClose }: Props) => {
  const [editData, setEditData] = useState<THotels>({} as THotels);

  const {
    setUploaded,
    uploaded,
    group,
    setGroup,
    isImageLoading,
    setIsImageLoading,
    setIsLoading,
    setHotels,
    hotels,
    hotelId,
  } = useContext(hotelContext);

  useEffect(() => {
    // retrieving hotels from localstorage
    const storageHotels = retrieveHotels("hotels");

    // validating retrieved hotels
    if (!storageHotels || storageHotels === null) return;

    // setting retrieved hotels to hotels state
    setHotels(storageHotels);

    // returning the hotel with id = hotelId from storageHotels
    const findHotel = storageHotels.find((obj: any) => {
      return obj.id === hotelId;
    });

    if (findHotel) {
      // setting hotel data to be edited
      setEditData(findHotel);

      // retrieving hotel chains from localstorage
      const storageChains = retrieveChains("chains");

      // validating storagechains
      if (!storageChains || storageChains === null) return;

      // returning hotelChain that owns the hotel to be edited
      const findChain = storageChains.find((obj: any) => {
        return obj.id === findHotel.chain;
      });

      // validating and setting the returned
      if (!findChain) return;
      setGroup(findChain.name);
    }
  }, []);

  const updateHotel = () => {
    setIsLoading(true);

    // setting hotels to myArray constant
    const myArray = hotels;

    // setting replacemnet obj
    const replacingObj = editData;

    // finding the index of hotel with id === hotelId
    const i = myArray.findIndex((x) => x.id === hotelId);

    // replacing previous hotel object with updated hotel obj
    myArray[i] = replacingObj;

    // setting hotels context state to updated hotel value
    setHotels(myArray);
    saveHotels(myArray);
    setIsLoading(false);
    toast.success("Hotel Chain Updated Successfully", {
      toastId: "msg",
    });
  };

  const onChangeHotelHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const preset_key = `${process.env.NEXT_PUBLIC_PRESET_KEY}`;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const file: any = (e.target as HTMLInputElement).files?.[0];

    if (file) {
      // uploading picture
      setIsImageLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        )
        .then((res) => {
          setUploaded(true);
          setIsImageLoading(false);
          setEditData((prevData) => ({
            ...prevData,
            picture: res.data.secure_url,
          }));
        })
        .catch((err) => console.log(err));
    }

    setEditData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <React.Fragment>
      <div className="flex items-center pt-5 justify-center">
        <div className={styles.formBody}>
          <div className="w-full pl-5 pr-5 flex flex-row justify-between ">
            <label>Edit Hotel Form</label>
            <IoIosCloseCircle
              onClick={onClose}
              className="text-[#ff8000] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer"
            />
          </div>
          <ToastContainer />
          <div className="w-full gap-3 flex flex-col ms:flex-row p-5">
            <FormControl className="w-full border-2 rounded mt-5">
              <TextField
                className={styles.textField}
                aria-label="Hotel Name"
                label=""
                name="name"
                type="text"
                required={true}
                value={editData?.name}
                onChange={onChangeHotelHandler}
              />
            </FormControl>
            <FormControl className="w-full border-2 rounded mt-5">
              <TextField
                className={styles.textField}
                aria-label="City"
                label=""
                name="city"
                type="text"
                required={true}
                value={editData?.city}
                onChange={onChangeHotelHandler}
              />
            </FormControl>
          </div>
          <div className="w-full gap-0 flex flex-col p-5">
            {isImageLoading && (
              <Box sx={{ color: "#ff8000" }}>
                <LinearProgress color="inherit" />
              </Box>
            )}
            <FormControl className="w-full border-2 rounded mt-5">
              {uploaded ? (
                <p className="text-green-800 h-[40px] w-full bg-green-300 text-center">
                  Image Uploaded Successfully
                </p>
              ) : (
                <TextField
                  className={styles.textField}
                  label=""
                  name="picture"
                  type="file"
                  required={true}
                  value={""}
                  onChange={onChangeHotelHandler}
                />
              )}
            </FormControl>
          </div>
          <div className="w-full gap-3 flex flex-col ms:flex-row p-5">
            <FormControl className="w-full border-2 rounded mt-5">
              <TextField
                className={styles.textField}
                aria-label="Address"
                label=""
                name="address"
                type="text"
                required={true}
                value={editData?.address}
                onChange={onChangeHotelHandler}
              />
            </FormControl>
            <FormControl className="w-full border-2 rounded mt-5">
              <TextField
                className={styles.textField}
                aria-label="Country"
                label=""
                name="country"
                type="text"
                required={true}
                value={editData?.country}
                onChange={onChangeHotelHandler}
              />
            </FormControl>
          </div>

          <div className="w-full gap-3 flex flex-col ms:flex-row p-5">
            <FormControl className="w-full border-2 rounded mt-5">
              <TextField
                className={styles.textField}
                aria-label="Ranking"
                label=""
                name="ranking"
                type="text"
                required={true}
                value={editData?.ranking}
                onChange={onChangeHotelHandler}
              />
            </FormControl>
            <FormControl className="w-full border-2 rounded mt-5">
              <TextField
                className={styles.textField}
                aria-label="Hotel Chain"
                label=""
                placeholder={group}
                name="chain"
                type="text"
                aria-readonly={true}
                required={true}
                value={""}
                onChange={(e) => e.target.value}
              />
            </FormControl>
          </div>
          <div className="w-full gap-3 flex p-5">
            <FormControl className="w-full border-2 rounded mt-5">
              <Button
                type="button"
                disabled={false}
                onClick={updateHotel}
                className="h-[50px] bg-[#ff8000] text-white text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
              >
                UPDATE
              </Button>
            </FormControl>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditHotelForm;
