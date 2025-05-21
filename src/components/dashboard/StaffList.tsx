
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRound, Mail, Phone, Calendar } from "lucide-react";

// Sample staff data
const staffMembers = [
  {
    id: 1,
    name: "Jane Smith",
    position: "Front Desk Manager",
    email: "jane.smith@hotelexample.com",
    phone: "(555) 123-4567",
    startDate: "2021-05-15",
    status: "Full-time"
  },
  {
    id: 2,
    name: "Michael Johnson",
    position: "Concierge",
    email: "michael.johnson@hotelexample.com",
    phone: "(555) 234-5678",
    startDate: "2022-01-10",
    status: "Full-time"
  },
  {
    id: 3,
    name: "Sarah Williams",
    position: "Housekeeping Supervisor",
    email: "sarah.williams@hotelexample.com",
    phone: "(555) 345-6789",
    startDate: "2020-11-20",
    status: "Full-time"
  },
  {
    id: 4,
    name: "Robert Brown",
    position: "Maintenance Technician",
    email: "robert.brown@hotelexample.com",
    phone: "(555) 456-7890",
    startDate: "2022-03-15",
    status: "Part-time"
  },
  {
    id: 5,
    name: "Emily Davis",
    position: "Restaurant Manager",
    email: "emily.davis@hotelexample.com",
    phone: "(555) 567-8901",
    startDate: "2021-08-05",
    status: "Full-time"
  },
];

const StaffList = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Staff Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium flex items-center">
                  <UserRound size={18} className="mr-2 text-primary" />
                  {staff.name}
                </TableCell>
                <TableCell>{staff.position}</TableCell>
                <TableCell className="flex items-center">
                  <Mail size={16} className="mr-2 text-muted-foreground" />
                  {staff.email}
                </TableCell>
                <TableCell className="flex items-center">
                  <Phone size={16} className="mr-2 text-muted-foreground" />
                  {staff.phone}
                </TableCell>
                <TableCell className="flex items-center">
                  <Calendar size={16} className="mr-2 text-muted-foreground" />
                  {new Date(staff.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${staff.status === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {staff.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StaffList;
