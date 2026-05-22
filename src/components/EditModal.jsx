"use client";

import {
    Button,
    FieldError,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import {
    FiHome,
    FiLayers,
    FiUsers,
    FiDollarSign,
    FiImage,
    FiCheck,
    FiX,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

export function EditModal({ room }) {
    const router = useRouter();
    const {
        _id,
        roomName,
        description,
        image,
        floor,
        capacity,
        hourlyRate,
        amenities = [],
    } = room;

    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Preload amenities when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedAmenities(amenities || []);
        }
    }, [isOpen, amenities]);

    const handleAmenityChange = (amenity) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((item) => item !== amenity)
                : [...prev, amenity]
        );
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const formData = new FormData(e.currentTarget);
            const updatedRoom = Object.fromEntries(formData.entries());

            updatedRoom.capacity = Number(updatedRoom.capacity);
            updatedRoom.hourlyRate = Number(updatedRoom.hourlyRate);
            updatedRoom.amenities = selectedAmenities;

            if (!updatedRoom.image) {
                updatedRoom.image = image;
            }

            const { data: tokenData } = await authClient.token();

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(updatedRoom),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Room updated successfully");
                router.refresh();
                setIsOpen(false); // ✅ closes modal on success
            } else {
                toast.error(data?.message || "Failed to update room");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <Button
                onPress={() => setIsOpen(true)}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-2 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
            >
                <BiEdit size={18} />
                Edit Room
            </Button>

            {/* Modal - scrollable */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col">
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-10 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-orange-50 px-6 py-5 rounded-t-3xl">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                            >
                                <FiX size={20} />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">Edit Room</h2>
                            <p className="text-sm text-gray-500">
                                Update your study space details
                            </p>
                        </div>

                        {/* Scrollable Form Area */}
                        <div className="overflow-y-auto p-6">
                            <form onSubmit={onSubmit} className="space-y-8">
                                {/* Room Name */}
                                <TextField name="roomName" defaultValue={roomName} isRequired>
                                    <Label className="mb-3 block text-sm font-bold text-gray-700">
                                        Room Name
                                    </Label>
                                    <div className="relative">
                                        <FiHome className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-pink-500" />
                                        <Input
                                            placeholder="Quiet Premium Study Room"
                                            className="rounded-2xl pl-12 w-full"
                                        />
                                    </div>
                                    <FieldError />
                                </TextField>

                                {/* Two‑column grid */}
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <TextField name="floor" defaultValue={floor} isRequired>
                                        <Label className="mb-3 block text-sm font-bold text-gray-700">Floor</Label>
                                        <div className="relative">
                                            <FiLayers className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-orange-500" />
                                            <Input className="rounded-2xl pl-12 w-full" />
                                        </div>
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        name="capacity"
                                        defaultValue={capacity}
                                        type="number"
                                        isRequired
                                    >
                                        <Label className="mb-3 block text-sm font-bold text-gray-700">Capacity</Label>
                                        <div className="relative">
                                            <FiUsers className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-pink-500" />
                                            <Input type="number" className="rounded-2xl pl-12 w-full" />
                                        </div>
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        name="hourlyRate"
                                        defaultValue={hourlyRate}
                                        type="number"
                                        isRequired
                                    >
                                        <Label className="mb-3 block text-sm font-bold text-gray-700">Hourly Rate ($)</Label>
                                        <div className="relative">
                                            <FiDollarSign className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-orange-500" />
                                            <Input type="number" className="rounded-2xl pl-12 w-full" />
                                        </div>
                                        <FieldError />
                                    </TextField>
                                </div>

                                {/* Image URL */}
                                <TextField name="image" defaultValue={image}>
                                    <Label className="mb-3 block text-sm font-bold text-gray-700">Image URL (optional)</Label>
                                    <div className="relative">
                                        <FiImage className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-pink-500" />
                                        <Input
                                            type="url"
                                            placeholder="https://example.com/room.jpg"
                                            className="rounded-2xl pl-12 w-full"
                                        />
                                    </div>
                                </TextField>

                                {/* Description */}
                                <TextField name="description" defaultValue={description} isRequired>
                                    <Label className="mb-3 block text-sm font-bold text-gray-700">Description</Label>
                                    <TextArea
                                        placeholder="Describe the study room environment..."
                                        className="min-h-[140px] rounded-3xl w-full"
                                    />
                                    <FieldError />
                                </TextField>

                                {/* Amenities */}
                                <div>
                                    <Label className="mb-5 block text-sm font-bold text-gray-700">Amenities</Label>
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
                                                        <span
                                                            className={`font-semibold transition-colors duration-300 ${
                                                                isSelected ? "text-pink-600" : "text-gray-700"
                                                            }`}
                                                        >
                                                            {amenity}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Sticky Action Buttons inside form */}
                                <div className="flex gap-3 pt-4 sticky bottom-0 bg-white py-4">
                                    <Button
                                        type="button"
                                        onPress={() => setIsOpen(false)}
                                        className="flex-1 rounded-2xl border border-gray-300 bg-white font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
                                    >
                                        {isPending ? "Updating..." : "Update Room"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}