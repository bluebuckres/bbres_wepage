"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParticlesBackground } from "@/components/particles-background";
import Link from "next/link";

export default function InvestorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show error for any input
    setError("Invalid E-Mail or Password.");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0A1525] via-[#061020] to-black">
      {/* NYC Skyline Background */}
      <div 
        className="absolute inset-0 -z-20 opacity-10"
        style={{
          backgroundImage: 'url("/nyc-skyline.png")',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1525] via-[#0A1525]/95 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03),transparent_50%)]" />
      
      <ParticlesBackground />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md space-y-8 rounded-2xl bg-navy-900/50 p-8 backdrop-blur-sm"
        >
          <div>
            <h2 className="font-cormorant text-center text-3xl font-medium tracking-tight text-white">
              Investor Login
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md bg-red-500/10 p-4"
                >
                  <p className="text-sm text-red-400 text-center">{error}</p>
                </motion.div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-navy-800/50 border-navy-700 text-white placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Clear error when user types
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-navy-800/50 border-navy-700 text-white placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(""); // Clear error when user types
                  }}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[#0ea4e9] hover:bg-[#0284c7] text-white font-semibold py-5"
              >
                Log In
              </Button>
            </div>

            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-[#0ea4e9] hover:text-[#0284c7] text-sm font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-navy-900/50 px-4 text-gray-400">Important Information</span>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                This login is by invitation only.
              </p>
              <p>
                If you have received an invitation, you must first create a login by following the link provided in the email sent to you.
              </p>
              <p>
                If you have not received an invitation, and think you should have, please{' '}
                <Link href="/contact" className="text-[#0ea4e9] hover:text-[#0284c7]">
                  contact us
                </Link>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}