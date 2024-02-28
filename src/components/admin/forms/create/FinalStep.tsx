import React, { useContext } from "react";
import styles from "@/styles/admin/CreateHotel.module.css";
import { hotelContext } from "@/services/store/HotelContext";
import {
  Button,
  FormControl,
  TextField,
  CircularProgress,
  LinearProgress,
  Stack,
  Box,
} from "@mui/material";
import { THotels } from "@/utils/type";
import { retrieveHotels } from "@/services/api/LocalStorage";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// getting required context states
const FinalStep = () => {
  const {
    onChangeHotelInput,
    formIsvalid,
    createHotel,
    hotelData,
    setFormIsvalid,
    setUploaded,
    uploaded,
    setStep,
    group,
    message,
    isLoading,
    isImageLoading,
    setIsLoading,
    setMessage,
  } = useContext(hotelContext);

  // validating input fields
  if (
    eval(`hotelData?.${"name"}`) === undefined ||
    eval(`hotelData?.${"city"}`) === undefined ||
    eval(`hotelData?.${"country"}`) === undefined ||
    eval(`hotelData?.${"address"}`) === undefined ||
    eval(`hotelData?.${"ranking"}`) === undefined ||
    eval(`hotelData?.${"picture"}`) === undefined
  ) {
    setFormIsvalid(false);
  } else if (
    eval(`hotelData?.${"name"}`) === "" ||
    eval(`hotelData?.${"city"}`) === "" ||
    eval(`hotelData?.${"country"}`) === "" ||
    eval(`hotelData?.${"address"}`) === "" ||
    eval(`hotelData?.${"ranking"}`) === "" ||
    eval(`hotelData?.${"picture"}`) === ""
  ) {
    setFormIsvalid(false);
  } else {
    setFormIsvalid(true);
  }

  // setting toast id and emptying the toast string after toast
  if (message !== "") {
    toast(message, {
      toastId: "msg",
    });
    setMessage("");
  }

  // handling submit form function
  const handleSubmit = (data: string) => {
    const payload = {
      ...hotelData,
      id: data,
    };
    setIsLoading(true);
    if (formIsvalid) {
      createHotel(payload);
    }
  };

  // generating unique id
  const generateId = () => {
    function generateUniqueId() {
      let unique_id: string;
      // function to check if Id exists
      function checkId(unique_id: string, storageHotels: THotels[]) {
        const checkIfId = storageHotels.find((obj: any) => {
          return obj.id === unique_id;
        });

        if (checkIfId) {
          generateUniqueId();
        } else {
          handleSubmit(unique_id);
        }
      }

      unique_id = uuidv4();
      const storageHotels = retrieveHotels("hotels");
      if (storageHotels) {
        return checkId(unique_id, storageHotels);
      } else {
        handleSubmit(unique_id);
      }
    }

    // calling function to generate unique Id
    generateUniqueId();
  };

  // handling form steps
  const step = () => {
    setStep(1);
  };

  return (
    <div className={styles.finalStep}>
      <ToastContainer />
      {isLoading && (
        <div className={styles.loaderDiv}>
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress sx={{ color: "#ff8000" }} />
          </Stack>
        </div>
      )}
      <div className="w-full gap-3 flex flex-col ms:flex-row p-5">
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="Hotel Name"
            label="Hotel Name"
            name="name"
            type="text"
            required={true}
            value={hotelData?.name}
            onChange={onChangeHotelInput}
          />
        </FormControl>
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="City"
            label="City"
            name="city"
            type="text"
            required={true}
            value={hotelData?.city}
            onChange={onChangeHotelInput}
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
              onChange={onChangeHotelInput}
            />
          )}
        </FormControl>
      </div>
      <div className="w-full gap-3 flex flex-col ms:flex-row p-5">
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="Address"
            label="Address"
            name="address"
            type="text"
            required={true}
            value={hotelData?.address}
            onChange={onChangeHotelInput}
          />
        </FormControl>
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="Country"
            label="Country"
            name="country"
            type="text"
            required={true}
            value={hotelData?.country}
            onChange={onChangeHotelInput}
          />
        </FormControl>
      </div>

      <div className="w-full gap-3 flex flex-col ms:flex-row p-5">
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="Ranking"
            label="Ranking"
            name="ranking"
            type="text"
            required={true}
            value={hotelData?.ranking}
            onChange={onChangeHotelInput}
          />
        </FormControl>
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="Hotel Chain"
            label="Hotel Chain"
            name="chain"
            type="text"
            required={true}
            value={group}
            onChange={onChangeHotelInput}
          />
        </FormControl>
      </div>
      <div className="w-full gap-3 flex flex-col sm:flex-row p-5">
        <FormControl className="w-full border-2 rounded mt-5">
          <Button
            type="button"
            disabled={false}
            onClick={step}
            className="h-[50px] bg-[#ff8000] text-white text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
          >
            Back
          </Button>
        </FormControl>
        <FormControl className="w-full border-2 rounded mt-5">
          <Button
            type="button"
            disabled={(formIsvalid && false) || (!formIsvalid && true)}
            onClick={generateId}
            className="h-[50px] bg-[#ff8000] text-white text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
          >
            Create Hotel
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default FinalStep;
