
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Demo data for guests
const guestData = [
  { id: 1, name: 'John Smith', email: 'john@example.com', room: '201', checkIn: '2025-05-18', checkOut: '2025-05-22', status: 'Active' },
  { id: 2, name: 'Emma Wilson', email: 'emma@example.com', room: '305', checkIn: '2025-05-19', checkOut: '2025-05-24', status: 'Active' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', room: '412', checkIn: '2025-05-21', checkOut: '2025-05-23', status: 'Arriving' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', room: '108', checkIn: '2025-05-20', checkOut: '2025-05-26', status: 'Active' },
  { id: 5, name: 'David Anderson', email: 'david@example.com', room: '214', checkIn: '2025-05-22', checkOut: '2025-05-30', status: 'Reserved' },
  { id: 6, name: 'Jennifer Thomas', email: 'jennifer@example.com', room: '307', checkIn: '2025-05-17', checkOut: '2025-05-21', status: 'Departed' },
  { id: 7, name: 'Robert Moore', email: 'robert@example.com', room: '116', checkIn: '2025-05-21', checkOut: '2025-05-25', status: 'Arriving' },
  { id: 8, name: 'Lisa Garcia', email: 'lisa@example.com', room: '209', checkIn: '2025-05-19', checkOut: '2025-05-22', status: 'Active' },
];

export default function GuestList() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGuests = guestData.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.room.includes(searchQuery)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Guest Directory</CardTitle>
            <CardDescription>View and manage hotel guests</CardDescription>
          </div>
          <Button size="sm">Add New Guest</Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{guest.name}</div>
                      <div className="text-xs text-muted-foreground">{guest.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{guest.room}</TableCell>
                <TableCell>{formatDate(guest.checkIn)}</TableCell>
                <TableCell>{formatDate(guest.checkOut)}</TableCell>
                <TableCell>
                  <Badge variant={
                    guest.status === 'Active' ? 'default' :
                    guest.status === 'Reserved' ? 'outline' :
                    guest.status === 'Arriving' ? 'secondary' :
                    'destructive'
                  }>
                    {guest.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <select className="text-xs border rounded p-1">
                    <option>Actions</option>
                    <option>View Details</option>
                    <option>Send Message</option>
                    <option>Edit Reservation</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
