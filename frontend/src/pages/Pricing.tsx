import React from 'react';
import { CheckIcon, LockIcon } from 'lucide-react'; // Added LockIcon

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    description: 'Perfect for trying out Recallr.',
    features: [
      'Up to 5 PDF uploads per month', 
      'Basic flashcard generation',
      'Standard processing speed',
      'Basic support',
      'Limited to 10MB per PDF'
    ],
    available: true
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$10',
    description: 'For serious learners who need more power.',
    features: [
      'Unlimited PDF uploads',
      'Advanced AI processing',
      'Priority processing speed',
      'Premium support',
      'Up to 50MB per PDF',
      'Custom flashcard templates'
    ],
    available: false,
    comingSoon: true
  },
  {
    name: 'Lifetime',
    id: 'tier-lifetime',
    href: '#',
    priceMonthly: '$99',
    description: 'One-time payment for unlimited access.',
    features: [
      'Everything in Pro plan',
      'Lifetime access',
      'No recurring payments',
      'Early access to new features',
      'Premium support',
      'Up to 100MB per PDF',
      'API access'
    ],
    available: false,
    comingSoon: true
  }
];

const Pricing = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose the perfect plan for your learning needs
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative rounded-2xl border ${
                tier.available ? 'border-gray-200' : 'border-gray-300 opacity-80'
              } p-8 shadow-sm flex flex-col`}
            >
              {/* Coming Soon Badge */}
              {tier.comingSoon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-gray-500 px-4 py-1 text-sm font-semibold text-white">
                    Coming Soon
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-4 text-gray-500">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  {tier.name !== 'Lifetime' && tier.available && (
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  )}
                </p>
              </div>

              <ul className="mt-6 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex">
                    {tier.available ? (
                      <CheckIcon className="flex-shrink-0 h-5 w-5 text-indigo-500" />
                    ) : (
                      <LockIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                    )}
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`mt-8 block w-full rounded-md py-3 px-6 text-center text-sm font-semibold ${
                  tier.available
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
                aria-disabled={!tier.available}
              >
                {tier.available
                  ? tier.name === 'Free' 
                    ? 'Get Started' 
                    : 'Subscribe Now'
                  : 'Coming Soon'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;