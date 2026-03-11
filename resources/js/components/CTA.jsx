import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Key Management?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of IT professionals who trust ActivKeys for secure, efficient license management
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-white/30 hover:border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Demo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-300 text-sm">
            <div>✓ No credit card required</div>
            <div>✓ 30-day free trial</div>
            <div>✓ Setup in under 5 minutes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;