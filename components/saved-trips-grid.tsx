"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plane, Calendar, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { getUserTrips, deleteTrip, Trip } from "@/lib/trips";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function SavedTripsGrid() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function loadTrips() {
      if (!user) return;
      try {
        const userTrips = await getUserTrips(user.uid);
        setTrips(userTrips);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load saved trips.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadTrips();
  }, [user, toast]);

  const handleDeleteTrip = async (tripId: string) => {
    try {
      await deleteTrip(tripId);
      setTrips(trips.filter((trip) => trip.id !== tripId));
      toast({
        title: "Success",
        description: "Trip deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete trip.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Plane className="stroke-primary h-8 w-8 animate-pulse" />
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 text-xl font-semibold">No saved trips yet</h2>
        <p className="text-muted-foreground mb-4">
          Start planning your next adventure!
        </p>
        <Button asChild>
          <Link href="/plan">Plan a Trip</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {trips.map((trip) => (
        <motion.div key={trip.id} variants={item}>
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {trip.destination}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {trip.duration} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Travel Style: {trip.travelStyle}
              </p>
              <p className="text-muted-foreground text-sm">
                Budget Level: {trip.budget}/5
              </p>
              {trip.interests && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Interests: {trip.interests}
                </p>
              )}
            </CardContent>
            <CardFooter className="mt-auto flex justify-between pt-6">
              <Button variant="outline" asChild>
                <Link href={`/itineraries/${trip.id}`}>View Itinerary</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this trip? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => trip.id && handleDeleteTrip(trip.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
