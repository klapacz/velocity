"use client";

import React from "react";
import { api } from "@/lib/client/api";
import { redirect } from "next/navigation";
import { AuthSessionContext } from "@/lib/client/contexts/auth-session-context";

export default function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { isLoading, error, data } = api.auth.session.useQuery();

  console.log({ data });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong.</div>;
  }
  if (data === null) {
    redirect("/auth/login");
  }

  return (
    <AuthSessionContext.Provider value={data}>
      {children}
    </AuthSessionContext.Provider>
  );
}
