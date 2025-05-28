import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Profile = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="w-64 flex-shrink-0 hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          {/* Add profile content here */}
          <div className="bg-card p-6 rounded-md border border-border">
            <p className="text-foreground">User profile details will go here.</p>
            {/* Example: Display user information, change password form, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 