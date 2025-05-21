
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
import { Receipt, CalendarDays, CreditCard, Check, Clock } from "lucide-react";

// Sample billing data
const invoices = [
  {
    id: "INV-001",
    date: "2025-04-15",
    amount: 1250.00,
    status: "Paid",
    paymentMethod: "Credit Card",
    description: "Room 301 - Deluxe Suite (7 nights)"
  },
  {
    id: "INV-002",
    date: "2025-04-10",
    amount: 980.00,
    status: "Paid",
    paymentMethod: "Credit Card",
    description: "Room 205 - Standard Room (4 nights)"
  },
  {
    id: "INV-003",
    date: "2025-04-05",
    amount: 1750.00,
    status: "Pending",
    paymentMethod: "Bank Transfer",
    description: "Room 401 - Executive Suite (5 nights)"
  },
  {
    id: "INV-004",
    date: "2025-03-28",
    amount: 560.00,
    status: "Paid",
    paymentMethod: "PayPal",
    description: "Room 112 - Standard Room (2 nights)"
  },
  {
    id: "INV-005",
    date: "2025-03-20",
    amount: 2100.00,
    status: "Overdue",
    paymentMethod: "Invoice",
    description: "Event Space Rental - Conference Room A"
  },
];

const BillingList = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Invoice History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium flex items-center">
                  <Receipt size={16} className="mr-2 text-primary" />
                  {invoice.id}
                </TableCell>
                <TableCell className="flex items-center">
                  <CalendarDays size={16} className="mr-2 text-muted-foreground" />
                  {new Date(invoice.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell className="flex items-center">
                  <CreditCard size={16} className="mr-2 text-muted-foreground" />
                  {invoice.paymentMethod}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : invoice.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status === 'Paid' && <Check size={12} className="mr-1" />}
                    {invoice.status === 'Pending' && <Clock size={12} className="mr-1" />}
                    {invoice.status === 'Overdue' && <Clock size={12} className="mr-1" />}
                    {invoice.status}
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

export default BillingList;
