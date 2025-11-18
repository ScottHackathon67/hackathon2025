const { Pool } = require('pg');
require('dotenv').config();

const SCHEMA_NAME = 'team_scrappy_minds';

async function setupSchema() {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    // Setting up schema: ${SCHEMA_NAME}...
    
    // Create schema if it doesn't exist
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME}`);
    // Schema '${SCHEMA_NAME}' created/verified
    
    // Set search_path for this session
    await pool.query(`SET search_path TO ${SCHEMA_NAME}, public`);
    
    // Creating tables...
    
    // Create customers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.customers (
        id SERIAL PRIMARY KEY,
        test_case_id VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        telephone_number VARCHAR(20) NOT NULL,
        account_number VARCHAR(50) NOT NULL,
        language VARCHAR(50) NOT NULL,
        language_code VARCHAR(10) NOT NULL,
        language_method VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create services table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.services (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER,
        service_type VARCHAR(50) NOT NULL,
        service_name VARCHAR(100) NOT NULL,
        service_status VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_services_customer FOREIGN KEY (customer_id) REFERENCES ${SCHEMA_NAME}.customers(id) ON DELETE CASCADE
      )
    `);
    
    // Create test_cases table (for the current issue)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.test_cases (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER,
        service_type VARCHAR(50) NOT NULL,
        service_name VARCHAR(100) NOT NULL,
        issue_description TEXT NOT NULL,
        priority VARCHAR(20) DEFAULT 'MEDIUM',
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_test_cases_customer FOREIGN KEY (customer_id) REFERENCES ${SCHEMA_NAME}.customers(id) ON DELETE CASCADE
      )
    `);
    
    // Create messages table (conversation history)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.messages (
        id SERIAL PRIMARY KEY,
        test_case_id INTEGER,
        message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('ai', 'customer')),
        message_text TEXT NOT NULL,
        translation TEXT,
        message_order INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_messages_test_case FOREIGN KEY (test_case_id) REFERENCES ${SCHEMA_NAME}.test_cases(id) ON DELETE CASCADE
      )
    `);
    
    // Create service_history table (for trend analysis)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.service_history (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER,
        service_type VARCHAR(50) NOT NULL,
        issue_description TEXT NOT NULL,
        reported_date TIMESTAMP NOT NULL,
        resolved_date TIMESTAMP,
        status VARCHAR(50) DEFAULT 'reported',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_service_history_customer FOREIGN KEY (customer_id) REFERENCES ${SCHEMA_NAME}.customers(id) ON DELETE CASCADE
      )
    `);
    
    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_customers_test_case ON ${SCHEMA_NAME}.customers(test_case_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_services_customer ON ${SCHEMA_NAME}.services(customer_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_test_cases_customer ON ${SCHEMA_NAME}.test_cases(customer_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_messages_test_case ON ${SCHEMA_NAME}.messages(test_case_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_service_history_customer ON ${SCHEMA_NAME}.service_history(customer_id)`);
    
    // Tables created successfully!
    
    // Check if data already exists
    const customerCount = await pool.query(`SELECT COUNT(*) as count FROM ${SCHEMA_NAME}.customers`);
    // Current customer records: ${customerCount.rows[0].count}
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    await pool.end();
    process.exit(1);
  }
}

setupSchema();

