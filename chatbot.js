// Get React hooks from global React object
const { useState, useEffect, useRef } = React;

// Get Lucide icons from global lucide object
const { Send, Wifi, Activity, AlertCircle, CheckCircle, Loader, Signal, TrendingUp, Clock } = lucide;

const FrontierSupportChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!showAuth && messages.length === 0) {
      addMessage('assistant', 
        `Welcome back, ${customerInfo.name}! I'm your Frontier Communications AI Assistant. I've already run diagnostics on your network and I'm here to help with any connectivity issues. What can I help you with today?`,
        generateInitialDiagnostics()
      );
    }
  }, [showAuth]);

  const generateInitialDiagnostics = () => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      tests: [
        { name: 'Connection Status', value: 'Online', status: 'success', icon: 'wifi' },
        { name: 'Signal Strength', value: '-45 dBm', status: 'success', icon: 'signal' },
        { name: 'Latency', value: '12 ms', status: 'success', icon: 'activity' },
        { name: 'Packet Loss', value: '0.1%', status: 'success', icon: 'trending' },
        { name: 'Bandwidth Utilization', value: '34%', status: 'success', icon: 'trending' }
      ],
      insights: [
        'Your connection is performing optimally',
        'No active incidents in your area',
        'All network devices responding normally'
      ]
    };
  };

  const handleAuth = () => {
    if (!authEmail || !authPhone) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setCustomerInfo({
        customerId: 'CUST-12345',
        name: '',
        email: authEmail,
        phone: authPhone,
        accountStatus: 'Active',
        servicePlan: 'Frontier Fiber 1 Gig',
        provisionedBandwidthDown: 1000,
        provisionedBandwidthUp: 1000,
        location: 'Dallas, TX',
        routerSerial: 'RTR-9876543'
      });
      setShowAuth(false);
      setIsLoading(false);
    }, 1500);
  };

  const addMessage = (type, content, diagnostics = null, autoCorrect = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date(),
      diagnostics,
      autoCorrect
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    addMessage('user', userMessage);
    setIsLoading(true);

    setTimeout(() => {
      const response = generateAIResponse(userMessage);
      addMessage('assistant', response.content, response.diagnostics, response.autoCorrect);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('slow') || lowerMessage.includes('speed')) {
      return {
        content: "I've detected that your current bandwidth utilization is at 87%, which may be causing slowdowns. I can see you have 3 devices streaming video simultaneously. Let me run a speed test and check for any network congestion issues.",
        diagnostics: {
          status: 'warning',
          timestamp: new Date().toISOString(),
          tests: [
            { name: 'Connection Status', value: 'Online', status: 'success', icon: 'wifi' },
            { name: 'Download Speed', value: '847 Mbps', status: 'warning', icon: 'trending' },
            { name: 'Upload Speed', value: '923 Mbps', status: 'success', icon: 'trending' },
            { name: 'Latency', value: '28 ms', status: 'warning', icon: 'activity' },
            { name: 'Packet Loss', value: '2.3%', status: 'warning', icon: 'alert' },
            { name: 'Connected Devices', value: '12 devices', status: 'warning', icon: 'wifi' }
          ],
          insights: [
            'High bandwidth utilization detected (87%)',
            '3 devices currently streaming 4K video',
            'Router firmware is up to date',
            'No incidents reported in your area'
          ]
        },
        autoCorrect: {
          available: true,
          actions: [
            'Optimize QoS settings for better performance',
            'Restart router to clear connection cache',
            'Enable bandwidth prioritization for work devices'
          ]
        }
      };
    }
    
    if (lowerMessage.includes('outage') || lowerMessage.includes('down') || lowerMessage.includes('offline')) {
      return {
        content: "I'm checking for any outages or incidents in your area. Good news - there are no active outages reported for Dallas, TX. Your router is online and responding normally. Let me verify your connection health.",
        diagnostics: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          tests: [
            { name: 'Connection Status', value: 'Online', status: 'success', icon: 'wifi' },
            { name: 'Router Status', value: 'Responding', status: 'success', icon: 'signal' },
            { name: 'Gateway Connection', value: 'Active', status: 'success', icon: 'activity' },
            { name: 'DNS Resolution', value: '8 ms', status: 'success', icon: 'trending' }
          ],
          insights: [
            'No active incidents in Dallas, TX',
            'All network infrastructure operational',
            'Your connection has 99.9% uptime this month'
          ]
        }
      };
    }

    if (lowerMessage.includes('ticket') || lowerMessage.includes('support')) {
      return {
        content: "I can create a support ticket for you. Based on our conversation, I'll include all the diagnostic data I've collected. Your ticket will be prioritized based on the severity of the issue. Would you like me to proceed with creating the ticket?",
        diagnostics: null
      };
    }

    return {
      content: "I'm here to help diagnose and resolve your connectivity issues. I can check your connection status, run network tests, identify issues, and even apply auto-corrections when possible. Could you describe the specific issue you're experiencing?",
      diagnostics: null
    };
  };

  const DiagnosticIcon = ({ iconName }) => {
    const icons = {
      wifi: Wifi,
      signal: Signal,
      activity: Activity,
      trending: TrendingUp,
      alert: AlertCircle
    };
    const Icon = icons[iconName] || Activity;
    return <Icon className="w-4 h-4" />;
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-600">
            <div className="text-center mb-8">
              <div className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg mb-4">
                <h1 className="text-2xl font-bold">FRONTIER</h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Support Assistant</h2>
              <p className="text-gray-600">Proactive network diagnostics & instant support</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                onClick={handleAuth}
                disabled={isLoading || !authEmail || !authPhone}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Access Support Assistant'
                )}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Instant Network Diagnostics</p>
                  <p>Get real-time insights before you even describe the issue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      <div className="bg-white border-b-4 border-red-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
                <h1 className="text-xl font-bold">FRONTIER</h1>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">AI Support Assistant</h2>
                <p className="text-sm text-gray-600">Powered by Claude AI</p>
              </div>
            </div>
            
            {customerInfo && (
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{customerInfo.name}</p>
                <p className="text-xs text-gray-600">{customerInfo.servicePlan}</p>
                <div className="flex items-center gap-2 justify-end mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-semibold">Connected</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {customerInfo && (
        <div className="bg-red-50 border-b border-red-100">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">
                  <span className="font-semibold">Plan:</span> {customerInfo.servicePlan}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">
                  <span className="font-semibold">Speed:</span> {customerInfo.provisionedBandwidthDown}/{customerInfo.provisionedBandwidthUp} Mbps
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">
                  <span className="font-semibold">Location:</span> {customerInfo.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.type === 'user' ? 'w-auto' : 'w-full'}`}>
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user' 
                    ? 'bg-red-600 text-white ml-auto max-w-xl' 
                    : 'bg-white border-2 border-gray-200 shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {message.diagnostics && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-gray-800">Live Network Diagnostics</h3>
                        <span className="ml-auto text-xs text-gray-500">
                          {new Date(message.diagnostics.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {message.diagnostics.tests.map((test, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                              <DiagnosticIcon iconName={test.icon} />
                              <span className="text-xs font-semibold text-gray-600">{test.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-gray-800">{test.value}</span>
                              {test.status === 'success' && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {test.status === 'warning' && (
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {message.diagnostics.insights && message.diagnostics.insights.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <h4 className="text-xs font-bold text-blue-900 mb-2">AI Insights</h4>
                          <ul className="space-y-1">
                            {message.diagnostics.insights.map((insight, idx) => (
                              <li key={idx} className="text-xs text-blue-800 flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {message.autoCorrect && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Auto-Correct Available
                        </h4>
                        <p className="text-xs text-green-800 mb-3">I can automatically apply these fixes:</p>
                        <div className="space-y-2">
                          {message.autoCorrect.actions.map((action, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left bg-white border border-green-300 rounded-lg p-2 text-xs text-green-900 hover:bg-green-100 transition"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <Clock className="w-3 h-3" />
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Loader className="w-5 h-5 text-red-600 animate-spin" />
                  <span className="text-sm text-gray-600">Running diagnostics and analyzing your network...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t-2 border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Describe your connectivity issue..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI assistant provides instant diagnostics and proactive support
          </p>
        </div>
      </div>
    </div>
  );
};

// Render the component
ReactDOM.render(<FrontierSupportChat />, document.getElementById('root'));