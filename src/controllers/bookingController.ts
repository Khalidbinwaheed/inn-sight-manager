import { Request, Response } from 'express';
import pool from '../config/database.js';
import { RowDataPacket, OkPacket } from 'mysql2/promise';

interface Booking {
  id?: number;
  guest_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
}

export const bookingController = {
  // Get all bookings with guest and room details
  getAllBookings: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT b.*, g.first_name, g.last_name, r.room_number, r.type AS room_type
         FROM bookings b
         JOIN guests g ON b.guest_id = g.id
         JOIN rooms r ON b.room_id = r.id`
      );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  },

  // Get booking by ID
  getBookingById: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT b.*, g.first_name, g.last_name, r.room_number, r.type AS room_type
         FROM bookings b
         JOIN guests g ON b.guest_id = g.id
         JOIN rooms r ON b.room_id = r.id
         WHERE b.id = ?`,
        [req.params.id]
      );
      if (rows.length === 0) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error('Error fetching booking by ID:', error);
      res.status(500).json({ message: 'Error fetching booking', error });
    }
  },

  // Create new booking
  createBooking: async (req: Request, res: Response) => {
    const { guest_id, room_id, check_in_date, check_out_date, status = 'confirmed' } = req.body;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Check room availability
      const [roomRows] = await connection.query<RowDataPacket[]>( 'SELECT * FROM rooms WHERE id = ? AND status = \'available\'', [room_id] );
      if (roomRows.length === 0) {
        await connection.rollback();
        return res.status(400).json({ message: 'Room is not available' });
      }

      // Insert booking
      const newBooking: Booking = { guest_id, room_id, check_in_date, check_out_date, status };
      const [result] = await connection.query<OkPacket>( 'INSERT INTO bookings SET ?', newBooking );
      const bookingId = result.insertId;

      // Update room status to occupied
      await connection.query<OkPacket>( 'UPDATE rooms SET status = \'occupied\' WHERE id = ?', [room_id] );

      await connection.commit();
      res.status(201).json({ message: 'Booking created', id: bookingId });
    } catch (error) {
      await connection.rollback();
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Error creating booking', error });
    } finally {
      connection.release();
    }
  },

  // Update booking
  updateBooking: async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const updatedBooking: Partial<Booking> = req.body;

    try {
      const [result] = await pool.query<OkPacket>( 'UPDATE bookings SET ? WHERE id = ?', [updatedBooking, bookingId] );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.json({ message: 'Booking updated' });
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ message: 'Error updating booking', error });
    }
  },

  // Cancel booking
  cancelBooking: async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Get booking details to find the room_id
      const [bookingRows] = await connection.query<RowDataPacket[]>( 'SELECT room_id FROM bookings WHERE id = ?', [bookingId] );
      if (bookingRows.length === 0) {
        await connection.rollback();
        return res.status(404).json({ message: 'Booking not found' });
      }
      const roomId = bookingRows[0].room_id;

      // Update booking status to cancelled
      const [result] = await connection.query<OkPacket>( 'UPDATE bookings SET status = \'cancelled\' WHERE id = ?', [bookingId] );
      
      if (result.affectedRows === 0) {
           await connection.rollback();
           return res.status(404).json({ message: 'Booking not found' });
      }

      // Update room status back to available
      await connection.query<OkPacket>( 'UPDATE rooms SET status = \'available\' WHERE id = ?', [roomId] );

      await connection.commit();
      res.json({ message: 'Booking cancelled' });
    } catch (error) {
      await connection.rollback();
      console.error('Error cancelling booking:', error);
      res.status(500).json({ message: 'Error cancelling booking', error });
    } finally {
      connection.release();
    }
  },

  // Get bookings by date range
  getBookingsByDateRange: async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required query parameters' });
    }

    try {
      const [rows] = await pool.query<RowDataPacket[]>( 'SELECT * FROM bookings WHERE check_in_date BETWEEN ? AND ? OR check_out_date BETWEEN ? AND ?', [startDate, endDate, startDate, endDate] );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching bookings by date range:', error);
      res.status(500).json({ message: 'Error fetching bookings by date range', error });
    }
  }
}; 