
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Hotel,
  Calendar,
  Users,
  Settings,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Bed,
  FileText,
  MessageSquare,
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  collapsed: boolean;
  to: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon, text, active, collapsed, to, onClick }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center w-full p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
          collapsed ? "justify-center" : "justify-start"
        )}
      >
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && <span className="ml-3 whitespace-nowrap">{text}</span>}
      </Link>
    </li>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { text: 'Rooms', icon: <Bed size={20} />, path: '/rooms' },
    { text: 'Reservations', icon: <Calendar size={20} />, path: '/reservations' },
    { text: 'Guests', icon: <Users size={20} />, path: '/guests' },
    { text: 'Staff', icon: <Users size={20} />, path: '/staff' },
    { text: 'Billing', icon: <FileText size={20} />, path: '/billing' },
    { text: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
    { text: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <Hotel className="h-6 w-6 text-hotel-600" />
          {!collapsed && <span className="ml-2 text-xl font-semibold text-sidebar-foreground whitespace-nowrap">Hotel Pro</span>}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto py-4 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              active={location.pathname === item.path}
              collapsed={collapsed}
              to={item.path}
            />
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
}
