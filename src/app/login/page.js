"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, MailWarning, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, appUser, loading: authLoading, signInWithGoogle, signInWithEmailPassword } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (user && !user.emailVerified) {
      setUnverified(true);
      return;
    }

    if (user && appUser) {
      if (appUser.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [user, appUser, router]);

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setUnverified(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUnverified(false);

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailPassword(form.email, form.password);
      // navigation will be handled in effect when auth state updates
    } catch (err) {
      console.error("Login error:", err);
      if (err.message === "Email not verified") {
        setUnverified(true);
      } else {
        const errorMessages = {
          "auth/invalid-credential": "Invalid email or password.",
          "auth/user-not-found": "No account found with this email.",
          "auth/wrong-password": "Incorrect password.",
          "auth/invalid-email": "Invalid email address.",
          "auth/too-many-requests": "Too many failed attempts. Try again later.",
          "auth/network-request-failed": "Network error. Check your connection.",
          "auth/user-disabled": "This account has been disabled.",
        };
        setError(errorMessages[err.code] || err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      if (!auth.currentUser) {
        setError("Please sign in first to resend verification.");
        return;
      }
      await sendEmailVerification(auth.currentUser);
      setResendSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to resend verification email.");
    } finally {
      setResendLoading(false);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setUnverified(false);

//     if (!form.email || !form.password) {
//       return setError("Email and password are required.");
//     }

//     setLoading(true);

//     try {
//       // 1. Sign in with Firebase
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );
//       const firebaseUser = userCredential.user;

//       // 2. Check email verification
//       if (!firebaseUser.emailVerified) {
//         setUnverified(true);
//         setLoading(false);
//         return;
//       }

//       // 3. Get ID token and sync with backend
//       const idToken = await firebaseUser.getIdToken();
//       await authAPI.login(idToken);

//       // 4. Redirect to home
//       router.push("/");
//     } catch (err) {
//       console.error("Login error:", err);

//       const errorMessages = {
//         "auth/invalid-credential": "Invalid email or password.",
//         "auth/user-not-found": "No account found with this email.",
//         "auth/wrong-password": "Incorrect password.",
//         "auth/invalid-email": "Invalid email address.",
//         "auth/too-many-requests": "Too many failed attempts. Try again later.",
//         "auth/network-request-failed": "Network error. Check your connection.",
//         "auth/user-disabled": "This account has been disabled.",
//       };

//       setError(errorMessages[err.code] || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendVerification = async () => {
//     setResendLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );
//       await sendEmailVerification(userCredential.user);
//       setResendSuccess(true);
//     } catch (err) {
//       setError("Failed to resend verification email.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="text-center">
          <h1 className="text-[26px] tracking-[0.35em] uppercase font-serif font-semibold text-[#831113]">
            ARKADE
          </h1>
          <p className="mt-3 text-xs tracking-[0.3em] uppercase text-zinc-400">
            Sign in to your account
          </p>
        </div>

        {/* Unverified email warning */}
        {unverified && (
          <div className="bg-amber-50 border border-amber-200 px-4 py-4 space-y-3">
            <div className="flex items-start gap-2 text-sm text-amber-800">
              <MailWarning size={16} className="mt-0.5 shrink-0" />
              <span>
                Your email is not verified yet. Please check your inbox for the
                verification link.
              </span>
            </div>
            {resendSuccess ? (
              <p className="text-xs text-green-700">
                ✓ Verification email resent! Check your inbox.
              </p>
            ) : (
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="text-xs text-amber-800 underline underline-offset-2 hover:opacity-70 disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend verification email"}
              </button>
            )}
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading || authLoading}
            className="w-full rounded-none bg-white text-black border border-zinc-300 hover:bg-zinc-100 h-11 font-medium"
          >
            <LogIn size={16} className="mr-2" />
            {loading || authLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
          <p className="text-xs text-zinc-500 text-center">Use Google to log in and manage roles in the admin panel.</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Error */}
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs tracking-[0.2em] uppercase text-zinc-500">
                Password
              </Label>
              {/* Forgot password placeholder — implement later */}
              <Link
                href="/forgot-password"
                className="text-xs text-zinc-500 hover:text-black underline underline-offset-2"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-black font-medium underline underline-offset-4 hover:opacity-70"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}