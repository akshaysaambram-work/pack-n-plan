"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const defaultItems = [
  "Passport",
  "Travel Insurance",
  "Medications",
  "Phone Charger",
  "Travel Adapter",
  "Cash/Cards",
  "Camera",
  "First Aid Kit",
];

export function TravelChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(
    defaultItems.map((text) => ({
      id: Math.random().toString(36).substr(2, 9),
      text,
      checked: false,
    })),
  );
  const [newItem, setNewItem] = useState("");
  const { toast } = useToast();

  const addItem = () => {
    if (!newItem.trim()) return;

    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        text: newItem.trim(),
        checked: false,
      },
    ]);
    setNewItem("");
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const saveChecklist = () => {
    // In a real app, this would save to the database
    toast({
      title: "Checklist Saved",
      description: "Your travel checklist has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Travel Checklist
        </CardTitle>
        <CardDescription>
          Keep track of everything you need for your trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add new item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <Button onClick={addItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <motion.div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-muted flex items-center gap-2 rounded-lg p-2"
                >
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <span
                    className={
                      item.checked ? "text-muted-foreground line-through" : ""
                    }
                  >
                    {item.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-muted-foreground text-sm">
              {items.filter((item) => item.checked).length} of {items.length}{" "}
              items packed
            </p>
            <Button onClick={saveChecklist} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Checklist
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
