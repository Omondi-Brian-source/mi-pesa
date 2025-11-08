"use client"

import { useState } from "react"
import { Smartphone } from "lucide-react"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setMessageType("")

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
      })

      if (result?.ok) {
        setMessageType("success")
        setMessage("Check your email for the magic link!")
        setEmail("")
      } else if (result?.error) {
        setMessageType("error")
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessageType("error")
      setMessage("An error occurred. Please try again.")
      console.error("Magic link error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    await signIn("google", { redirect: true, callbackUrl: "/" })
  }

  const handleAppleSignIn = async () => {
    await signIn("apple", { redirect: true, callbackUrl: "/" })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleMagicLink}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Smartphone className="size-5" />
              </div>
              <span className="sr-only">myPesa</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to myPesa</h1>
            <FieldDescription>
              Sign in with your email or social account
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </Field>
          {message && (
            <div
              className={cn(
                "text-sm p-3 rounded-md",
                messageType === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              )}
            >
              {message}
            </div>
          )}
          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email}
            >
              {isLoading ? "Sending..." : "Sign in with Magic Link"}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleAppleSignIn}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path
                  d="M17.05 20.28c-1.25.35-2.67.2-3.51-.89-.27-.36-1.02-1.41-1.54-2.26-.24-.42-.53-.58-1.17-.58H8.07C6.82 16.55 5.6 15.35 4.59 13.73c-1.67-2.75-2.64-6.72-2.64-11.04 0-2.26.15-2.76 1.24-4.04C3.98 2.05 5.07 1 7 1h5.5c1.93 0 3.02 1.05 3.82 2.65.82 1.55 1.65 3.81 1.65 5.84 0 2.05-.85 3.46-2.1 4.12.23.79.75 1.42 1.32 1.84-.48 1.45-1.52 2.38-3.14 3.83z"
                  fill="currentColor"
                />
              </svg>
              Apple
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center text-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  )
}
