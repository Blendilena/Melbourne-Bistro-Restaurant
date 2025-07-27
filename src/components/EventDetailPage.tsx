import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, Users, DollarSign, MapPin, ChefHat, Wine, 
  Star, ArrowLeft, Check, User, Mail, Phone
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [isBooked, setIsBooked] = useState(false);
  const { events, addReservation } = useStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const eventDetails = {
    'wine-pairing-dinner': {
      id: 'wine-pairing-dinner',
      title: 'Wine Pairing Dinner',
      date: 'March 15, 2024',
      time: '7:00 PM',
      duration: '3 hours',
      price: 185,
      spots: 8,
      maxGuests: 20,
      description: 'An exquisite 5-course dining experience featuring premium Victorian wines carefully selected to complement each dish.',
      image: 'https://images.pexels.com/photos/1753437/pexels-photo-1753437.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Marcus Thompson',
      sommelier: 'Sarah Chen',
      menu: [
        {
          course: 'Amuse-Bouche',
          dish: 'Oyster with champagne foam',
          wine: 'Chandon Brut, Yarra Valley'
        },
        {
          course: 'Entrée',
          dish: 'Seared scallops with cauliflower purée',
          wine: 'Chardonnay, Mornington Peninsula'
        },
        {
          course: 'Fish',
          dish: 'Barramundi with native pepperberry',
          wine: 'Sauvignon Blanc, Adelaide Hills'
        },
        {
          course: 'Meat',
          dish: 'Wagyu beef with truffle jus',
          wine: 'Shiraz, Barossa Valley'
        },
        {
          course: 'Dessert',
          dish: 'Dark chocolate soufflé',
          wine: 'Tawny Port, Rutherglen'
        }
      ],
      highlights: [
        'Meet the winemakers',
        'Exclusive wine cellar tour',
        'Take-home wine selection',
        'Printed menu and wine notes'
      ]
    },
    'chefs-table-experience': {
      id: 'chefs-table-experience',
      title: "Chef's Table Experience",
      date: 'March 22, 2024',
      time: '6:30 PM',
      duration: '4 hours',
      price: 295,
      spots: 3,
      maxGuests: 8,
      description: 'An intimate 8-course tasting menu experience at our exclusive chef\'s table with Chef Marcus Thompson.',
      image: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Marcus Thompson',
      menu: [
        {
          course: 'Welcome',
          dish: 'Champagne and canapés',
          wine: 'House champagne'
        },
        {
          course: 'Course 1',
          dish: 'Kingfish crudo with finger lime',
          wine: 'Riesling, Clare Valley'
        },
        {
          course: 'Course 2',
          dish: 'Duck liver parfait with brioche',
          wine: 'Pinot Noir, Yarra Valley'
        },
        {
          course: 'Course 3',
          dish: 'Lobster bisque with cognac',
          wine: 'Chardonnay, Margaret River'
        },
        {
          course: 'Course 4',
          dish: 'Wagyu beef with bone marrow',
          wine: 'Cabernet Sauvignon, Coonawarra'
        },
        {
          course: 'Course 5',
          dish: 'Cheese selection with quince',
          wine: 'Vintage Port'
        },
        {
          course: 'Course 6',
          dish: 'Pre-dessert palate cleanser',
          wine: 'Moscato, King Valley'
        },
        {
          course: 'Dessert',
          dish: 'Chocolate tasting plate',
          wine: 'Fortified Muscat'
        }
      ],
      highlights: [
        'Interactive cooking demonstration',
        'Personal time with Chef Marcus',
        'Kitchen tour and techniques',
        'Signed cookbook',
        'Recipe cards to take home'
      ]
    },
    'truffle-season-special': {
      id: 'truffle-season-special',
      title: 'Truffle Season Special',
      date: 'March 29, 2024',
      time: '7:30 PM',
      duration: '2.5 hours',
      price: 225,
      spots: 12,
      maxGuests: 30,
      description: 'Celebrate truffle season with a limited menu featuring fresh Australian black truffles in every course.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      chef: 'Chef Marcus Thompson',
      menu: [
        {
          course: 'Appetizer',
          dish: 'Truffle arancini with parmesan',
          wine: 'Prosecco, King Valley'
        },
        {
          course: 'Soup',
          dish: 'Truffle and mushroom bisque',
          wine: 'Chardonnay, Adelaide Hills'
        },
        {
          course: 'Pasta',
          dish: 'Fresh pasta with truffle butter',
          wine: 'Pinot Grigio, Yarra Valley'
        },
        {
          course: 'Main',
          dish: 'Beef tenderloin with truffle sauce',
          wine: 'Malbec, Langhorne Creek'
        },
        {
          course: 'Dessert',
          dish: 'Truffle honey ice cream',
          wine: 'Dessert wine, Rutherglen'
        }
      ],
      highlights: [
        'Fresh truffle shaving at table',
        'Meet the truffle hunter',
        'Truffle hunting stories',
        'Take-home truffle oil'
      ]
    }
  };

  const event = eventDetails[eventId] || eventDetails['wine-pairing-dinner'];

  const onSubmit = (data) => {
    const reservation = {
      id: `res_${Date.now()}`,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      date: event.date,
      time: event.time,
      guests: parseInt(data.guests),
      status: 'confirmed',
      specialRequests: `Event: ${event.title}${data.specialRequests ? ` - ${data.specialRequests}` : ''}`,
      eventId: event.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addReservation(reservation);
    setIsBooked(true);
    toast.success('Event booking confirmed!');
    reset();
  };

  if (isBooked) {
    return (
      <div className="min-h-screen pt-20 bg-gray-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-gray-300 mb-6">
              You're all set for <strong>{event.title}</strong> on {event.date} at {event.time}.
            </p>
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm">
                A confirmation email has been sent with all the details. We'll also send you a reminder 24 hours before the event.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Home
              </Link>
              <Link
                to="/reservations"
                className="border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Make Another Reservation
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900/80 z-10"></div>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-white mb-4">{event.title}</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">{event.description}</p>
          
          <div className="grid md:grid-cols-4 gap-6 bg-gray-800/80 rounded-2xl p-6">
            <div className="text-center">
              <Calendar className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">{event.date}</p>
              <p className="text-gray-300 text-sm">{event.time}</p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">{event.duration}</p>
              <p className="text-gray-300 text-sm">Duration</p>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">{event.spots} spots left</p>
              <p className="text-gray-300 text-sm">of {event.maxGuests} total</p>
            </div>
            <div className="text-center">
              <DollarSign className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">${event.price}</p>
              <p className="text-gray-300 text-sm">per person</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Menu */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ChefHat className="mr-3 text-yellow-400" size={24} />
                Menu
              </h2>
              <div className="space-y-6">
                {event.menu.map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-yellow-400">{item.course}</h3>
                      <Wine className="text-gray-400" size={16} />
                    </div>
                    <p className="text-white font-medium mb-1">{item.dish}</p>
                    <p className="text-gray-300 text-sm italic">Paired with: {item.wine}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Highlights */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Star className="mr-3 text-yellow-400" size={24} />
                Event Highlights
              </h2>
              <ul className="space-y-3">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="text-green-400 mr-3 flex-shrink-0" size={16} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chef Information */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Meet Your Chef</h2>
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.pexels.com/photos/1482329/pexels-photo-1482329.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt={event.chef}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{event.chef}</h3>
                  <p className="text-yellow-400 mb-2">Executive Chef & Owner</p>
                  <p className="text-gray-300 leading-relaxed">
                    With over 15 years of culinary excellence, Chef Marcus brings his innovative approach 
                    to create unforgettable dining experiences. His passion for local ingredients and 
                    modern techniques has earned Melbourne Bistro numerous accolades.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-6">Reserve Your Spot</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <Users className="inline mr-2" size={16} />
                    Number of Guests
                  </label>
                  <select
                    {...register('guests', { required: 'Please select number of guests' })}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.guests ? 'border-red-500' : 'border-gray-600'
                    }`}
                  >
                    <option value="">Select guests</option>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  {errors.guests && <p className="text-red-400 text-sm mt-1">{errors.guests.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    {...register('specialRequests')}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Dietary restrictions, celebrations, etc."
                  />
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Price per person</span>
                    <span className="text-yellow-400 font-bold text-xl">${event.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">
                    Final total will be calculated based on number of guests
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors duration-300 transform hover:scale-105"
                >
                  Reserve Your Spot
                </button>

                <p className="text-gray-400 text-xs text-center">
                  By booking, you agree to our cancellation policy. 
                  Full refund available up to 48 hours before the event.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;