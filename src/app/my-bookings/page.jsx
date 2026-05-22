import MyBookings from '@/components/MyBookings';
import React from 'react';

export const metadata = {
  title: "StudyNook – My Listings",
};


const MyBookingsPage = () => {
    return (
        <div>
            <MyBookings></MyBookings>
        </div>
    );
};

export default MyBookingsPage;