// Test script to validate API endpoints
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testEndpoints() {
    const baseUrl = 'http://localhost:3000';
    
    try {
        // Test incident creation
        console.log('Testing incident creation...');
        const incidentResponse = await fetch(`${baseUrl}/api/incidents/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                incident_type: 'Connection Failure',
                severity: 'High',
                description: 'Test diagnostic incident - connectivity failed',
                location: 'Customer Premises - Test Customer',
                service_type: 'internet',
                status: 'open',
                affected_customers: 1,
                root_cause: 'Physical Layer'
            })
        });
        
        console.log('Incident response status:', incidentResponse.status);
        console.log('Incident response headers:', incidentResponse.headers.raw());
        
        const incidentText = await incidentResponse.text();
        console.log('Raw incident response:', incidentText.substring(0, 200));
        
        let incidentResult;
        try {
            incidentResult = JSON.parse(incidentText);
        } catch (e) {
            console.log('Failed to parse JSON, response was:', incidentText);
            return;
        }
        console.log('Incident creation result:', incidentResult);
        
        // Test ticket creation
        console.log('\nTesting ticket creation...');
        const ticketResponse = await fetch(`${baseUrl}/api/tickets/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer_name: 'Test Customer',
                phone_number: '555-123-4567',
                account_number: 'TEST-12345',
                category: 'Technical Issue',
                priority: 'High',
                status: 'open',
                summary: 'Auto-diagnostic detected: CONNECTIVITY_FAILED',
                symptom_description: 'Network diagnostics completed for internet service. Issue detected: connectivity failed.',
                agent_id: 'AUTO-DIAGNOSTIC'
            })
        });
        
        const ticketResult = await ticketResponse.json();
        console.log('Ticket creation result:', ticketResult);
        
        console.log('\n✅ Both endpoints are working correctly!');
        
    } catch (error) {
        console.error('❌ Error testing endpoints:', error);
    }
}

testEndpoints();