
import Image from "next/image";
import Link from "next/link";

import {
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiCheckCircle,
  FiEdit,
  FiTrash2,
  FiBookOpen,
  FiArrowLeft,
} from "react-icons/fi";

import { EditModal } from "@/components/EditModal";
import {DeleteAlert} from "@/components/DeleteAlert";
import {BookingCard} from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "StudyNook – Room Details",
};


const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

    const {token} = await auth.api.getToken({
    headers: await headers()
  })


//   console.log('token', token)
  // Fetch Room


  const res = await fetch(  `http://localhost:5001/rooms/${id}`, 
   {
    headers: {
      authorization: `Bearer ${token}`
    }
}
  )


//   const resp = await fetch("http://localhost:5001/bookings", {
//     cache: "no-store",
//   });

//   const bookings = await resp.json();

  

  const room = await res.json();
  

  

  // Room Data
  const {
    _id,
    roomName,
    floor,
    capacity,
    hourlyRate,
    image,
    description,
    amenities,
    bookingCount,
    ownerEmail,
    ownerName,
  } = room;

  const resp = await fetch(
  `http://localhost:5001/bookings/${id}`
);

const data = await resp.json();

const totalBookings = data.total;


console.log(data.total);


  // Session
 const session = await auth.api.getSession({
  headers: await headers(),
});

console.log("Current Session:", session);

// Current User
const user = session?.user;

console.log("Current User:", user);

// User Name
const userName = user?.name;

console.log("User Name:", userName);



//   // Check Ownership
//   const isOwner =
//     user?.email === ownerEmail;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/rooms"
          className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-50 hover:text-pink-500"
        >
          <FiArrowLeft size={18} />
          Back To Rooms
        </Link>

        {/* Top Actions */}
        {user?.email === ownerEmail && (
          <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
            <EditModal room={room} />

            <DeleteAlert room={room} />
          </div>
        )}

        {/* Main Card */}
        <div className="overflow-hidden rounded-[36px] border border-white/40 bg-white/80 shadow-2xl backdrop-blur-xl">
          {/* Hero Section */}
          <div className="relative">
            {/* Room Image */}
            <Image
              src={image}
              alt={roomName}
              width={1600}
              height={900}
              priority
              className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[620px]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                {/* Left Content */}
                <div className="max-w-4xl">
                  {/* Floor */}
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl">
                    <FiMapPin className="text-pink-400" />
                    {floor}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
                    {roomName}
                  </h1>

                  {/* Small Info */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {/* Capacity */}
                    <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                      <FiUsers className="text-orange-400" />

                      <span className="text-sm font-medium">
                        {capacity} People
                      </span>
                    </div>

                    {/* Booking Count */}
                    <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                      <FiBookOpen className="text-pink-400" />

                      <span className="text-sm font-medium">
                        {totalBookings || 0} Bookings
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Card */}
                <div className="w-full max-w-[280px] rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-2xl">
                  <p className="text-sm font-medium text-white/70">
                    Hourly Rate
                  </p>

                  <h2 className="mt-3 flex items-center gap-2 text-5xl font-black text-pink-300">
                    <FiDollarSign />
                    {hourlyRate}
                  </h2>

                  <p className="mt-1 text-sm text-white/70">
                    Per Hour
                  </p>

                  {/* Booking Button */}
                  <div className="mt-6">
                    {user ? (
                      <BookingCard room={room} />
                    ) : (
                      <Link
                        href={`/login?redirect=/rooms/${_id}`}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-300"
                      >
                        <FiBookOpen size={18} />
                        Login To Book
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="grid gap-8 p-5 lg:grid-cols-[1fr_380px] lg:gap-10 lg:p-10">
            {/* Left Side */}
            <div>
              {/* Overview */}
              <div className="rounded-[32px] border border-gray-100 bg-gradient-to-br from-pink-50 to-orange-50 p-6 shadow-sm sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg">
                    <FiBookOpen size={30} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-gray-900">
                      Room Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Discover all room details and features
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base leading-8 text-gray-600 sm:text-lg">
                  {description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Capacity */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                    <FiUsers size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Seat Capacity
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    Comfortable study space for{" "}
                    <span className="font-semibold text-pink-500">
                      {capacity} people
                    </span>
                    .
                  </p>
                </div>

                {/* Floor */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                    <FiMapPin size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Room Location
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    Located on{" "}
                    <span className="font-semibold text-orange-500">
                      {floor}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Amenities */}
              <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-2xl font-black text-gray-900">
                  Amenities
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Everything included in this study room
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {amenities?.map(
                    (amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 px-4 py-3 text-sm font-semibold text-gray-700"
                      >
                        <FiCheckCircle className="text-pink-500" />

                        {amenity}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Owner Info */}
              <div className="rounded-[32px] border border-gray-100 bg-gradient-to-br from-pink-50 to-orange-50 p-6 shadow-sm sm:p-8">
                <h3 className="text-2xl font-black text-gray-900">
                  Room Owner
                </h3>

                <div className="mt-5 flex items-center gap-4">
                  <Image
                    src={user?.image}
                    alt={ownerName || "Owner Image"}
                    width={70}
                    height={70}
                    className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md"
                  />

                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {ownerName}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {ownerEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner Controls */}
              {/* {user?.email === ownerEmail && (
                <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                  <h3 className="text-2xl font-black text-gray-900">
                    Manage Room
                  </h3>

                  <div className="mt-6 flex flex-col gap-4">
                    <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <FiEdit size={18} />
                      Edit Room
                    </button>

                    <button className="flex items-center justify-center gap-3 rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white">
                      <FiTrash2 size={18} />
                      Delete Room
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;