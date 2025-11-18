// API Endpoints for Service History Analysis
// Handles searches for network incidents and support tickets

const { query } = require('./db');

// Search for network incidents
async function searchNetworkIncidents(customer, phone, account) {
    try {
        // Search query with multiple criteria for PostgreSQL
        const searchQuery = `
            SELECT 
                incident_id,
                incident_type,
                severity,
                description,
                location,
                service_type,
                status,
                created_at,
                resolved_at,
                affected_customers,
                root_cause
            FROM team_scrappy_minds.network_incidents 
            WHERE 
                (affected_customers ILIKE $1 OR 
                 location ILIKE $2 OR 
                 description ILIKE $3 OR
                 incident_type IN (
                     SELECT DISTINCT category 
                     FROM team_scrappy_minds.support_tickets 
                     WHERE customer_name ILIKE $4 OR phone_number ILIKE $5
                 ))
            ORDER BY created_at DESC
            LIMIT 20
        `;
        
        const searchTerms = [
            `%${customer}%`,
            `%${phone.replace(/\D/g, '').slice(-7)}%`, // Last 7 digits
            `%${account}%`,
            `%${customer}%`,
            `%${phone}%`
        ];
        
        const result = await query(searchQuery, searchTerms);
        
        console.log(`Found ${result.rows.length} network incidents`);
        return {
            success: true,
            incidents: result.rows
        };
        
    } catch (error) {
        console.error('Error searching network incidents:', error.message);
        throw error;
    }
}

// Search for support tickets
async function searchSupportTickets(customer, phone, account) {
    try {
        // Search query for support tickets in PostgreSQL
        const searchQuery = `
            SELECT 
                ticket_id,
                customer_name,
                phone_number,
                account_number,
                category,
                priority,
                status,
                summary,
                symptom_description,
                resolution,
                agent_id,
                timestamp_created,
                timestamp_resolved
            FROM team_scrappy_minds.support_tickets 
            WHERE 
                customer_name ILIKE $1 OR 
                phone_number ILIKE $2 OR 
                account_number ILIKE $3 OR
                symptom_description ILIKE $4
            ORDER BY timestamp_created DESC
            LIMIT 20
        `;
        
        const searchTerms = [
            `%${customer}%`,
            `%${phone}%`,
            `%${account}%`,
            `%${customer}%`
        ];
        
        const result = await query(searchQuery, searchTerms);
        
        console.log(`Found ${result.rows.length} support tickets`);
        return {
            success: true,
            tickets: result.rows
        };
        
    } catch (error) {
        console.error('Error searching support tickets:', error.message);
        throw error;
    }
}

// Express.js route handlers
function setupIncidentRoutes(app) {
    // Search network incidents endpoint
    app.get('/api/incidents/search', async (req, res) => {
        try {
            const { customer, phone, account } = req.query;
            
            if (!customer && !phone && !account) {
                return res.status(400).json({
                    success: false,
                    error: 'At least one search parameter (customer, phone, or account) is required'
                });
            }
            
            const result = await searchNetworkIncidents(
                customer || '', 
                phone || '', 
                account || ''
            );
            
            res.json(result);
            
        } catch (error) {
            console.error('Error in incidents search endpoint:', error);
            res.status(500).json({
                success: false,
                error: 'Database error occurred while searching incidents',
                message: error.message
            });
        }
    });
    
    // Search support tickets endpoint  
    app.get('/api/tickets/search', async (req, res) => {
        try {
            const { customer, phone, account } = req.query;
            
            if (!customer && !phone && !account) {
                return res.status(400).json({
                    success: false,
                    error: 'At least one search parameter (customer, phone, or account) is required'
                });
            }
            
            const result = await searchSupportTickets(
                customer || '',
                phone || '', 
                account || ''
            );
            
            res.json(result);
            
        } catch (error) {
            console.error('Error in tickets search endpoint:', error);
            res.status(500).json({
                success: false,
                error: 'Database error occurred while searching tickets',
                message: error.message
            });
        }
    });
    
    // Combined search endpoint (both incidents and tickets)
    app.get('/api/history/search', async (req, res) => {
        try {
            const { customer, phone, account } = req.query;
            
            if (!customer && !phone && !account) {
                return res.status(400).json({
                    success: false,
                    error: 'At least one search parameter is required'
                });
            }
            
            // Search both incidents and tickets in parallel
            const [incidentsResult, ticketsResult] = await Promise.all([
                searchNetworkIncidents(customer || '', phone || '', account || ''),
                searchSupportTickets(customer || '', phone || '', account || '')
            ]);
            
            res.json({
                success: true,
                incidents: incidentsResult.incidents,
                tickets: ticketsResult.tickets,
                total_results: incidentsResult.incidents.length + ticketsResult.tickets.length,
                search_criteria: {
                    customer: customer || null,
                    phone: phone || null,
                    account: account || null
                }
            });
            
        } catch (error) {
            console.error('Error in combined history search:', error);
            res.status(500).json({
                success: false,
                error: 'Database error occurred while searching history',
                message: error.message
            });
        }
    });
}

// Export functions for use in server
module.exports = {
    setupIncidentRoutes,
    searchNetworkIncidents,
    searchSupportTickets
};