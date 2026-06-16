"use client";
import SignInWithGoogle from "@/components/Navbar/SignInWithGoogle";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiSparkles } from "react-icons/hi2";

export default function SignInPage() {
  const SignInFormAction = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      callbackURL: "/",
    });
    if (data.user) {
      // redirect("/");
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <HiSparkles className="text-yellow-500" />
            Welcome to Pixgen
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Sign In your account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Have no account?{" "}
            <Link
              href="/signup"
              className="text-violet-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          
          <SignInWithGoogle/>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <Form className="flex flex-col gap-5" onSubmit={SignInFormAction}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </Label>
              <Input
                placeholder="jane@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              />
              <FieldError className="text-xs text-rose-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8)
                  return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value))
                  return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Password must contain at least one number";
                return null;
              }}
            >
              <Label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </Label>
              <Input
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              />
              <Description className="text-xs text-gray-400 mt-1">
                At least 8 characters with 1 uppercase letter and 1 number.
              </Description>
              <FieldError className="text-xs text-rose-500 mt-1" />
            </TextField>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl transition text-sm"
              >
                <Check />
                Sign in
              </Button>
              <Button
                type="reset"
                variant="secondary"
                className="px-5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
