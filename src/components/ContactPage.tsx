import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1000);
  };

  const businessHours = [
    { day: 'Monday', hours: 'Closed' },
    { day: 'Tuesday - Thursday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Friday - Saturday', hours: '5:00 PM - 11:00 PM' },
    { day: 'Sunday', hours: '5:00 PM - 9:00 PM' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300">
            We'd love to hear from you. Get in touch with our team for reservations, 
            events, or any questions about Melbourne Bistro.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Location */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Visit Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
                    <p className="text-gray-300">
                      123 Collins Street<br />
                      Melbourne, Victoria 3000<br />
                      Australia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                    <p className="text-gray-300">+61 3 9XXX XXXX</p>
                    <p className="text-sm text-gray-400">Reservations & General Inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-300">info@melbournebistro.com.au</p>
                    <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="mr-3 text-yellow-400" size={24} />
                Opening Hours
              </h2>
              
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="text-gray-300 font-medium">{schedule.day}</span>
                    <span className={`font-semibold ${
                      schedule.hours === 'Closed' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
                <p className="text-yellow-400 text-sm">
                  <strong>Holiday Hours:</strong> Please call or check our social media for holiday schedule updates.
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="#"
                  className="flex flex-col items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                >
                  <Instagram className="text-pink-400 group-hover:scale-110 transition-transform" size={32} />
                  <span className="text-white text-sm mt-2">Instagram</span>
                </a>
                
                <a
                  href="#"
                  className="flex flex-col items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                >
                  <Facebook className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                  <span className="text-white text-sm mt-2">Facebook</span>
                </a>
                
                <a
                  href="#"  
                  className="flex flex-col items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                >
                  <MessageCircle className="text-green-400 group-hover:scale-110 transition-transform" size={32} />
                  <span className="text-white text-sm mt-2">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Reservation Inquiry</option>
                    <option value="event">Private Event</option>
                    <option value="feedback">Feedback</option>
                    <option value="catering">Catering Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-3 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Find Us</h2>
            
            {/* Placeholder for Google Maps */}
            <div className="relative h-96 bg-gray-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto text-yellow-400 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white mb-2">123 Collins Street</h3>
                  <p className="text-gray-300">Melbourne, Victoria 3000</p>
                  <a
                    href="https://maps.google.com/?q=123+Collins+Street+Melbourne+VIC+3000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              
              {/* Map overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/1462332/pexels-photo-1462332.jpeg?auto=compress&cs=tinysrgb&w=800')`
                }}
              ></div>
            </div>
            
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-1">Parking</h4>
                <p className="text-sm text-gray-300">Valet parking available</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-1">Public Transport</h4>
                <p className="text-sm text-gray-300">Collins Street tram stop</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-1">Accessibility</h4>
                <p className="text-sm text-gray-300">Wheelchair accessible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;