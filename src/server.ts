import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import apiRoutes from './routes/api.js';
import { RowDataPacket } from 'mysql2/promise';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 + 1 AS result');
    res.json({ message: 'Database connection successful', data: rows });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 