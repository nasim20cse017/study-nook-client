"use client";

import { Button, Label, TextArea } from "@heroui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiCalendar, FiClock, FiDollarSign, FiBookOpen } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

// Helper function to safely get the current date in YYYY-MM-DD format
// This function runs only on the client, preventing the dynamic min attribute error.
const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
};

export function BookingCard({ room }) {
    const router = useRouter();
    const { _id: roomId, hourlyRate, roomName, description, image, capacity, floor } = room;

    // Better Auth session
    const { data: session, isPending: sessionIsPending } = authClient.useSession();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [specialNote, setSpecialNote] = useState("");
    const [totalCost, setTotalCost] = useState(0);
    const [isClient, setIsClient] = useState(false);

    // Generate hourly time options (08:00 to 20:00)
    const timeOptions = [];
    for (let hour = 8; hour <= 20; hour++) {
        timeOptions.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    const getHour = (timeStr) => parseInt(timeStr.split(":")[0], 10);

    // Real‑time total cost calculation
    useEffect(() => {
        if (startTime && endTime && hourlyRate) {
            const hours = getHour(endTime) - getHour(startTime);
            setTotalCost(hours > 0 ? hours * hourlyRate : 0);
        } else {
            setTotalCost(0);
        }
    }, [startTime, endTime, hourlyRate]);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setDate(getTodayDate());
            setStartTime("08:00");
            setEndTime("09:00");
            setSpecialNote("");
            setTotalCost(hourlyRate);
        }
    }, [isOpen, hourlyRate]);

    // Set isClient to true after the component mounts on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle session loading state
    if (sessionIsPending) {
        return <div>Loading session...</div>;
    }

    // On the server, render a minimal placeholder to avoid hydration mismatch
    if (!isClient) {
        return <div style={{ visibility: "hidden" }}>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!session?.user?.email) {
            toast.error("Please login to book a room", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }

        // Validate date (today or future)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            toast.error("Please select today or a future date", { theme: "colored" });
            return;
        }

        // Validate time (minimum 1 hour)
        const startHour = getHour(startTime);
        const endHour = getHour(endTime);
        if (endHour <= startHour) {
            toast.error("End time must be after start time (minimum 1 hour)", {
                theme: "colored",
            });
            return;
        }

        setIsLoading(true);
        try {
            const bookingData = {
                roomId,
                roomName,
                description,
                image,
                capacity,
                floor,
                date,
                startTime,
                endTime,
                totalCost,
                specialNote,
                userId: session.user.id,
                userEmail: session.user.email,
                userName: session.user.name,
                userImage: session.user.image,
            };

            const {data:tokenData} = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                      authorization: `Bearer ${tokenData?.token}`
                 },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Room booked successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
                setIsOpen(false);
                router.refresh();
            } else {
                if (res.status === 409) {
                    toast.error("Slot is booked try another slot or another room", {
                        theme: "colored",
                    });
                } else {
                    toast.error(data?.message || "Booking failed", {
                        theme: "colored",
                    });
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { theme: "colored" });
        } finally {
            setIsLoading(false);
        }
    };

    // Filter end time options: only times after selected start time
    const endTimeOptions = timeOptions.filter(
        (time) => !startTime || getHour(time) > getHour(startTime)
    );

    return (
        <>
            {/* Trigger Button */}
            <Button
                onPress={() => setIsOpen(true)}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
            >
                <FiBookOpen size={18} />
                Book Now
            </Button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
                >
                    <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-2xl">
                        {/* Header */}
                        <div className="relative border-b border-pink-100 bg-gradient-to-r from-pink-50 to-orange-50 px-6 py-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                            >
                                <MdClose size={20} />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">Book This Room</h2>
                            <p className="text-sm text-gray-500">{roomName}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            {/* Date */}
                            <div>
                                <Label className="mb-2 block text-sm font-bold text-gray-700">
                                    <FiCalendar className="mr-1 inline text-pink-500" /> Date
                                </Label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={date || getTodayDate()}
                                    className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-black focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                                    required
                                />
                            </div>

                            {/* Start & End Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="mb-2 block text-sm font-bold text-gray-700">
                                        <FiClock className="mr-1 inline text-orange-500" /> Start Time
                                    </Label>
                                    <select
                                        value={startTime}
                                        onChange={(e) => {
                                            setStartTime(e.target.value);
                                            if (getHour(e.target.value) >= getHour(endTime)) {
                                                const nextHour = getHour(e.target.value) + 1;
                                                if (nextHour <= 20) {
                                                    setEndTime(`${nextHour.toString().padStart(2, "0")}:00`);
                                                }
                                            }
                                        }}
                                        className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-black focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                                        required
                                    >
                                        {timeOptions.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label className="mb-2 block text-sm font-bold text-gray-700">
                                        <FiClock className="mr-1 inline text-orange-500" /> End Time
                                    </Label>
                                    <select
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-black focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                                        required
                                    >
                                        {endTimeOptions.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Total Cost */}
                            <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">
                                        <FiDollarSign className="mr-1 inline text-pink-500" /> Total Cost
                                    </span>
                                    <span className="text-2xl font-bold text-pink-600">
                                        ${totalCost.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    * {getHour(endTime) - getHour(startTime)} hour(s) @ ${hourlyRate}/hour
                                </p>
                            </div>

                            {/* Special Note */}
                            <div>
                                <Label className="mb-2 block text-sm font-bold text-gray-700">
                                    Special Note (optional)
                                </Label>
                                <TextArea
                                    value={specialNote}
                                    onChange={(e) => setSpecialNote(e.target.value)}
                                    placeholder="Any special requests or notes..."
                                    className="min-h-[80px] rounded-2xl"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    onPress={() => setIsOpen(false)}
                                    className="flex-1 rounded-2xl border border-gray-200 bg-white font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
                                >
                                    Confirm Booking
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}