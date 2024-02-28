import { TChains, THotels } from "@/utils/type";
import React from "react";

export const saveHotels = (payload: THotels[]) => {
  localStorage.setItem("hotels", JSON.stringify(payload));
  return { message: "Hotel saved successfully" };
};

export const retrieveHotels = (key: string) => {
  const hotels = localStorage.getItem(key);

  if (hotels) {
    const main: THotels[] = JSON.parse(hotels);
    return main;
  }
};

export const saveChains = (payload: TChains[]) => {
  localStorage.setItem("chains", JSON.stringify(payload));
  return { message: "Hotel Chain saved successfully" };
};

export const retrieveChains = (key: string) => {
  const data = localStorage.getItem(key);

  if (data) {
    const mainData: TChains[] = JSON.parse(data);
    return mainData;
  }
};
