
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, AlertCircle, Clock, Wrench, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';

interface Room {
  id: number;
  number: string;
  type: string;
  status: RoomStatus;
  floor: number;
  guest?: string;
  checkOut?: string;
}

const statusIcons = {
  available: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  occupied: <AlertCircle className="h-4 w-4 text-blue-600" />,
  cleaning: <Clock className="h-4 w-4 text-purple-600" />,
  maintenance: <Wrench className="h-4 w-4 text-amber-600" />
};

const statusLabels = {
  available: 'Available',
  occupied: 'Occupied',
  cleaning: 'Cleaning',
  maintenance: 'Maintenance'
};

// Demo data
const roomsData: Room[] = [
  { id: 1, number: '101', type: 'Standard', status: 'available', floor: 1 },
  { id: 2, number: '102', type: 'Standard', status: 'occupied', floor: 1, guest: 'Jane Smith', checkOut: '05/23' },
  { id: 3, number: '103', type: 'Deluxe', status: 'cleaning', floor: 1 },
  { id: 4, number: '104', type: 'Standard', status: 'available', floor: 1 },
  { id: 5, number: '105', type: 'Suite', status: 'occupied', floor: 1, guest: 'Robert Johnson', checkOut: '05/25' },
  { id: 6, number: '201', type: 'Standard', status: 'maintenance', floor: 2 },
  { id: 7, number: '202', type: 'Standard', status: 'available', floor: 2 },
  { id: 8, number: '203', type: 'Deluxe', status: 'occupied', floor: 2, guest: 'Alice Brown', checkOut: '05/22' },
  { id: 9, number: '204', type: 'Deluxe', status: 'cleaning', floor: 2 },
  { id: 10, number: '205', type: 'Suite', status: 'available', floor: 2 },
  { id: 11, number: '301', type: 'Standard', status: 'occupied', floor: 3, guest: 'Thomas Wilson', checkOut: '05/24' },
  { id: 12, number: '302', type: 'Deluxe', status: 'available', floor: 3 },
  { id: 13, number: '303', type: 'Suite', status: 'maintenance', floor: 3 },
  { id: 14, number: '304', type: 'Standard', status: 'available', floor: 3 },
  { id: 15, number: '305', type: 'Deluxe', status: 'occupied', floor: 3, guest: 'Emma Davis', checkOut: '05/26' },
];

export default function RoomStatus() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [floorFilter, setFloorFilter] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const filteredRooms = roomsData.filter(room => {
    const matchesStatus = filter === 'all' || room.status === filter;
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFloor = !floorFilter || room.floor === parseInt(floorFilter);
    const matchesType = !typeFilter || room.type === typeFilter;
    
    return matchesStatus && matchesSearch && matchesFloor && matchesType;
  });
  
  const availableCount = roomsData.filter(room => room.status === 'available').length;
  const occupiedCount = roomsData.filter(room => room.status === 'occupied').length;
  const cleaningCount = roomsData.filter(room => room.status === 'cleaning').length;
  const maintenanceCount = roomsData.filter(room => room.status === 'maintenance').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Status</CardTitle>
        <CardDescription>View and manage room availability</CardDescription>
        
        <div className="flex flex-col md:flex-row gap-2 mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by room or guest..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={floorFilter} onValueChange={setFloorFilter}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              <SelectItem value="1">Floor 1</SelectItem>
              <SelectItem value="2">Floor 2</SelectItem>
              <SelectItem value="3">Floor 3</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Deluxe">Deluxe</SelectItem>
              <SelectItem value="Suite">Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All Rooms
              <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">
                {roomsData.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="available">
              Available
              <span className="ml-2 rounded bg-green-100 text-green-800 px-1.5 py-0.5 text-xs">
                {availableCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="occupied">
              Occupied
              <span className="ml-2 rounded bg-blue-100 text-blue-800 px-1.5 py-0.5 text-xs">
                {occupiedCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="cleaning">
              Cleaning
              <span className="ml-2 rounded bg-purple-100 text-purple-800 px-1.5 py-0.5 text-xs">
                {cleaningCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              Maintenance
              <span className="ml-2 rounded bg-amber-100 text-amber-800 px-1.5 py-0.5 text-xs">
                {maintenanceCount}
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="available" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="occupied" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cleaning" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Bulk Update</Button>
      </CardFooter>
    </Card>
  );
}

function RoomCard({ room }: { room: Room }) {
  return (
    <div 
      className={cn(
        "border rounded-md p-3",
        room.status === 'available' && "room-available",
        room.status === 'occupied' && "room-occupied",
        room.status === 'cleaning' && "room-cleaning",
        room.status === 'maintenance' && "room-maintenance"
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Room {room.number}</span>
        {statusIcons[room.status]}
      </div>
      <div className="text-xs">{room.type}</div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs">{statusLabels[room.status]}</span>
        {room.status === 'occupied' && (
          <span className="text-xs font-medium">Checkout: {room.checkOut}</span>
        )}
      </div>
      {room.guest && (
        <div className="text-xs mt-1 truncate" title={room.guest}>
          {room.guest}
        </div>
      )}
    </div>
  );
}
