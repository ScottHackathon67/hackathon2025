const { query } = require('./db');

async function checkCustomers() {
  try {
    console.log('🔍 Checking customers data...\n');
    
    const result = await query(`
      SELECT 
        customer_id,
        customer_name,
        contact_phone,
        service_plan,
        account_status,
        email,
        location,
        subscription_tier
      FROM customers
      LIMIT 10
    `);
    
    console.log(`📊 Found ${result.rows.length} customers (showing first 10):\n`);
    result.rows.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.customer_name || 'N/A'}`);
      console.log(`   ID: ${row.customer_id}`);
      console.log(`   Phone: ${row.contact_phone || 'N/A'}`);
      console.log(`   Plan: ${row.service_plan || 'N/A'}`);
      console.log(`   Status: ${row.account_status || 'N/A'}`);
      console.log(`   Location: ${row.location || 'N/A'}`);
      console.log('');
    });
    
    // Get total count
    const count = await query('SELECT COUNT(*) as count FROM customers');
    console.log(`Total customers in database: ${count.rows[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkCustomers();

