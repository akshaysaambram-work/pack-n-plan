import { ProtectedRoute } from "@/components/protected-route";
import { SettingsForm } from "@/components/forms/settings-form";
import { PageTransition } from "@/components/page-transition";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="container mx-auto max-w-4xl py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>
          <SettingsForm />
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
