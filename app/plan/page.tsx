import { TripPlanner } from "@/components/trip-planner";
import { TripCostCalculator } from "@/components/trip-cost-calculator";
import { TravelChecklist } from "@/components/travel-checklist";
import { TempItinerary } from "@/components/temp-itinerary";
import { PageTransition } from "@/components/page-transition";
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="example">Example Itinerary</TabsTrigger>
          </TabsList>
          <TabsContent value="planner">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-8">
                <TripPlanner />
              </div>
              <div className="space-y-8">
                <TripCostCalculator />
                <TravelChecklist />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="example">
            <TempItinerary />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
