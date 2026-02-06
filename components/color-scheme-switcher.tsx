"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

const colors = [
  {
    name: "Zinc",
    value: "zinc",
    className: "fill-zinc-500",
  },
  {
    name: "Slate",
    value: "slate",
    className: "fill-slate-500",
  },
  {
    name: "Stone",
    value: "stone",
    className: "fill-stone-500",
  },
  {
    name: "Gray",
    value: "gray",
    className: "fill-gray-500",
  },
  {
    name: "Neutral",
    value: "neutral",
    className: "fill-neutral-500",
  },
  {
    name: "Red",
    value: "red",
    className: "fill-red-500",
  },
  {
    name: "Rose",
    value: "rose",
    className: "fill-rose-500",
  },
  {
    name: "Orange",
    value: "orange",
    className: "fill-orange-500",
  },
  {
    name: "Green",
    value: "green",
    className: "fill-green-500",
  },
  {
    name: "Blue",
    value: "blue",
    className: "fill-blue-500",
  },
  {
    name: "Yellow",
    value: "yellow",
    className: "fill-yellow-500",
  },
  {
    name: "Violet",
    value: "violet",
    className: "fill-violet-500",
  },
] as const;

export function ColorSchemeSwitcher() {
  const { color, setColor } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-45 justify-start">
          <Circle className={`fill-primary mr-2 size-4`} />
          {colors.find((c) => c.value === color)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45">
        {colors.map((c) => (
          <DropdownMenuItem
            key={c.value}
            onClick={() => setColor(c.value)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Circle className={cn(`mr-2 size-4 ${c.className}`)} />
              {c.name}
            </div>
            {color === c.value && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
