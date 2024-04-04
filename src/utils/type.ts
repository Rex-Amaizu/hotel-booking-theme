export type TUser = {
  travellerName: string;
  travellerEmail: string;
};

export type TFlightDetails = {
  departureCity: string;
  departureAirport: string;
  destinationCity: string;
  destinationAirport: string;
  flightDate: string;
  flightClass: string;
  availableFlights: {
    airLine: string;
    flightDuration: string;
    flightType: string;
    departtureTime: string;
    arrivalTime: string;
    flightPrice: string;
  }[];
};

// export type TChains = Pick<THotels, "name" | "id">;

// export type TChainResult = { name: string; id: number }[];
