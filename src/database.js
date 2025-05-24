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
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Execute query with parameters
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
};

// Get a single row
const getOne = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows[0] || null;
  } catch (error) {
    console.error('Get one query failed:', error);
    throw error;
  }
};

// Get multiple rows
const getMany = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Get many query failed:', error);
    throw error;
  }
};

// Insert a single row
const insert = async (table, data) => {
  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    console.error('Insert query failed:', error);
    throw error;
  }
};

// Update a row
const update = async (table, data, where) => {
  try {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    const values = [...Object.values(data), ...Object.values(where)];
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    console.error('Update query failed:', error);
    throw error;
  }
};

// Delete a row
const remove = async (table, where) => {
  try {
    const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    const values = Object.values(where);
    
    const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    console.error('Delete query failed:', error);
    throw error;
  }
};

export {
  pool,
  testConnection,
  query,
  getOne,
  getMany,
  insert,
  update,
  remove
};