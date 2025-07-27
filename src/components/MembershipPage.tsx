import React, { useState } from 'react';
import { 
  Crown, Star, Gift, Calendar, Wine, Heart, Shield, Sparkles,
  Check, User, Mail, Phone, CreditCard, MapPin, ChefHat
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const MembershipPage = () => {
  const [selectedTier, setSelectedTier] = useState('gold');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addMember } = useStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const membershipTiers = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: 99,
      color: 'from-amber-600 to-amber-700',
      icon: <Star className="text-amber-100" size={32} />,
      benefits: [
        '10% discount on all meals',
        'Priority reservations',
        'Birthday special dessert',
        'Monthly newsletter',
        'Member-only events access'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      price: 199,
      color: 'from-gray-400 to-gray-500',
      icon: <Gift className="text-gray-100" size={32} />,
      benefits: [
        '15% discount on all meals',
        'Priority reservations',
        'Complimentary birthday dinner',
        'Quarterly wine tasting',
        "Chef's table priority",
        'Exclusive menu previews'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 399,
      color: 'from-yellow-500 to-yellow-600',
      icon: <Crown className="text-yellow-100" size={32} />,
      popular: true,
      benefits: [
        '20% discount on all meals',
        'Guaranteed reservations',
        'Complimentary anniversary dinner',
        'Monthly wine pairing events',
        'Personal dining concierge',
        'Kitchen tour with Chef Marcus',
        'Exclusive seasonal menus'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 799,
      color: 'from-purple-600 to-purple-700',
      icon: <Sparkles className="text-purple-100" size={32} />,
      benefits: [
        '25% discount on all meals',
        'Anytime reservations',
        'Monthly complimentary dinner',
        'Private dining room access',
        'Personal chef consultations',
        'Exclusive wine cellar access',
        'Custom menu creation',
        'VIP event invitations'
      ]
    }
  ];

  const onSubmit = (data) => {
    const newMember = {
      id: `mem_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      membershipTier: selectedTier,
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      visitCount: 0,
      preferences: [],
      allergies: data.allergies ? data.allergies.split(',').map(a => a.trim()) : [],
      favoriteItems: [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addMember(newMember);
    setIsSubmitted(true);
    toast.success('Welcome to Melbourne Bistro Members Club!');
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gray-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="text-yellow-100" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Club!</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Congratulations! You're now a {membershipTiers.find(t => t.id === selectedTier)?.name} member of Melbourne Bistro.
            </p>
            <div className="bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">What's Next?</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li className="flex items-center">
                  <Check className="text-green-400 mr-2" size={16} />
                  Check your email for membership confirmation
                </li>
                <li className="flex items-center">
                  <Check className="text-green-400 mr-2" size={16} />
                  Download our mobile app for exclusive features
                </li>
                <li className="flex items-center">
                  <Check className="text-green-400 mr-2" size={16} />
                  Book your first member dinner with priority access
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Member Benefits
              </button>
              <a
                href="/reservations"
                className="border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Make Your First Reservation
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="mx-auto mb-6 text-yellow-400" size={64} />
          <h1 className="text-5xl font-bold text-white mb-6">Exclusive Members Club</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join Melbourne Bistro's exclusive membership program and unlock a world of culinary privileges, 
            priority access, and personalized dining experiences.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Membership</h2>
            <p className="text-xl text-gray-300">Select the tier that best suits your dining lifestyle</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {membershipTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-gray-800 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  selectedTier === tier.id ? 'ring-4 ring-yellow-400 bg-gray-700' : 'hover:bg-gray-700'
                } ${tier.popular ? 'border-2 border-yellow-400' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-600 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {tier.icon}
                </div>

                <h3 className="text-2xl font-bold text-white text-center mb-2">{tier.name}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-yellow-400">${tier.price}</span>
                  <span className="text-gray-400">/year</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <Check className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                    selectedTier === tier.id 
                      ? 'bg-yellow-400 border-yellow-400' 
                      : 'border-gray-400'
                  }`}>
                    {selectedTier === tier.id && (
                      <Check className="text-gray-900 w-4 h-4 mx-auto mt-0.5" size={16} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Complete Your Membership</h2>
              <p className="text-gray-300">
                You've selected <span className="text-yellow-400 font-semibold">
                  {membershipTiers.find(t => t.id === selectedTier)?.name}
                </span> membership
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="inline mr-2" size={16} />
                    Full Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email'
                      }
                    })}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="+61 4XX XXX XXX"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    Postcode
                  </label>
                  <input
                    {...register('postcode')}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="3000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dietary Requirements / Allergies (Optional)
                </label>
                <input
                  {...register('allergies')}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="e.g., nuts, gluten, dairy (comma-separated)"
                />
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Membership Summary</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">
                    {membershipTiers.find(t => t.id === selectedTier)?.name} Membership
                  </span>
                  <span className="text-yellow-400 font-bold text-xl">
                    ${membershipTiers.find(t => t.id === selectedTier)?.price}/year
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${membershipTiers.find(t => t.id === selectedTier)?.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...register('terms', { required: 'Please accept the terms and conditions' })}
                  className="rounded text-yellow-600"
                />
                <label className="text-gray-300 text-sm">
                  I agree to the <a href="#" className="text-yellow-400 hover:text-yellow-300">Terms and Conditions</a> and <a href="#" className="text-yellow-400 hover:text-yellow-300">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && <p className="text-red-400 text-sm">{errors.terms.message}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <CreditCard size={20} />
                <span>Join Melbourne Bistro Members Club</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Member Exclusive Benefits</h2>
            <p className="text-xl text-gray-300">Discover what makes our membership program special</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-colors">
              <ChefHat className="mx-auto mb-4 text-yellow-400" size={48} />
              <h3 className="text-xl font-bold text-white mb-4">Chef's Table Access</h3>
              <p className="text-gray-300">
                Exclusive access to our chef's table for an intimate dining experience with Chef Marcus Thompson.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-colors">
              <Wine className="mx-auto mb-4 text-yellow-400" size={48} />
              <h3 className="text-xl font-bold text-white mb-4">Wine Cellar Tours</h3>
              <p className="text-gray-300">
                Private tours of our extensive wine cellar with tastings of rare and exclusive vintages.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-colors">
              <Shield className="mx-auto mb-4 text-yellow-400" size={48} />
              <h3 className="text-xl font-bold text-white mb-4">Concierge Service</h3>
              <p className="text-gray-300">
                Personal dining concierge to handle all your reservations, special requests, and event planning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;