"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { registerWithEmailPassword } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Client-side validation
//     if (!form.email || !form.password || !form.confirmPassword) {
//       return setError("All fields are required.");
//     }
//     if (form.password.length < 6) {
//       return setError("Password must be at least 6 characters.");
//     }
//     if (form.password !== form.confirmPassword) {
//       return setError("Passwords do not match.");
//     }

//     setLoading(true);

//     try {
//       // 1. Create user in Firebase
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );
//       const firebaseUser = userCredential.user;

//       // 2. Send email verification
//       await sendEmailVerification(firebaseUser);

//       // 3. Get Firebase ID token
//       const idToken = await firebaseUser.getIdToken();

//       // 4. Register user in our MongoDB backend
//     //   await authAPI.register(idToken);

//       setSuccess(true);
//     } catch (err) {
//       console.error("Registration error:", err);

//       // Map Firebase error codes to user-friendly messages
//       const errorMessages = {
//         "auth/email-already-in-use": "This email is already registered. Please log in.",
//         "auth/invalid-email": "Invalid email address.",
//         "auth/weak-password": "Password is too weak. Use at least 6 characters.",
//         "auth/network-request-failed": "Network error. Check your connection.",
//       };

//       setError(errorMessages[err.code] || err.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerWithEmailPassword(form.email, form.password);
      setSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered. Please log in.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password is too weak. Use at least 6 characters.",
        "auth/network-request-failed": "Network error. Check your connection.",
      };
      setError(errorMessages[err.code] || err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-md text-center space-y-6">
          <CheckCircle2 className="mx-auto text-green-600" size={52} />
          <h2 className="text-2xl font-light tracking-wide text-black">
            Verify Your Email
          </h2>
          <p className="text-zinc-500 text-sm leading-7">
            We've sent a verification link to{" "}
            <span className="font-medium text-black">{form.email}</span>.
            Please check your inbox and click the link to activate your account.
          </p>
          <Button
            className="w-full rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.2em] uppercase h-11"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // ── Register form ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="text-center">
          <h1 className="text-[26px] tracking-[0.35em] uppercase font-serif font-semibold text-[#831113]">
            ARKADE
          </h1>
          <p className="mt-3 text-xs tracking-[0.3em] uppercase text-zinc-400">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error alert */}
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs tracking-[0.2em] uppercase text-zinc-500">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="rounded-none border-zinc-300 focus:border-black focus:ring-0 h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs tracking-[0.2em] uppercase text-zinc-500">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className="rounded-none border-zinc-300 focus:border-black focus:ring-0 h-11"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs tracking-[0.2em] uppercase text-zinc-500">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              className="rounded-none border-zinc-300 focus:border-black focus:ring-0 h-11"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.2em] uppercase h-11 mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-medium underline underline-offset-4 hover:opacity-70"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}