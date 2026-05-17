"use client";

import {
  FiClock,
  FiShield,
  FiWifi,
  FiCoffee,
} from "react-icons/fi";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiWifi size={26} />,
      title: "High-Speed WiFi",
      description:
        "Enjoy uninterrupted internet access for studying and remote work.",
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-100",
      text: "text-pink-500",
    },
    {
      icon: <FiCoffee size={26} />,
      title: "Comfort Zone",
      description:
        "Relaxing and quiet spaces designed for maximum productivity.",
      color: "from-orange-400 to-orange-500",
      bg: "bg-orange-100",
      text: "text-orange-500",
    },
    {
      icon: <FiClock size={26} />,
      title: "24/7 Availability",
      description:
        "Book rooms anytime for late-night or early-morning sessions.",
      color: "from-yellow-400 to-orange-400",
      bg: "bg-yellow-100",
      text: "text-yellow-500",
    },
    {
      icon: <FiShield size={26} />,
      title: "Safe & Secure",
      description:
        "Verified rooms and trusted hosts for a secure experience.",
      color: "from-fuchsia-500 to-pink-500",
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-500",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Blur */}
      {/* <div className="absolute top-10 left-0 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 backdrop-blur-xl px-5 py-2 shadow-lg">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></span>

            <p className="text-sm font-semibold text-gray-700">
              Why Students Love StudyNook
            </p>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Everything You Need
            <span className="block bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              For Productive Learning
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Peaceful, modern, and flexible study spaces designed to
            help students stay focused and productive.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div
                className={`inline-flex rounded-2xl ${feature.bg} p-4 ${feature.text}`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>

              <div
                className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${feature.color}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};