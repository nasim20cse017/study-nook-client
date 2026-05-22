"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiCheckCircle,
  FiEdit,
  FiTrash2,
  FiBookOpen,
  FiArrowLeft,
  FiX,
  FiHome,
  FiLayers,
  FiImage,
  FiCheck,
} from "react-icons/fi";

const amenitiesOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function RoomDetailsPage({ params }) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [room, setRoom] = useState(null);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  // Unwrap params (Next.js 15+)
  const unwrappedParams = useState(null);
  const [roomId, setRoomId] = useState(null);
  useEffect(() => {
    const unwrap = async () => {
      const resolved = await params;
      setRoomId(resolved.id);
    };
    unwrap();
  }, [params]);

  useEffect(() => {
    if (sessionLoading) return;
    if (!roomId) return;
    if (!session?.user?.id) {
      toast.info("Please login to view room details", { theme: "colored" });
      router.push(`/login?redirect=/rooms/${roomId}`);
      return;
    }
    fetchRoomData();
  }, [session, sessionLoading, roomId]);

  const fetchRoomData = async () => {
    if (!roomId) return;
    setLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      // Fetch room details
      const roomRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`, {
        headers: { authorization: `Bearer ${tokenData?.token}` },
      });
      const roomData = await roomRes.json();
      if (!roomRes.ok) {
        toast.error(roomData.message || "Failed to load room", { theme: "colored" });
        router.push("/rooms");
        return;
      }
      setRoom(roomData);

      // Fetch booking count
      const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${roomId}`);
      const bookingData = await bookingRes.json();
      setTotalBookings(bookingData.total || 0);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { theme: "colored" });
      router.push("/rooms");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    setEditingRoom(room);
    setSelectedAmenities(room?.amenities || []);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditingRoom(null);
    setSelectedAmenities([]);
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const formData = new FormData(e.target);
      const updatedRoom = Object.fromEntries(formData.entries());
      updatedRoom.capacity = Number(updatedRoom.capacity);
      updatedRoom.hourlyRate = Number(updatedRoom.hourlyRate);
      updatedRoom.amenities = selectedAmenities;
      if (!updatedRoom.image) updatedRoom.image = editingRoom.image;

      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${editingRoom._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updatedRoom),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Room updated successfully", { theme: "colored" });
        fetchRoomData(); // refresh room data
        closeEditModal();
      } else {
        toast.error(data.message || "Failed to update room", { theme: "colored" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { theme: "colored" });
    } finally {
      setIsUpdating(false);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room._id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${tokenData?.token}` },
      });
      if (res.ok) {
        toast.success("Room deleted successfully", { theme: "colored" });
        router.push("/my-listings");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete room", { theme: "colored" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { theme: "colored" });
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center rounded-[32px] border border-white/40 bg-white/70 px-10 py-12 shadow-2xl backdrop-blur-xl">
          <div className="relative">
            <Image
              src="/assets/studyNook_Logo.png"
              alt="StudyNook Logo"
              width={320}
              height={120}
              priority
              className="h-auto w-[220px] sm:w-[280px] animate-pulse"
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-400/20 via-orange-300/20 to-cyan-300/20 blur-2xl"></div>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <span className="h-4 w-4 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.3s]"></span>
            <span className="h-4 w-4 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.15s]"></span>
            <span className="h-4 w-4 animate-bounce rounded-full bg-cyan-500"></span>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-black text-gray-800">Loading StudyNook</h2>
            <p className="mt-2 text-sm font-medium text-gray-500">Preparing your peaceful study experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!room) return null;

  const isOwner = session?.user?.email === room.ownerEmail;

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
        {isOwner && (
          <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={openEditModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
            >
              <FiEdit size={18} />
              Edit Room
            </button>
            <button
              onClick={openDeleteModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-100 px-5 py-3 text-sm font-semibold text-red-600 shadow-md transition-all hover:scale-[1.01] hover:bg-red-500 hover:text-white"
            >
              <FiTrash2 size={18} />
              Delete Room
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="overflow-hidden rounded-[36px] border border-white/40 bg-white/80 shadow-2xl backdrop-blur-xl">
          {/* Hero Section */}
          <div className="relative">
            <Image
              src={room.image}
              alt={room.roomName}
              width={1600}
              height={900}
              priority
              className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[620px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-4xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl">
                    <FiMapPin className="text-pink-400" />
                    {room.floor}
                  </div>
                  <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
                    {room.roomName}
                  </h1>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                      <FiUsers className="text-orange-400" />
                      <span className="text-sm font-medium">{room.capacity} People</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                      <FiBookOpen className="text-pink-400" />
                      <span className="text-sm font-medium">{totalBookings || 0} Bookings</span>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[280px] rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-2xl">
                  <p className="text-sm font-medium text-white/70">Hourly Rate</p>
                  <h2 className="mt-3 flex items-center gap-2 text-5xl font-black text-pink-300">
                    <FiDollarSign />
                    {room.hourlyRate}
                  </h2>
                  <p className="mt-1 text-sm text-white/70">Per Hour</p>
                  <div className="mt-6">
                    {session?.user ? (
                      // Replace with your BookingCard component or inline booking logic
                      <Link
                        href={`/booking/${room._id}`}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-300"
                      >
                        <FiBookOpen size={18} />
                        Book Now
                      </Link>
                    ) : (
                      <Link
                        href={`/login?redirect=/rooms/${room._id}`}
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
            <div>
              <div className="rounded-[32px] border border-gray-100 bg-gradient-to-br from-pink-50 to-orange-50 p-6 shadow-sm sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg">
                    <FiBookOpen size={30} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Room Overview</h2>
                    <p className="mt-1 text-sm text-gray-500">Discover all room details and features</p>
                  </div>
                </div>
                <p className="text-base leading-8 text-gray-600 sm:text-lg">{room.description}</p>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                    <FiUsers size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Seat Capacity</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    Comfortable study space for{" "}
                    <span className="font-semibold text-pink-500">{room.capacity} people</span>.
                  </p>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                    <FiMapPin size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Room Location</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-500">
                    Located on <span className="font-semibold text-orange-500">{room.floor}</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-2xl font-black text-gray-900">Amenities</h3>
                <p className="mt-2 text-sm text-gray-500">Everything included in this study room</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {room.amenities?.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 px-4 py-3 text-sm font-semibold text-gray-700"
                    >
                      <FiCheckCircle className="text-pink-500" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border border-gray-100 bg-gradient-to-br from-pink-50 to-orange-50 p-6 shadow-sm sm:p-8">
                <h3 className="text-2xl font-black text-gray-900">Room Owner</h3>
                <div className="mt-5 flex items-center gap-4">
                  <Image
                    src={session?.user?.image || "/assets/default-avatar.png"}
                    alt={room.ownerName || "Owner"}
                    width={70}
                    height={70}
                    className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{room.ownerName}</h4>
                    <p className="text-sm text-gray-500">{room.ownerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal (scrollable) */}
      {isEditOpen && editingRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && closeEditModal()}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col">
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-orange-50 px-6 py-5 rounded-t-3xl">
              <button
                onClick={closeEditModal}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                <FiX size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Edit Room</h2>
              <p className="text-sm text-gray-500">Update your study space details</p>
            </div>
            <div className="overflow-y-auto p-6">
              <form onSubmit={handleEditSubmit} className="space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-700">Room Name</label>
                  <div className="relative">
                    <FiHome className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-pink-500" />
                    <input
                      name="roomName"
                      defaultValue={editingRoom.roomName}
                      required
                      className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-700">Floor</label>
                    <div className="relative">
                      <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                      <input
                        name="floor"
                        defaultValue={editingRoom.floor}
                        required
                        className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-700">Capacity</label>
                    <div className="relative">
                      <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />
                      <input
                        name="capacity"
                        type="number"
                        defaultValue={editingRoom.capacity}
                        required
                        className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-bold text-gray-700">Hourly Rate ($)</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                      <input
                        name="hourlyRate"
                        type="number"
                        defaultValue={editingRoom.hourlyRate}
                        required
                        className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-700">Image URL (optional)</label>
                  <div className="relative">
                    <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />
                    <input
                      name="image"
                      type="url"
                      defaultValue={editingRoom.image}
                      className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingRoom.description}
                    required
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-700">Amenities</label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {amenitiesOptions.map((amenity) => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <button
                          type="button"
                          key={amenity}
                          onClick={() => handleAmenityChange(amenity)}
                          className={`group flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                            isSelected
                              ? "border-pink-400 bg-gradient-to-r from-pink-50 to-orange-50 shadow-md"
                              : "border-gray-200 bg-white hover:border-pink-300 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                                isSelected
                                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                                  : "bg-gray-100 text-transparent"
                              }`}
                            >
                              <FiCheck size={14} />
                            </div>
                            <span className={`font-semibold ${isSelected ? "text-pink-600" : "text-gray-700"}`}>
                              {amenity}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-3 pt-4 sticky bottom-0 bg-white py-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 rounded-2xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {isUpdating ? "Updating..." : "Update Room"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && closeDeleteModal()}
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Listing</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong className="text-pink-600">{room.roomName}</strong>? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 rounded-2xl border border-gray-300 bg-white py-2 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 rounded-2xl bg-red-500 py-2 font-semibold text-white shadow-md hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}