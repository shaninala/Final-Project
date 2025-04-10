"use client";
import { useState } from "react";
import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";
import TogglePassword from "../../components/auth/TogglePassword";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex justify-center items-center bg-[#faf3e0] px-4 py-10">
      <div className="w-[800px] bg-[#E8D9B5] border-4 border-[#A67C52] flex flex-col items-center p-12 shadow-lg rounded-lg mt-32">
        <h1 className="text-[#3D405B] text-6xl font-bold text-center mb-6">
          Sign Up to GasHub
        </h1>

        <div className="w-full p-6">
          <SignUp.Root>
            <SignUp.Step name="start">
              <div className="mb-4">
                <Clerk.GlobalError className="block text-sm text-red-400" />
                <Clerk.Field name="emailAddress" className="space-y-2">
                  <Clerk.Label className="text-[#3D405B] block text-lg font-extrabold mb-2">
                    Email Address:
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-[600px] h-[40px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                    aria-label="Email address"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>

              {/* Username Field */}
              <div className="mb-4">
                <Clerk.Field name="username" className="space-y-2">
                  <Clerk.Label className="text-[#3D405B] block text-lg font-extrabold mb-2">
                    Username:
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-[600px] h-[40px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                    aria-label="Username"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>

              <div className="mb-6 relative">
                <Clerk.Field name="password">
                  <Clerk.Label className="text-[#3D405B] block text-lg font-extrabold mb-2">
                    Password:
                  </Clerk.Label>
                  <div className="relative w-[600px]">
                    <Clerk.Input
                      type={showPassword ? "text" : "password"}
                      className="w-[600px] h-[40px] p-2 pr-12 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                      aria-label="Password"
                    />
                    <TogglePassword
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </div>

              <SignUp.Captcha className="empty:hidden" />

              <div className="mb-4 flex justify-center">
                <SignUp.Action
                  submit
                  className="w-[300px] h-[60px] bg-[#008737] text-[#FAF3E0] text-xl rounded-[100px] mx-auto hover:bg-[#00A04A]"
                >
                  Sign Up
                </SignUp.Action>
              </div>

              <div className="flex justify-center mt-4">
                <p className="text-[#3D405B] text-lg">
                  Already Have an account?{" "}
                  <Clerk.Link
                    navigate="sign-in"
                    className="text-[#3D405B] font-extrabold underline"
                  >
                    Log in here
                  </Clerk.Link>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {/* Google Sign-in */}
                <div className="flex justify-center mt-4">
                  <Clerk.Connection
                    name="google"
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                    aria-label="Sign up with Google"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] font-semibold">
                      Sign up with Google
                    </span>
                  </Clerk.Connection>
                </div>

                {/* Facebook Sign-in */}
                <div className="flex justify-center">
                  <Clerk.Connection
                    name="facebook"
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                    aria-label="Sign up with Facebook"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] font-semibold">
                      Sign up with Facebook
                    </span>
                  </Clerk.Connection>
                </div>

                {/* Apple Sign-in */}
                <div className="flex justify-center">
                  <Clerk.Connection
                    name="apple"
                    className="w-[350px] h-[40px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                    aria-label="Sign up with Apple"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] font-semibold">
                      Sign up with Apple
                    </span>
                  </Clerk.Connection>
                </div>
              </div>
            </SignUp.Step>
          </SignUp.Root>
        </div>
      </div>
    </section>
  );
}
