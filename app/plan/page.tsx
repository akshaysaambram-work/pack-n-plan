import { PageTransition } from "@/components/page-transition";
import { TempItinerary } from "@/components/temp-itinerary";
import { TravelChecklist } from "@/components/travel-checklist";
import { TripCostCalculator } from "@/components/trip-cost-calculator";
import { TripPlanner } from "@/components/trip-planner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlanPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Plan Your Perfect Trip
          </h1>
          <p className="text-muted-foreground">
            Let AI help you create a personalized travel itinerary based on your
            preferences
          </p>
        </div>
        <Tabs defaultValue="planner" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="trip-cost">Trip Cost Calculator</TabsTrigger>
            <TabsTrigger value="checklist">Travel Checklist</TabsTrigger>
            <TabsTrigger value="example">Example Itinerary</TabsTrigger>
          </TabsList>
          <TabsContent value="planner">
            <TripPlanner />
          </TabsContent>
          <TabsContent value="trip-cost">
            <TripCostCalculator />
          </TabsContent>
          <TabsContent value="checklist">
            <TravelChecklist />
          </TabsContent>
          <TabsContent value="example">
            <TempItinerary />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
