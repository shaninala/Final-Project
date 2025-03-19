"use client";
import * as SignIn from "@clerk/elements/sign-in";
import * as Clerk from "@clerk/elements/common";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="min-h-screen flex justify-center items-center bg-[#faf3e0] px-4 py-10">
      {/* Outer rectangle */}
      <div className="w-[800px] bg-[#E8D9B5] border-4 border-[#A67C52] flex flex-col items-center p-12 shadow-lg rounded-lg mt-32">
        <h1 className="text-[#3D405B] text-6xl font-bold text-center mb-6">
          Log in to GasHub
        </h1>

        {/* Form container */}
        <div className="w-full p-6">
          <SignIn.Root>
            <SignIn.Step name="start">
              {/* Email Field */}
              <div className="mb-4">
                <Clerk.Field name="identifier">
                  <Clerk.Label className="text-[#3D405B] block text-lg font-extrabold mb-2">
                    Email:
                  </Clerk.Label>
                  <Clerk.Input className="w-[600px] h-[40px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]" />
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <Clerk.Field name="password">
                  <Clerk.Label className="text-[#3D405B] block text-lg font-extrabold mb-2">
                    Password:
                  </Clerk.Label>
                  <Clerk.Input
                    type="password"
                    className="w-[600px] h-[40px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                  />
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

              {/* Forgot Password */}
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
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
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
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
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
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
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
