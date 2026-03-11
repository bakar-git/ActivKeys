import React, { useState, useEffect } from 'react';
import { Play, Shield, Zap, X, ArrowRight, CheckCircle, TrendingUp, Users, Star } from 'lucide-react';

const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "50K+", label: "Keys Validated Daily", icon: <CheckCircle className="h-5 w-5" /> },
    { value: "99.9%", label: "Uptime Guaranteed", icon: <TrendingUp className="h-5 w-5" /> },
    { value: "500+", label: "Enterprise Clients", icon: <Users className="h-5 w-5" /> },
    { value: "4.9/5", label: "Customer Rating", icon: <Star className="h-5 w-5" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Interactive Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 30s linear infinite'
          }}></div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              #1 Key Management Platform
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-white">Validate Keys</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  At Lightning Speed
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                Enterprise-grade Microsoft product key validation with real-time analytics, 
                bulk processing, and unmatched security for IT professionals worldwide.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="group border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start items-center text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>SOC2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span>Real-time API</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Dashboard Preview */}
          <div className="relative">
            {/* Dashboard Mockup */}
            <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">ActivKeys Dashboard</div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-500 ${
                      index === currentStat
                        ? 'bg-blue-500/20 border-blue-500/30 scale-105'
                        : 'bg-gray-800/50 border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${index === currentStat ? 'text-blue-400' : 'text-gray-400'}`}>
                        {stat.icon}
                      </div>
                      <div className={`text-2xl font-bold ${
                        index === currentStat ? 'text-blue-400' : 'text-white'
                      }`}>
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Validation Preview */}
              <div className="space-y-3">
                <div className="text-sm text-gray-400 mb-3">Recent Validations</div>
                {[
                  { status: 'valid', product: 'Windows 11 Pro', time: '2s ago' },
                  { status: 'valid', product: 'Office 365', time: '5s ago' },
                  { status: 'blocked', product: 'Windows Server', time: '8s ago' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'valid' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-white text-sm">{item.product}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{item.time}</span>
                  </div>
                ))}
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-400/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-3">
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-blue-400/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-3">
              <div className="text-blue-400 text-sm font-medium">
                API Response: 1.2s
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Customer Logos */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Microsoft Partner', 'SOC2 Compliant', 'ISO 27001', 'GDPR Ready', 'Enterprise SLA'].map((badge, index) => (
              <div key={index} className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 text-gray-400 text-sm font-medium">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 z-10 bg-gray-800/80 hover:bg-gray-700/80 p-3 rounded-full transition-colors border border-gray-600/50"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <video
              controls
              autoPlay
              className="w-full h-full"
              poster="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;