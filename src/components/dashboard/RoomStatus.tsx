import React, { useState, useEffect } from 'react';
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
import { toast } from 'sonner';

interface Room {
  id: number;
  room_number: string;
  room_type: string;
  price_per_night: number;
  status: string;
}

const RoomStatus = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      toast.error('Failed to load rooms');
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.room_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || room.room_type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'occupied':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'cleaning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'cleaning':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Status</CardTitle>
        <CardDescription>
          Monitor and manage room availability and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="relative transition-transform transform hover:scale-[1.02] duration-200 ease-in-out">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Room {room.room_number}</CardTitle>
                  {getStatusIcon(room.status)}
                </div>
                <CardDescription className="capitalize text-muted-foreground">{room.room_type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={cn("text-sm font-medium px-2 py-1 rounded-full", getStatusColor(room.status))}>
                      {room.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price per night:</span>
                    <span className="text-sm font-medium text-foreground">${room.price_per_night}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomStatus;
