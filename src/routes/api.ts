import express from 'express';
import { roomController } from '../controllers/roomController.js';
import { guestController } from '../controllers/guestController.js';
import { bookingController } from '../controllers/bookingController.js';
import { settingsController } from '../controllers/settingsController.js';

const router = express.Router();

// Room routes
router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);
router.patch('/rooms/:id/status', roomController.updateRoomStatus);

// Guest routes
router.get('/guests', guestController.getAllGuests);
router.get('/guests/:id', guestController.getGuestById);
router.post('/guests', guestController.createGuest);
router.put('/guests/:id', guestController.updateGuest);
router.delete('/guests/:id', guestController.deleteGuest);
router.get('/guests/search', guestController.searchGuests);

// Booking routes
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.post('/bookings', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.cancelBooking);
router.get('/bookings/date-range', bookingController.getBookingsByDateRange);

// Settings routes
router.get('/settings', settingsController.getSettings);
router.post('/settings', settingsController.updateSettings);
router.get('/settings/notifications', settingsController.getNotificationSettings);
router.post('/settings/notifications', settingsController.updateNotificationSettings);

export default router;