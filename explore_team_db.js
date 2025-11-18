const { Pool } = require('pg');
require('dotenv').config();

async function exploreTeamDatabase(dbName) {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: dbName
  });

  try {
    console.log(`🔍 Exploring database: ${dbName}\n`);
    
    // Get all tables
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tables.rows.length === 0) {
      console.log('  No tables found in this database.');
      await pool.end();
      return;
    }
    
    console.log('📊 Tables:');
    tables.rows.forEach(t => console.log(`  - ${t.table_name}`));
    
    // For each table, get structure
    for (const table of tables.rows) {
      const tableName = table.table_name;
      console.log(`\n📋 Table: ${tableName}`);
      
      // Get column information
      const columns = await query(`
        SELECT 
          column_name, 
          data_type, 
          is_nullable
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = $1
        ORDER BY ordinal_position
      `, [tableName]);
      
      console.log('  Columns:');
      columns.rows.forEach(col => {
        console.log(`    - ${col.column_name} (${col.data_type})`);
      });
      
      // Get row count and sample
      const count = await query(`SELECT COUNT(*) as count FROM ${tableName}`);
      console.log(`  Row count: ${count.rows[0].count}`);
      
      if (parseInt(count.rows[0].count) > 0) {
        const sample = await query(`SELECT * FROM ${tableName} LIMIT 2`);
        console.log('  Sample data:');
        sample.rows.forEach((row, idx) => {
          console.log(`    Row ${idx + 1}:`, JSON.stringify(row, null, 4));
        });
      }
    }
    
    await pool.end();
  } catch (error) {
    console.error(`❌ Error exploring ${dbName}:`, error.message);
    await pool.end();
  }
  
  async function query(text, params) {
    const res = await pool.query(text, params);
    return res;
  }
}

// Check team databases
(async () => {
  await exploreTeamDatabase('team_blue_planet');
  console.log('\n' + '='.repeat(50) + '\n');
  await exploreTeamDatabase('teama');
  process.exit(0);
})();

