const { Pool } = require('pg');
require('dotenv').config();

async function checkDatabases() {
  // Connect to default postgres database to list databases
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres' // Connect to default database
  });

  try {
    console.log('🔍 Checking available databases...\n');
    
    const result = await query('SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname');
    console.log('Available databases:');
    result.rows.forEach(db => {
      console.log(`  - ${db.datname}`);
    });
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
    process.exit(1);
  }
  
  async function query(text, params) {
    const res = await pool.query(text, params);
    return res;
  }
}

checkDatabases();

