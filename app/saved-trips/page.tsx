import { ProtectedRoute } from "@/components/protected-route";
import { SavedTripsGrid } from "@/components/saved-trips-grid";
import { PageTransition } from "@/components/page-transition";

export default function SavedTripsPage() {
  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="container mx-auto max-w-7xl py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Your Saved Trips</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your saved travel itineraries
            </p>
          </div>
          <SavedTripsGrid />
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
