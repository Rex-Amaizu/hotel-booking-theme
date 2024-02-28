"use client"; // This is a client component
import React, { useState, useEffect } from "react";

export const useRating = (count: number) => {
  const [rating, setRating] = useState<number[]>();
  useEffect(() => {
    const [whole, decimal] = String(count).split(".");

    if (decimal === undefined) {
      const dec: number = 0;
      const empty: number = 5 - count;
      const filled: number = Number(whole);
      setRating([filled, dec, empty]);
    } else {
      const dec: number = Number(1);
      const empty: number = 5 - (count + 0.5);
      const filled: number = Number(whole);
      setRating([filled, dec, empty]);
    }
  }, [count]);
  return rating;
};
