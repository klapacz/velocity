"use client";

import { AuthRegisterForm } from "@/components/forms/auth-register-form";

export default function Register() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
        </div>
        <AuthRegisterForm />
      </div>
    </div>
  );
}
