"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, MapPin } from "lucide-react";

// Mock coordinates for Paris locations
const parisLocations = [
  {
    title: "Eiffel Tower & Louvre Area",
    description: "Day 1: Iconic Paris Landmarks",
    location: "1st Arrondissement",
    position: { lat: 48.8584, lng: 2.2945 },
    places: ["Eiffel Tower", "Louvre Museum", "Seine River"],
  },
  {
    title: "Montmartre Art District",
    description: "Day 2: Montmartre & Arts",
    location: "18th Arrondissement",
    position: { lat: 48.8867, lng: 2.3431 },
    places: ["Sacré-Cœur Basilica", "Place du Tertre", "Musée de Montmartre"],
  },
  {
    title: "Palace of Versailles",
    description: "Day 3: Royal Versailles",
    location: "Versailles",
    position: { lat: 48.8049, lng: 2.1204 },
    places: [
      "Palace of Versailles",
      "Gardens of Versailles",
      "Marie Antoinette's Estate",
    ],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export function ItineraryMapPreview() {
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof parisLocations)[0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapInstance && parisLocations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      parisLocations.forEach((location) => {
        bounds.extend(location.position);
      });
      mapInstance.fitBounds(bounds, 50); // 50px padding
    }
  }, [mapInstance]);

  const handleMarkerClick = (location: (typeof parisLocations)[0]) => {
    setSelectedLocation(location);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Itinerary Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={12}
              options={options}
              onLoad={(map) => {
                setMapInstance(map);
                setIsLoading(false);
              }}
            >
              {parisLocations.map((location, index) => (
                <Marker
                  key={index}
                  position={location.position}
                  onClick={() => handleMarkerClick(location)}
                  label={{
                    text: `Day ${index + 1}`,
                    color: "white",
                    className: "font-bold",
                  }}
                />
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.position}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className="max-w-xs">
                    <h3 className="font-semibold text-primary">
                      {selectedLocation.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedLocation.description}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedLocation.location}
                    </p>
                    <ul className="mt-2 text-sm text-gray-600">
                      {selectedLocation.places.map((place, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {place}
                        </li>
                      ))}
                    </ul>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {parisLocations.map((location, index) => (
            <Button
              key={index}
              variant={selectedLocation === location ? "default" : "outline-solid"}
              className="justify-start"
              onClick={() => {
                handleMarkerClick(location);
                mapInstance?.panTo(location.position);
              }}
            >
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                {index + 1}
              </span>
              {location.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
