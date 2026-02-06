"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Calculator, MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  accommodation: z.number().min(0),
  transportation: z.number().min(0),
  activities: z.number().min(0),
  food: z.number().min(0),
  shopping: z.number().min(0),
  miscellaneous: z.number().min(0),
  currency: z.string(),
});

export function TripCostCalculator() {
  const [total, setTotal] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accommodation: 0,
      transportation: 0,
      activities: 0,
      food: 0,
      shopping: 0,
      miscellaneous: 0,
      currency: "USD",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const total = Object.entries(values).reduce((acc, [key, value]) => {
      if (key !== "currency" && typeof value === "number") {
        return acc + value;
      }
      return acc;
    }, 0);
    setTotal(total);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Trip Cost Calculator
        </CardTitle>
        <CardDescription>
          Calculate the estimated cost of your trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "accommodation", label: "Accommodation" },
                { name: "transportation", label: "Transportation" },
                { name: "activities", label: "Activities" },
                { name: "food", label: "Food" },
                { name: "shopping", label: "Shopping" },
                { name: "miscellaneous", label: "Miscellaneous" },
              ].map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => field.onChange(field.value + 100)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            field.onChange(Math.max(0, field.value - 100))
                          }
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <Button type="submit">Calculate Total</Button>
              {total > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-lg font-semibold">
                    Estimated Total Cost:{" "}
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: form.getValues("currency"),
                    }).format(total)}
                  </p>
                </motion.div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
