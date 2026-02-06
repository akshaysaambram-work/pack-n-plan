import { RegisterForm } from "@/components/forms/register-form";
import { PageTransition } from "@/components/page-transition";

export default function RegisterPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-md py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Join PackNPlan to start planning your adventures
          </p>
        </div>
        <RegisterForm />
      </div>
    </PageTransition>
  );
}
