"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/auth-context";
import {
  Home,
  PlaneIcon as PlaneLine,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Plan Trip", href: "/plan", icon: PlaneLine },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
  ];

  const accountLinks = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Saved Trips", href: "/saved-trips", icon: PlaneLine },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Toggle body scroll
    document.body.style.overflow = isOpen ? "unset" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="size-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs md:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background p-6 shadow-lg md:hidden"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={closeMenu}
                >
                  <PlaneLine className="size-6" />
                  <span className="text-lg font-bold">PackNPlan</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMenu}
                  className="rounded-full"
                >
                  <X className="size-6" />
                </Button>
              </div>

              <ScrollArea className="mt-6 h-[calc(100vh-8rem)] pb-6">
                <div className="space-y-6">
                  <nav className="flex flex-col space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Button
                          key={item.name}
                          variant={isActive ? "default" : "ghost"}
                          className="justify-start"
                          asChild
                        >
                          <Link href={item.href} onClick={closeMenu}>
                            <item.icon className="mr-2 size-5" />
                            {item.name}
                          </Link>
                        </Button>
                      );
                    })}
                  </nav>

                  {user ? (
                    <>
                      <div className="border-t pt-4">
                        <p className="mb-2 text-sm font-medium">Account</p>
                        <nav className="flex flex-col space-y-1">
                          {accountLinks.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <Button
                                key={item.name}
                                variant={isActive ? "default" : "ghost"}
                                className="justify-start"
                                asChild
                              >
                                <Link href={item.href} onClick={closeMenu}>
                                  <item.icon className="mr-2 size-5" />
                                  {item.name}
                                </Link>
                              </Button>
                            );
                          })}
                        </nav>
                      </div>
                      <div className="border-t pt-4">
                        <Button
                          variant="destructive"
                          className="w-full justify-start"
                          onClick={() => {
                            logout();
                            closeMenu();
                          }}
                        >
                          <LogOut className="mr-2 size-5" />
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-4">
                      <Button className="w-full justify-start" asChild>
                        <Link href="/login" onClick={closeMenu}>
                          <User className="mr-2 size-5" />
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
