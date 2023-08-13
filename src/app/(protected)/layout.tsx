"use client";

import React from "react";
import { api } from "@/lib/client/api";
import { redirect } from "next/navigation";
import { AuthSessionContext } from "@/lib/client/contexts/auth-session-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/client/cn";
import { useAuthLogout } from "@/lib/client/hooks/use-auth-logout";
import Link from "next/link";
import { ThemeSwtich } from "@/components/ui/theme-switch";
import { Skeleton } from "@/components/ui/skeleton";

function UserNav({ email }: { email: string }) {
  const logout = useAuthLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{email[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{email}</p>
            {/* <p className="text-xs leading-none text-muted-foreground">m@example.com</p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => logout.mutate()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}

export default function ProtectedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { data, error } = api.auth.session.useQuery();
  if (error) {
    return <div>Something went wrong.</div>;
  }
  if (data === null) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <MainNav />
        <div className="flex items-center space-x-4">
          <ThemeSwtich />
          {data ? (
            <UserNav email={data.email} />
          ) : (
            <Skeleton className="h-8 w-8 rounded-full" />
          )}
        </div>
      </div>
      <div className="flex flex-1 justify-stretch">
        {data ? (
          <AuthSessionContext.Provider value={data}>
            {children}
          </AuthSessionContext.Provider>
        ) : (
          <Skeleton className="m-4 w-full" />
        )}
      </div>
    </div>
  );
}
