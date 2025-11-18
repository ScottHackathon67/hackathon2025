const express = require('express');
const path = require('path');
const { testConnection, query } = require('./db');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS middleware (in case needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'agentConsole.html'));
});

// Database test route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW() as current_time, version() as version');
    res.json({
      success: true,
      message: 'Database connection successful',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Get all test cases (customers formatted for test cases)
app.get('/api/test-cases', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    // Fetch customers with their support tickets/issues
    const customers = await query(`
      SELECT 
        c.customer_id,
        c.customer_name,
        c.contact_phone,
        c.account_status,
        c.service_plan,
        c.location,
        c.subscription_tier,
        c.email,
        c.industry,
        COALESCE(
          (SELECT COUNT(*) FROM support_tickets st 
           WHERE st.customer_id = c.customer_id 
           AND st.status NOT IN ('Closed', 'Resolved')), 
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
      ORDER BY c.created_at DESC, c.customer_id
      LIMIT $1 OFFSET $2
    `, [parseInt(limit), parseInt(offset)]);
    
    // Format customers as test cases
    const testCases = customers.rows.map((customer, index) => {
      // Generate test_case_id from UUID (use first 8 chars for shorter ID)
      const shortId = customer.customer_id.substring(0, 8);
      const testCaseId = `db-${shortId}`;
      
      // Map service plan to service type
      let serviceType = 'internet';
      let serviceName = 'Internet';
      const planLower = (customer.service_plan || '').toLowerCase();
      if (planLower.includes('phone') || planLower.includes('voice')) {
        serviceType = 'phone';
        serviceName = 'Home Phone';
      } else if (planLower.includes('tv') || planLower.includes('television')) {
        serviceType = 'tv';
        serviceName = 'TV Service';
      } else if (planLower.includes('mobile') || planLower.includes('wireless')) {
        serviceType = 'mobile';
        serviceName = 'Mobile';
      } else if (planLower.includes('fiber')) {
        serviceType = 'internet';
        serviceName = 'Fiber Internet';
      }
      
      // Clean phone number format
      let phoneNumber = customer.contact_phone || '';
      // Remove common formatting, keep only digits
      phoneNumber = phoneNumber.replace(/[^\d]/g, '');
      // Format as XXX-XXX-XXXX if we have 10 digits
      if (phoneNumber.length === 10) {
        phoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
      } else if (phoneNumber.length === 11 && phoneNumber.startsWith('1')) {
        phoneNumber = `${phoneNumber.substring(1, 4)}-${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`;
      } else if (!phoneNumber) {
        // Generate fallback phone number
        phoneNumber = `555-${String(index + 100).padStart(3, '0')}-${String(index + 2000).padStart(4, '0')}`;
      }
      
      // Use customer_id as account number (it's now a UUID)
      const accountNumber = customer.customer_id;
      
      // Default language (can be enhanced later)
      const languageCode = 'en';
      const language = '🇺🇸 English';
      const languageMethod = 'Said "English"';
      
      // Issue description
      const issue = customer.latest_issue || 'Service interruption';
      
      return {
        testCaseId,
        name: customer.customer_name,
        tn: phoneNumber,
        account: accountNumber,
        language,
        languageCode,
        languageMethod,
        service: serviceType,
        serviceName,
        issue,
        customerId: customer.customer_id,
        location: customer.location || 'Unknown',
        servicePlan: customer.service_plan || 'Unknown',
        email: customer.email,
        industry: customer.industry,
        openTickets: parseInt(customer.open_tickets) || 0,
        // Default messages (can be enhanced with actual conversation history)
        messages: [
          { 
            type: 'ai', 
            text: 'Welcome to Frontier. How may I help you today?', 
            translation: 'Welcome to Frontier. How may I help you today?' 
          },
          { 
            type: 'customer', 
            text: `I'm having issues with my ${serviceName.toLowerCase()} service.`, 
            translation: `I'm having issues with my ${serviceName.toLowerCase()} service.` 
          }
        ]
      };
    });
    
    res.json({
      success: true,
      testCases,
      total: customers.rowCount,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test cases',
      error: error.message
    });
  }
});

// Get a specific test case by customer ID
app.get('/api/test-cases/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const customer = await query(`
      SELECT 
        c.customer_id,
        c.customer_name,
        c.contact_phone,
        c.account_status,
        c.service_plan,
        c.location,
        c.subscription_tier,
        c.email,
        c.industry,
        c.service_address,
        c.provisioned_bandwidth_down_mbps,
        c.provisioned_bandwidth_up_mbps,
        c.router_serial_number,
        c.multi_site,
        c.created_at,
        (SELECT ticket_id FROM support_tickets st 
         WHERE st.customer_id = c.customer_id 
         ORDER BY st.timestamp_created DESC LIMIT 1) as latest_ticket_id,
        (SELECT symptom_description FROM support_tickets st 
         WHERE st.customer_id = c.customer_id 
         ORDER BY st.timestamp_created DESC LIMIT 1) as latest_issue
      FROM customers c
      WHERE c.customer_id = $1
    `, [customerId]);
    
    if (customer.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    
    const c = customer.rows[0];
    const testCaseId = `db-${c.customer_id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    
    // Map service plan to service type
    let serviceType = 'internet';
    let serviceName = 'Internet';
    if (c.service_plan?.toLowerCase().includes('phone')) {
      serviceType = 'phone';
      serviceName = 'Home Phone';
    } else if (c.service_plan?.toLowerCase().includes('tv')) {
      serviceType = 'tv';
      serviceName = 'TV Service';
    }
    
    // Clean phone number format
    let phoneNumber = c.contact_phone || '';
    phoneNumber = phoneNumber.replace(/[^\d]/g, '');
    if (phoneNumber.length === 10) {
      phoneNumber = `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`;
    } else if (phoneNumber.length === 11 && phoneNumber.startsWith('1')) {
      phoneNumber = `${phoneNumber.substring(1, 4)}-${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`;
    } else if (!phoneNumber) {
      phoneNumber = '555-000-0000';
    }
    
    const accountNumber = c.customer_id;
    
    const testCase = {
      testCaseId,
      name: c.customer_name,
      tn: phoneNumber,
      account: accountNumber,
      language: '🇺🇸 English',
      languageCode: 'en',
      languageMethod: 'Said "English"',
      service: serviceType,
      serviceName,
      issue: c.latest_issue || 'Service interruption',
      customerId: c.customer_id,
      location: c.location || 'Unknown',
      servicePlan: c.service_plan || 'Unknown',
      email: c.email,
      industry: c.industry,
      messages: [
        { 
          type: 'ai', 
          text: 'Welcome to Frontier. How may I help you today?', 
          translation: 'Welcome to Frontier. How may I help you today?' 
        },
        { 
          type: 'customer', 
          text: `I'm having issues with my ${serviceName.toLowerCase()} service.`, 
          translation: `I'm having issues with my ${serviceName.toLowerCase()} service.` 
        }
      ]
    };
    
    res.json({
      success: true,
      testCase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test case',
      error: error.message
    });
  }
});

// Get customer service history for trend analysis
app.get('/api/customers/:customerId/history', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const history = await query(`
      SELECT 
        ticket_id,
        severity,
        symptom_description,
        status,
        timestamp_created,
        resolution_notes,
        notified_support,
        linked_metrics_id
      FROM support_tickets
      WHERE customer_id = $1
      ORDER BY timestamp_created DESC
      LIMIT 50
    `, [customerId]);
    
    res.json({
      success: true,
      history: history.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer history',
      error: error.message
    });
  }
});

// Import and setup incident search routes
const { setupIncidentRoutes } = require('./api_endpoints');
setupIncidentRoutes(app);

const PORT = process.env.PORT || 3000;

// Test database connection on startup
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Testing database connection...');
  const connected = await testConnection();
  if (connected) {
    console.log('✅ Database connection test successful');
  } else {
    console.log('❌ Database connection test failed - server will continue but database features may not work');
  }
});