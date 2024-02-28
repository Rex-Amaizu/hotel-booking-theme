import React from "react";
import {
  GoogleMap as Map,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";

// defining types for lat and lng
interface Location {
  lat: number;
  lng: number;
}

// defining types for position and content
interface MarkerInfo {
  position: Location;
  content: string;
}

// defining types for defaultCenter and markers
interface GoogleMapProps {
  defaultCenter: Location;
  markers: MarkerInfo[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ defaultCenter, markers }) => {
  const [selectedMarker, setSelectedMarker] = React.useState<MarkerInfo | null>(
    null
  );

  // initiating router from useRouter
  const router = useRouter();

  // checking if Map Load script is already loaded
  if (window.google !== undefined)
    return (
      <Map
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={defaultCenter}
        zoom={8}
      >
        {markers.map((marker) => (
          <Marker
            key={JSON.stringify(marker.position)}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>{selectedMarker.content}</div>
          </InfoWindow>
        )}
      </Map>
    );
  return (
    <LoadScript
      googleMapsApiKey={
        process.env.NEXT_PUBLIC_MAPS_API_KEY
          ? process.env.NEXT_PUBLIC_MAPS_API_KEY
          : ""
      }
    >
      <Map
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={defaultCenter}
        zoom={8}
      >
        {markers.map((marker) => (
          <Marker
            key={JSON.stringify(marker.position)}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>{selectedMarker.content}</div>
          </InfoWindow>
        )}
      </Map>
    </LoadScript>
  );
};

export default GoogleMap;
