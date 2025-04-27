"use client";
import { useState } from "react";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import Link from "next/link";
import TogglePassword from "../../components/auth/TogglePassword";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-start items-center py-8 sm:py-12 md:py-16 px-4 pt-12 sm:pt-20 md:pt-16 pb-20 text-center bg-[#FAF3E0]">
      {/* Outer rectangle */}
      <div className="w-full max-w-[800px] bg-[#E8D9B5] border-4 border-[#A67C52] flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg rounded-lg mt-24 sm:mt-24 md:mt-28">
        <h1 className="text-[#3D405B] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 md:mb-6">
          Log in to GasHub
        </h1>

        {/* Form container */}
        <div className="w-full p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col items-center">
          <SignIn.Root>
            <SignIn.Step name="start">
              {/* Email Field */}
              <div className="mb-4 w-[320px] sm:w-[450px] md:w-[600px] lg:w-[600px]">
                <Clerk.Field name="identifier">
                  <Clerk.Label className="text-[#3D405B] block text-sm sm:text-base md:text-lg font-extrabold mb-2 text-left">
                    Email or Username:
                  </Clerk.Label>
                  <Clerk.Input className="w-full h-[50px] md:h-[60px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]" />
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </div>

              {/* Password Field */}
              <div className="mb-6 relative">
                <Clerk.Field name="password">
                  <Clerk.Label className="text-[#3D405B] block text-lg font-extrabold mb-2">
                    Password:
                  </Clerk.Label>
                  <div className="relative w-[600px]">
                    <Clerk.Input
                      type={showPassword ? "text" : "password"}
                      className="w-[600px] h-[40px] p-2 pr-12 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                    />
                    <TogglePassword
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </div>

              {/* Sign-in button */}
              <div className="mb-4 flex justify-center">
                <SignIn.Action
                  submit
                  className="w-[300px] h-[60px] bg-[#008737] text-[#FAF3E0] text-xl rounded-[100px] mx-auto hover:bg-[#00A04A]"
                >
                  Log In
                </SignIn.Action>
              </div>

              {/* Forgot Pagisword */}
              <div className="flex justify-center mb-6">
                <SignIn.Action
                  navigate="forgot-password"
                  className="text-[#3D405B] block text-lg font-extrabold mb-2 underline"
                >
                  Forgot your password?
                </SignIn.Action>
              </div>

              {/* Sign-up Section */}
              <div className="flex justify-center mt-4">
                <p className="text-[#3D405B] text-lg">
                  Don’t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-[#3D405B] font-extrabold  underline"
                  >
                    Sign up for GasHub
                  </Link>
                </p>
              </div>

              {/* Social Sign-in Options */}
              <div className="flex flex-col gap-2">
                {/* Google Sign-in */}
                <div className="flex justify-center mt-4">
                  <Clerk.Connection
                    name="google"
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] font-semibold">
                      Continue with Google
                    </span>
                  </Clerk.Connection>
                </div>

                {/* Facebook Sign-in */}
                <div className="flex justify-center">
                  <Clerk.Connection
                    name="facebook"
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] font-semibold">
                      Continue with Facebook
                    </span>
                  </Clerk.Connection>
                </div>

                {/* Apple Sign-in */}
                <div className="flex justify-center">
                  <Clerk.Connection
                    name="apple"
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] font-semibold">
                      Continue with Apple
                    </span>
                  </Clerk.Connection>
                </div>
              </div>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </section>
  );
}
