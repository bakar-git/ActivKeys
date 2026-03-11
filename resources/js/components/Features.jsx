import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Clock, FolderOpen, Zap, Shield, ArrowRight, X, Play, BarChart3, Database, Lock } from 'lucide-react';

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-400" />,
      title: "Real-Time Key Validation",
      description: "Instantly validate Microsoft product keys with comprehensive detection of product types, key categories, and activation status.",
      image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
      span: "lg:col-span-2 lg:row-span-2",
      featured: true,
      detailImage: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200",
      detailContent: {
        title: "Advanced Real-Time Key Validation",
        subtitle: "Instant verification with comprehensive analysis",
        description: "Our advanced validation engine provides instant verification of Microsoft product keys with unparalleled accuracy and detail. Get comprehensive insights into key status, product type, and activation potential in real-time.",
        features: [
          "Instant key verification in under 2 seconds",
          "Detects Windows, Office, Server, and Visual Studio keys",
          "Identifies Retail, MAK, OEM, and Volume License types",
          "Real-time activation status checking",
          "Blocked key detection and reporting",
          "Product edition and version identification"
        ],
        stats: [
          { label: "Validation Speed", value: "< 2 seconds" },
          { label: "Accuracy Rate", value: "99.9%" },
          { label: "Supported Products", value: "50+" }
        ]
      }
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
      title: "Daily Activation Tracking",
      description: "Monitor MAK activation counts with automated daily checks and visual analytics.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      span: "lg:col-span-1",
      featured: false,
      detailImage: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
      detailContent: {
        title: "Automated Daily Activation Tracking",
        subtitle: "Never lose track of your MAK activations",
        description: "Automatically monitor your MAK (Multiple Activation Key) usage with daily checks and comprehensive analytics. Stay ahead of activation limits and optimize your license utilization.",
        features: [
          "Automated daily MAK activation monitoring",
          "Visual charts and usage analytics",
          "Activation limit alerts and notifications",
          "Historical usage tracking and trends",
          "Predictive analytics for license planning",
          "Export reports for compliance auditing"
        ],
        stats: [
          { label: "Daily Checks", value: "Automated" },
          { label: "Alert Accuracy", value: "100%" },
          { label: "Historical Data", value: "Unlimited" }
        ]
      }
    },
    {
      icon: <Shield className="h-6 w-6 text-red-400" />,
      title: "Security & Privacy",
      description: "Enterprise-grade security with local data storage and isolated customer APIs.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      span: "lg:col-span-1",
      featured: false,
      detailImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      detailContent: {
        title: "Enterprise-Grade Security & Privacy",
        subtitle: "Your data stays secure and private",
        description: "Built with security-first principles, ActivKeys ensures your sensitive license data remains protected with enterprise-grade encryption and privacy controls.",
        features: [
          "Local data storage - never leaves your system",
          "End-to-end encryption for all communications",
          "Isolated customer APIs for cloud users",
          "SOC2 Type II compliance ready",
          "GDPR and privacy regulation compliant",
          "Optional private VPS deployment"
        ],
        stats: [
          { label: "Data Encryption", value: "AES-256" },
          { label: "Compliance", value: "SOC2 Ready" },
          { label: "Privacy Level", value: "Maximum" }
        ]
      }
    },
    {
      icon: <FolderOpen className="h-6 w-6 text-yellow-400" />,
      title: "Stock Management",
      description: "Organize and categorize your key inventory with intelligent sorting and quick retrieval.",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600",
      span: "lg:col-span-1",
      featured: false,
      detailImage: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200",
      detailContent: {
        title: "Intelligent Stock Management",
        subtitle: "Organize your inventory like never before",
        description: "Advanced inventory management system designed for resellers and IT professionals managing large volumes of software licenses with intelligent categorization and quick retrieval.",
        features: [
          "Automatic product categorization",
          "Custom tagging and labeling system",
          "Quick search and filter capabilities",
          "Bulk import and export functionality",
          "Low stock alerts and notifications",
          "Integration with popular inventory systems"
        ],
        stats: [
          { label: "Search Speed", value: "Instant" },
          { label: "Categories", value: "Unlimited" },
          { label: "Bulk Operations", value: "10K+ keys" }
        ]
      }
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      title: "Bulk Operations",
      description: "Process thousands of keys simultaneously with optimized batch validation.",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600",
      span: "lg:col-span-1",
      featured: true,
      detailImage: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200",
      detailContent: {
        title: "High-Performance Bulk Operations",
        subtitle: "Process thousands of keys in minutes",
        description: "Revolutionary bulk processing engine that can handle massive volumes of product keys with lightning-fast validation and comprehensive reporting capabilities.",
        features: [
          "Process up to 10,000 keys simultaneously",
          "Optimized multi-threaded validation engine",
          "Real-time progress tracking and reporting",
          "Automatic duplicate detection and removal",
          "Batch export in multiple formats (CSV, Excel, JSON)",
          "Resume interrupted operations seamlessly"
        ],
        stats: [
          { label: "Max Batch Size", value: "10,000 keys" },
          { label: "Processing Speed", value: "500 keys/min" },
          { label: "Success Rate", value: "99.8%" }
        ]
      }
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-400" />,
      title: "Historical Tracking",
      description: "Complete audit trail with timestamps and duplicate prevention.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600",
      span: "lg:col-span-4",
      featured: false,
      detailImage: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200",
      detailContent: {
        title: "Comprehensive Historical Tracking",
        subtitle: "Complete audit trail for compliance",
        description: "Maintain detailed records of all key validation activities with comprehensive logging, audit trails, and compliance reporting capabilities.",
        features: [
          "Complete validation history with timestamps",
          "Automatic duplicate detection and prevention",
          "Detailed audit logs for compliance",
          "Advanced search and filtering options",
          "Export capabilities for external auditing",
          "Data retention policy management"
        ],
        stats: [
          { label: "Data Retention", value: "Unlimited" },
          { label: "Audit Compliance", value: "100%" },
          { label: "Search Speed", value: "< 1 second" }
        ]
      }
    }
  ];

  const openModal = (feature) => {
    setSelectedFeature(feature);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedFeature(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="features" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Core Features
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Everything You Need for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Key Management
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Powerful tools designed for IT professionals, resellers, and enterprise administrators who demand reliability and efficiency.
          </p>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-fr">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => openModal(feature)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer ${feature.span}`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30 group-hover:from-gray-900/90 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className={`relative z-10 p-6 h-full flex flex-col justify-between ${feature.featured ? 'lg:p-8' : ''}`}>
                {/* Top Section */}
                <div>
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0 p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 group-hover:border-gray-600/50 group-hover:bg-gray-700/80 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-white group-hover:text-blue-100 transition-colors mb-3 ${feature.featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed ${feature.featured ? 'text-lg' : 'text-base'}`}>
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-6">
                  {/* Learn More Link */}
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Click to learn more</span>
                    <Play className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
                </div>

                {/* Featured Badge */}
                {feature.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Featured
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "99.9%", label: "Uptime Guarantee", color: "text-green-400" },
            { value: "10K+", label: "Keys Validated Daily", color: "text-blue-400" },
            { value: "500+", label: "Enterprise Clients", color: "text-purple-400" },
            { value: "24/7", label: "Expert Support", color: "text-orange-400" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 bg-gray-800/80 hover:bg-gray-700/80 p-3 rounded-full transition-colors border border-gray-600/50 hover:border-gray-500/50"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left Side - Content */}
              <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                        {selectedFeature.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white">
                          {selectedFeature.detailContent.title}
                        </h2>
                        <p className="text-xl text-blue-400 font-medium">
                          {selectedFeature.detailContent.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {selectedFeature.detailContent.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white mb-6">Key Capabilities</h3>
                    <div className="grid gap-4">
                      {selectedFeature.detailContent.features.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                          <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedFeature.detailContent.stats.map((stat, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                          <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                          <div className="text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="lg:w-1/2 relative">
                <img 
                  src={selectedFeature.detailImage} 
                  alt={selectedFeature.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900/50 to-transparent"></div>
                
                {/* Floating Stats on Image */}
                <div className="absolute bottom-6 left-6 right-6 lg:left-6 lg:right-6">
                  <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                        <span className="font-medium">Live Performance</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Active</span>
                        </div>
                        <div className="text-green-400 font-bold">99.9% Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;