import React, { useState } from 'react';
import { Check, Zap, Crown, Building, ArrowRight, Star } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      icon: <Zap className="h-6 w-6" />,
      description: 'Perfect for small teams and individual professionals',
      monthlyPrice: 29,
      yearlyPrice: 24,
      features: [
        '1,000 validations per month',
        'Real-time key validation',
        'Basic analytics dashboard',
        'Email support',
        'API access',
        'Export to CSV'
      ],
      highlighted: false,
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      icon: <Crown className="h-6 w-6" />,
      description: 'Ideal for growing businesses and IT teams',
      monthlyPrice: 99,
      yearlyPrice: 82,
      features: [
        '10,000 validations per month',
        'Bulk validation (up to 1,000)',
        'Advanced analytics & reporting',
        'Priority support',
        'Custom integrations',
        'Historical tracking',
        'Team collaboration tools',
        'White-label options'
      ],
      highlighted: true,
      buttonText: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Building className="h-6 w-6" />,
      description: 'For large organizations with custom needs',
      monthlyPrice: 299,
      yearlyPrice: 249,
      features: [
        'Unlimited validations',
        'Bulk validation (unlimited)',
        'Custom dashboard & branding',
        'Dedicated account manager',
        'On-premise deployment',
        'SLA guarantee',
        'Custom integrations',
        'Advanced security features',
        'Training & onboarding'
      ],
      highlighted: false,
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transparent pricing that scales with your business. Start free, upgrade when you're ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 p-1 rounded-xl border border-gray-700/50">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border transition-all duration-500 hover:scale-105 ${
                plan.highlighted
                  ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20'
                  : 'border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-xl ${
                      plan.highlighted 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-400 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'month'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-green-400 text-sm mt-2">
                      Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600'
                }`}>
                  {plan.buttonText}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>

              {/* Highlight Border Effect */}
              {plan.highlighted && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
            <div>
              <div className="text-2xl font-bold text-white mb-2">30-Day</div>
              <div>Free Trial</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">No Setup</div>
              <div>Fees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">Cancel</div>
              <div>Anytime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
