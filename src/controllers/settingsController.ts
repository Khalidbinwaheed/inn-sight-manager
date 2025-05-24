import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, OkPacket } from 'mysql2/promise';

export const settingsController = {
  // Get hotel settings
  getSettings: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM settings');
      res.json(rows[0] || {});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  },

  // Update hotel settings
  updateSettings: async (req: Request, res: Response) => {
    const { 
      hotel_name, 
      address, 
      phone, 
      email, 
      check_in_time, 
      check_out_time,
      auto_logout,
      session_timeout,
      compact_view,
      show_statistics
    } = req.body;

    try {
      await pool.query<OkPacket>(
        `INSERT INTO settings (
          hotel_name, address, phone, email, check_in_time, check_out_time,
          auto_logout, session_timeout, compact_view, show_statistics
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          hotel_name = VALUES(hotel_name),
          address = VALUES(address),
          phone = VALUES(phone),
          email = VALUES(email),
          check_in_time = VALUES(check_in_time),
          check_out_time = VALUES(check_out_time),
          auto_logout = VALUES(auto_logout),
          session_timeout = VALUES(session_timeout),
          compact_view = VALUES(compact_view),
          show_statistics = VALUES(show_statistics)`,
        [
          hotel_name, address, phone, email, check_in_time, check_out_time,
          auto_logout, session_timeout, compact_view, show_statistics
        ]
      );
      res.json({ message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  },

  // Get notification settings
  getNotificationSettings: async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT 
          email_notifications,
          sms_notifications,
          browser_notifications,
          new_reservations,
          check_ins,
          check_outs,
          payments
        FROM settings
      `);
      res.json(rows[0] || {});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notification settings' });
    }
  },

  // Update notification settings
  updateNotificationSettings: async (req: Request, res: Response) => {
    const {
      email_notifications,
      sms_notifications,
      browser_notifications,
      new_reservations,
      check_ins,
      check_outs,
      payments
    } = req.body;

    try {
      await pool.query<OkPacket>(
        `UPDATE settings SET
          email_notifications = ?,
          sms_notifications = ?,
          browser_notifications = ?,
          new_reservations = ?,
          check_ins = ?,
          check_outs = ?,
          payments = ?
        WHERE id = 1`,
        [
          email_notifications,
          sms_notifications,
          browser_notifications,
          new_reservations,
          check_ins,
          check_outs,
          payments
        ]
      );
      res.json({ message: 'Notification settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update notification settings' });
    }
  }
}; 