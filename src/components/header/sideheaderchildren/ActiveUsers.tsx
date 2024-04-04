import React from "react";
import Image from "next/image";
import styles from "@/styles/header/ActiveUsers.module.css";
import MapImg from "../../../../public/assets/images/mapIcon.png";
import UserImg from "../../../../public/assets/images/profileImage.png";

const ActiveUsers = () => {
  return (
    <div className={styles.container}>
      <label className="text-[#d6a217] text-sm font-light">ActiveUsers</label>
      <div className={styles.users}>
        <div className={styles.circle2}>
          {" "}
          <Image
            className="h-[50px] w-[50px] rounded-[50%] absolute"
            src={UserImg}
            alt="user"
          />
          <Image
            className="h-[50px] w-[50px] rounded-[50%] absolute ml-6 sl:ml-9 z-1 border-3 border-[#425c5a]"
            src={UserImg}
            alt="user"
          />
          <Image
            className="h-[50px] w-[50px] rounded-[50%] absolute ml-[50px] sl:ml-[75px] z-2 border-3 border-[#425c5a]"
            src={UserImg}
            alt="user"
          />
          <Image
            className="h-[50px] w-[50px] rounded-[50%] absolute ml-[75px] sl:ml-[115px] z-3 border-3 border-[#425c5a]"
            src={UserImg}
            alt="user"
          />
          <div className="h-[50px] w-[50px] rounded-[50%] absolute ml-[100px] sl:ml-[155px] z-4 bg-[#d6a217] flex items-center justify-center border-3 border-[#425c5a]">
            <p className="text-white font-normal">+70</p>
          </div>
        </div>
      </div>
      <Image className="h-[120px] w-[180px]" src={MapImg} alt="map" />
    </div>
  );
};

export default ActiveUsers;
