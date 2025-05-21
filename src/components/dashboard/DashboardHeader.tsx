
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-6">Dashboard</h1>
        <div className="relative max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[250px] pl-8 bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="font-medium">New Reservation</p>
                  <p className="text-sm text-muted-foreground">John Doe booked room 302 for May 24-28</p>
                  <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="font-medium">Maintenance Request</p>
                  <p className="text-sm text-muted-foreground">Room 114 reported AC issues</p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="font-medium">Check-out Reminder</p>
                  <p className="text-sm text-muted-foreground">5 guests scheduled to check out today</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <span className="ml-2 hidden md:inline-flex">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
