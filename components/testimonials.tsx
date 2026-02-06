"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Adventure Traveler",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "The AI recommendations were spot-on! Found amazing hidden spots in Tokyo I would've never discovered otherwise.",
  },
  {
    name: "Michael Chen",
    role: "Digital Nomad",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "Saved me hours of planning. The itineraries are well-balanced and actually account for travel time between locations.",
  },
  {
    name: "Emma Davis",
    role: "Family Traveler",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "Perfect for family trips! It suggested kid-friendly activities while keeping parents entertained too.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      className="py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground mt-4">
            Join thousands of satisfied travelers who have discovered their
            perfect trips
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:border-primary h-full transition-colors duration-300 ease-in-out">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-primary font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
