/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const emailSchema = z.string().email({ message: "Invalid email address" });
  const otpSchema = z.string().length(4, { message: "OTP must be 4 digits" });
  const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters" });

  const [email, setEmail] = useState(
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : ""
  );
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [step, setStep] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("step") || "email"
      : "email"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const persistState = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  // Centralized API Call
  const fetchApi = async (url: string, body: object) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    return data;
  };

  // Send OTP
  const handleSendEmail = async () => {
    try {
      setLoading(true);
      emailSchema.parse(email);
      await fetchApi(`${process.env.NEXT_PUBLIC_BASE_URL}/forgetPassword`, {
        email,
      });
      setStep("otp");
      persistState("step", "otp");
      persistState("email", email);
      setError("");
    } catch (e: any) {
      setError(e.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      otpSchema.parse(otp);
      await fetchApi(`${process.env.NEXT_PUBLIC_BASE_URL}/match-otp`, {
        otp,
        email,
      });
      setStep("password");
      persistState("step", "password");
      setError("");
    } catch (e: any) {
      setError(e.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const handleChangePassword = async () => {
    try {
      setLoading(true);
      passwordSchema.parse(password);
      await fetchApi(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`, {
        password,
        email,
      });
      setStep("success");
      persistState("step", "success");
      setError("");
    } catch (e: any) {
      setError(e.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeMail = () => {
    setStep("email");
    persistState("step", "email");
    setEmail("");
    persistState("email", "");
    setError("");
  };

  React.useEffect(() => {
    if (step === "success" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (countdown === 0) {
      persistState("step", "email");
      persistState("email", "");
      router.push("/login");
    }
  }, [countdown, step, router]);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      {step === "email" && (
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Enter Your Email</h2>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSendEmail}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </div>
      )}

      {step === "otp" && (
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[...Array(4)].map((_, i) => (
                <InputOTPSlot key={i} index={i} className="p-7" />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 disabled:opacity-50"
            onClick={handleVerifyOTP}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button variant="ghost" onClick={handleChangeMail}>
            Change Email
          </Button>
        </div>
      )}

      {step === "password" && (
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleChangePassword} disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </div>
      )}

      {step === "success" && (
        <div>
          <h2>Password Changed Successfully!</h2>
          <p>Redirecting in {countdown} seconds...</p>
        </div>
      )}
    </div>
  );
};

export default Page;
