import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RoomStatus from '@/components/dashboard/RoomStatus';
import ReservationCalendar from '@/components/dashboard/ReservationCalendar';
import GuestList from '@/components/dashboard/GuestList';

const Index = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar className="w-64 flex-shrink-0 hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <DashboardStats />
          <ReservationCalendar />
          <RoomStatus />
          <GuestList />
        </div>
      </div>
    </div>
  );
};

export default Index;
