import React, { useContext, useEffect } from "react";
import styles from "@/styles/admin/CreateHotel.module.css";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Stack,
} from "@mui/material";
import { hotelContext } from "@/services/store/HotelContext";
import { retrieveChains } from "@/services/api/LocalStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TChains } from "@/utils/type";
import { v4 as uuidv4 } from "uuid";

const StepOne = () => {
  // getting context states
  const {
    setStep,
    hotelChains,
    setHotelChains,
    chainData,
    onChangeChainInput,
    isChainFormValid,
    setIsChainFormValid,
    createChain,
    setGroup,
    group,
    isLoading,
    setIsLoading,
    message,
    setMessage,
  } = useContext(hotelContext);

  // setting admins chosen hotel chain
  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  useEffect(() => {
    // retrieving hotel chains from localStorage
    const storageChains = retrieveChains("chains");

    // validating retrieved hotel chains and setting hotelChains context state to retrieved chains
    if (storageChains) {
      setHotelChains(storageChains);
    }
  }, []);

  // validating input fields
  if (eval(`chainData?.${"name"}`) === undefined) {
    setIsChainFormValid(false);
  } else if (eval(`chainData?.${"name"}`) === "") {
    setIsChainFormValid(false);
  } else {
    setIsChainFormValid(true);
  }

  // handling the submit form function
  const handleCreate = (data: string) => {
    const payload = {
      ...chainData,
      id: data,
    };
    setIsLoading(true);
    if (isChainFormValid) {
      createChain(payload);
    }
  };

  // function to generate unique id
  const generateId = () => {
    function generateUniqueId() {
      let unique_id: string;
      // function to check if Id exists
      function checkId(unique_id: string, storageChains: TChains[]) {
        const checkIfId = storageChains.find((obj: any) => {
          return obj.id === unique_id;
        });

        if (checkIfId) {
          generateUniqueId();
        } else {
          handleCreate(unique_id);
        }
      }

      unique_id = uuidv4();
      const storageChains = retrieveChains("chains");
      if (storageChains) {
        return checkId(unique_id, storageChains);
      } else {
        handleCreate(unique_id);
      }
    }

    // calling function to generate unique Id
    generateUniqueId();
  };

  // setting toast id and emptying the message string after toast
  if (message !== "") {
    toast(message, {
      toastId: "msg",
    });
    setMessage("");
  }

  // handling steps
  const step = () => {
    setStep(2);
  };
  return (
    <div className={styles.stepOne}>
      <ToastContainer />
      {isLoading && (
        <div className={styles.loaderDiv}>
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress sx={{ color: "#ff8000" }} />
          </Stack>
        </div>
      )}
      <FormControl className="w-full border-2 rounded mb-5">
        <InputLabel id="chains">Select Hotel Chain</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          label="group"
          onChange={handleChange}
        >
          {hotelChains?.map((c) => (
            <MenuItem value={c.name}>{c.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {hotelChains.length > 0 ? (
        <label>
          If the hotel chain is not part of exisiting hotel chain, please use
          the form below to register a hotel's chain before proceeding with the
          hotel registration.
        </label>
      ) : (
        <label>
          No Hotel Chain registered yet, please use the form below to register a
          hotel's chain before proceeding with the hotel registration.
        </label>
      )}
      <p>
        If the hotel is not part of a hotel chain, then proceed without choosing
        a chain
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <FormControl className="w-full border-2 rounded mt-5">
          <TextField
            className={styles.textField}
            aria-label="chain"
            label="Hotel Chain"
            name="name"
            type="text"
            required={true}
            value={chainData?.name}
            onChange={onChangeChainInput}
          />
        </FormControl>
        <FormControl className="w-full border-2 rounded mt-5">
          <Button
            type="button"
            disabled={
              (isChainFormValid && false) || (!isChainFormValid && true)
            }
            onClick={generateId}
            className="h-[50px] bg-[#ff8000] text-white text-xs font-bold w-full hover:bg-[#331a00] disabled:bg-[lightgray]"
          >
            CREATE CHAIN
          </Button>
        </FormControl>
      </div>

      <FormControl className="w-full border-2 rounded mt-5">
        <Button type="button" disabled={false} onClick={step}>
          NEXT
        </Button>
      </FormControl>
    </div>
  );
};

export default StepOne;
