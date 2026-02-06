"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookmarkPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { saveTrip } from "@/lib/trips";

interface SaveTripButtonProps {
  tripData: {
    destination: string;
    duration: string;
    travelStyle: string;
    budget: number;
    interests: string;
    itinerary: any;
  };
}

export function SaveTripButton({ tripData }: Readonly<SaveTripButtonProps>) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save trips.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await saveTrip({
        userId: user.uid,
        ...tripData,
      });
      setIsSaved(true);
      toast({
        title: "Success",
        description: "Trip saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={handleSave}
        disabled={isSaving || isSaved}
        variant={isSaved ? "secondary" : "default"}
        className="flex items-center gap-2"
      >
        {isSaved ? (
          <>
            <Check className="h-4 w-4" />
            Saved
          </>
        ) : (
          <>
            <BookmarkPlus className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Trip"}
          </>
        )}
      </Button>
    </motion.div>
  );
}
