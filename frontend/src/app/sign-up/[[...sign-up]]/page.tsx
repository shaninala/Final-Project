"use client";
import { useState } from "react";
import * as SignUp from "@clerk/elements/sign-up";
import * as Clerk from "@clerk/elements/common";
import TogglePassword from "../../components/auth/TogglePassword";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-start items-center py-8 sm:py-12 md:py-16 px-4 pt-12 sm:pt-20 md:pt-16 pb-20 text-center bg-[#FAF3E0]">
      <div className="w-full max-w-[800px] bg-[#E8D9B5] border-4 border-[#A67C52] flex flex-col items-center p-6 md:p-8 lg:p-12 shadow-lg rounded-lg mt-28 md:mt-28">
        <h1 className="text-[#3D405B] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 md:mb-6">
          Sign Up to GasHub
        </h1>

        <div className="w-full p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col items-center">
          <SignUp.Root>
            <SignUp.Step name="start">
              <div className="mb-4 w-[320px] sm:w-[450px] md:w-[600px] lg:w-[600px]">
                <Clerk.GlobalError className="block text-sm text-red-400" />
                <Clerk.Field name="emailAddress" className="space-y-2 w-full">
                  <Clerk.Label className="text-[#3D405B] block text-sm sm:text-base md:text-lg font-extrabold mb-2 text-left">
                    Email Address:
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-full h-[50px] md:h-[60px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                    aria-label="Email address"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>

              {/* Username Field */}
              <div className="mb-4 w-[320px] sm:w-[450px] md:w-[600px] lg:w-[600px]">
                <Clerk.Field name="username" className="space-y-2 w-full">
                  <Clerk.Label className="text-[#3D405B] block text-sm sm:text-base md:text-lg font-extrabold mb-2 text-left">
                    Username:
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-full h-[50px] md:h-[60px] p-2 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                    aria-label="Username"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>

              <div className="mb-6 w-[320px] sm:w-[450px] md:w-[600px] lg:w-[600px]">
                <Clerk.Field name="password">
                  <Clerk.Label className="text-[#3D405B] block text-sm sm:text-base md:text-lg font-extrabold mb-2 text-left">
                    Password:
                  </Clerk.Label>
                  <div className="relative w-full">
                    <Clerk.Input
                      type={showPassword ? "text" : "password"}
                      className="w-full h-[50px] md:h-[60px] p-2 pr-12 bg-[#E8D9B5] border border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
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

              <div className="mb-4 flex justify-center w-full">
                <SignUp.Action
                  submit
                  className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] h-[45px] sm:h-[50px] md:h-[60px] bg-[#008737] text-[#FAF3E0] text-base sm:text-lg md:text-xl rounded-[100px] mx-auto hover:bg-[#00A04A]"
                >
                  Sign Up
                </SignUp.Action>
              </div>

              <div className="flex justify-center mt-4 text-center w-full">
                <p className="text-[#3D405B] text-sm sm:text-base md:text-lg">
                  Already Have an account?{" "}
                  <Clerk.Link
                    navigate="sign-in"
                    className="text-[#3D405B] font-extrabold underline"
                  >
                    Log in here
                  </Clerk.Link>
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-6 w-full items-center">
                {/* Google Sign-in */}
                <div className="flex justify-center w-full">
                  <Clerk.Connection
                    name="google"
                    className="w-[320px] md:w-[600px] h-[50px] md:h-[60px] bg-[#E8D9B5] border border-[#A67C52] rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#A67C52] hover:bg-[#D1B78C]"
                    aria-label="Sign up with Google"
                  >
                    <Clerk.Icon className="w-5 h-5" />
                    <span className="text-[#4A4033] text-sm sm:text-base font-semibold">
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
