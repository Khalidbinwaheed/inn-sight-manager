import express from 'express';
import addRoom from '../controllers/roomController';
import { Request, Response } from 'express';
import pool from '../config/database.js';
import { RowDataPacket, OkPacket } from 'mysql2/promise';

const router = express.Router();

router.post('/add', addRoom);

interface Room {
  id?: number;
  room_number: string;
  type: string;
  capacity: number;
  rate: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export const roomController = {
  // Get all rooms
  getAllRooms: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>( 'SELECT * FROM rooms' );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rooms', error });
    }
  },

  // Get room by ID
  getRoomById: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>( 'SELECT * FROM rooms WHERE id = ?', [req.params.id] );
      if (rows.length === 0) {
        res.status(404).json({ message: 'Room not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching room', error });
    }
  },

  // Create new room
  createRoom: async (req: Request, res: Response) => {
    try {
      const newRoom: Room = req.body;
      const [result] = await pool.query<OkPacket>( 'INSERT INTO rooms SET ?', newRoom );
      res.status(201).json({ message: 'Room created', id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error creating room', error });
    }
  },

  // Update room
  updateRoom: async (req: Request, res: Response) => {
    try {
      const updatedRoom: Room = req.body;
      const [result] = await pool.query<OkPacket>( 'UPDATE rooms SET ? WHERE id = ?', [updatedRoom, req.params.id] );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Room not found' });
      } else {
        res.json({ message: 'Room updated' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating room', error });
    }
  },

  // Delete room
  deleteRoom: async (req: Request, res: Response) => {
    try {
      const [result] = await pool.query<OkPacket>( 'DELETE FROM rooms WHERE id = ?', [req.params.id] );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Room not found' });
      } else {
        res.json({ message: 'Room deleted' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting room', error });
    }
  },

  // Update room status
  updateRoomStatus: async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const [result] = await pool.query<OkPacket>( 'UPDATE rooms SET status = ? WHERE id = ?', [status, req.params.id] );
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Room not found' });
      } else {
        res.json({ message: 'Room status updated' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating room status', error });
    }
  }
};

export default router;