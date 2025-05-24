import { Request, Response } from 'express';
import pool from '../config/database.js';
import { RowDataPacket, OkPacket } from 'mysql2/promise';

interface Guest {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  id_proof_type: string;
  id_proof_number: string;
}

export const guestController = {
  // Get all guests
  getAllGuests: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT g.*, b.room_id, r.room_number, b.check_in_date, b.check_out_date
        FROM guests g
        LEFT JOIN bookings b ON g.id = b.guest_id
        LEFT JOIN rooms r ON b.room_id = r.id
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch guests' });
    }
  },

  // Get guest by ID
  getGuestById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT g.*, b.room_id, r.room_number, b.check_in_date, b.check_out_date
        FROM guests g
        LEFT JOIN bookings b ON g.id = b.guest_id
        LEFT JOIN rooms r ON b.room_id = r.id
        WHERE g.id = ?
      `, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Guest not found' });
      } else {
      res.json(rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch guest' });
    }
  },

  // Create new guest
  createGuest: async (req: Request, res: Response) => {
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      address, 
      id_proof_type, 
      id_proof_number 
    } = req.body;
    try {
      const [result] = await pool.query<OkPacket>(
        'INSERT INTO guests (first_name, last_name, email, phone, address, id_proof_type, id_proof_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, phone, address, id_proof_type, id_proof_number]
      );
      res.status(201).json({ id: result.insertId, message: 'Guest created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create guest' });
    }
  },

  // Update guest
  updateGuest: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      address, 
      id_proof_type, 
      id_proof_number 
    } = req.body;
    try {
      await pool.query<OkPacket>(
        'UPDATE guests SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, id_proof_type = ?, id_proof_number = ? WHERE id = ?',
        [first_name, last_name, email, phone, address, id_proof_type, id_proof_number, id]
      );
      res.json({ message: 'Guest updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update guest' });
    }
  },

  // Delete guest
  deleteGuest: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await pool.query<OkPacket>('DELETE FROM guests WHERE id = ?', [id]);
      res.json({ message: 'Guest deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete guest' });
    }
  },

  // Search guests
  searchGuests: async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT g.*, b.room_id, r.room_number, b.check_in_date, b.check_out_date
        FROM guests g
        LEFT JOIN bookings b ON g.id = b.guest_id
        LEFT JOIN rooms r ON b.room_id = r.id
        WHERE g.first_name LIKE ? OR g.last_name LIKE ? OR g.email LIKE ? OR g.phone LIKE ?
      `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search guests' });
    }
  }
}; 