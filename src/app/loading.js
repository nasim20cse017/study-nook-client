
"use client";

import Image from "next/image";

const Loading = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Background Blur Effects */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl"></div>

      {/* Loading Card */}
      <div className="relative z-10 flex flex-col items-center rounded-[32px] border border-white/40 bg-white/70 px-10 py-12 shadow-2xl backdrop-blur-xl">
        {/* Logo */}
        <div className="relative">
          <Image
            src="/assets/studyNook_Logo.png"
            alt="StudyNook Logo"
            width={320}
            height={120}
            priority
            className="h-auto w-[220px] sm:w-[280px] animate-pulse"
          />

          {/* Glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-400/20 via-orange-300/20 to-cyan-300/20 blur-2xl"></div>
        </div>

        {/* Loader */}
        <div className="mt-10 flex items-center gap-3">
          <span className="h-4 w-4 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.3s]"></span>

          <span className="h-4 w-4 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.15s]"></span>

          <span className="h-4 w-4 animate-bounce rounded-full bg-cyan-500"></span>
        </div>

        {/* Text */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-black text-gray-800">
            Loading StudyNook
          </h2>

          <p className="mt-2 text-sm font-medium text-gray-500">
            Preparing your peaceful study experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;