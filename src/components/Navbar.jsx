"use client";

import Image from "next/image";
import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";

import {
  FiHome,
  FiGrid,
  FiPlusCircle,
  FiBookOpen,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

const Navbar = () => {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  // console.log("Current User:", user);

  const pathname = usePathname();

  const router = useRouter();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef = useRef(null);

  // Close Profile Dropdown Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logout successful 👋", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      router.push("/login");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Logout failed!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  // Common Nav Links
  const publicLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome size={18} />,
    },
    {
      name: "Rooms",
      path: "/rooms",
      icon: <FiGrid size={18} />,
    },
  ];

  // Private Nav Links
  const privateLinks = [
    {
      name: "Add Room",
      path: "/add-room",
      icon: <FiPlusCircle size={18} />,
    },
    {
      name: "My Listings",
      path: "/my-listings",
      icon: <FiGrid size={18} />,
    },
    {
      name: "My Bookings",
      path: "/my-bookings",
      icon: <FiBookOpen size={18} />,
    },
  ];

  // Active Link Style
  const navLinkStyle = (path) =>
    pathname === path
      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-200"
      : "text-gray-700 hover:bg-pink-50 hover:text-pink-500";

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-2xl">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50/60 via-white/70 to-orange-50/60"></div>

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/assets/studyNook.png"
              width={150}
              height={60}
              alt="StudyNook Logo"
            />
          </div>

          
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Main Links */}
          <ul className="flex items-center gap-2">
            {publicLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${navLinkStyle(
                    link.path
                  )}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Logged In Links */}
            {user &&
              privateLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${navLinkStyle(
                      link.path
                    )}`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div
              className="relative"
              ref={profileRef}
            >
              {/* Profile Button */}
              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 px-3 py-2 shadow-sm transition-all duration-300 hover:border-pink-200 hover:bg-pink-50"
              >
                {/* Profile Image */}
                {user?.image ? (
                  <Image
                    referrerPolicy="no-referrer"
                    src={user.image}
                    alt={user.name}
                    width={45}
                    height={45}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-sm font-bold uppercase text-white">
                    {user?.name?.charAt(0)}
                  </div>
                )}

                {/* Name */}
                <div className="text-left">
                  <h3 className="max-w-[140px] truncate text-sm font-bold text-gray-800">
                    {user?.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    My Account
                  </p>
                </div>

                <FiChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 top-20 w-72 overflow-hidden rounded-3xl border border-white/30 bg-white/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
                  profileOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-3 opacity-0"
                }`}
              >
                {/* User Info */}
                <div className="border-b border-gray-100 bg-gradient-to-r from-pink-50 to-orange-50 p-5">
                  <div className="flex items-center gap-4">
                    {user?.image ? (
                      <Image
                        referrerPolicy="no-referrer"
                        src={user.image}
                        alt={user.name}
                        width={60}
                        height={60}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-lg font-bold uppercase text-white">
                        {user?.name?.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        {user?.name}
                      </h2>

                      <p className="max-w-[170px] truncate text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="space-y-2 p-4">
                  <Link
                    href="/profile"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-500"
                  >
                    <FiUser size={18} />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-50"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${navLinkStyle(
                  "/login"
                )}`}
              >
                <FiLogIn size={18} />
                Login
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <FiUserPlus size={18} />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="rounded-2xl border border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition-all duration-300 hover:bg-pink-50 hover:text-pink-500 lg:hidden"
        >
          {menuOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          menuOpen
            ? "max-h-[1000px]"
            : "max-h-0"
        }`}
      >
        <div className="space-y-6 border-t border-gray-100 bg-white/95 px-4 py-6 backdrop-blur-2xl sm:px-6">
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-pink-50 to-orange-50 p-5">
              {user?.image ? (
                <Image
                  referrerPolicy="no-referrer"
                  src={user.image}
                  alt={user.name}
                  width={60}
                  height={60}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-lg font-bold uppercase text-white">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {user?.name}
                </h2>

                <p className="max-w-[200px] truncate text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="grid grid-cols-1 gap-3">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300 ${navLinkStyle(
                  link.path
                )}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {user &&
              privateLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300 ${navLinkStyle(
                    link.path
                  )}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Auth Buttons */}
          <div className="border-t border-gray-100 pt-5">
            {user ? (
              <div className="grid grid-cols-1 gap-3">
                <Link
                  href="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center gap-3 rounded-2xl bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-500"
                >
                  <FiUser size={18} />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                <Link
                  href="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={`flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300 ${navLinkStyle(
                    "/login"
                  )}`}
                >
                  <FiLogIn size={18} />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <FiUserPlus size={18} />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;