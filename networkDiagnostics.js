// Network Diagnostics Simulator
// Generates realistic network diagnostic data with connectivity failures

class NetworkDiagnosticSimulator {
    constructor() {
        this.failureTypes = [
            "CONNECTIVITY_FAILED",
            "SLOW_PERFORMANCE",
            "INTERMITTENT_CONNECTION",
            "SERVICE_DEGRADED",
            "AUTHENTICATION_FAILED",
            "DNS_RESOLUTION_FAILED",
            "HARDWARE_MALFUNCTION",
            "SIGNAL_QUALITY_POOR"
        ];

        this.rootCauses = [
            {
                category: "Physical Layer",
                causes: [
                    "Loose or damaged coaxial cable connection at premises",
                    "Water ingress in underground cable conduit causing signal attenuation",
                    "Corroded connector at distribution panel reducing signal integrity",
                    "Damaged fiber optic cable due to construction activity",
                    "Failed network interface device (NID) at customer location",
                    "Bent or kinked cable causing impedance mismatch",
                    "Deteriorated splitter causing signal loss to multiple outlets",
                    "Ground loop interference affecting cable shield effectiveness",
                    "Aging coaxial cable with degraded dielectric properties",
                    "Improper cable termination causing signal reflections"
                ]
            },
            {
                category: "Network Infrastructure",
                causes: [
                    "Overloaded neighborhood node exceeding 85% capacity threshold",
                    "Faulty amplifier in distribution network causing signal distortion",
                    "Switch port failure at central office dropping packets",
                    "Router configuration error blocking customer traffic flows",
                    "DNS server outage affecting name resolution services",
                    "Backbone congestion during peak usage hours",
                    "Load balancer malfunction causing uneven traffic distribution",
                    "BGP routing table corruption causing path selection issues",
                    "DHCP server exhausted IP address pool preventing new connections",
                    "Network security appliance blocking legitimate traffic"
                ]
            },
            {
                category: "Equipment/Hardware",
                causes: [
                    "Customer modem firmware corruption requiring factory reset",
                    "Defective ethernet port on customer gateway device",
                    "Power supply failure in customer premises equipment",
                    "Overheating router due to blocked ventilation causing thermal shutdown",
                    "Incompatible or outdated network adapter drivers",
                    "Wi-Fi radio failure in wireless gateway preventing wireless connectivity",
                    "Memory leak in router firmware causing progressive performance degradation",
                    "Faulty network switch causing intermittent port failures",
                    "Cable modem boot loop preventing proper initialization",
                    "Defective splitter causing signal distribution problems"
                ]
            },
            {
                category: "Environmental",
                causes: [
                    "Signal interference from nearby radio frequency source",
                    "Temperature-related equipment malfunction in outdoor enclosure",
                    "Power outage affecting critical network infrastructure",
                    "Severe weather causing signal degradation and equipment damage",
                    "Construction activity severing underground cable infrastructure",
                    "Lightning strike damaging aerial plant equipment",
                    "Ice loading on overhead cables causing mechanical stress",
                    "Flooding in underground vault affecting equipment operation",
                    "High winds causing aerial cable movement and micro-bends",
                    "Electromagnetic interference from industrial equipment"
                ]
            },
            {
                category: "Configuration/Software",
                causes: [
                    "Incorrect QoS settings limiting bandwidth allocation",
                    "Firewall rules blocking essential service ports",
                    "VPN tunnel configuration preventing internet access",
                    "Proxy server misconfiguration causing connection timeouts",
                    "Wi-Fi channel interference from neighboring networks",
                    "Incorrect DNS configuration preventing website access",
                    "Network adapter power management causing disconnections",
                    "Antivirus software blocking network communications",
                    "Windows network profile set to 'Public' limiting functionality",
                    "Router firmware bug causing periodic reboots"
                ]
            },
            {
                category: "Service/Account",
                causes: [
                    "Service suspension due to billing issues",
                    "Account provisioning error preventing service activation",
                    "Bandwidth throttling due to data cap exceedance",
                    "Service plan mismatch causing feature limitations",
                    "Authentication server failure preventing login",
                    "Account security hold due to suspicious activity",
                    "Service maintenance window affecting connectivity",
                    "Rate limiting triggered by excessive usage patterns",
                    "Contract expiration causing automatic service deactivation",
                    "Geographic service restriction preventing access"
                ]
            }
        ];

        this.autoCorrectSteps = [
            {
                step: "Remote Signal Reset",
                description: "Sending refresh signal to customer premises equipment",
                duration: "30 seconds",
                successRate: 65,
                applicableFailures: ["CONNECTIVITY_FAILED", "SIGNAL_QUALITY_POOR", "HARDWARE_MALFUNCTION"]
            },
            {
                step: "Modem Reboot Sequence",
                description: "Initiating controlled restart of network gateway",
                duration: "2 minutes",
                successRate: 45,
                applicableFailures: ["CONNECTIVITY_FAILED", "INTERMITTENT_CONNECTION", "HARDWARE_MALFUNCTION"]
            },
            {
                step: "Line Provisioning Refresh",
                description: "Refreshing service configuration on network backend systems",
                duration: "1 minute",
                successRate: 30,
                applicableFailures: ["AUTHENTICATION_FAILED", "SERVICE_DEGRADED", "CONNECTIVITY_FAILED"]
            },
            {
                step: "DNS Cache Flush",
                description: "Clearing domain name resolution cache on equipment",
                duration: "15 seconds",
                successRate: 25,
                applicableFailures: ["DNS_RESOLUTION_FAILED", "SLOW_PERFORMANCE"]
            },
            {
                step: "Network Path Optimization",
                description: "Rerouting traffic through alternative network paths",
                duration: "45 seconds",
                successRate: 40,
                applicableFailures: ["SLOW_PERFORMANCE", "INTERMITTENT_CONNECTION", "SERVICE_DEGRADED"]
            },
            {
                step: "Bandwidth Allocation Reset",
                description: "Resetting QoS and bandwidth allocation parameters",
                duration: "20 seconds",
                successRate: 55,
                applicableFailures: ["SLOW_PERFORMANCE", "SERVICE_DEGRADED"]
            },
            {
                step: "Wi-Fi Channel Optimization",
                description: "Automatically selecting optimal Wi-Fi channel",
                duration: "1 minute",
                successRate: 70,
                applicableFailures: ["SLOW_PERFORMANCE", "INTERMITTENT_CONNECTION", "SIGNAL_QUALITY_POOR"]
            },
            {
                step: "Firmware Update Push",
                description: "Pushing latest firmware to customer equipment",
                duration: "5 minutes",
                successRate: 35,
                applicableFailures: ["HARDWARE_MALFUNCTION", "INTERMITTENT_CONNECTION"]
            },
            {
                step: "Authentication Token Refresh",
                description: "Regenerating authentication tokens and certificates",
                duration: "30 seconds",
                successRate: 80,
                applicableFailures: ["AUTHENTICATION_FAILED"]
            },
            {
                step: "Signal Amplification Adjustment",
                description: "Remotely adjusting signal levels and amplification",
                duration: "1 minute",
                successRate: 50,
                applicableFailures: ["SIGNAL_QUALITY_POOR", "CONNECTIVITY_FAILED"]
            }
        ];

        this.diagnosticSteps = [
            "Initiating connectivity test to customer premises...",
            "Checking signal strength and quality metrics...",
            "Testing network path routing and latency...",
            "Validating equipment status and configuration...",
            "Analyzing traffic patterns and error rates...",
            "Running comprehensive network diagnostics..."
        ];
    }

    generateDiagnosticData() {
        const failureType = this.failureTypes[Math.floor(Math.random() * this.failureTypes.length)];
        const rootCauseCategory = this.rootCauses[Math.floor(Math.random() * this.rootCauses.length)];
        const rootCause = rootCauseCategory.causes[Math.floor(Math.random() * rootCauseCategory.causes.length)];
        
        // Select appropriate auto-correct step based on failure type
        const applicableSteps = this.autoCorrectSteps.filter(step => 
            step.applicableFailures.includes(failureType)
        );
        const autoCorrectStep = applicableSteps.length > 0 
            ? applicableSteps[Math.floor(Math.random() * applicableSteps.length)]
            : this.autoCorrectSteps[Math.floor(Math.random() * this.autoCorrectSteps.length)];
        
        const testResults = this.generateTestResults(failureType);
        const autoCorrectAttempt = this.generateAutoCorrectAttempt(autoCorrectStep, failureType);
        
        const diagnosticData = {
            timestamp: new Date().toISOString(),
            status: failureType,
            testResults: testResults,
            rootCause: {
                category: rootCauseCategory.category,
                description: rootCause,
                confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
                technicalCode: this.generateTechnicalCode(rootCauseCategory.category)
            },
            autoCorrectAttempt: autoCorrectAttempt,
            recommendedActions: this.generateRecommendedActions(rootCauseCategory.category, failureType),
            diagnosticId: this.generateDiagnosticId(),
            severityLevel: this.determineSeverityLevel(failureType),
            estimatedResolutionTime: this.estimateResolutionTime(rootCauseCategory.category, failureType)
        };

        return diagnosticData;
    }

    generateTestResults(failureType) {
        switch (failureType) {
            case "CONNECTIVITY_FAILED":
                return {
                    pingTest: {
                        status: "FAILED",
                        packetLoss: Math.floor(Math.random() * 50) + 50, // 50-100% loss
                        avgLatency: null,
                        details: "Unable to establish connection to customer gateway"
                    },
                    signalQuality: {
                        status: "DEGRADED",
                        signalStrength: Math.floor(Math.random() * 30) + 10, // 10-40% (poor)
                        snrRatio: Math.floor(Math.random() * 15) + 5, // 5-20 dB (poor)
                        details: "Signal quality below acceptable thresholds"
                    },
                    equipmentStatus: {
                        status: "OFFLINE",
                        modemStatus: "NOT_RESPONDING",
                        lastSeen: this.generateRandomPastTime(),
                        details: "Customer premises equipment not accessible"
                    },
                    speedTest: {
                        status: "FAILED",
                        downloadSpeed: 0,
                        uploadSpeed: 0,
                        details: "Speed test could not be completed due to connectivity failure"
                    }
                };
            
            case "SLOW_PERFORMANCE":
                return {
                    pingTest: {
                        status: "DEGRADED",
                        packetLoss: Math.floor(Math.random() * 15) + 5, // 5-20% loss
                        avgLatency: Math.floor(Math.random() * 300) + 200, // 200-500ms
                        details: "High latency and packet loss detected"
                    },
                    signalQuality: {
                        status: "MARGINAL",
                        signalStrength: Math.floor(Math.random() * 25) + 40, // 40-65% (marginal)
                        snrRatio: Math.floor(Math.random() * 10) + 20, // 20-30 dB (marginal)
                        details: "Signal quality affecting performance"
                    },
                    equipmentStatus: {
                        status: "ONLINE",
                        modemStatus: "RESPONDING_SLOWLY",
                        lastSeen: new Date().toISOString(),
                        details: "Equipment responsive but performance degraded"
                    },
                    speedTest: {
                        status: "FAILED",
                        downloadSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 Mbps (much slower than expected)
                        uploadSpeed: Math.floor(Math.random() * 5) + 1, // 1-6 Mbps
                        details: "Speeds significantly below provisioned levels"
                    }
                };
            
            case "INTERMITTENT_CONNECTION":
                return {
                    pingTest: {
                        status: "INTERMITTENT",
                        packetLoss: Math.floor(Math.random() * 30) + 20, // 20-50% loss
                        avgLatency: Math.floor(Math.random() * 200) + 50, // 50-250ms
                        details: "Connection dropping periodically"
                    },
                    signalQuality: {
                        status: "FLUCTUATING",
                        signalStrength: Math.floor(Math.random() * 40) + 30, // 30-70% (variable)
                        snrRatio: Math.floor(Math.random() * 15) + 15, // 15-30 dB (variable)
                        details: "Signal levels unstable and fluctuating"
                    },
                    equipmentStatus: {
                        status: "UNSTABLE",
                        modemStatus: "INTERMITTENT_RESPONSE",
                        lastSeen: this.generateRecentTime(),
                        details: "Equipment connecting and disconnecting repeatedly"
                    },
                    speedTest: {
                        status: "INCONSISTENT",
                        downloadSpeed: Math.floor(Math.random() * 50) + 10, // 10-60 Mbps (variable)
                        uploadSpeed: Math.floor(Math.random() * 10) + 2, // 2-12 Mbps
                        details: "Speed results varying significantly between tests"
                    }
                };
            
            case "AUTHENTICATION_FAILED":
                return {
                    pingTest: {
                        status: "LIMITED",
                        packetLoss: Math.floor(Math.random() * 10), // 0-10% loss
                        avgLatency: Math.floor(Math.random() * 50) + 20, // 20-70ms
                        details: "Basic connectivity present but authentication blocking service"
                    },
                    signalQuality: {
                        status: "GOOD",
                        signalStrength: Math.floor(Math.random() * 20) + 70, // 70-90% (good)
                        snrRatio: Math.floor(Math.random() * 10) + 30, // 30-40 dB (good)
                        details: "Signal quality acceptable"
                    },
                    equipmentStatus: {
                        status: "AUTH_FAILED",
                        modemStatus: "AUTHENTICATION_ERROR",
                        lastSeen: new Date().toISOString(),
                        details: "Equipment unable to authenticate with service provider"
                    },
                    speedTest: {
                        status: "BLOCKED",
                        downloadSpeed: 0,
                        uploadSpeed: 0,
                        details: "Speed test blocked due to authentication failure"
                    }
                };
            
            case "DNS_RESOLUTION_FAILED":
                return {
                    pingTest: {
                        status: "PARTIAL",
                        packetLoss: Math.floor(Math.random() * 5), // 0-5% loss
                        avgLatency: Math.floor(Math.random() * 30) + 15, // 15-45ms
                        details: "IP connectivity good but DNS resolution failing"
                    },
                    signalQuality: {
                        status: "GOOD",
                        signalStrength: Math.floor(Math.random() * 20) + 75, // 75-95% (good)
                        snrRatio: Math.floor(Math.random() * 10) + 35, // 35-45 dB (good)
                        details: "Signal quality within normal parameters"
                    },
                    equipmentStatus: {
                        status: "ONLINE",
                        modemStatus: "RESPONDING",
                        lastSeen: new Date().toISOString(),
                        details: "Equipment functioning but DNS services unavailable"
                    },
                    speedTest: {
                        status: "FAILED",
                        downloadSpeed: null,
                        uploadSpeed: null,
                        details: "Cannot perform speed test - DNS resolution required"
                    }
                };
            
            default:
                return this.generateDefaultTestResults(failureType);
        }
    }

    generateDefaultTestResults(failureType) {
        return {
            pingTest: {
                status: "FAILED",
                packetLoss: Math.floor(Math.random() * 60) + 40,
                avgLatency: null,
                details: `Network test failed due to ${failureType.toLowerCase().replace('_', ' ')}`
            },
            signalQuality: {
                status: "UNKNOWN",
                signalStrength: Math.floor(Math.random() * 50) + 25,
                snrRatio: Math.floor(Math.random() * 20) + 10,
                details: "Unable to determine signal quality"
            },
            equipmentStatus: {
                status: "UNKNOWN",
                modemStatus: "UNRESPONSIVE",
                lastSeen: this.generateRandomPastTime(),
                details: "Equipment status could not be determined"
            },
            speedTest: {
                status: "FAILED",
                downloadSpeed: 0,
                uploadSpeed: 0,
                details: "Speed test could not be completed"
            }
        };
    }

    generateAutoCorrectAttempt(autoCorrectStep, failureType) {
        // Determine success/failure based on failure type and step success rate
        const shouldSucceed = Math.random() * 100 < autoCorrectStep.successRate;
        
        if (shouldSucceed) {
            return {
                attempted: true,
                step: autoCorrectStep.step,
                description: autoCorrectStep.description,
                duration: autoCorrectStep.duration,
                success: true,
                result: "Auto-correction successful - service restored",
                confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
            };
        } else {
            return {
                attempted: true,
                step: autoCorrectStep.step,
                description: autoCorrectStep.description,
                duration: autoCorrectStep.duration,
                success: false,
                reason: this.generateFailureReason(failureType),
                nextAction: "Manual intervention required"
            };
        }
    }

    generateFailureReason(failureType) {
        const failureReasons = {
            "CONNECTIVITY_FAILED": [
                "Unable to communicate with customer equipment",
                "Physical layer connectivity issue preventing remote access",
                "Equipment power failure detected"
            ],
            "SLOW_PERFORMANCE": [
                "Network congestion cannot be resolved remotely",
                "Hardware limitation preventing speed improvement",
                "External interference affecting signal quality"
            ],
            "INTERMITTENT_CONNECTION": [
                "Unstable connection preventing reliable auto-correction",
                "Equipment experiencing thermal or power issues",
                "Signal interference pattern cannot be automatically resolved"
            ],
            "AUTHENTICATION_FAILED": [
                "Authentication server unreachable",
                "Customer credentials require manual reset",
                "Security policy preventing automatic re-authentication"
            ],
            "DNS_RESOLUTION_FAILED": [
                "DNS servers not responding to configuration changes",
                "ISP DNS infrastructure issue requires escalation",
                "Local DNS cache corruption requires manual intervention"
            ],
            "HARDWARE_MALFUNCTION": [
                "Hardware failure requires physical replacement",
                "Firmware corruption prevents remote recovery",
                "Equipment not responding to remote commands"
            ],
            "SERVICE_DEGRADED": [
                "Service provisioning issue requires billing system update",
                "Account configuration preventing service restoration",
                "Upstream provider issue affecting service quality"
            ],
            "SIGNAL_QUALITY_POOR": [
                "Physical cable issue preventing signal improvement",
                "Environmental interference cannot be remotely mitigated",
                "Amplifier adjustment requires field technician"
            ]
        };
        
        const reasons = failureReasons[failureType] || ["Unknown issue preventing auto-correction"];
        return reasons[Math.floor(Math.random() * reasons.length)];
    }

    generateRecentTime() {
        const minutesAgo = Math.floor(Math.random() * 30) + 1; // 1-30 minutes ago
        const recentTime = new Date();
        recentTime.setMinutes(recentTime.getMinutes() - minutesAgo);
        return recentTime.toISOString();
    }

    determineSeverityLevel(failureType) {
        const severityMap = {
            "CONNECTIVITY_FAILED": "HIGH",
            "AUTHENTICATION_FAILED": "HIGH", 
            "HARDWARE_MALFUNCTION": "HIGH",
            "SERVICE_DEGRADED": "MEDIUM",
            "SLOW_PERFORMANCE": "MEDIUM",
            "DNS_RESOLUTION_FAILED": "MEDIUM",
            "INTERMITTENT_CONNECTION": "MEDIUM",
            "SIGNAL_QUALITY_POOR": "LOW"
        };
        
        return severityMap[failureType] || "MEDIUM";
    }

    estimateResolutionTime(category, failureType) {
        const timeEstimates = {
            "Physical Layer": {
                "CONNECTIVITY_FAILED": "4-8 hours (field technician required)",
                "SIGNAL_QUALITY_POOR": "2-6 hours (cable repair needed)",
                "HARDWARE_MALFUNCTION": "24-48 hours (equipment replacement)"
            },
            "Network Infrastructure": {
                "CONNECTIVITY_FAILED": "2-4 hours (network operations intervention)",
                "SLOW_PERFORMANCE": "1-3 hours (capacity upgrade required)",
                "SERVICE_DEGRADED": "30 minutes - 2 hours (configuration update)"
            },
            "Equipment/Hardware": {
                "HARDWARE_MALFUNCTION": "24-72 hours (equipment replacement)",
                "INTERMITTENT_CONNECTION": "2-4 hours (equipment reset/replacement)",
                "CONNECTIVITY_FAILED": "1-4 hours (equipment troubleshooting)"
            },
            "Environmental": {
                "CONNECTIVITY_FAILED": "Variable (depends on weather/external conditions)",
                "SIGNAL_QUALITY_POOR": "2-24 hours (environmental factors dependent)",
                "INTERMITTENT_CONNECTION": "4-12 hours (environmental stabilization required)"
            },
            "Configuration/Software": {
                "AUTHENTICATION_FAILED": "15 minutes - 2 hours (credential reset)",
                "DNS_RESOLUTION_FAILED": "30 minutes - 1 hour (configuration update)",
                "SLOW_PERFORMANCE": "1-2 hours (configuration optimization)"
            },
            "Service/Account": {
                "AUTHENTICATION_FAILED": "15 minutes - 4 hours (account verification)",
                "SERVICE_DEGRADED": "30 minutes - 2 hours (provisioning update)",
                "CONNECTIVITY_FAILED": "1-3 hours (service restoration)"
            }
        };
        
        return timeEstimates[category]?.[failureType] || "2-6 hours (manual intervention required)";
    }

    generateRandomPastTime() {
        const hoursAgo = Math.floor(Math.random() * 48) + 1; // 1-48 hours ago
        const pastTime = new Date();
        pastTime.setHours(pastTime.getHours() - hoursAgo);
        return pastTime.toISOString();
    }

    generateTechnicalCode(category) {
        const codeMap = {
            "Physical Layer": ['PHY-001', 'PHY-145', 'PHY-289', 'PHY-334', 'PHY-412'],
            "Network Infrastructure": ['NET-067', 'NET-223', 'NET-445', 'NET-789', 'NET-912'],
            "Equipment/Hardware": ['HW-156', 'HW-334', 'HW-567', 'HW-789', 'HW-901'],
            "Environmental": ['ENV-089', 'ENV-234', 'ENV-456', 'ENV-678', 'ENV-812'],
            "Configuration/Software": ['CFG-123', 'CFG-445', 'CFG-678', 'CFG-890', 'CFG-234'],
            "Service/Account": ['SVC-345', 'SVC-567', 'SVC-789', 'SVC-012', 'SVC-456']
        };
        
        const codes = codeMap[category] || ['GEN-001', 'GEN-234', 'GEN-567'];
        return codes[Math.floor(Math.random() * codes.length)];
    }

    generateDiagnosticId() {
        return 'DIAG-' + Date.now() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    }

    generateRecommendedActions(category, failureType) {
        const actionMap = {
            "Physical Layer": {
                "CONNECTIVITY_FAILED": [
                    "Dispatch field technician for physical cable inspection and testing",
                    "Perform cable integrity test from distribution point to premises",
                    "Verify all physical connections and connectors for damage",
                    "Check for water ingress or environmental damage to cabling",
                    "Replace damaged cables, connectors, or network interface device"
                ],
                "SIGNAL_QUALITY_POOR": [
                    "Schedule signal strength measurement and analysis",
                    "Inspect and replace damaged splitters or distribution equipment", 
                    "Check for cable bending, kinking, or impedance issues",
                    "Verify proper cable termination and connector integrity",
                    "Install signal amplifier or booster if needed"
                ],
                "HARDWARE_MALFUNCTION": [
                    "Replace faulty network interface device (NID)",
                    "Install new customer premises equipment",
                    "Verify power supply and grounding connections",
                    "Test new equipment installation and signal levels"
                ]
            },
            "Network Infrastructure": {
                "CONNECTIVITY_FAILED": [
                    "Escalate to Network Operations Center (NOC) for immediate investigation",
                    "Check neighborhood node status and capacity utilization",
                    "Verify core network routing and switching infrastructure",
                    "Coordinate with upstream providers if backbone issue suspected",
                    "Implement emergency traffic rerouting if available"
                ],
                "SLOW_PERFORMANCE": [
                    "Analyze network capacity and congestion patterns",
                    "Upgrade neighborhood node capacity if overloaded",
                    "Implement quality of service (QoS) prioritization",
                    "Review and optimize network routing paths",
                    "Schedule infrastructure capacity expansion"
                ],
                "SERVICE_DEGRADED": [
                    "Review and update network configuration parameters",
                    "Verify service provisioning and billing system alignment",
                    "Check for any network security or filtering issues",
                    "Update customer service profile and bandwidth allocation"
                ]
            },
            "Equipment/Hardware": {
                "HARDWARE_MALFUNCTION": [
                    "Ship replacement modem/gateway device to customer (expedited)",
                    "Schedule same-day technician visit for equipment swap",
                    "Provide temporary mobile hotspot if available",
                    "Update equipment inventory and warranty tracking",
                    "Configure new device with customer's service parameters"
                ],
                "INTERMITTENT_CONNECTION": [
                    "Perform remote equipment diagnostics and log analysis",
                    "Guide customer through equipment power cycle and factory reset",
                    "Schedule equipment replacement if hardware issue confirmed",
                    "Check for overheating, ventilation, or power supply issues",
                    "Update equipment firmware to latest stable version"
                ],
                "CONNECTIVITY_FAILED": [
                    "Attempt remote equipment reboot and configuration refresh",
                    "Verify equipment power status and LED indicator patterns",
                    "Check for equipment overheating or physical damage",
                    "Schedule immediate equipment replacement if unresponsive",
                    "Provide customer with troubleshooting steps for power cycling"
                ]
            },
            "Environmental": {
                "CONNECTIVITY_FAILED": [
                    "Monitor weather conditions and service restoration progress",
                    "Coordinate with emergency services and utility companies",
                    "Deploy temporary network infrastructure if feasible",
                    "Prioritize service restoration based on critical infrastructure needs",
                    "Communicate service restoration timeline to affected customers"
                ],
                "SIGNAL_QUALITY_POOR": [
                    "Assess environmental factors affecting signal (weather, construction)",
                    "Install additional shielding or protection for exposed equipment",
                    "Coordinate with local authorities regarding interference sources",
                    "Implement temporary signal boosting or alternate routing",
                    "Schedule infrastructure hardening improvements"
                ],
                "INTERMITTENT_CONNECTION": [
                    "Monitor environmental conditions for patterns (temperature, humidity)",
                    "Install environmental protection for outdoor equipment",
                    "Check for loose connections affected by weather conditions",
                    "Implement automatic failover systems where available",
                    "Schedule preventive maintenance for weather-sensitive equipment"
                ]
            },
            "Configuration/Software": {
                "AUTHENTICATION_FAILED": [
                    "Reset customer authentication credentials and certificates",
                    "Verify customer account status and service entitlements",
                    "Update authentication server configuration if needed",
                    "Check for security policy conflicts blocking authentication",
                    "Regenerate and deploy new security tokens to customer equipment"
                ],
                "DNS_RESOLUTION_FAILED": [
                    "Update customer equipment DNS server configuration",
                    "Flush and rebuild DNS cache on customer equipment",
                    "Verify DNS server functionality and reachability",
                    "Configure backup DNS servers for redundancy",
                    "Check for DNS filtering or blocking rules affecting service"
                ],
                "SLOW_PERFORMANCE": [
                    "Optimize Quality of Service (QoS) configuration",
                    "Review and adjust bandwidth allocation parameters",
                    "Check for conflicting firewall or security rules",
                    "Update network adapter drivers and firmware",
                    "Configure traffic shaping and prioritization rules"
                ]
            },
            "Service/Account": {
                "AUTHENTICATION_FAILED": [
                    "Verify customer account status and payment history",
                    "Remove any service holds or restrictions",
                    "Update customer service provisioning in billing system",
                    "Reset authentication credentials and service entitlements",
                    "Confirm customer identity and update security information"
                ],
                "SERVICE_DEGRADED": [
                    "Review customer service plan and current provisioning",
                    "Update bandwidth allocation to match subscribed service level",
                    "Check for any service restrictions or limitations",
                    "Coordinate with billing team to resolve account discrepancies",
                    "Upgrade customer to appropriate service tier if needed"
                ],
                "CONNECTIVITY_FAILED": [
                    "Verify customer account is active and in good standing",
                    "Check for service suspension due to billing or policy issues",
                    "Update service provisioning and activation status",
                    "Coordinate with customer care team for account resolution",
                    "Process service restoration once account issues resolved"
                ]
            }
        };

        // Get category-specific actions or default actions
        const categoryActions = actionMap[category] || {};
        const specificActions = categoryActions[failureType];
        
        if (specificActions) {
            return specificActions;
        }
        
        // Fallback to general actions for the category
        const generalActions = Object.values(categoryActions).flat();
        if (generalActions.length > 0) {
            return generalActions.slice(0, 4); // Return first 4 general actions
        }
        
        // Ultimate fallback
        return [
            "Contact customer to schedule technician appointment",
            "Escalate to advanced technical support team", 
            "Document issue details for engineering review",
            "Monitor situation and retry automated diagnostics in 1 hour",
            "Coordinate with appropriate teams based on failure category"
        ];
    }

    async simulateDiagnosticProcess(callback) {
        const totalSteps = this.diagnosticSteps.length;
        
        for (let i = 0; i < totalSteps; i++) {
            callback({
                step: i + 1,
                totalSteps: totalSteps,
                message: this.diagnosticSteps[i],
                progress: Math.round(((i + 1) / totalSteps) * 100)
            });
            
            // Simulate diagnostic time
            await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        }
        
        // Generate final results
        const diagnosticData = this.generateDiagnosticData();
        callback({
            step: totalSteps,
            totalSteps: totalSteps,
            message: "Diagnostic complete - Connectivity failure detected",
            progress: 100,
            complete: true,
            data: diagnosticData
        });
        
        return diagnosticData;
    }
}

// Helper function to get status colors
function getStatusColor(status) {
    const colorMap = {
        'FAILED': '#DC2626',
        'DEGRADED': '#F59E0B', 
        'MARGINAL': '#F59E0B',
        'OFFLINE': '#DC2626',
        'ONLINE': '#10B981',
        'GOOD': '#10B981',
        'INTERMITTENT': '#EA580C',
        'FLUCTUATING': '#EA580C',
        'UNSTABLE': '#EA580C',
        'LIMITED': '#F59E0B',
        'AUTH_FAILED': '#DC2626',
        'BLOCKED': '#DC2626',
        'PARTIAL': '#F59E0B',
        'INCONSISTENT': '#EA580C',
        'UNKNOWN': '#6B7280'
    };
    
    return colorMap[status] || '#6B7280';
}

// Global instance for use in HTML
window.NetworkDiagnosticSimulator = NetworkDiagnosticSimulator;

// Integration function for agentConsole.html
window.runNetworkDiagnostics = async function() {
    const simulator = new NetworkDiagnosticSimulator();
    const statusElement = document.getElementById('status-main');
    const subStatusElement = document.getElementById('status-sub');
    
    // Update status to show diagnostics in progress
    if (statusElement) {
        statusElement.textContent = '🔄 RUNNING DIAGNOSTICS';
        statusElement.className = 'diagnostic-status pulse';
    }
    if (subStatusElement) {
        subStatusElement.textContent = 'Performing network connectivity tests...';
    }
    
    try {
        const diagnosticData = await simulator.simulateDiagnosticProcess((progress) => {
            if (subStatusElement && !progress.complete) {
                subStatusElement.textContent = `${progress.message} (${progress.progress}%)`;
            }
        });
        
        // Update UI with results
        displayDiagnosticResults(diagnosticData);
        
        return diagnosticData;
    } catch (error) {
        console.error('Diagnostic simulation error:', error);
        if (statusElement) {
            statusElement.textContent = '❌ DIAGNOSTIC ERROR';
        }
        if (subStatusElement) {
            subStatusElement.textContent = 'Failed to complete network diagnostics';
        }
    }
};

// Function to display diagnostic results in the UI
function displayDiagnosticResults(data) {
    const statusElement = document.getElementById('status-main');
    const subStatusElement = document.getElementById('status-sub');
    
    // Determine status display based on failure type
    const statusConfig = {
        "CONNECTIVITY_FAILED": { icon: '🔴', text: 'CONNECTIVITY FAILED', color: '#DC2626' },
        "SLOW_PERFORMANCE": { icon: '🟡', text: 'SLOW PERFORMANCE', color: '#F59E0B' },
        "INTERMITTENT_CONNECTION": { icon: '🟠', text: 'INTERMITTENT CONNECTION', color: '#EA580C' },
        "SERVICE_DEGRADED": { icon: '🟡', text: 'SERVICE DEGRADED', color: '#F59E0B' },
        "AUTHENTICATION_FAILED": { icon: '🔴', text: 'AUTHENTICATION FAILED', color: '#DC2626' },
        "DNS_RESOLUTION_FAILED": { icon: '🟡', text: 'DNS RESOLUTION FAILED', color: '#F59E0B' },
        "HARDWARE_MALFUNCTION": { icon: '🔴', text: 'HARDWARE MALFUNCTION', color: '#DC2626' },
        "SIGNAL_QUALITY_POOR": { icon: '🟠', text: 'SIGNAL QUALITY POOR', color: '#EA580C' }
    };
    
    const config = statusConfig[data.status] || { icon: '🔴', text: 'NETWORK ISSUE', color: '#DC2626' };
    
    // Update main status
    if (statusElement) {
        statusElement.textContent = `${config.icon} ${config.text}`;
        statusElement.className = 'diagnostic-status';
        statusElement.style.color = config.color;
    }
    
    // Update sub status with severity and resolution time
    if (subStatusElement) {
        subStatusElement.innerHTML = `
            <strong>Severity:</strong> ${data.severityLevel} | 
            <strong>Est. Resolution:</strong> ${data.estimatedResolutionTime}<br>
            <strong>Root Cause:</strong> ${data.rootCause.description}
        `;
    }
    
    // Add diagnostic results to communication log
    const logContainer = document.getElementById('communication-log');
    if (logContainer) {
        // Clear existing logs for diagnostic session
        logContainer.innerHTML = '';
        
        // Add diagnostic header
        const diagnosticHeader = document.createElement('div');
        diagnosticHeader.className = 'log-entry received';
        diagnosticHeader.style.borderLeftColor = '#DC2626';
        diagnosticHeader.innerHTML = `
            <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 13px; color: #DC2626;">
                    🔴 Network Diagnostic Results - CONNECTIVITY FAILED
                </div>
                <div class="log-time">${new Date().toLocaleString()} • Click to view details</div>
            </div>
        `;
        diagnosticHeader.onclick = () => showDetailedDiagnosticModal(data);
        logContainer.appendChild(diagnosticHeader);
        
        // Note: Auto-correct workflow will be handled separately by the auto-correct panel
        // The old auto-correct attempt from diagnostic data is informational only
        
        // Add recommended actions
        const actionsEntry = document.createElement('div');
        actionsEntry.className = 'log-entry received';
        actionsEntry.style.borderLeftColor = '#F59E0B';
        actionsEntry.innerHTML = `
            <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 13px; color: #F59E0B;">
                    📋 Next Steps Required - Manual Intervention Needed
                </div>
                <div class="log-time">${data.recommendedActions.length} recommended actions available</div>
            </div>
        `;
        actionsEntry.onclick = () => showRecommendedActionsModal(data);
        logContainer.appendChild(actionsEntry);
    }
    
    // Update next steps with actual diagnostic recommendations
    updateNextStepsWithDiagnostic(data);
    
    // Trigger auto-correct analysis
    if (typeof analyzeAutoCorrectOptions === 'function') {
        // Get customer ID from test case if available
        const customerId = window.currentTestCase?.customerId || null;
        analyzeAutoCorrectOptions(data, customerId);
    }
}

// Function to show detailed diagnostic modal
function showDetailedDiagnosticModal(data) {
    const modal = document.getElementById('transcript-modal');
    const body = document.getElementById('transcript-body');
    
    if (!modal || !body) return;
    
    const content = `
        <h4 style="margin-bottom: 15px; color: #DC2626;">🔴 Network Diagnostic Report</h4>
        
        <div style="background: #FEF2F2; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #DC2626;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
                <div><strong>Diagnostic ID:</strong> ${data.diagnosticId}</div>
                <div><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</div>
                <div><strong>Status:</strong> <span style="color: #DC2626; font-weight: 600;">CONNECTIVITY FAILED</span></div>
                <div><strong>Confidence:</strong> ${data.rootCause.confidence}%</div>
            </div>
        </div>
        
        <h5 style="color: #DC2626; margin: 20px 0 10px 0;">Test Results</h5>
        <div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 15px; margin: 10px 0;">
            <div style="margin-bottom: 15px;">
                <strong>Ping Test:</strong> <span style="color: #DC2626;">FAILED</span><br>
                <small>Packet Loss: ${data.testResults.pingTest.packetLoss}% | ${data.testResults.pingTest.details}</small>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Signal Quality:</strong> <span style="color: #F59E0B;">DEGRADED</span><br>
                <small>Signal Strength: ${data.testResults.signalQuality.signalStrength}% | SNR: ${data.testResults.signalQuality.snrRatio} dB</small>
            </div>
            <div>
                <strong>Equipment Status:</strong> <span style="color: #DC2626;">OFFLINE</span><br>
                <small>Modem: ${data.testResults.equipmentStatus.modemStatus} | Last Seen: ${new Date(data.testResults.equipmentStatus.lastSeen).toLocaleString()}</small>
            </div>
        </div>
        
        <h5 style="color: #DC2626; margin: 20px 0 10px 0;">Root Cause Analysis</h5>
        <div style="background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 15px; margin: 10px 0;">
            <div style="margin-bottom: 10px;">
                <strong>Category:</strong> ${data.rootCause.category}
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Technical Code:</strong> ${data.rootCause.technicalCode}
            </div>
            <div>
                <strong>Description:</strong><br>
                ${data.rootCause.description}
            </div>
        </div>
        
        <h5 style="color: #F59E0B; margin: 20px 0 10px 0;">Auto-Correct Attempt</h5>
        <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 15px; margin: 10px 0;">
            <div style="margin-bottom: 8px;">
                <strong>Action:</strong> ${data.autoCorrectAttempt.step}
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Description:</strong> ${data.autoCorrectAttempt.description}
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Duration:</strong> ${data.autoCorrectAttempt.duration}
            </div>
            <div style="color: #DC2626; font-weight: 600;">
                <strong>Result:</strong> FAILED - ${data.autoCorrectAttempt.reason}
            </div>
        </div>
    `;
    
    body.innerHTML = content;
    modal.classList.add('active');
}

// Function to show recommended actions modal
function showRecommendedActionsModal(data) {
    const modal = document.getElementById('transcript-modal');
    const body = document.getElementById('transcript-body');
    
    if (!modal || !body) return;
    
    let actionsHtml = '';
    data.recommendedActions.forEach((action, index) => {
        actionsHtml += `
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 15px; margin: 10px 0;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="background: #F59E0B; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; margin-right: 10px;">
                        ${index + 1}
                    </span>
                    <strong>Recommended Action</strong>
                </div>
                <div style="margin-left: 34px;">
                    ${action}
                </div>
            </div>
        `;
    });
    
    const content = `
        <h4 style="margin-bottom: 15px; color: #F59E0B;">📋 Recommended Actions</h4>
        <div style="background: #FFFBEB; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #F59E0B;">
            <p style="margin: 0; font-size: 14px;">
                <strong>Manual intervention required.</strong> Automatic correction failed. Please review the following recommended actions in priority order.
            </p>
        </div>
        ${actionsHtml}
    `;
    
    body.innerHTML = content;
    modal.classList.add('active');
}

// Function to update next steps with diagnostic information
function updateNextStepsWithDiagnostic(data) {
    const stepsContainer = document.querySelector('.steps-container');
    if (!stepsContainer) return;
    
    stepsContainer.innerHTML = `
        <div class="step" style="background: #FEF2F2; border-left: 4px solid #DC2626;">
            Review diagnostic results and root cause analysis
        </div>
        <div class="step" style="background: #FFFBEB; border-left: 4px solid #F59E0B;">
            ${data.recommendedActions[0] || 'Contact technical support for assistance'}
        </div>
        <div class="step">
            Schedule follow-up diagnostic test after corrective actions
        </div>
        <div class="step">
            Document resolution and update customer service records
        </div>
    `;
}