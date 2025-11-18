const { query } = require('./db');

async function exploreDatabase() {
  try {
    console.log('🔍 Exploring database schema...\n');
    
    // Get all tables
    console.log('📊 Tables in database:');
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    console.log(tables.rows.map(r => `  - ${r.table_name}`).join('\n'));
    
    // For each table, get structure and sample data
    for (const table of tables.rows) {
      const tableName = table.table_name;
      console.log(`\n📋 Table: ${tableName}`);
      
      // Get column information
      const columns = await query(`
        SELECT 
          column_name, 
          data_type, 
          is_nullable,
          column_default
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = $1
        ORDER BY ordinal_position
      `, [tableName]);
      
      console.log('  Columns:');
      columns.rows.forEach(col => {
        console.log(`    - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '[nullable]' : '[required]'}`);
      });
      
      // Get row count
      const count = await query(`SELECT COUNT(*) as count FROM ${tableName}`);
      console.log(`  Row count: ${count.rows[0].count}`);
      
      // Get sample data (first 3 rows)
      if (parseInt(count.rows[0].count) > 0) {
        const sample = await query(`SELECT * FROM ${tableName} LIMIT 3`);
        console.log('  Sample data:');
        sample.rows.forEach((row, idx) => {
          console.log(`    Row ${idx + 1}:`, JSON.stringify(row, null, 2));
        });
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

exploreDatabase();

