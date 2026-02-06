"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  Map,
  MessageSquare,
  Compass,
  Clock,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Globe2,
    title: "AI-Powered Planning",
    description:
      "Leverage advanced AI to create personalized travel itineraries based on your preferences",
    detail:
      "Our AI understands your travel style, budget, and interests to craft the perfect itinerary.",
  },
  {
    icon: Map,
    title: "Discover Hidden Gems",
    description: "Uncover unique experiences and local favorites",
    detail:
      "Go beyond tourist hotspots and discover authentic local experiences tailored to your interests.",
  },
  {
    icon: Clock,
    title: "Time-Saving",
    description: "Plan your entire trip in minutes, not hours",
    detail:
      "Our AI handles the heavy lifting, so you can focus on getting excited about your journey.",
  },
  {
    icon: Compass,
    title: "Smart Recommendations",
    description: "Get personalized suggestions for activities and places",
    detail:
      "Receive recommendations based on your interests, previous trips, and community feedback.",
  },
  {
    icon: Shield,
    title: "Reliable Planning",
    description: "Trust in carefully curated suggestions",
    detail:
      "All recommendations are verified and updated regularly for accuracy.",
  },
  {
    icon: MessageSquare,
    title: "Community Driven",
    description: "Learn from and contribute to our travel community",
    detail:
      "Share experiences, provide feedback, and help improve the platform for everyone.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function Features() {
  return (
    <motion.div
      id="features"
      className="py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div className="mb-12 text-center" variants={cardVariants}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose PackNPlan?
          </h2>
          <p className="text-muted-foreground mt-4">
            Experience the future of travel planning with our innovative
            features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="hover:shadow-primary/45 h-full transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <CardHeader>
                  <feature.icon className="mb-2 size-8" />
                  <CardTitle className="text-primary">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>{feature.detail}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
