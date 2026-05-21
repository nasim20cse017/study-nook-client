"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiUsers, FiXCircle } from "react-icons/fi";
import { ConfirmCancelModal } from "@/components/ConfirmCancelModal";



export default function MyBookingsPage() {
    const router = useRouter();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    useEffect(() => {
        if (sessionLoading) return;
        if (!session?.user?.id) {
            toast.info("Please login to view your bookings", { theme: "colored" });
            router.push("/login");
            return;
        }
        fetchBookings();
    }, [session, sessionLoading]);

    const fetchBookings = async () => {
        setLoading(true);
        try {

            const { data: tokenData } = await authClient.token()

            const res = await fetch(`http://localhost:5001/bookings?userId=${session.user.id}`, {
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                },
            });
            const data = await res.json();
            if (res.ok) {
                const sorted = data.sort((a, b) => {
                    if (a.date !== b.date) return new Date(b.date) - new Date(a.date);
                    return a.startTime.localeCompare(b.startTime);
                });
                setBookings(sorted);
            } else {
                toast.error(data.message || "Failed to load bookings", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { theme: "colored" });
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = (booking) => {
        setBookingToCancel(booking);
        setCancelModalOpen(true);
    };

    const confirmCancel = async () => {
        if (!bookingToCancel) return;
        setCancellingId(bookingToCancel._id);
        try {

            const { data: tokenData } = await authClient.token()

            const res = await fetch(`http://localhost:5001/bookings/${bookingToCancel._id}/cancel`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({ userId: session.user.id }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Booking cancelled successfully", { theme: "colored" });
                setBookings((prev) =>
                    prev.map((b) =>
                        b._id === bookingToCancel._id ? { ...b, status: "cancelled" } : b
                    )
                );
                setCancelModalOpen(false);
                setBookingToCancel(null);
            } else {
                toast.error(data.message || "Failed to cancel booking", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { theme: "colored" });
        } finally {
            setCancellingId(null);
        }
    };

    const canCancel = (booking) => {
        if (booking.status !== "confirmed") return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const bookingDate = new Date(booking.date);
        return bookingDate >= today;
    };

    if (sessionLoading || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
                    <p className="text-gray-600">Loading your bookings...</p>
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
                            Bookings
                        </span>
                    </h1>
                    <p className="mt-5 text-lg text-gray-600">
                        Manage all your reserved study rooms in one place
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="rounded-3xl border border-pink-100 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-sm">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-orange-100">
                            <FiCalendar className="h-12 w-12 text-pink-500" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">No bookings yet</h3>
                        <p className="text-gray-600">You haven't booked any study rooms. Start exploring!</p>
                        <button
                            onClick={() => router.push("/rooms")}
                            className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
                        >
                            Browse Rooms
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="group overflow-hidden rounded-3xl border border-pink-100 bg-white/80 shadow-md transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    {booking.image ? (
                                        <Image
                                            src={booking.image}
                                            alt={booking.roomName}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
                                            <FiMapPin className="h-12 w-12 text-pink-400" />
                                        </div>
                                    )}
                                    <div className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-md backdrop-blur-sm">
                                        {booking.status === "confirmed" ? (
                                            <span className="bg-green-500/80 text-white px-2 py-0.5 rounded-full">Confirmed</span>
                                        ) : (
                                            <span className="bg-red-500/80 text-white px-2 py-0.5 rounded-full">Cancelled</span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="mb-2 text-xl font-bold text-gray-800">{booking.roomName}</h3>
                                    <div className="mb-3 flex flex-wrap gap-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FiMapPin className="text-pink-500" /> Floor {booking.floor}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FiUsers className="text-orange-500" /> Up to {booking.capacity}
                                        </span>
                                    </div>
                                    <div className="mb-4 space-y-2 rounded-2xl bg-gray-50 p-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FiCalendar className="text-pink-500" />
                                            <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FiClock className="text-orange-500" />
                                            <span>{booking.startTime} – {booking.endTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-pink-600">
                                            <FiDollarSign />
                                            <span>Total: ${booking.totalCost}</span>
                                        </div>
                                    </div>
                                    {booking.specialNote && (
                                        <p className="mb-4 text-sm italic text-gray-500 border-l-2 border-pink-300 pl-2">
                                            “{booking.specialNote}”
                                        </p>
                                    )}
                                    {canCancel(booking) && (
                                        <button
                                            onClick={() => handleCancelClick(booking)}
                                            disabled={cancellingId === booking._id}
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white py-2 font-semibold text-red-500 transition-all hover:bg-red-50 disabled:opacity-50"
                                        >
                                            {cancellingId === booking._id ? (
                                                "Cancelling..."
                                            ) : (
                                                <>
                                                    <FiXCircle size={18} />
                                                    Cancel Booking
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmCancelModal
                isOpen={cancelModalOpen}
                onClose={() => {
                    setCancelModalOpen(false);
                    setBookingToCancel(null);
                }}
                onConfirm={confirmCancel}
                booking={bookingToCancel}
            />
        </section>
    );
}