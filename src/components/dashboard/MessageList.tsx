
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Clock, Check, AlertCircle } from "lucide-react";

// Sample message data
const messages = [
  {
    id: "MSG-001",
    sender: "John Smith",
    subject: "Room Service Request",
    content: "Could I get extra towels delivered to Room 205 please?",
    date: "2025-05-21T08:30:00",
    status: "New",
    priority: "Normal",
    roomNumber: "205"
  },
  {
    id: "MSG-002",
    sender: "Emma Johnson",
    subject: "Air Conditioning Issue",
    content: "The AC in room 312 isn't working properly. It's too warm.",
    date: "2025-05-21T07:45:00",
    status: "In Progress",
    priority: "High",
    roomNumber: "312"
  },
  {
    id: "MSG-003",
    sender: "Robert Williams",
    subject: "Late Check-out Request",
    content: "I'd like to request a late check-out for tomorrow if possible.",
    date: "2025-05-20T22:15:00",
    status: "Resolved",
    priority: "Normal",
    roomNumber: "118"
  },
  {
    id: "MSG-004",
    sender: "Sarah Miller",
    subject: "Wifi Connection Problem",
    content: "I'm having trouble connecting to the hotel wifi network.",
    date: "2025-05-20T19:30:00",
    status: "New",
    priority: "High",
    roomNumber: "427"
  },
  {
    id: "MSG-005",
    sender: "Michael Chen",
    subject: "Restaurant Reservation",
    content: "I'd like to make a dinner reservation for 4 people tonight at 8 PM.",
    date: "2025-05-20T16:45:00",
    status: "In Progress",
    priority: "Normal",
    roomNumber: "501"
  },
];

const getPriorityBadge = (priority: string) => {
  if (priority === "High") {
    return <Badge variant="destructive" className="w-16 justify-center">{priority}</Badge>;
  }
  return <Badge variant="outline" className="w-16 justify-center">{priority}</Badge>;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "New":
      return (
        <div className="flex items-center">
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            <AlertCircle size={12} className="mr-1" />
            {status}
          </Badge>
        </div>
      );
    case "In Progress":
      return (
        <div className="flex items-center">
          <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
            <Clock size={12} className="mr-1" />
            {status}
          </Badge>
        </div>
      );
    case "Resolved":
      return (
        <div className="flex items-center">
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <Check size={12} className="mr-1" />
            {status}
          </Badge>
        </div>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const MessageList = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Guest Messages</span>
          <Button variant="outline" size="sm">
            <MessageSquare size={16} className="mr-2" />
            Compose
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-2 text-primary" />
                    {message.id}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-muted-foreground" />
                    {message.sender}
                  </div>
                </TableCell>
                <TableCell>{message.roomNumber}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={message.subject}>
                  {message.subject}
                </TableCell>
                <TableCell>{formatDate(message.date)}</TableCell>
                <TableCell>{getPriorityBadge(message.priority)}</TableCell>
                <TableCell>{getStatusBadge(message.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MessageList;
