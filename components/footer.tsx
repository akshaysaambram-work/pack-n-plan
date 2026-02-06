"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Plane, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ],
  company: [{ name: "Feedback", href: "/feedback" }],
  legal: [
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
    { name: "Cookie Policy", href: "/" },
  ],
  social: [
    { name: "Facebook", href: "/", icon: Facebook },
    { name: "Twitter", href: "/", icon: Twitter },
    { name: "Instagram", href: "/", icon: Instagram },
    { name: "YouTube", href: "/", icon: Youtube },
  ],
};

export function Footer() {
  return (
    <motion.footer
      className="bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <Plane className="stroke-primary h-6 w-6" />
              <span className="text-lg font-bold">PackNPlan</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Making travel planning smarter and easier with AI-powered
              recommendations.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} PackNPlan. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
