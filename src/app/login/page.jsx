"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


import { toast } from "react-toastify";

import { FcGoogle } from "react-icons/fc";

import {
  FiMail,
  FiLock,
  FiLogIn,
  FiArrowRight,
} from "react-icons/fi";

import {
  Card,
  Separator,
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  // Email Login
  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      console.log({ data, error });

      // Success
      if (data) {
        toast.success("Login successful 🎉", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });

        e.target.reset();

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
      }

      // Error
      if (error) {
        toast.error(error.message || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setIsPending(false);
    }
  };

  
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50"></div>

      {/* Blur Effects */}
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl"></div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-xl overflow-hidden rounded-[36px] border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-r from-pink-500 to-orange-500 shadow-xl">
            <FiLogIn
              className="text-white"
              size={42}
            />
          </div>

          <h1 className="mt-6 text-4xl font-black text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-base leading-7 text-gray-600">
            Login to continue booking your
            favorite study rooms with
            StudyNook.
          </p>
        </div>

        {/* Form */}
        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-6"
        >
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="mb-3 text-sm font-bold text-gray-700">
              Email Address
            </Label>

            <div className="relative">
              <FiMail
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-pink-500"
                size={18}
              />

              <Input
                placeholder="john@example.com"
                className="w-full rounded-2xl pl-10"
              />
            </div>

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
          >
            <Label className="mb-3 text-sm font-bold text-gray-700">
              Password
            </Label>

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-orange-500"
                size={18}
              />

              <Input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl pl-10"
              />
            </div>

            <Description className="mt-2 text-xs text-gray-500">
              Enter your registered account
              password.
            </Description>

            <FieldError />
          </TextField>

          {/* Login Button */}
          <Button
            type="submit"
            isDisabled={isPending}
            className="mt-3 h-14 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-300/40"
          >
            {isPending ? (
              "Logging In..."
            ) : (
              <span className="flex items-center gap-2">
                Login
                <FiArrowRight size={18} />
              </span>
            )}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-3">
          <Separator className="flex-1" />

          <span className="whitespace-nowrap text-sm font-medium text-gray-500">
            Or continue with
          </span>

          <Separator className="flex-1" />
        </div>

        {/* Google Login */}
        <Button
          isDisabled={googlePending}
          variant="outline"
          className="h-14 w-full rounded-2xl border border-gray-200 bg-white text-base font-semibold text-gray-700 transition-all duration-300 hover:border-pink-300 hover:bg-pink-50 hover:shadow-lg"
        >
          <FcGoogle size={24} />

          {googlePending
            ? "Connecting..."
            : "Continue with Google"}
        </Button>

        {/* Register Link */}
        <p className="mt-10 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-pink-500 transition-colors duration-300 hover:text-orange-500"
          >
            Register
          </Link>
        </p>
      </Card>
    </section>
  );
};

export default LoginPage;