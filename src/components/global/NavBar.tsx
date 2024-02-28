import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/header/NavBar.module.css";
import { Button } from "@mui/material";

interface Props {
  buttonText: string;
  buttonText2?: string;
  onClick: () => void;
  onClick2?: () => void;
}

const NavBar = ({ buttonText, buttonText2, onClick, onClick2 }: Props) => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const toggleNavbar = () => {
    setNavbar(!navbar);
  };
  return (
    <div className={styles.container}>
      <div>
        <label>HOTEL RANKING</label>
      </div>
      <div className={styles.hamburger} onClick={toggleNavbar}>
        <GiHamburgerMenu
          style={{ cursor: "pointer", width: "50px", height: "50px" }}
        />
      </div>
      {navbar && (
        <div>
          {buttonText2 !== undefined && (
            <Button onClick={onClick2}>{buttonText2}</Button>
          )}
          <Button onClick={onClick}>{buttonText}</Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
