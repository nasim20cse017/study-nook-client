"use client";

import {
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
  Button,
  Card,
  Checkbox,
} from "@heroui/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  FiCheck,
  FiHome,
  FiImage,
  FiLayers,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

const amenitiesOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50"></div>

      {/* Blur Effects */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></span>

            <p className="text-sm font-semibold text-gray-700">
              Create A New Study Space
            </p>
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
            Add Your
            <span className="block bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Study Room
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Share your peaceful and productive study environment with
            students and remote learners around the world.
          </p>
        </div>

        {/* Form Card */}
        <Card className="overflow-hidden rounded-[35px] border border-white/40 bg-white/80 shadow-2xl backdrop-blur-xl">
          <form
           
            className="space-y-10 p-6 md:p-10 lg:p-14"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Room Name */}
              <div className="md:col-span-2">
                <TextField name="roomName" isRequired>
                  <Label className="mb-3 text-sm font-bold text-gray-700">
                    Room Name
                  </Label>

                  <Input
                    placeholder="Quiet Premium Study Room"
                    className="rounded-2xl"
                    startContent={
                      <FiHome className="text-pink-500" />
                    }
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* Floor */}
              <TextField name="floor" isRequired>
                <Label className="mb-3 text-sm font-bold text-gray-700">
                  Floor
                </Label>

                <Input
                  placeholder="3rd Floor"
                  className="rounded-2xl"
                  startContent={
                    <FiLayers className="text-orange-500" />
                  }
                />

                <FieldError />
              </TextField>

              {/* Capacity */}
              <TextField
                name="capacity"
                type="number"
                isRequired
              >
                <Label className="mb-3 text-sm font-bold text-gray-700">
                  Capacity
                </Label>

                <Input
                  type="number"
                  placeholder="4"
                  className="rounded-2xl"
                  startContent={
                    <FiUsers className="text-pink-500" />
                  }
                />

                <FieldError />
              </TextField>

              {/* Hourly Rate */}
              <TextField
                name="hourlyRate"
                type="number"
                isRequired
              >
                <Label className="mb-3 text-sm font-bold text-gray-700">
                  Hourly Rate ($)
                </Label>

                <Input
                  type="number"
                  placeholder="5"
                  className="rounded-2xl"
                  startContent={
                    <FiDollarSign className="text-orange-500" />
                  }
                />

                <FieldError />
              </TextField>

              {/* Image URL */}
              <div className="md:col-span-2">
                <TextField name="image" isRequired>
                  <Label className="mb-3 text-sm font-bold text-gray-700">
                    Image URL
                  </Label>

                  <Input
                    type="url"
                    placeholder="https://example.com/room.jpg"
                    className="rounded-2xl"
                    startContent={
                      <FiImage className="text-pink-500" />
                    }
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired>
                  <Label className="mb-3 text-sm font-bold text-gray-700">
                    Description
                  </Label>

                  <TextArea
                    placeholder="Describe your study room environment, facilities, and atmosphere..."
                    className="min-h-[180px] rounded-3xl"
                  />

                  <FieldError />
                </TextField>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <Label className="mb-5 block text-sm font-bold text-gray-700">
                  Amenities
                </Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {amenitiesOptions.map((amenity) => {
                    const isSelected =
                      selectedAmenities.includes(amenity);

                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() =>
                          handleAmenityChange(amenity)
                        }
                        className={`group flex items-center justify-between rounded-2xl border p-5 transition-all duration-300 ${
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
                              isSelected
                                ? "text-pink-600"
                                : "text-gray-700"
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={isPending}
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-pink-300/40"
            >
              {isPending
                ? "Adding Room..."
                : "Add Room"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default AddRoomPage;