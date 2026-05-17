"use client";

import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";

export const CommunitySection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 backdrop-blur-xl px-5 py-2 shadow-lg">
              <FiStar className="text-orange-500" />

              <p className="text-sm font-semibold text-gray-700">
                Join The StudyNook Community
              </p>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight text-gray-900">
              Learn Better Together
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Thousands of students and remote professionals are already
              using StudyNook to discover peaceful spaces and stay
              productive every day.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-5">
              <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-lg">
                <h3 className="text-4xl font-black bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  15K+
                </h3>

                <p className="mt-2 text-gray-600 font-medium">
                  Active Students
                </p>
              </div>

              <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-lg">
                <h3 className="text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  1K+
                </h3>

                <p className="mt-2 text-gray-600 font-medium">
                  Listed Rooms
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-10">
              <Link href="/rooms">
                <button className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pink-300/40">
                  Explore Rooms

                  <FiArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-[40px] border border-white/40 bg-white/40 backdrop-blur-xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Students studying together"
                className="h-[650px] w-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/80">
                Trusted by students worldwide
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                Modern Study Experience
              </h3>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 opacity-20 blur-2xl"></div>

            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-gradient-to-r from-orange-400 to-pink-400 opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};