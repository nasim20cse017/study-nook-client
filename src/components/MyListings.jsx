"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
    FiMapPin,
    FiUsers,
    FiDollarSign,
    FiBookOpen,
    FiEdit,
    FiTrash2,
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

export default function MyListings() {
    const router = useRouter();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingRoom, setEditingRoom] = useState(null);
    const [deletingRoom, setDeletingRoom] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    useEffect(() => {
        if (sessionLoading) return;
        if (!session?.user?.id) {
            toast.info("Please login to view your listings", { theme: "colored" });
            router.push("/login");
            return;
        }
        fetchListings();
    }, [session, sessionLoading]);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
                headers: { authorization: `Bearer ${tokenData?.token}` },
            });
            const data = await res.json();
            if (res.ok) {
                const userRooms = data.filter((room) => room.ownerEmail === session.user.email);
                setListings(userRooms);
            } else {
                toast.error(data.message || "Failed to load rooms", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { theme: "colored" });
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (room) => {
        setEditingRoom(room);
        setSelectedAmenities(room.amenities || []);
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
                fetchListings();
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

    const openDeleteModal = (room) => {
        setDeletingRoom(room);
        setIsDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setDeletingRoom(null);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${deletingRoom._id}`, {
                method: "DELETE",
                headers: { authorization: `Bearer ${tokenData?.token}` },
            });
            if (res.ok) {
                toast.success("Room deleted successfully", { theme: "colored" });
                fetchListings();
                closeDeleteModal();
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to delete room", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { theme: "colored" });
        } finally {
            setIsDeleting(false);
        }
    };

    // Wait for session to resolve
    if (sessionLoading) return null;

    // Show custom loading UI while fetching listings
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
        <section className="relative min-h-screen py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50"></div>
            <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 shadow-sm">
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></span>
                        <p className="text-sm font-semibold text-gray-700">My Study Spaces</p>
                    </div>
                    <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
                        Your
                        <span className="block bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                            Listings
                        </span>
                    </h1>
                    <p className="mt-5 text-lg text-gray-600">
                        Manage all the study rooms you have listed
                    </p>
                    <button
                        onClick={() => router.push("/add-room")}
                        className="mt-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
                    >
                        + Add New Room
                    </button>
                </div>

                {listings.length === 0 ? (
                    <div className="rounded-3xl border border-pink-100 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-sm">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-orange-100">
                            <FiMapPin className="h-12 w-12 text-pink-500" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">No listings yet</h3>
                        <p className="text-gray-600">You haven't listed any study rooms. Create your first listing!</p>
                        <button
                            onClick={() => router.push("/rooms/create")}
                            className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
                        >
                            Create a Listing
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {listings.map((room) => (
                            <div
                                key={room._id}
                                className="group rounded-3xl border border-pink-100 bg-white/80 shadow-md transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
                            >
                                <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                                    {room.image ? (
                                        <Image
                                            src={room.image}
                                            alt={room.roomName}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
                                            <FiMapPin className="h-12 w-12 text-pink-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="mb-2 text-xl font-bold text-gray-800">{room.roomName}</h3>
                                    <div className="mb-3 flex flex-wrap gap-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><FiMapPin className="text-pink-500" /> Floor {room.floor}</span>
                                        <span className="flex items-center gap-1"><FiUsers className="text-orange-500" /> Up to {room.capacity}</span>
                                        <span className="flex items-center gap-1"><FiDollarSign className="text-green-500" /> ${room.hourlyRate}/hr</span>
                                        <span className="flex items-center gap-1"><FiBookOpen className="text-blue-500" /> {room.bookingCount || 0} bookings</span>
                                    </div>
                                    <p className="mb-4 text-sm text-gray-500 line-clamp-2">{room.description || "No description provided"}</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(room)}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-white py-2 font-semibold text-pink-500 transition-all hover:bg-pink-50"
                                        >
                                            <FiEdit size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(room)}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white py-2 font-semibold text-red-500 transition-all hover:bg-red-50"
                                        >
                                            <FiTrash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditOpen && editingRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && closeEditModal()}>
                    <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col">
                        <div className="sticky top-0 z-10 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-orange-50 px-6 py-5 rounded-t-3xl">
                            <button onClick={closeEditModal} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100">
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
                                        <input name="roomName" defaultValue={editingRoom.roomName} required className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-3 block text-sm font-bold text-gray-700">Floor</label>
                                        <div className="relative">
                                            <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                                            <input name="floor" defaultValue={editingRoom.floor} required className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-sm font-bold text-gray-700">Capacity</label>
                                        <div className="relative">
                                            <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />
                                            <input name="capacity" type="number" defaultValue={editingRoom.capacity} required className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-sm font-bold text-gray-700">Hourly Rate ($)</label>
                                        <div className="relative">
                                            <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                                            <input name="hourlyRate" type="number" defaultValue={editingRoom.hourlyRate} required className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-sm font-bold text-gray-700">Image URL (optional)</label>
                                    <div className="relative">
                                        <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" />
                                        <input name="image" type="url" defaultValue={editingRoom.image} className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-sm font-bold text-gray-700">Description</label>
                                    <textarea name="description" defaultValue={editingRoom.description} required rows={4} className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
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
                                                    className={`group flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${isSelected ? "border-pink-400 bg-gradient-to-r from-pink-50 to-orange-50 shadow-md" : "border-gray-200 bg-white hover:border-pink-300 hover:shadow-md"}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${isSelected ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white" : "bg-gray-100 text-transparent"}`}>
                                                            <FiCheck size={14} />
                                                        </div>
                                                        <span className={`font-semibold ${isSelected ? "text-pink-600" : "text-gray-700"}`}>{amenity}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4 sticky bottom-0 bg-white py-4">
                                    <button type="button" onClick={closeEditModal} className="flex-1 rounded-2xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                                    <button type="submit" disabled={isUpdating} className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.01] disabled:opacity-50">
                                        {isUpdating ? "Updating..." : "Update Room"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteOpen && deletingRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && closeDeleteModal()}>
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Listing</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong className="text-pink-600">{deletingRoom.roomName}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={closeDeleteModal} className="flex-1 rounded-2xl border border-gray-300 bg-white py-2 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                            <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 rounded-2xl bg-red-500 py-2 font-semibold text-white shadow-md hover:bg-red-600 disabled:opacity-50">
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}