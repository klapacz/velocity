"use client";

import { AuthRegisterForm } from "@/components/forms/auth-register-form";

export default function Register() {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto w-full max-w-md">
        <AuthRegisterForm />
      </div>
    </div>
  );
}
