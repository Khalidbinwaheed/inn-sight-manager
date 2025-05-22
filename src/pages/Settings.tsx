
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SettingsPanel from '@/components/dashboard/SettingsPanel';

const Settings = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
};

export default Settings;
