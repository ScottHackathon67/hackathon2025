const { Pool } = require('pg');
require('dotenv').config();

const SCHEMA_NAME = 'team_scrappy_minds';

async function checkSchema() {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    console.log(`🔍 Checking schema: ${SCHEMA_NAME}\n`);
    
    // Check if schema exists
    const schemaCheck = await pool.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = $1
    `, [SCHEMA_NAME]);
    
    if (schemaCheck.rows.length === 0) {
      console.log('❌ Schema does not exist');
      await pool.end();
      return;
    }
    
    console.log('✅ Schema exists\n');
    
    // Get all tables in schema
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = $1
      ORDER BY table_name
    `, [SCHEMA_NAME]);
    
    console.log(`📊 Tables in schema (${tables.rows.length}):`);
    tables.rows.forEach(t => console.log(`  - ${t.table_name}`));
    
    // For each table, show structure
    for (const table of tables.rows) {
      const tableName = table.table_name;
      console.log(`\n📋 Table: ${SCHEMA_NAME}.${tableName}`);
      
      const columns = await pool.query(`
        SELECT 
          column_name, 
          data_type, 
          is_nullable
        FROM information_schema.columns 
        WHERE table_schema = $1 
          AND table_name = $2
        ORDER BY ordinal_position
      `, [SCHEMA_NAME, tableName]);
      
      console.log('  Columns:');
      columns.rows.forEach(col => {
        console.log(`    - ${col.column_name} (${col.data_type})`);
      });
    }
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

checkSchema();

