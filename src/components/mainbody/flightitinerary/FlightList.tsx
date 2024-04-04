import React, { useContext } from "react";
import styles from "@/styles/mainbody/flightitinerary/FlightList.module.css";
import Flight from "./Flight";
import { hotelContext } from "@/services/store/HotelContext";

const FlightList = () => {
  const { flightDetails } = useContext(hotelContext);

  const flights = flightDetails.availableFlights;
  var flightData: any = [];

  if (flightDetails !== undefined && flights !== undefined) {
    flightData = [
      {
        airLine: flights[0].airLine,
        airLineLogoImg: "/assets/images/emiratesLogo.png",
        from: flightDetails.departureAirport,
        to: flightDetails.destinationAirport,
        flightDuration: flights[0].flightDuration,
        flightType: flights[0].flightType,
        departureTime: flights[0].departtureTime,
        arrivalTime: flights[0].arrivalTime,
        flightPrice: flights[0].flightPrice,
        lastFlight: false,
        firstFlight: true,
      },
      {
        airLine: flights[1].airLine,
        airLineLogoImg: "/assets/images/qatarLogo.png",
        from: flightDetails.departureAirport,
        to: flightDetails.destinationAirport,
        flightDuration: flights[1].flightDuration,
        flightType: flights[1].flightType,
        departureTime: flights[1].departtureTime,
        arrivalTime: flights[1].arrivalTime,
        flightPrice: flights[1].flightPrice,
        lastFlight: false,
        firstFlight: false,
      },
      {
        airLine: flights[2]?.airLine,
        airLineLogoImg: "/assets/images/lufthansaLogo.png",
        from: flightDetails.departureAirport,
        to: flightDetails.destinationAirport,
        flightDuration: flights[2].flightDuration,
        flightType: flights[2].flightType,
        departureTime: flights[2].departtureTime,
        arrivalTime: flights[2].arrivalTime,
        flightPrice: flights[2].flightPrice,
        lastFlight: false,
        firstFlight: false,
      },
      {
        airLine: flights[3].airLine,
        airLineLogoImg: "/assets/images/emiratesLogo.png",
        from: flightDetails.departureAirport,
        to: flightDetails.destinationAirport,
        flightDuration: flights[3].flightDuration,
        flightType: flights[3].flightType,
        departureTime: flights[3].departtureTime,
        arrivalTime: flights[3].arrivalTime,
        flightPrice: flights[3].flightPrice,
        lastFlight: true,
        firstFlight: false,
      },
    ];
  }

  return (
    <div className={styles.container}>
      {flightData.map((fd: any) => (
        <Flight
          airLine={fd.airLine}
          airLineLogoImg={fd.airLineLogoImg}
          from={fd.from}
          to={fd.to}
          flightDuration={fd.flightDuration}
          flightType={fd.flightType}
          departureTime={fd.departureTime}
          arrivalTime={fd.arrivalTime}
          flightPrice={fd.flightPrice}
          lastFlight={fd.lastFlight}
          firstFlight={fd.firstFlight}
        />
      ))}
    </div>
  );
};

export default FlightList;
