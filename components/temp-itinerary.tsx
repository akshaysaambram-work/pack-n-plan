"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  DollarSign,
  Tag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShareTripDialog } from "@/components/share-trip-dialog";
import { SaveTripButton } from "@/components/save-trip-button";
import { ItineraryMapPreview } from "@/components/itinerary-map-preview";

const mockItinerary = {
  id: "temp-123",
  destination: "Paris, France",
  duration: "7",
  travelStyle: "balanced",
  budget: 3,
  interests: "Art, History, Food",
  itinerary: {
    title: "A Week in Paris",
    overview:
      "Experience the magic of Paris through its art, history, and culinary delights. This balanced itinerary combines must-see attractions with local experiences.",
    days: [
      {
        title: "Iconic Paris Landmarks",
        location: "1st Arrondissement",
        activities: [
          {
            time: "09:00",
            title: "Eiffel Tower Visit",
            description:
              "Start your day early at Paris's most iconic landmark. Book tickets in advance for the summit.",
            duration: "2-3 hours",
            type: "Attraction",
          },
          {
            time: "12:30",
            title: "Lunch at Café Constant",
            description:
              "Traditional French bistro offering classic dishes in a cozy setting.",
            duration: "1.5 hours",
            type: "Dining",
          },
          {
            time: "14:30",
            title: "Louvre Museum",
            description:
              "World's largest art museum. Don't miss the Mona Lisa and Venus de Milo.",
            duration: "3-4 hours",
            type: "Culture",
          },
          {
            time: "19:00",
            title: "Seine River Cruise",
            description: "Evening cruise to see Paris illuminated at night.",
            duration: "1 hour",
            type: "Experience",
          },
        ],
      },
      {
        title: "Montmartre & Arts",
        location: "18th Arrondissement",
        activities: [
          {
            time: "10:00",
            title: "Sacré-Cœur Basilica",
            description:
              "Visit this stunning white church and enjoy panoramic views of Paris.",
            duration: "1-2 hours",
            type: "Attraction",
          },
          {
            time: "12:00",
            title: "Place du Tertre",
            description:
              "Watch artists at work and perhaps get your portrait drawn.",
            duration: "1 hour",
            type: "Culture",
          },
          {
            time: "13:30",
            title: "Lunch at La Maison Rose",
            description: "Iconic pink restaurant serving French cuisine.",
            duration: "1.5 hours",
            type: "Dining",
          },
          {
            time: "15:30",
            title: "Musée de Montmartre",
            description: "Learn about the district's artistic history.",
            duration: "2 hours",
            type: "Culture",
          },
        ],
      },
      {
        title: "Royal Versailles",
        location: "Versailles",
        activities: [
          {
            time: "09:30",
            title: "Palace of Versailles",
            description: "Explore the opulent palace and its Hall of Mirrors.",
            duration: "3-4 hours",
            type: "Attraction",
          },
          {
            time: "13:30",
            title: "Gardens of Versailles",
            description: "Wander through the magnificent formal gardens.",
            duration: "2-3 hours",
            type: "Nature",
          },
          {
            time: "16:00",
            title: "Marie Antoinette's Estate",
            description:
              "Visit the Queen's private retreat and the Petit Trianon.",
            duration: "2 hours",
            type: "History",
          },
        ],
      },
    ],
  },
};

const activityTypeColors: Record<string, string> = {
  Attraction: "bg-blue-500",
  Dining: "bg-orange-500",
  Culture: "bg-purple-500",
  Experience: "bg-green-500",
  Nature: "bg-emerald-500",
  History: "bg-amber-500",
};

export function TempItinerary() {
  const [selectedDay, setSelectedDay] = useState("0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {mockItinerary.itinerary.title}
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {mockItinerary.destination}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <SaveTripButton tripData={mockItinerary} />
              <ShareTripDialog
                tripId={mockItinerary.id}
                tripName={mockItinerary.destination}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {mockItinerary.duration} days
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Compass className="h-3 w-3" />
              {mockItinerary.travelStyle}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {new Array(mockItinerary.budget).fill("$").join("")}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {mockItinerary.interests}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {mockItinerary.itinerary.overview}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Accordion
          type="single"
          collapsible
          value={selectedDay}
          onValueChange={setSelectedDay}
          className="space-y-4"
        >
          {mockItinerary.itinerary.days.map((day, index) => (
            <Card key={index}>
              <AccordionItem value={index.toString()} className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-lg font-semibold">
                      Day {index + 1}: {day.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {day.location}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="border-muted relative ml-2 border-l-2 pt-2 pl-8">
                      {day.activities.map((activity, actIndex) => (
                        <motion.div
                          key={actIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: actIndex * 0.1 }}
                          className="relative mb-8 last:mb-0"
                        >
                          <div className="bg-background ring-muted absolute -left-10.25 flex h-6 w-6 items-center justify-center rounded-full shadow-xs ring-1">
                            <Clock className="h-3 w-3" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{activity.title}</h4>
                              <span className="text-muted-foreground text-sm">
                                {activity.time}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">
                                {activity.duration}
                              </Badge>
                              <Badge
                                className={`${activityTypeColors[activity.type]} text-white`}
                              >
                                {activity.type}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>
          ))}
        </Accordion>

        <div className="space-y-6">
          <ItineraryMapPreview />
        </div>
      </div>
    </motion.div>
  );
}
