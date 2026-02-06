"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (
    message: string,
    type: NotificationType,
    duration?: number,
  ) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  showNotification: () => null,
  removeNotification: () => null,
});

export function NotificationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType, duration: number = 5000) => {
      const id = Math.random().toString(36).slice(2);

      setNotifications((prev) => [...prev, { id, type, message, duration }]);

      if (duration > 0) {
        setTimeout(() => removeNotification(id), duration);
      }
    },
    [removeNotification],
  );

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, removeNotification }}
    >
      {children}
      <div className="fixed right-4 bottom-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-background flex items-center gap-3 rounded-lg border p-4 shadow-lg"
            >
              {getIcon(notification.type)}
              <p className="text-sm">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
