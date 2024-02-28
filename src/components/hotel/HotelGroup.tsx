import React from "react";
import styles from "@/styles/hotel/HotelGroup.module.css";
import { useRouter } from "next/navigation";

// defining prop types
interface Props {
  name: string;
  id: string;
}

const HotelGroup = ({ name, id }: Props) => {
  // initiating router
  const router = useRouter();

  // routing to specific hotel chain with hotels under it
  const onClickHandler = () => {
    router.push("/hotel-chain/" + id);
  };
  return (
    <>
      <div className={styles.body} key={id} onClick={onClickHandler}>
        <h1>{name}</h1>
        <p>See Hotel Brands</p>
      </div>
    </>
  );
};

export default HotelGroup;
