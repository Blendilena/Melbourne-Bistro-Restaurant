import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl">MB</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Melbourne Bistro</h3>
                <p className="text-xs text-gray-300">Victoria, Australia</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Where culinary artistry meets sophisticated dining in the heart of Melbourne. 
              Experience exceptional cuisine crafted with passion and precision.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Menu', href: '/menu' },
                { name: 'Reservations', href: '/reservations' },
                { name: 'Order Online', href: '/order' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-yellow-400 mt-1 flex-shrink-0" size={18} />
                <div className="text-gray-300 text-sm">
                  <p>123 Collins Street</p>
                  <p>Melbourne, VIC 3000</p>
                  <p>Australia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-yellow-400 flex-shrink-0" size={18} />
                <a
                  href="tel:+61391234567"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  +61 3 9XXX XXXX
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="text-yellow-400 flex-shrink-0" size={18} />
                <a
                  href="mailto:info@melbournebistro.com.au"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  info@melbournebistro.com.au
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="mr-2 text-yellow-400" size={18} />
              Opening Hours
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday</span>
                <span className="text-red-400 font-semibold">Closed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tue - Thu</span>
                <span className="text-gray-300">5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fri - Sat</span>
                <span className="text-gray-300">5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-300">5:00 PM - 9:00 PM</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
              <p className="text-yellow-400 text-xs">
                <strong>Holiday Hours:</strong> Check our social media for updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} Melbourne Bistro. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Accessibility
              </a>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="text-red-400" size={14} />
              <span>in Melbourne</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;