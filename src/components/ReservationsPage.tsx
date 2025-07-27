import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useWebSocket } from '../hooks/useWebSocket';
import toast from 'react-hot-toast';

const ReservationsPage = () => {
  const { addReservation, availableTables } = useStore();
  const { triggerReservationNotification } = useWebSocket();
  const [currentAvailableTables, setCurrentAvailableTables] = useState(availableTables);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Update available tables in real-time
    setCurrentAvailableTables(availableTables);
  }, [availableTables]);

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Date validation (must be future date)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const reservation = {
        id: `res_${Date.now()}`,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        status: 'confirmed', // Changed from 'pending' to 'confirmed'
        specialRequests: formData.specialRequests,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Debug logging
      console.log('Creating reservation:', reservation);
      
      // Add to store first
      addReservation(reservation);
      
      // Log after adding to store
      console.log('Reservation added to store');
      
      // Verify it was added by checking the store
      setTimeout(() => {
        const { reservations } = useStore.getState();
        console.log('Current reservations in store:', reservations);
        console.log('Total reservations:', reservations.length);
      }, 100);
      
      // Then trigger notification
      triggerReservationNotification(reservation);
      
      setIsSubmitted(true);
      toast.success('Reservation submitted successfully!');
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Reservation Confirmed!</h2>
            <p className="text-gray-300 mb-6">
              Thank you, {formData.name}! Your table for {formData.guests} has been reserved for{' '}
              {new Date(formData.date).toLocaleDateString('en-AU', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} at {formData.time}.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              A confirmation email has been sent to {formData.email}. 
              We'll also send you a reminder 24 hours before your reservation.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  date: '',
                  time: '',
                  guests: '2',
                  name: '',
                  email: '',
                  phone: '',
                  specialRequests: ''
                });
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Make Another Reservation
            </button>
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
          <h1 className="text-5xl font-bold text-white mb-6">Reserve Your Table</h1>
          <p className="text-xl text-gray-300">
            Secure your dining experience at Melbourne Bistro. 
            Our team will ensure every detail is perfect for your visit.
          </p>
          
          {/* Live Table Availability */}
          <div className="mt-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{currentAvailableTables}</div>
                <div className="text-sm text-gray-300">Tables Available Tonight</div>
              </div>
              <Users className="text-green-400" size={24} />
            </div>
            <div className="mt-3 text-xs text-gray-400 text-center">
              Updated in real-time • Last update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Reservation Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="inline mr-2" size={16} />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getTodayDate()}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                        errors.date ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Clock className="inline mr-2" size={16} />
                      Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                        errors.time ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Users className="inline mr-2" size={16} />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {guestOptions.map(num => (
                      <option key={num} value={num}>{num} {num === '1' ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="inline mr-2" size={16} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Phone className="inline mr-2" size={16} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="+61 4XX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Dietary restrictions, seating preferences, special occasions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors duration-200 transform hover:scale-105"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4">Reservation Information</h3>
                
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-3">
                    <Clock className="text-yellow-400 mt-1" size={16} />
                    <div>
                      <p className="font-semibold">Operating Hours</p>
                      <p className="text-sm">Tuesday - Sunday: 5:00 PM - 10:00 PM</p>
                      <p className="text-sm">Closed Mondays</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="text-yellow-400 mt-1" size={16} />
                    <div>
                      <p className="font-semibold">Group Bookings</p>
                      <p className="text-sm">For parties of 10 or more, please call us directly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="text-yellow-400 mt-1" size={16} />
                    <div>
                      <p className="font-semibold">Cancellation Policy</p>
                      <p className="text-sm">Please give us 24 hours notice for cancellations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-6 text-gray-900">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="mb-4">
                  Our reservation team is here to assist you with any special requirements or questions.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span className="font-semibold">+61 3 9XXX XXXX</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span className="font-semibold">reservations@melbournebistro.com.au</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationsPage;