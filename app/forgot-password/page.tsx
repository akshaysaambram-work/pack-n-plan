import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { PageTransition } from "@/components/page-transition";

export default function ForgotPasswordPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-md py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email address to reset your password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </PageTransition>
  );
}
