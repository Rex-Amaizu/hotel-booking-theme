import React, { ChangeEvent, Children } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
  isVisible: boolean;
  close: () => void;
  children: any;
}

const Modal = ({ isVisible, close, children }: Props) => {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") close();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
      id="wrapper"
    >
      <div className="w-[278px] sm:w-[400px] ms:w-[600px] flex flex-col">
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
