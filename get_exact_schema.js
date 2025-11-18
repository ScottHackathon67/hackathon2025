const { query, SCHEMA_NAME } = require('./db');

async function getExactSchema() {
  try {
    console.log('📊 Customers table structure:');
    const customers = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = $1 AND table_name = 'customers'
      ORDER BY ordinal_position
    `, [SCHEMA_NAME]);
    
    customers.rows.forEach(c => {
      console.log(`  ${c.column_name.padEnd(30)} ${c.data_type.padEnd(20)} ${c.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    console.log('\n📊 Support_tickets table structure:');
    const tickets = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = $1 AND table_name = 'support_tickets'
      ORDER BY ordinal_position
    `, [SCHEMA_NAME]);
    
    tickets.rows.forEach(t => {
      console.log(`  ${t.column_name.padEnd(30)} ${t.data_type.padEnd(20)} ${t.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    // Get sample data to understand the format
    console.log('\n📋 Sample customer data:');
    const sample = await query(`
      SELECT * FROM customers LIMIT 2
    `);
    sample.rows.forEach((row, idx) => {
      console.log(`\nCustomer ${idx + 1}:`);
      Object.keys(row).forEach(key => {
        console.log(`  ${key}: ${row[key]}`);
      });
    });
    
    // Check support_tickets structure
    console.log('\n📋 Sample support ticket data:');
    const sampleTickets = await query(`
      SELECT * FROM support_tickets LIMIT 2
    `);
    if (sampleTickets.rows.length > 0) {
      sampleTickets.rows.forEach((row, idx) => {
        console.log(`\nTicket ${idx + 1}:`);
        Object.keys(row).forEach(key => {
          const value = row[key];
          const displayValue = typeof value === 'object' ? JSON.stringify(value) : value;
          console.log(`  ${key}: ${displayValue}`);
        });
      });
    } else {
      console.log('  No tickets found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getExactSchema();

