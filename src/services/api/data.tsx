import { TUser } from "@/utils/type";

export const data = {
  userData: {
    travellerName: "ALEX JOHNSON",
    travellerEmail: "alexjohnson@gmail.com",
  },
  flightDetails: {
    departureCity: "NEW YORK",
    departureAirport: "JFK",
    destinationCity: "MUMBAI",
    destinationAirport: "BOM",
    flightDate: "29 JULY 2019",
    flightClass: "FIRST CLASS",
    availableFlights: [
      {
        airLine: "EMIRATES",
        flightDuration: "1H 20M",
        flightType: "NON-STOP",
        departtureTime: "13:00",
        arrivalTime: "14:20",
        flightPrice: "$1,572",
      },
      {
        airLine: "QATAR AIRWAYS",
        flightDuration: "12H 10M",
        flightType: "NON-STOP",
        departtureTime: "14:00",
        arrivalTime: "15:20",
        flightPrice: "$2,072",
      },
      {
        airLine: "LUFTHANSA",
        flightDuration: "10H 15M",
        flightType: "NON-STOP",
        departtureTime: "13:00",
        arrivalTime: "12:20",
        flightPrice: "$1,872",
      },
      {
        airLine: "EMIRATES",
        flightDuration: "11H 20M",
        flightType: "NON-STOP",
        departtureTime: "15:00",
        arrivalTime: "16:20",
        flightPrice: "$1,772",
      },
    ],
  },
};
