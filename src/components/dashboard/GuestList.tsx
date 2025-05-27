import React, { useState, useEffect } from 'react';
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
import { Search, ChevronLeft, ChevronRight, Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import GuestForm from './GuestForm';
import { cn } from '@/lib/utils';

interface Guest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  id_proof_type: string;
  id_proof_number: string;
  room_number?: string;
  check_in_date?: string;
  check_out_date?: string;
  status?: string;
}

const GuestList = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const guestsPerPage = 10;

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/guests');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error('Error fetching guests:', error);
      setError('Failed to load guests. Please try again later.');
      toast.error('Failed to load guests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this guest?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/guests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }

      toast.success('Guest deleted successfully');
      fetchGuests();
    } catch (error) {
      console.error('Error deleting guest:', error);
      toast.error('Failed to delete guest');
    }
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingGuest(null);
    fetchGuests();
  };

  const filteredGuests = guests.filter(guest => 
    `${guest.first_name} ${guest.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm)
  );

  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'arriving':
        return 'bg-blue-500';
      case 'departed':
        return 'bg-gray-500';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (showAddForm) {
    return (
      <GuestForm
        onSuccess={handleFormSuccess}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  if (editingGuest) {
    return (
      <GuestForm
        onSuccess={handleFormSuccess}
        onCancel={() => setEditingGuest(null)}
        initialData={editingGuest}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Guest List</CardTitle>
            <CardDescription>
              View and manage all current and upcoming guests
            </CardDescription>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guests..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchGuests}>Retry</Button>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-border bg-card text-foreground">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-border">
                    <TableHead>Guest</TableHead>
                    <TableHead className="hidden sm:table-cell">Contact</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead className="hidden md:table-cell">Check In</TableHead>
                    <TableHead className="hidden md:table-cell">Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGuests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No guests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentGuests.map((guest) => (
                      <TableRow key={guest.id} className="border-border hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {guest.first_name[0]}{guest.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{guest.first_name} {guest.last_name}</p>
                              <p className="text-sm text-muted-foreground">{guest.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          <div>
                            <p className="text-sm">{guest.phone}</p>
                            <p className="text-sm">{guest.address}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{guest.room_number || '-'}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{guest.check_in_date ? new Date(guest.check_in_date).toLocaleDateString() : '-'}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{guest.check_out_date ? new Date(guest.check_out_date).toLocaleDateString() : '-'}</TableCell>
                        <TableCell>
                          {guest.status && (
                            <Badge className={cn(getStatusColor(guest.status), "text-primary-foreground")} >
                              {guest.status}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(guest)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(guest.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestList;
