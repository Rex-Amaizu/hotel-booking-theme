"use client";
import { TFlightDetails, TUser } from "@/utils/type";
import React, { useEffect, useState } from "react";
import { data } from "@/services/api/data";

type HotelContextObj = {
  user: TUser;
  setUser: (payload: TUser) => void;
  flightDetails: TFlightDetails;
  setFlightDetails: (payload: TFlightDetails) => void;
};

type HotelContextObjProps = {
  children: React.ReactNode;
};

export const hotelContext = React.createContext<HotelContextObj>({
  user: {} as TUser,
  setUser: (user: TUser) => {},
  flightDetails: {} as TFlightDetails,
  setFlightDetails: (payload: TFlightDetails) => {},
});

const HotelContext = ({ children }: HotelContextObjProps) => {
  const [user, setUser] = useState<TUser>({} as TUser);
  const [flightDetails, setFlightDetails] = useState<TFlightDetails>(
    {} as TFlightDetails
  );

  useEffect(() => {
    setUser(data.userData);
    setFlightDetails(data.flightDetails);
  }, []);

  const hotelContextValue: HotelContextObj = {
    user,
    setUser,
    flightDetails,
    setFlightDetails,
  };
  return (
    <hotelContext.Provider value={hotelContextValue}>
      {children}
    </hotelContext.Provider>
  );
};

export default HotelContext;
