"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface DestinationWeatherProps {
  destination: string;
}

export function DestinationWeather({
  destination,
}: Readonly<DestinationWeatherProps>) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from a weather API
    const fetchWeather = async () => {
      try {
        // Simulated API response
        const mockWeather: WeatherData = {
          temperature: Math.floor(Math.random() * 30) + 10,
          condition: ["Sunny", "Cloudy", "Rainy", "Windy"][
            Math.floor(Math.random() * 4)
          ],
          humidity: Math.floor(Math.random() * 60) + 40,
          windSpeed: Math.floor(Math.random() * 20) + 5,
        };
        setWeather(mockWeather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6" />;
      case "cloudy":
        return <Cloud className="h-6 w-6" />;
      case "rainy":
        return <CloudRain className="h-6 w-6" />;
      case "windy":
        return <Wind className="h-6 w-6" />;
      default:
        return <Sun className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="h-6 w-6" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather in {destination}</CardTitle>
        <CardDescription>Current weather conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {getWeatherIcon(weather.condition)}
            </motion.div>
            <div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-muted-foreground text-sm">
                {weather.condition}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm">Humidity: {weather.humidity}%</p>
            <p className="text-sm">Wind Speed: {weather.windSpeed} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
