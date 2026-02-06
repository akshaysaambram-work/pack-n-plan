"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ShareTripDialogProps {
  tripId: string;
  tripName: string;
}

export function ShareTripDialog({
  tripId,
  tripName,
}: Readonly<ShareTripDialogProps>) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const shareUrl = `${globalThis.location.origin}/trips/${tripId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Link Copied",
        description: "The trip link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareTrip = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my trip to ${tripName}`,
          text: `I planned a trip to ${tripName} using PackNPlan. Check it out!`,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast({
            title: "Error",
            description: "Failed to share trip. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Trip
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Trip</DialogTitle>
          <DialogDescription>
            Share your trip itinerary with friends and family
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input value={shareUrl} readOnly />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button onClick={shareTrip} className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share Trip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
