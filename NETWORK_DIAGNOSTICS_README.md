# Network Diagnostics System

This system simulates realistic network diagnostic scenarios with connectivity failures and auto-correction attempts for the Frontier Agent Dashboard.

## Files Created

1. **networkDiagnostics.js** - Core diagnostic simulation engine
2. **diagnostics_demo.html** - Standalone demo page
3. **agentConsole.html** - Modified to integrate diagnostics (script reference added)

## How It Works

### When "Load Test Case" Button is Clicked:

1. **Test Case Loading**: The selected test case is loaded normally
2. **Automatic Diagnostics**: After 2 seconds, network diagnostics automatically run
3. **Simulation Process**: 
   - 6 diagnostic steps are simulated (each taking 1.5-2.5 seconds)
   - Progress is shown in real-time
   - Final results are generated with connectivity failure

### Generated Data Includes:

#### Test Results (Always Failure Scenario)
- **Ping Test**: FAILED with 50-100% packet loss
- **Signal Quality**: DEGRADED with poor signal strength (10-40%)
- **Equipment Status**: OFFLINE with "NOT_RESPONDING" modem

#### Root Cause Analysis
- **Random Categories**: Physical Layer, Network Infrastructure, Equipment/Hardware, Environmental
- **Realistic Causes**: Over 20 different realistic failure scenarios
- **Technical Codes**: NET-001, SIG-203, HW-156, etc.
- **Confidence Level**: 70-100% confidence rating

#### Auto-Correct Attempts (Always Fail)
- **5 Different Auto-Correct Types**:
  1. Remote Signal Reset (65% normal success rate)
  2. Modem Reboot Sequence (45% normal success rate) 
  3. Line Provisioning Update (30% normal success rate)
  4. DNS Cache Flush (25% normal success rate)
  5. Network Path Optimization (40% normal success rate)
- **All attempts fail** due to connectivity issues
- **Realistic failure reasons** provided

#### Recommended Actions
- **Category-specific recommendations** based on root cause
- **Prioritized action list** for manual intervention
- **Technical and customer-facing actions**

## UI Integration

### Status Updates
- **Main Status**: Changes to "🔴 CONNECTIVITY FAILED"
- **Sub Status**: Shows root cause description
- **Visual Indicators**: Red color coding for failed status

### Communication Log
- **Diagnostic Results Entry**: Clickable entry showing failure status
- **Auto-Correct Entry**: Shows failed auto-correction attempt
- **Recommended Actions Entry**: Shows next steps required

### Detailed Modals
- **Diagnostic Report Modal**: Complete technical details
- **Recommended Actions Modal**: Prioritized action list
- **Test Results**: Formatted technical data

### Next Steps Update
- **Step 1**: Review diagnostic results and root cause
- **Step 2**: First recommended action from analysis
- **Step 3**: Schedule follow-up diagnostic
- **Step 4**: Document resolution

## Testing

### Run Standalone Demo
1. Open `diagnostics_demo.html` in a web browser
2. Click "Run Network Diagnostics" button
3. Watch the diagnostic process simulate
4. Review the detailed failure results

### Test in Agent Console
1. Open `agentConsole.html` in a web browser  
2. Select any test case from dropdown
3. Click "Load Test Case" button
4. Wait 2 seconds for auto-diagnostics to start
5. Watch status updates and communication log entries
6. Click diagnostic entries to view detailed modals

## Customization

### Adding New Root Causes
Edit the `rootCauses` array in `networkDiagnostics.js`:
```javascript
{
    category: "New Category",
    causes: [
        "New specific failure reason",
        "Another failure scenario"
    ]
}
```

### Adding New Auto-Correct Steps  
Edit the `autoCorrectSteps` array:
```javascript
{
    step: "New Auto-Correct Action",
    description: "Description of what it does", 
    duration: "Time estimate",
    successRate: 50 // Normal success rate percentage
}
```

### Modifying Diagnostic Steps
Edit the `diagnosticSteps` array to change the simulation process steps.

## Technical Details

- **Simulation Time**: ~9-15 seconds total (6 steps × 1.5-2.5s each)
- **Data Generation**: Randomized realistic values within defined ranges
- **Modal Integration**: Uses existing transcript modal system
- **Error Handling**: Graceful fallbacks if integration fails
- **Memory Efficient**: No persistent storage, generates fresh data each time

## Integration Points

The system integrates with the existing Agent Console through:
- **loadTestCase()** function modification
- **Existing modal system** reuse  
- **Status display elements** update
- **Communication log** entries
- **Next steps** section updates

This provides a realistic network diagnostic experience that always results in connectivity failures requiring manual intervention, simulating real-world scenarios where automated fixes cannot resolve the underlying issues.