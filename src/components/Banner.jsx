"use client";

import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiHome, FiUsers } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative Blur */}
      {/* <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div> */}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 backdrop-blur-xl px-5 py-2 shadow-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></span>

              <p className="text-sm font-semibold text-gray-700">
                Study Better • Focus More • Achieve More
              </p>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
              Find Your
              <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                Perfect Study Room
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
              Browse and book quiet, private study rooms in your
              library. List your own room and earn while helping
              students and remote learners stay productive.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <Link href="/rooms">
                <button className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pink-300/50">
                  Explore Rooms

                  <FiArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </Link>

              <Link href="/about">
                <button className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl px-8 py-4 text-sm font-bold uppercase tracking-wide text-gray-700 shadow-lg transition-all duration-300 hover:border-pink-300 hover:text-pink-500 hover:shadow-xl">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  icon: <FiHome size={22} />,
                  title: "500+",
                  subtitle: "Study Rooms",
                  bg: "bg-pink-100",
                  text: "text-pink-500",
                },
                {
                  icon: <FiUsers size={22} />,
                  title: "10K+",
                  subtitle: "Happy Students",
                  bg: "bg-orange-100",
                  text: "text-orange-500",
                },
                {
                  icon: <FiBookOpen size={22} />,
                  title: "24/7",
                  subtitle: "Easy Booking",
                  bg: "bg-yellow-100",
                  text: "text-yellow-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-2xl ${item.bg} p-3 ${item.text}`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/40 backdrop-blur-xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Study Room"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">
                      Most Popular Room
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-white">
                      Quiet Premium Space
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg">
                    Available
                  </div>
                </div>
              </div>
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

export default Banner;