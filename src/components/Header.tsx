import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ShoppingBag, Phone, MapPin, User } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useStore();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold text-xl">MB</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Melbourne Bistro</h1>
              <p className="text-xs text-gray-300">Victoria, Australia</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-yellow-400 ${
                  location.pathname === item.href ? 'text-yellow-400' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/reservations"
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              <Calendar size={18} />
              <span>Reserve</span>
            </Link>
            <Link
              to="/order"
              className="flex items-center space-x-2 border border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 relative"
            >
              <ShoppingBag size={18} />
              <span>Order</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors duration-200 hover:text-yellow-400 ${
                    location.pathname === item.href ? 'text-yellow-400' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                <Link
                  to="/reservations"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  <Calendar size={18} />
                  <span>Reserve Table</span>
                </Link>
                <Link
                  to="/order"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 border border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 relative"
                >
                  <ShoppingBag size={18} />
                  <span>Order Online</span>
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-auto">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;