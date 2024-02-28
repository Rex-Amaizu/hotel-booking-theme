"use client";
import { TChains, THotels } from "@/utils/type";
import { stringify } from "querystring";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  retrieveChains,
  saveChains,
  saveHotels,
  retrieveHotels,
} from "@/services/api/LocalStorage";
import { group } from "console";

type HotelContextObj = {
  message: string;
  setMessage: (message: string) => void;
  group: string;
  setGroup: (group: string) => void;
  hotelId: string;
  setHotelId: (hotelId: string) => void;
  updateId: string;
  setUpdateId: (updateId: string) => void;
  hotels: THotels[];
  setHotels: (payload: THotels[]) => void;
  chainBrands: THotels[];
  setChainBrands: (payload: THotels[]) => void;
  hotelData: THotels;
  setHotelData: (hotelData: THotels) => void;
  hotel: THotels;
  setHotel: (hotel: THotels) => void;
  chain: TChains;
  setChain: (chain: TChains) => void;
  createHotel: (payload: THotels) => void;
  deleteHotel: (id: number) => void;
  updateHotel: (payload: {}) => void;
  uploaded: boolean;
  setUploaded: (uploaded: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  formIsvalid: boolean;
  setFormIsvalid: (formIsvalid: boolean) => void;
  isChainFormValid: boolean;
  setIsChainFormValid: (IsChainFormValid: boolean) => void;
  isLoading: boolean;
  setIsLoading: (IsLoading: boolean) => void;
  isImageLoading: boolean;
  setIsImageLoading: (IsLoading: boolean) => void;
  currentStep: number;
  setStep: (currentStep: number) => void;
  onChangeHotelInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  chainData: TChains;
  setChainData: (chainData: TChains) => void;
  hotelChains: TChains[];
  setHotelChains: (payload: TChains[]) => void;
  createChain: (payload: TChains) => void;
  deleteChain: (id: number) => void;
  updateChain: (payload: {}) => void;
  onChangeChainInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

type HotelContextObjProps = {
  children: React.ReactNode;
};

export const hotelContext = React.createContext<HotelContextObj>({
  message: "",
  setMessage: (message: string) => message,
  group: "",
  setGroup: (group: string) => {},
  hotelId: "",
  setHotelId: (hotelId: string) => {},
  updateId: "",
  setUpdateId: (updateId: string) => {},
  createHotel: (payload: THotels) => {},
  deleteHotel: (id: number) => {},
  updateHotel: (payload: {}) => {},
  hotels: [],
  setHotels: (payload: THotels[]) => {},
  chainBrands: [],
  setChainBrands: (payload: THotels[]) => {},
  hotelData: {} as THotels,
  setHotelData: (hotelData: THotels) => {},
  hotel: {} as THotels,
  setHotel: (hotel: THotels) => {},
  chain: {} as TChains,
  setChain: (chain: TChains) => {},
  currentStep: 1 | 2,
  setStep: (currentStep: number) => {},
  uploaded: true || false,
  setUploaded: (uploaded: boolean) => {},
  showModal: true || false,
  setShowModal: (showModal: boolean) => {},
  formIsvalid: true || false,
  setFormIsvalid: (formIsvalid: boolean) => {},
  isChainFormValid: true || false,
  setIsChainFormValid: (IsChainFormValid: boolean) => {},
  isLoading: true || false,
  setIsLoading: (IsLoading: boolean) => {},
  isImageLoading: true || false,
  setIsImageLoading: (IsLoading: boolean) => {},
  onChangeHotelInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {},
  chainData: {} as TChains,
  setChainData: (chainData: TChains) => {},
  hotelChains: [],
  setHotelChains: (payload: TChains[]) => {},
  createChain: (payload: TChains) => {},
  deleteChain: (id: number) => {},
  updateChain: (payload: {}) => {},
  onChangeChainInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {},
});

const HotelContext = ({ children }: HotelContextObjProps) => {
  const [hotelData, setHotelData] = useState<THotels>({} as THotels);
  const [hotels, setHotels] = useState<THotels[]>([]);
  const [chainBrands, setChainBrands] = useState<THotels[]>([]);
  const [hotel, setHotel] = useState<THotels>({} as THotels);
  const [chain, setChain] = useState<TChains>({} as TChains);
  const [chainData, setChainData] = useState<TChains>({} as TChains);
  const [hotelChains, setHotelChains] = useState<TChains[]>([]);
  const [formIsvalid, setFormIsvalid] = useState<boolean>(false);
  const [isChainFormValid, setIsChainFormValid] = useState<boolean>(false);
  const [currentStep, setStep] = useState<number>(1);
  const [group, setGroup] = useState<string>("");
  const [hotelId, setHotelId] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChangeHotelHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const preset_key = `${process.env.NEXT_PUBLIC_PRESET_KEY}`;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const file: any = (e.target as HTMLInputElement).files?.[0];

    if (file) {
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
          setHotelData((prevData) => ({
            ...prevData,
            picture: res.data.secure_url,
          }));
        })
        .catch((err) => console.log(err));
    }

    if (group !== "") {
      const savedHotelChains = retrieveChains("chains");
      if (savedHotelChains) {
        const checkIfChain = savedHotelChains.find((obj: any) => {
          return obj.name.toLowerCase().trim() === group.toLowerCase().trim();
        });

        if (checkIfChain) {
          setHotelData((prevData) => ({
            ...prevData,
            chain: checkIfChain.id,
          }));
        }
      }
    } else {
      setHotelData((prevData) => ({
        ...prevData,
        chain: "",
      }));
    }

    setHotelData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createHotelHandler = (payload: THotels) => {
    const savedHotels = retrieveHotels("hotels");
    if (savedHotels === undefined) {
      hotels.push(payload);
      saveHotels(hotels);
      setHotels(hotels);
      setIsLoading(false);
      setHotelData((prevData) => ({
        ...prevData,
        picture: "",
        name: "",
        city: "",
        address: "",
        ranking: "",
        chain: "",
        country: "",
      }));
      setGroup("");
      setUploaded(false);
      setMessage("Hotel Registered Successfully");
    } else {
      savedHotels.push(payload);
      saveHotels(savedHotels);
      setHotels(savedHotels);
      setIsLoading(false);
      setHotelData((prevData) => ({
        ...prevData,
        picture: "",
        name: "",
        city: "",
        address: "",
        ranking: "",
        chain: "",
        country: "",
      }));
      setGroup("");
      setUploaded(false);
      setMessage("Hotel Registered Successfully");
    }
  };

  const deleteHotelHandler = () => {};
  const updateHotelHandler = () => {};

  const onChangeChainHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    setChainData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const createChainHandler = (payload: TChains) => {
    const savedHotelChains = retrieveChains("chains");
    if (savedHotelChains === undefined) {
      hotelChains.push(payload);
      saveChains(hotelChains);
      setHotelChains(hotelChains);
      setIsLoading(false);
      setChainData((prevData) => ({
        ...prevData,
        name: "",
      }));
      setMessage("Hotel Chain Registered Successfully");
    } else {
      const checkIfChain = savedHotelChains.find((obj: any) => {
        return (
          obj.name.toLowerCase().trim() === payload.name.toLowerCase().trim()
        );
      });
      if (checkIfChain) {
        setIsLoading(false);
        setChainData((prevData) => ({
          ...prevData,
          name: "",
        }));

        setMessage("This Hotel Chain is already registered");
      } else {
        savedHotelChains.push(payload);
        saveChains(savedHotelChains);
        setHotelChains(savedHotelChains);
        setIsLoading(false);
        setChainData((prevData) => ({
          ...prevData,
          name: "",
        }));

        setMessage("Hotel Chain Registered Successfully");
      }
    }
  };
  const deleteChainHandler = () => {};
  const updateChainHandler = () => {};

  const hotelContextValue: HotelContextObj = {
    message,
    setMessage,
    group,
    setGroup,
    hotelId,
    setHotelId,
    updateId,
    setUpdateId,
    createHotel: createHotelHandler,
    deleteHotel: deleteHotelHandler,
    updateHotel: updateHotelHandler,
    hotels,
    setHotels,
    chainBrands,
    setChainBrands,
    hotelData,
    setHotelData,
    hotel,
    setHotel,
    chain,
    setChain,
    currentStep,
    setStep,
    uploaded,
    setUploaded,
    showModal,
    setShowModal,
    formIsvalid,
    setFormIsvalid,
    isChainFormValid,
    setIsChainFormValid,
    isLoading,
    setIsLoading,
    isImageLoading,
    setIsImageLoading,
    onChangeHotelInput: onChangeHotelHandler,
    chainData,
    setChainData,
    hotelChains,
    setHotelChains,
    createChain: createChainHandler,
    deleteChain: deleteChainHandler,
    updateChain: updateChainHandler,
    onChangeChainInput: onChangeChainHandler,
  };
  return (
    <hotelContext.Provider value={hotelContextValue}>
      {children}
    </hotelContext.Provider>
  );
};

export default HotelContext;
