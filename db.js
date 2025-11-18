const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Database name is 'postgres'
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Schema name
const SCHEMA_NAME = 'team_scrappy_minds';

// Test the connection
pool.on('connect', () => {
  // Connected to PostgreSQL database
});

pool.on('error', (err) => {
  process.exit(-1);
});

// Helper function to execute queries (with schema prefix)
const query = async (text, params) => {
  const start = Date.now();
  try {
    // Automatically prefix table names with schema if not already present
    // Match table names that aren't already prefixed with schema
    const schemaPrefixedText = text.replace(/\b(customers|services|test_cases|messages|service_history|support_tickets)\b(?![^\s]*\.)/g, `${SCHEMA_NAME}.$1`);
    const res = await pool.query(schemaPrefixedText, params);
    const duration = Date.now() - start;
    return res;
  } catch (error) {
    throw error;
  }
};

// Helper function to get a client from the pool (for transactions)
const getClient = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  
  // Set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    // Client checked out for more than 5 seconds
  }, 5000);
  
  // Monkey patch the query method to log the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  
  return client;
};

// Test connection function
const testConnection = async () => {
  try {
    const result = await query('SELECT NOW() as current_time');
    console.log('✅ Database connection test successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  query,
  getClient,
  testConnection,
  SCHEMA_NAME,
};

