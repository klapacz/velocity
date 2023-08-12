"use client";

import { AuthLoginForm } from "@/components/forms/auth-login-form";

export default function Login() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        </div>
        <AuthLoginForm />
      </div>
    </div>
  );
}
