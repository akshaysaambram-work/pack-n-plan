"use client";

import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function AnimatedHero() {
  return (
    <motion.div
      className="relative overflow-hidden py-20 sm:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="from-primary/25 absolute inset-0 rounded-xl bg-linear-to-b to-transparent" />
      <motion.div
        className="absolute top-0 right-0 -z-10 h-full w-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Globe2 className="size-full opacity-5" />
      </motion.div>

      <div className="relative container">
        <motion.h1
          className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          Your Journey Begins Here
        </motion.h1>
        <motion.p
          className="text-muted-foreground mx-auto mt-6 max-w-175 text-center text-lg"
          variants={itemVariants}
        >
          Discover the world with our AI-powered travel companion. Create
          personalized itineraries, explore hidden gems, and make unforgettable
          memories.
        </motion.p>
      </div>
    </motion.div>
  );
}
