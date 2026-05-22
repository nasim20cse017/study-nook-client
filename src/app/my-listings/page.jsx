import MyListings from '@/components/MyListings';
import React from 'react';

export const metadata = {
  title: "StudyNook – My Listings",
};

const MyListingsPage = () => {
    return (
        <div>
            <MyListings></MyListings>
        </div>
    );
};

export default MyListingsPage;