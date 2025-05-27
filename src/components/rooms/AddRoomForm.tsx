import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AddRoomFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onSuccess, onCancel }) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send a POST request to your backend API
    console.log('Submitting room:', { roomNumber, roomType, price });

    // Simulate successful submission
    // In a real application, you would call onSuccess after a successful API call
    onSuccess();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Room</CardTitle>
        <CardDescription>Fill in the details for the new room.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roomType">Room Type</Label>
            <Input
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price Per Night</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Room</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRoomForm; 