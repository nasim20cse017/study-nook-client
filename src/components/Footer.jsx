"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const usefulLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Rooms",
      href: "/rooms",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://facebook.com",
      hoverColor: "hover:text-blue-500",
    },
    {
      icon: <FaXTwitter />,
      href: "https://x.com",
      hoverColor: "hover:text-white",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com",
      hoverColor: "hover:text-blue-400",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com",
      hoverColor: "hover:text-pink-500",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Logo + Description */}
          <div>
            <Link href="/" className="inline-block">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/20 inline-flex items-center justify-center">
                <Image
                  src="/assets/studyNook_Logo.png"
                  width={260}
                  height={90}
                  alt="StudyNook Logo"
                  className="w-auto h-20 object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="mt-6 text-gray-400 leading-relaxed max-w-sm text-sm md:text-base">
              Find comfortable, peaceful, and affordable study rooms
              tailored for students and remote learners.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Useful Links
            </h3>

            <ul className="space-y-4 pl-8">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Information
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@studynook.com"
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  support@studynook.com
                </a>
              </li>

              <li>
                Phone:{" "}
                <a
                  href="tel:+880123456789"
                  className="hover:text-pink-400 transition-colors duration-300"
                >
                  +880 1234-56789
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-7">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-gray-300 text-lg transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 ${social.hoverColor}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 StudyNook. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 text-center">
            Built for modern students & remote learners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;