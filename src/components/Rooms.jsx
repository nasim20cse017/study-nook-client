"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiDollarSign,
  FiGrid,
  FiUsers,
  FiAlertCircle,
  FiSearch,
  FiFilter,
} from "react-icons/fi";

// Amenities available for filtering
const amenitiesOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [floor, setFloor] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Build query string from filters
  const buildQuery = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (selectedAmenities.length > 0)
      params.append("amenities", selectedAmenities.join(","));
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (floor) params.append("floor", floor);
    return params.toString();
  };

  const fetchRooms = async () => {
    setLoading(true);
    const query = buildQuery();
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms${query ? `?${query}` : ""}`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error(error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [search, selectedAmenities, minPrice, maxPrice, floor]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinPrice("");
    setMaxPrice("");
    setFloor("");
  };

  // Show custom loading UI while fetching rooms
  if (loading) {
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
            <h2 className="text-2xl font-black text-gray-800">Loading StudyNook</h2>
            <p className="mt-2 text-sm font-medium text-gray-500">
              Preparing your peaceful study experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Background & Blur Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50"></div>
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
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

        {/* Search & Filter Bar */}
        <div className="mb-12 rounded-3xl bg-white/60 p-5 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />
              <input
                type="text"
                placeholder="Search by room name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-pink-100 bg-white py-3 pl-11 pr-4 focus:border-pink-400 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-100 to-orange-100 px-5 py-3 font-semibold text-pink-600 transition hover:shadow-md"
            >
              <FiFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-pink-100 pt-6 md:grid-cols-3">
              {/* Amenities (checkboxes) */}
              <div>
                <label className="mb-2 block font-bold text-gray-700">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-3">
                  {amenitiesOptions.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="h-4 w-4 rounded border-pink-300 text-pink-500 focus:ring-pink-400"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="mb-2 block font-bold text-gray-700">
                  Hourly Rate ($)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2"
                  />
                </div>
              </div>

              {/* Floor Dropdown */}
              <div>
                <label className="mb-2 block font-bold text-gray-700">
                  Floor
                </label>
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2"
                >
                  <option value="">All Floors</option>
                  <option value="1">Floor 1</option>
                  <option value="2">Floor 2</option>
                  <option value="3">Floor 3</option>
                  <option value="4">Floor 4</option>
                  <option value="5">Floor 5</option>
                </select>
              </div>
            </div>
          )}

          {/* Clear Filters Button */}
          {(search || selectedAmenities.length > 0 || minPrice || maxPrice || floor) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-pink-500 underline hover:text-pink-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Rooms Grid / Empty State */}
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => {
              const amenities = room?.amenities || [];
              const visibleAmenities = amenities.slice(0, 3);
              const remainingCount = amenities.length - visibleAmenities.length;

              return (
                <div
                  key={room._id}
                  className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/40 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        room.image ||
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={room.roomName}
                      className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 shadow-md backdrop-blur-md">
                      <p className="text-sm font-bold text-pink-600">
                        ${room.hourlyRate || 0}/hr
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="text-2xl font-black text-gray-900 transition-colors duration-300 group-hover:text-pink-500">
                      {room.roomName}
                    </h2>
                    <p className="mt-4 flex-1 leading-7 text-gray-600">
                      {room.description?.length > 100
                        ? `${room.description.slice(0, 100)}...`
                        : room.description || "No description available."}
                    </p>

                    {/* Info */}
                    <div className="mt-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-pink-100 p-2 text-pink-500">
                          <FiGrid size={18} />
                        </div>
                        <p className="font-medium">Floor: {room.floor || "N/A"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-orange-100 p-2 text-orange-500">
                          <FiUsers size={18} />
                        </div>
                        <p className="font-medium">{room.capacity || 0} People</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-yellow-100 p-2 text-yellow-500">
                          <FiDollarSign size={18} />
                        </div>
                        <p className="font-medium">${room.hourlyRate || 0} / Hour</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mt-7 flex flex-wrap gap-3">
                      {visibleAmenities.map((amenity, idx) => (
                        <span
                          key={idx}
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

                    <Link href={`/rooms/${room._id}`} className="mt-8">
                      <button className="group/button flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-300/40">
                        View Details
                        <FiArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[32px] border border-dashed border-pink-200 bg-white/70 p-16 text-center shadow-lg backdrop-blur-xl">
            <div className="rounded-full bg-gradient-to-r from-pink-100 to-orange-100 p-6">
              <FiAlertCircle size={50} className="text-pink-500" />
            </div>
            <h2 className="mt-8 text-3xl font-black text-gray-900">
              No Rooms Found
            </h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-gray-600">
              Try adjusting your filters or add a new room.
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

export default Rooms;