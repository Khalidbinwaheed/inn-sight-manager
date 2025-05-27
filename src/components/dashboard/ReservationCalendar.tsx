import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Demo data for reservations
const reservations = [
  { date: new Date(2025, 4, 21), count: 5 },
  { date: new Date(2025, 4, 22), count: 8 },
  { date: new Date(2025, 4, 23), count: 12 },
  { date: new Date(2025, 4, 24), count: 10 },
  { date: new Date(2025, 4, 25), count: 15 },
  { date: new Date(2025, 4, 27), count: 7 },
  { date: new Date(2025, 4, 28), count: 4 },
  { date: new Date(2025, 4, 30), count: 9 },
];

// Today's reservations
const todaysReservations = [
  { id: 1, guest: 'Michael Brown', room: '302', checkin: true, status: 'Confirmed' },
  { id: 2, guest: 'Sarah Johnson', room: '414', checkin: true, status: 'Checked In' },
  { id: 3, guest: 'David Wilson', room: '205', checkin: false, status: 'Pending' },
  { id: 4, guest: 'Lisa Anderson', room: '118', checkin: false, status: 'Confirmed' },
  { id: 5, guest: 'Robert Moore', room: '501', checkin: true, status: 'Checked In' },
];

export default function ReservationCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Function to highlight dates with reservations
  const isDayWithReservation = (day: Date) => {
    return reservations.some(
      (reservation) => 
        reservation.date.getDate() === day.getDate() &&
        reservation.date.getMonth() === day.getMonth() &&
        reservation.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Function to get the reservation count for a day
  const getReservationCount = (day: Date) => {
    const found = reservations.find(
      (reservation) => 
        reservation.date.getDate() === day.getDate() &&
        reservation.date.getMonth() === day.getMonth() &&
        reservation.date.getFullYear() === day.getFullYear()
    );
    return found ? found.count : 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 bg-card border border-border">
        <CardHeader>
          <CardTitle>Reservation Calendar</CardTitle>
          <CardDescription>View and manage upcoming reservations</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md p-3"
            modifiers={{
              hasReservation: (date) => isDayWithReservation(date),
            }}
            modifiersStyles={{
              hasReservation: {
                fontWeight: 'bold',
                backgroundColor: '#e0f2fe',
              }
            }}
            components={{
              DayContent: (props) => {
                const count = getReservationCount(props.date);
                return (
                  <div className="relative">
                    <div>{props.date.getDate()}</div>
                    {count > 0 && (
                      <div className="absolute bottom-0 right-0 -mb-1 -mr-1">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                          {count}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Today's Reservations</CardTitle>
              <CardDescription>May 21, 2025</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reservations</SelectItem>
                <SelectItem value="checkin">Check-Ins</SelectItem>
                <SelectItem value="checkout">Check-Outs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-3 sm:grid-cols-5 p-3 sm:p-4 text-xs sm:text-sm font-medium border-b text-muted-foreground">
                <div>Guest</div>
                <div>Room</div>
                <div className="hidden sm:block">Type</div>
                <div>Status</div>
                <div className="text-right">Action</div>
              </div>
              <div className="divide-y">
                {todaysReservations.map((reservation) => (
                  <div key={reservation.id} className="grid grid-cols-3 sm:grid-cols-5 p-3 sm:p-4 text-xs sm:text-sm items-center">
                    <div className="font-medium text-foreground">{reservation.guest}</div>
                    <div className="text-muted-foreground">{reservation.room}</div>
                    <div className="hidden sm:block text-muted-foreground">{reservation.checkin ? 'Check-In' : 'Check-Out'}</div>
                    <div>
                      <Badge variant={
                        reservation.status === 'Confirmed' ? 'outline' :
                        reservation.status === 'Checked In' ? 'default' : 'secondary'
                      }>
                        {reservation.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <select className="text-xs border rounded p-1 bg-background text-foreground border-border">
                        <option>Actions</option>
                        <option>View Details</option>
                        <option>Check In</option>
                        <option>Cancel</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
