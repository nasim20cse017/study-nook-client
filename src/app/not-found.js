// src/app/not-found.js

"use client";

import Image from "next/image";
import Link from "next/link";

import { FiArrowLeft, FiHome } from "react-icons/fi";

export const metadata = {
  title: "StudyNook – Not Found",
};

const NotFound = () => {
  return (
    <section className="relative flex  items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50 px-4 py-16">
      {/* Background Blur Effects */}
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[36px] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-500"></div>

        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src="/assets/studyNook_Logo.png"
              alt="StudyNook Logo"
              width={320}
              height={120}
              priority
              className="h-auto w-[220px] sm:w-[280px]"
            />

            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-400/20 via-orange-300/20 to-cyan-300/20 blur-2xl"></div>
          </div>
        </div>

        {/* 404 */}
        <div className="mt-10 text-center">
          <h1 className="bg-gradient-to-r from-pink-500 via-orange-500 to-cyan-500 bg-clip-text text-7xl font-black text-transparent sm:text-8xl">
            404
          </h1>

          <h2 className="mt-5 text-3xl font-black text-gray-900 sm:text-4xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
            Oops! The page you are looking for doesn&apos;t exist or may have
            been moved. Let&apos;s get you back to your peaceful study space.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-7 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-300/40"
          >
            <FiHome size={20} />
            Back To Home
          </Link>

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-gray-700 transition-all duration-300 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600"
          >
            <FiArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Bottom Decorative */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-bounce rounded-full bg-pink-500"></span>

            <span className="h-3 w-3 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.15s]"></span>

            <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-500 [animation-delay:-0.3s]"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;