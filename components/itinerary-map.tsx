"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  day: number;
}

interface ItineraryMapProps {
  locations: Location[];
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export function ItineraryMap({ locations }: ItineraryMapProps) {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const directionsCallback = useRef<
    | ((
        result: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus,
      ) => void)
    | null
  >(null);

  useEffect(() => {
    if (locations.length > 0) {
      setCenter(locations[0]);
    }
  }, [locations]);

  const calculateRoute = () => {
    if (locations.length < 2) return;

    const waypoints = locations.slice(1, -1).map((location) => ({
      location: { lat: location.lat, lng: location.lng },
      stopover: true,
    }));

    const directionsRequest = {
      origin: { lat: locations[0].lat, lng: locations[0].lng },
      destination: {
        lat: locations[locations.length - 1].lat,
        lng: locations[locations.length - 1].lng,
      },
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsCallback.current = (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      }
    };

    return directionsRequest;
  };

  return (
    <motion.div
      className="overflow-hidden rounded-lg border shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={options}
          onLoad={() => setIsLoading(false)}
        >
          {isLoading && (
            <div className="bg-background/80 absolute inset-0 flex items-center justify-center">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          )}

          {locations.length > 1 && (
            <DirectionsService
              options={calculateRoute()!}
              callback={directionsCallback.current!}
            />
          )}

          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
                suppressMarkers: true,
              }}
            />
          )}

          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              label={{
                text: `Day ${location.day}`,
                color: "white",
                className: "font-bold",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </motion.div>
  );
}
