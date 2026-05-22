import Rooms from '@/components/Rooms';
import React from 'react';

export const metadata = {
  title: "StudyNook – Available Rooms",
};

const RoomsPage = () => {
  return (
    <div>
      <Rooms></Rooms>
    </div>
  );
};

export default RoomsPage;