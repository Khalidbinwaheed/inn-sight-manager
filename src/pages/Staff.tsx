import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StaffList from '@/components/dashboard/StaffList';
import AddStaffForm from '@/components/staff/AddStaffForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Staff = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleFormSuccess = () => {
    setShowAddForm(false);
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="w-64 flex-shrink-0 hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-6">
          {showAddForm ? (
            <AddStaffForm onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Staff Management</h1>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff
                </Button>
              </div>
              <StaffList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;
