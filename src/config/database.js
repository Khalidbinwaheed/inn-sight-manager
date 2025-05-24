import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'inn_sight_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Function to test database connection with retry logic
const testConnection = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('Database connection successful');
      connection.release();
      return true;
    } catch (err) {
      console.error(`Database connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error('All database connection attempts failed');
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
};

// Test the connection immediately
testConnection();

// Export both pool and testConnection
export { pool, testConnection };
export default pool; 