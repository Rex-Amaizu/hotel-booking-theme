import React from "react";
import Image from "next/image";
import styles from "@/styles/header/Wallet.module.css";
import WalletImg from "../../../../public/assets/images/walletIcon.png";

const Wallet = () => {
  return (
    <div className={styles.container}>
      <Image className="h-[25px] w-[30px]" src={WalletImg} alt="wallet" />
      <label className="text-white text-sm font-medium">WALLET</label>
    </div>
  );
};

export default Wallet;
