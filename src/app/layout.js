import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook – Home",
    description: "Modern Study Room Booking Platform",

};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-gray-900">

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

      </body>
    </html>
  );
}