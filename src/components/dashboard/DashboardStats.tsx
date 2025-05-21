
import React from 'react';
import { HotelStats } from '@/components/ui/HotelStats';
import { Users, Bed, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 14000 },
  { month: 'Mar', revenue: 15800 },
  { month: 'Apr', revenue: 17300 },
  { month: 'May', revenue: 18900 },
];

const occupancyData = [
  { day: 'Mon', standard: 65, deluxe: 45, suite: 30 },
  { day: 'Tue', standard: 70, deluxe: 50, suite: 35 },
  { day: 'Wed', standard: 75, deluxe: 60, suite: 40 },
  { day: 'Thu', standard: 80, deluxe: 65, suite: 45 },
  { day: 'Fri', standard: 95, deluxe: 80, suite: 60 },
  { day: 'Sat', standard: 98, deluxe: 85, suite: 70 },
  { day: 'Sun', standard: 90, deluxe: 70, suite: 55 },
];

export default function DashboardStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HotelStats 
          title="Total Rooms" 
          value="120"
          icon={<Bed className="h-4 w-4 text-primary" />}
          description="5 under maintenance"
        />
        <HotelStats 
          title="Occupancy Rate" 
          value="78%"
          icon={<Bed className="h-4 w-4 text-primary" />}
          trend={{ value: 12, isPositive: true }}
          description="vs last week"
        />
        <HotelStats 
          title="Total Reservations" 
          value="35"
          icon={<Calendar className="h-4 w-4 text-primary" />}
          trend={{ value: 5, isPositive: true }}
          description="today"
        />
        <HotelStats 
          title="Guests In-House" 
          value="94"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{ value: 3, isPositive: false }}
          description="vs yesterday"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 5 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${value / 1000}k`} 
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Occupancy</CardTitle>
            <CardDescription>Room type occupancy percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="standard" 
                  name="Standard"
                  stroke="#0ea5e9" 
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="deluxe"
                  name="Deluxe" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="suite"
                  name="Suite" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
