"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Please enter at least 8 characters"),
});

function AccountCreatedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>Account created</h1>
        </CardTitle>
        <CardDescription>Check your email for activation link.</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function AuthRegisterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const register = api.auth.register.useMutation({
    onSuccess() {
      setIsSuccess(true);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    register.mutate(values);
  }

  if (isSuccess) {
    return <AccountCreatedCard />;
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>
              <h1> Register</h1>
            </CardTitle>
          </CardHeader>

          <CardContent className="grid w-full items-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="link" asChild>
              <Link href="/auth/login">Login instead</Link>
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
