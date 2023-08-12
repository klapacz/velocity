"use client";

import { api } from "@/lib/client/api";
import { redirect } from "next/navigation";

export default function AnonymousLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { isLoading, error, data } = api.auth.session.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong.</div>;
  }
  if (data !== null) {
    redirect("/");
  }

  return <>{children}</>;
}
