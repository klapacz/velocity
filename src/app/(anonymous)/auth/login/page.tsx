"use client";

import { AuthLoginForm } from "@/components/forms/auth-login-form";

export default function Login() {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto w-full max-w-md">
        <AuthLoginForm />
      </div>
    </div>
  );
}
