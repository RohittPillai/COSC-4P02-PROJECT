"use client";
import React from 'react';
import { cn } from "~/lib/utils";
import { Button } from "~/app/_components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/card";
import { Input } from "~/app/_components/input";
import { Label } from "~/app/_components/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Documentation: Display a login form if the user is not already logged in. If logged in, show logout option.
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null); // New changes: Hides the form for logged-in users and provides a logout button.
  const [showResetPopup, setShowResetPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    // Logs out the user by clearing localStorage.
    localStorage.removeItem("userData");
    setUser(null);
  }

  function showForgotPasswordPopup() {
    setShowResetPopup(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("userData", JSON.stringify({ name: data.user.name }));
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showResetPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center gap-4">
            <p>Please check your inbox for a password reset link</p>
            <Button onClick={() => setShowResetPopup(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
      {user ? (
        // If user is logged in, display logout prompt and hide the form.
        <div className="flex flex-col gap-6">
          <p className="text-center">You are already logged in as {user.name}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        // Otherwise, display the login form and authenticate credentials.
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with Google or Discord
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => signIn("google")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Login with Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => signIn("discord")}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 55" width="24" height="24" className="shrink-0">
                        <path
                          d="M60.104 4.552A58.172 58.172 0 0045.165.8a.14.14 0 00-.149.07 40.736 40.736 0 00-1.848 3.77 54.261 54.261 0 00-16.369 0 38.958 38.958 0 00-1.89-3.77.15.15 0 00-.148-.07A58.076 58.076 0 0010.89 4.552a.13.13 0 00-.06.05C.943 20.166-1.62 35.348.373 50.39a.16.16 0 00.06.11 59.578 59.578 0 0017.96 3.725.15.15 0 00.157-.11 41.56 41.56 0 003.57-9.13.14.14 0 00-.077-.17 38.597 38.597 0 01-5.519-2.612.14.14 0 01-.014-.24c.373-.28.747-.56 1.102-.85a.14.14 0 01.148-.017c11.6 5.315 24.167 5.315 35.722 0a.14.14 0 01.15.015c.355.29.729.57 1.102.85a.14.14 0 01-.011.24 36.964 36.964 0 01-5.52 2.612.14.14 0 00-.076.17 46.997 46.997 0 003.569 9.13.15.15 0 00.157.11 59.578 59.578 0 0017.96-3.726.16.16 0 00.06-.11c1.98-15.042-.441-30.224-9.665-45.788a.13.13 0 00-.06-.05zM23.725 37.043c-3.495 0-6.366-3.206-6.366-7.14 0-3.933 2.835-7.14 6.366-7.14 3.54 0 6.39 3.227 6.367 7.14 0 3.934-2.834 7.14-6.367 7.14zm23.55 0c-3.495 0-6.366-3.206-6.366-7.14 0-3.933 2.835-7.14 6.366-7.14 3.54 0 6.39 3.227 6.367 7.14 0 3.934-2.834 7.14-6.367 7.14z"
                          fill="currentColor"
                        />
                      </svg>
                      Login with Discord
                    </Button>
                  </div>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="abc@example.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                          onClick={showForgotPasswordPopup}
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </div>
        </div>
      )}
    </>
  );
}
