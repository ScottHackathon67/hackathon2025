const { Pool } = require('pg');
require('dotenv').config();

async function createDatabase() {
  // Connect to default postgres database
  const adminPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres'
  });

  try {
    // Creating database: team_scrappy_minds...
    
    // Check if database exists
    const checkDb = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'team_scrappy_minds'"
    );
    
    if (checkDb.rows.length === 0) {
      await adminPool.query('CREATE DATABASE team_scrappy_minds');
      // Database created successfully!
    } else {
      // Database already exists.
    }
    
    await adminPool.end();
    
    // Now connect to the new database and create tables
    const dbPool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: 'team_scrappy_minds'
    });
    
    // Creating tables...
    
    // Create customers table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS customers (
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
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
        service_type VARCHAR(50) NOT NULL,
        service_name VARCHAR(100) NOT NULL,
        service_status VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create test_cases table (for the current issue)
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS test_cases (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
        service_type VARCHAR(50) NOT NULL,
        service_name VARCHAR(100) NOT NULL,
        issue_description TEXT NOT NULL,
        priority VARCHAR(20) DEFAULT 'MEDIUM',
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create messages table (conversation history)
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        test_case_id INTEGER REFERENCES test_cases(id) ON DELETE CASCADE,
        message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('ai', 'customer')),
        message_text TEXT NOT NULL,
        translation TEXT,
        message_order INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create service_history table (for trend analysis)
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS service_history (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
        service_type VARCHAR(50) NOT NULL,
        issue_description TEXT NOT NULL,
        reported_date TIMESTAMP NOT NULL,
        resolved_date TIMESTAMP,
        status VARCHAR(50) DEFAULT 'reported',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create indexes
    await dbPool.query('CREATE INDEX IF NOT EXISTS idx_customers_test_case ON customers(test_case_id)');
    await dbPool.query('CREATE INDEX IF NOT EXISTS idx_services_customer ON services(customer_id)');
    await dbPool.query('CREATE INDEX IF NOT EXISTS idx_test_cases_customer ON test_cases(customer_id)');
    await dbPool.query('CREATE INDEX IF NOT EXISTS idx_messages_test_case ON messages(test_case_id)');
    await dbPool.query('CREATE INDEX IF NOT EXISTS idx_service_history_customer ON service_history(customer_id)');
    
    // Tables created successfully!
    
    await dbPool.end();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

createDatabase();

