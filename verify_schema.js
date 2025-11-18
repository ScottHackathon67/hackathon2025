const { query, SCHEMA_NAME } = require('./db');

async function verifySchema() {
  try {
    console.log(`🔍 Verifying schema: ${SCHEMA_NAME}\n`);
    
    // Check customers table structure
    console.log('📊 Checking customers table...');
    const customersColumns = await query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_schema = $1 
        AND table_name = 'customers'
      ORDER BY ordinal_position
    `, [SCHEMA_NAME]);
    
    console.log('Customers table columns:');
    customersColumns.rows.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '[nullable]' : '[required]'}`);
    });
    
    // Check support_tickets table structure
    console.log('\n📊 Checking support_tickets table...');
    const ticketsColumns = await query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable
      FROM information_schema.columns 
      WHERE table_schema = $1 
        AND table_name = 'support_tickets'
      ORDER BY ordinal_position
    `, [SCHEMA_NAME]);
    
    console.log('Support_tickets table columns:');
    ticketsColumns.rows.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? '[nullable]' : '[required]'}`);
    });
    
    // Test our actual query
    console.log('\n🧪 Testing our query...');
    const testQuery = await query(`
      SELECT 
        c.customer_id,
        c.customer_name,
        c.contact_phone,
        c.account_status,
        c.service_plan,
        c.location,
        c.subscription_tier,
        COALESCE(
          (SELECT COUNT(*) FROM support_tickets st 
           WHERE st.customer_id = c.customer_id 
           AND st.status != 'resolved'), 
          0
        ) as open_tickets,
        (SELECT ticket_id FROM support_tickets st 
         WHERE st.customer_id = c.customer_id 
         ORDER BY st.timestamp_created DESC LIMIT 1) as latest_ticket_id,
        (SELECT symptom_description FROM support_tickets st 
         WHERE st.customer_id = c.customer_id 
         ORDER BY st.timestamp_created DESC LIMIT 1) as latest_issue
      FROM customers c
      WHERE c.account_status IN ('Active', 'Pending')
      ORDER BY c.customer_id
      LIMIT 5
    `);
    
    console.log(`✅ Query successful! Retrieved ${testQuery.rows.length} rows`);
    if (testQuery.rows.length > 0) {
      console.log('\nSample row:');
      console.log(JSON.stringify(testQuery.rows[0], null, 2));
    }
    
    // Check for any other relevant tables
    console.log('\n📋 All tables in schema:');
    const allTables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = $1
      ORDER BY table_name
    `, [SCHEMA_NAME]);
    
    allTables.rows.forEach(t => console.log(`  - ${t.table_name}`));
    
    // Get row counts
    console.log('\n📊 Row counts:');
    const customerCount = await query(`SELECT COUNT(*) as count FROM customers`);
    console.log(`  Customers: ${customerCount.rows[0].count}`);
    
    const ticketCount = await query(`SELECT COUNT(*) as count FROM support_tickets`);
    console.log(`  Support Tickets: ${ticketCount.rows[0].count}`);
    
    // Check for recent data
    console.log('\n🕐 Recent data check:');
    const recentCustomers = await query(`
      SELECT customer_id, customer_name, account_status, updated_at
      FROM customers
      ORDER BY updated_at DESC NULLS LAST, created_at DESC NULLS LAST
      LIMIT 5
    `);
    console.log('Most recently updated customers:');
    recentCustomers.rows.forEach(c => {
      console.log(`  - ${c.customer_name} (${c.customer_id}) - ${c.account_status}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

verifySchema();

