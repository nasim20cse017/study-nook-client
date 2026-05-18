// src/app/rooms/page.jsx

import Link from "next/link";

import {
  FiArrowRight,
  FiDollarSign,
  FiGrid,
  FiUsers,
  FiAlertCircle,
} from "react-icons/fi";

const RoomsPage = async () => {
  let rooms = [];

  

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50"></div>

      {/* Blur Effects */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></span>

            <p className="text-sm font-semibold text-gray-700">
              Find Your Perfect Study Space
            </p>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-black leading-tight text-gray-900 md:text-6xl">
            Explore Modern
            <span className="block bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Study Rooms
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Browse peaceful and fully equipped study rooms designed
            for students, remote workers, and focused learners.
          </p>
        </div>

        {/* Rooms Grid */}
        {rooms?.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => {
              const amenities = room?.amenities || [];

              const visibleAmenities = amenities.slice(0, 3);

              const remainingCount =
                amenities.length - visibleAmenities.length;

              return (
                <div
                  key={room?._id}
                  className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/40 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        room?.image ||
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={room?.roomName || "Study Room"}
                      className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Price Badge */}
                    <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-md backdrop-blur-md">
                      <p className="text-sm font-bold text-pink-600">
                        ${room?.hourlyRate || 0}/hr
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7">
                    {/* Room Name */}
                    <h2 className="text-2xl font-black text-gray-900 transition-colors duration-300 group-hover:text-pink-500">
                      {room?.roomName || "Unnamed Room"}
                    </h2>

                    {/* Description */}
                    <p className="mt-4 flex-1 leading-7 text-gray-600">
                      {room?.description?.length > 100
                        ? `${room.description.slice(0, 100)}...`
                        : room?.description ||
                          "No description available."}
                    </p>

                    {/* Info */}
                    <div className="mt-6 flex flex-col gap-3">
                      {/* Floor */}
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="rounded-xl bg-pink-100 p-2 text-pink-500">
                          <FiGrid size={18} />
                        </div>

                        <p className="font-medium">
                          Floor: {room?.floor || "N/A"}
                        </p>
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="rounded-xl bg-orange-100 p-2 text-orange-500">
                          <FiUsers size={18} />
                        </div>

                        <p className="font-medium">
                          {room?.capacity || 0} People
                        </p>
                      </div>

                      {/* Hourly Rate */}
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="rounded-xl bg-yellow-100 p-2 text-yellow-500">
                          <FiDollarSign size={18} />
                        </div>

                        <p className="font-medium">
                          ${room?.hourlyRate || 0} / Hour
                        </p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-7 flex flex-wrap gap-3">
                      {visibleAmenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gradient-to-r from-pink-100 to-orange-100 px-4 py-2 text-sm font-semibold text-pink-600"
                        >
                          {amenity}
                        </span>
                      ))}

                      {remainingCount > 0 && (
                        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                          +{remainingCount} more
                        </span>
                      )}
                    </div>

                    {/* Button */}
                    <Link
                      href={`/rooms/${room?._id}`}
                      className="mt-8"
                    >
                      <button className="group/button flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-300/40">
                        View Details

                        <FiArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover/button:translate-x-1"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* No Rooms Found */
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[32px] border border-dashed border-pink-200 bg-white/70 p-16 text-center shadow-lg backdrop-blur-xl">
            <div className="rounded-full bg-gradient-to-r from-pink-100 to-orange-100 p-6">
              <FiAlertCircle
                size={50}
                className="text-pink-500"
              />
            </div>

            <h2 className="mt-8 text-3xl font-black text-gray-900">
              No Rooms Found
            </h2>

            <p className="mt-4 max-w-md text-lg leading-8 text-gray-600">
              We couldn't find any study rooms right now. Please
              check back later or add a new room.
            </p>

            <Link href="/add-room" className="mt-8">
              <button className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-300/40">
                Add New Room
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomsPage;