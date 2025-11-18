import React, { useState, useEffect, useRef } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle, Phone, Activity, Zap, Radio, Menu, Search, User } from 'lucide-react';

const FrontierOpsAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate incoming call
    setTimeout(() => {
      simulateIncomingCall();
    }, 1000);
  }, []);

  const simulateIncomingCall = async () => {
    setIsTyping(true);
    
    // Add initial greeting
    await addMessage('assistant', '📞 Incoming call detected from customer...');
    
    setTimeout(async () => {
      // Simulate automatic customer identification
      const mockCustomer = {
        name: '',
        accountNumber: '',
        address: '',
        plan: '',
        phoneNumber: ''
      };
      
      setCustomerData(mockCustomer);
      await addMessage('assistant', `✅ Customer identified: ${mockCustomer.name}\n📋 Account: ${mockCustomer.accountNumber}\n📍 ${mockCustomer.address}\n📦 Plan: ${mockCustomer.plan}`);
      
      // Start automatic diagnostics
      setTimeout(() => {
        runAutomaticDiagnostics();
      }, 1500);
    }, 2000);
  };

  const runAutomaticDiagnostics = async () => {
    setDiagnosticsRunning(true);
    await addMessage('assistant', '🔍 Running automatic network diagnostics...');
    
    // Simulate diagnostic steps
    const diagnosticSteps = [
      { step: 'Checking ONT status', delay: 1000 },
      { step: 'Testing fiber connection', delay: 1200 },
      { step: 'Analyzing signal strength', delay: 1000 },
      { step: 'Reviewing error logs', delay: 1100 },
      { step: 'Checking router configuration', delay: 900 }
    ];

    for (let diagnostic of diagnosticSteps) {
      await new Promise(resolve => setTimeout(resolve, diagnostic.delay));
      await addMessage('system', `⚙️ ${diagnostic.step}...`);
    }

    // Generate diagnostic results
    setTimeout(() => {
      const results = {
        status: 'issue_detected',
        connectionHealth: 45,
        signalStrength: -12,
        packetLoss: 8.5,
        latency: 145,
        issue: 'Intermittent fiber connection',
        rootCause: 'ONT experiencing power fluctuations',
        recommendation: 'ONT power supply replacement recommended'
      };

      setNetworkStatus(results);
      setDiagnosticsRunning(false);
      
      presentDiagnosticResults(results);
    }, 1500);
  };

  const presentDiagnosticResults = async (results) => {
    await addMessage('assistant', 
      `📊 **Diagnostic Results Complete**\n\n` +
      `⚠️ **Issue Detected:** ${results.issue}\n` +
      `🔍 **Root Cause:** ${results.rootCause}\n\n` +
      `**Connection Metrics:**\n` +
      `• Health Score: ${results.connectionHealth}%\n` +
      `• Signal Strength: ${results.signalStrength} dBm\n` +
      `• Packet Loss: ${results.packetLoss}%\n` +
      `• Latency: ${results.latency}ms\n\n` +
      `✨ **Recommended Solution:** ${results.recommendation}\n\n` +
      `🎯 **Auto-Correct Available:** I can schedule a technician visit and expedite ONT replacement. Would you like me to proceed?`
    );

    setTimeout(() => {
      addMessage('assistant', 
        `💡 **Agent Insights Panel Updated:**\n` +
        `• Customer likely experiencing dropped Zoom calls\n` +
        `• Issue occurring intermittently for 3-4 days\n` +
        `• High priority due to work-from-home impact\n` +
        `• Suggest: Next-day technician appointment + temporary mobile hotspot if available`
      );
    }, 2000);
  };

  const addMessage = (type, content) => {
    return new Promise((resolve) => {
      setMessages(prev => [...prev, { type, content, timestamp: new Date() }]);
      setIsTyping(false);
      resolve();
    });
  };

  const getStatusColor = () => {
    if (!networkStatus) return 'text-gray-400';
    if (networkStatus.connectionHealth > 70) return 'text-green-500';
    if (networkStatus.connectionHealth > 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (!networkStatus) return <Radio className="w-5 h-5" />;
    if (networkStatus.connectionHealth > 70) return <Wifi className="w-5 h-5" />;
    if (networkStatus.connectionHealth > 40) return <AlertTriangle className="w-5 h-5" />;
    return <WifiOff className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Frontier Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <svg className="h-8 w-32" viewBox="0 0 200 40" fill="none">
                  <text x="0" y="28" className="text-2xl font-bold" fill="#CC0000">Frontier</text>
                </svg>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Shop</a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Plans</a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Why Frontier</a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Support</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-red-600">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-red-600 font-medium">Sign In</button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium">
                Buy
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Agent Dashboard Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Customer Operations Assistant</h1>
              <p className="text-red-100 mt-1">AI-Powered Support Dashboard</p>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">LIVE SESSION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-600" />
                Customer Information
              </h2>
            </div>
            <div className="p-6">
              {customerData ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 font-medium">Name</label>
                    <p className="text-gray-900 font-semibold mt-1">{customerData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">Account Number</label>
                    <p className="text-gray-900 font-mono mt-1">{customerData.accountNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">Service Address</label>
                    <p className="text-gray-900 mt-1">{customerData.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">Current Plan</label>
                    <p className="text-gray-900 font-semibold mt-1">{customerData.plan}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">Contact</label>
                    <p className="text-gray-900 mt-1">{customerData.phoneNumber}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Phone className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Waiting for customer data...</p>
                </div>
              )}
            </div>
          </div>

          {/* Network Status Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                {getStatusIcon()}
                <span className="ml-2">Network Diagnostics</span>
              </h2>
            </div>
            <div className="p-6">
              {networkStatus ? (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 font-medium">Connection Health</span>
                      <span className={`font-bold text-lg ${getStatusColor()}`}>
                        {networkStatus.connectionHealth}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          networkStatus.connectionHealth > 70 ? 'bg-green-500' :
                          networkStatus.connectionHealth > 40 ? 'bg-yellow-500' : 'bg-red-600'
                        }`}
                        style={{ width: `${networkStatus.connectionHealth}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 font-medium">Signal Strength</p>
                      <p className="text-gray-900 font-bold mt-1">{networkStatus.signalStrength} dBm</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 font-medium">Packet Loss</p>
                      <p className="text-gray-900 font-bold mt-1">{networkStatus.packetLoss}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 font-medium">Latency</p>
                      <p className="text-gray-900 font-bold mt-1">{networkStatus.latency}ms</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 font-medium">Status</p>
                      <p className="text-red-600 font-bold mt-1">Issue</p>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-semibold text-sm mb-1">⚠️ {networkStatus.issue}</p>
                    <p className="text-red-700 text-xs">{networkStatus.rootCause}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  {diagnosticsRunning ? (
                    <div className="space-y-4">
                      <Activity className="w-12 h-12 mx-auto animate-spin text-red-600" />
                      <p className="text-gray-600 font-medium">Running diagnostics...</p>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <Wifi className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Awaiting diagnostic scan...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-red-600" />
                Quick Actions
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-semibold transition-colors shadow-sm">
                Schedule Technician
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 py-3 px-4 rounded-md font-semibold transition-colors">
                Ship Replacement ONT
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 py-3 px-4 rounded-md font-semibold transition-colors">
                Reset Remote Equipment
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 py-3 px-4 rounded-md font-semibold transition-colors">
                Apply Service Credit
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 py-3 px-4 rounded-md font-semibold transition-colors">
                Escalate to Supervisor
              </button>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mt-6 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">AI Assistant Activity Log</h2>
          </div>
          
          <div className="p-6 h-96 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-lg p-4 shadow-sm ${
                  msg.type === 'assistant' ? 'bg-white border-l-4 border-red-600' :
                  msg.type === 'system' ? 'bg-blue-50 border-l-4 border-blue-400' :
                  'bg-red-600 text-white'
                }`}>
                  <p className={`whitespace-pre-line text-sm leading-relaxed ${
                    msg.type === 'user' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {msg.content}
                  </p>
                  <span className={`text-xs mt-2 block ${
                    msg.type === 'user' ? 'text-red-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-l-4 border-red-600 rounded-lg p-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">© 2025 Frontier Communications. AI-Powered Operations Dashboard.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontierOpsAssistant;