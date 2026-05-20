"use client";

import { Button } from "@heroui/react";
import { MdWarningAmber, MdClose } from "react-icons/md";

export function ConfirmCancelModal({ isOpen, onClose, onConfirm, booking }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="relative border-b border-pink-100 bg-gradient-to-b from-pink-50 to-white px-6 py-6 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
          >
            <MdClose size={20} />
          </button>
          <div className="mb-4 inline-flex rounded-full bg-pink-100 p-4 text-pink-500">
            <MdWarningAmber size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Cancel Booking?</h2>
          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-6">
          <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 text-center">
            <p className="text-sm text-gray-600">You are about to cancel</p>
            <h3 className="mt-1 text-lg font-bold text-pink-600">
              {booking?.roomName}
            </h3>
            <div className="mt-2 text-sm text-gray-600">
              <p>{booking?.date ? new Date(booking.date).toLocaleDateString() : ""}</p>
              <p>
                {booking?.startTime} – {booking?.endTime}
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">
            Once cancelled, this time slot will become available for others to book.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-5 sm:flex-row sm:justify-end">
          <Button
            onPress={onClose}
            className="rounded-2xl border border-gray-200 bg-white px-6 py-2 font-medium text-gray-700 transition-all hover:bg-gray-100"
          >
            Keep Booking
          </Button>
          <Button
            onPress={onConfirm}
            className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg"
          >
            Yes, Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}