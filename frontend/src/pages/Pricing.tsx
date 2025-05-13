import React from 'react';
import { CheckIcon } from 'lucide-react';
const tiers = [{
  name: 'Free',
  id: 'tier-free',
  href: '#',
  priceMonthly: '$0',
  description: 'Perfect for trying out Recallr.',
  features: ['Up to 5 PDF uploads per month', 'Basic flashcard generation', 'Standard processing speed', 'Basic support', 'Limited to 10MB per PDF'],
  mostPopular: false
}, {
  name: 'Pro',
  id: 'tier-pro',
  href: '#',
  priceMonthly: '$12',
  description: 'For serious learners who need more power.',
  features: ['Unlimited PDF uploads', 'Advanced AI processing', 'Priority processing speed', 'Premium support', 'Up to 50MB per PDF', 'Custom flashcard templates', 'Export in multiple formats'],
  mostPopular: true
}, {
  name: 'Lifetime',
  id: 'tier-lifetime',
  href: '#',
  priceMonthly: '$299',
  description: 'One-time payment for unlimited access.',
  features: ['Everything in Pro plan', 'Lifetime access', 'No recurring payments', 'Early access to new features', 'Premium support', 'Up to 100MB per PDF', 'API access'],
  mostPopular: false
}];
const Pricing = () => {
  return <div className="bg-white">
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
          {tiers.map(tier => <div key={tier.id} className={`relative rounded-2xl border ${tier.mostPopular ? 'border-indigo-600 shadow-md' : 'border-gray-200'} p-8 shadow-sm flex flex-col`}>
              {tier.mostPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most popular
                  </span>
                </div>}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-4 text-gray-500">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  {tier.name !== 'Lifetime' && <span className="text-base font-medium text-gray-500">
                      /month
                    </span>}
                </p>
              </div>
              <ul className="mt-6 space-y-4 flex-1">
                {tier.features.map(feature => <li key={feature} className="flex">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-indigo-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>)}
              </ul>
              <a href={tier.href} className={`mt-8 block w-full rounded-md py-3 px-6 text-center text-sm font-semibold ${tier.mostPopular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'}`}>
                {tier.name === 'Free' ? 'Get Started' : 'Subscribe Now'}
              </a>
            </div>)}
        </div>
      </div>
      {/* FAQ or Additional Info section can be added here */}
    </div>;
};
export default Pricing;