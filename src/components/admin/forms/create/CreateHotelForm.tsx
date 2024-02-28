import React, { useContext } from "react";
import styles from "@/styles/admin/CreateHotel.module.css";
import { Stepper, StepLabel, Step } from "@mui/material";
import { hotelContext } from "@/services/store/HotelContext";
import { IoIosCloseCircle } from "react-icons/io";
import FinalStep from "./FinalStep";
import StepOne from "./StepOne";

// defining prop types
interface Props {
  onClose: ({ string }: any | null) => void;
}

const CreateHotelForm = ({ onClose }: Props) => {
  // getting context state
  const { currentStep } = useContext(hotelContext);

  // steps function
  function showStep(step: number) {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <FinalStep />;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBody}>
        <div className="w-full pl-5 pr-5 flex flex-row justify-between">
          <label>Create Hotel Form</label>
          <IoIosCloseCircle
            onClick={onClose}
            className="text-[#ff8000] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer"
          />
        </div>
        <div className={styles.stepperDiv}>
          <Stepper
            sx={{ width: "50%" }}
            activeStep={currentStep - 1}
            orientation="horizontal"
            className=""
          >
            <Step className="">
              <StepLabel className=""></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step>
          </Stepper>
        </div>
        {showStep(currentStep)}
      </div>
    </div>
  );
};

export default CreateHotelForm;
