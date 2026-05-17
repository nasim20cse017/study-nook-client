"use client";

import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

 

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Rooms",
      path: "/rooms",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <Image
            src="/assets/studyNook.png"
            width={180}
            height={60}
            alt="StudyNook Logo"
            priority
            className="w-auto h-12 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
              <Link href="/login">
                <Button
                  variant="light"
                  className={`font-semibold transition-colors duration-300 ${
                    pathname === "/login"
                      ? "text-pink-600"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                  Register
                </Button>
              </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;