import express from 'express';
import addRoom from '../controllers/roomController';

const router = express.Router();

router.post('/add', addRoom);

// In your main server file, use: app.use('/api/rooms', roomRoutes);
// Do not use app.use here, as 'app' is not defined in this file.

export default router;

// No filepath: place in your frontend component
const handleAddRoom = async () => {
  const response = await fetch('/api/rooms/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_number: 101, room_type: 'Deluxe', price: 120 })
  });
  const data = await response.json();
  alert(data.message);
};

// Example usage in a React component:
// <button onClick={handleAddRoom}>Add Room</button>