"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdDeleteOutline, MdWarningAmber } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export function DeleteAlert({ room }) {
    const router = useRouter();
    const { _id, roomName } = room;
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {

            const { data: tokenData } = await authClient.token()

            const res = await fetch(`http://localhost:5001/rooms/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                // If your API uses authentication (e.g., token), add it here:
                // credentials: "include", // if using cookies/session
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Room deleted successfully", {
                    position: "top-right",
                    autoClose: 2500,
                    theme: "colored",
                });
                setIsOpen(false);
                // Redirect after a short delay so the toast is visible
                setTimeout(() => {
                    router.push("/rooms");
                    router.refresh();
                }, 1200);
            } else {
                toast.error(data?.message || "Failed to delete room!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Trigger Button – pink/orange gradient style */}
            <Button
                onPress={() => setIsOpen(true)}
                className="group rounded-2xl border border-red-500 bg-white px-5 py-2 font-semibold text-red-500 shadow-sm transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:shadow-lg"
            >
                <MdDeleteOutline
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                Delete Room
            </Button>

            {/* Confirmation Modal (appears when isOpen = true) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
                >
                    <div className="w-full max-w-[92%] overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-2xl sm:max-w-[450px]">
                        {/* Modal Header with close X */}
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 transition hover:bg-gray-100"
                            >
                                <FiX size={20} />
                            </button>

                            <div className="flex flex-col items-center border-b border-pink-100 bg-gradient-to-b from-pink-50 to-white px-6 py-8 text-center">
                                <div className="mb-5 rounded-full bg-pink-100 p-5 text-pink-500 shadow-md">
                                    <MdWarningAmber size={42} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Delete Room?</h2>
                                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                                    You are about to permanently remove this study room from your listing.
                                </p>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="space-y-4 px-6 py-6 text-center">
                            <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4">
                                <p className="text-sm text-gray-600">Room Name</p>
                                <h3 className="mt-1 text-lg font-bold text-pink-600">{roomName}</h3>
                            </div>
                            <p className="text-sm leading-6 text-gray-500">
                                This action cannot be undone. The room will be permanently deleted,
                                and any user bookings referencing this room will be automatically cleaned up.
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-5 sm:flex-row sm:justify-end">
                            <Button
                                onPress={() => setIsOpen(false)}
                                className="rounded-2xl border border-gray-200 bg-white px-6 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={handleDelete}
                                isLoading={isDeleting}
                                isDisabled={isDeleting}
                                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                            >
                                <MdDeleteOutline size={18} />
                                Delete Permanently
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}