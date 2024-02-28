import React from "react";
import styles from "@/styles/header/Header.module.css";
import { Button } from "@mui/material";
import NavBar from "@/components/global/NavBar";
import { useMedia } from "@/hooks/useResponsive";

interface Props {
  buttonText: string;
  buttonText2?: string;
  onClick: () => void;
  onClick2?: () => void;
}

const Header = ({ buttonText, buttonText2, onClick, onClick2 }: Props) => {
  const mobileDevice = useMedia("(max-width: 600px)");
  return (
    <React.Fragment>
      {mobileDevice ? (
        <NavBar
          buttonText={buttonText}
          buttonText2={buttonText2}
          onClick={onClick}
          onClick2={onClick2}
        />
      ) : (
        <div className={styles.container}>
          <div>
            <label>HOTEL RANKING</label>
          </div>
          <div>
            {buttonText2 !== undefined && (
              <Button onClick={onClick2}>{buttonText2}</Button>
            )}
            <Button onClick={onClick}>{buttonText}</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
