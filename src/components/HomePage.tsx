import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, ArrowRight, Play, Calendar, ShoppingBag, Award, Clock, MapPin,
  Cloud, Sun, CloudRain, Snowflake, Wind, Eye, Users, Wine, Camera,
  TrendingUp, Trophy, Newspaper, Heart, ChefHat, Sparkles, Gift,
  Instagram, Facebook, Twitter, MessageSquare, ThumbsUp, Quote,
  ExternalLink, Check
} from 'lucide-react';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentWeather, setCurrentWeather] = useState('sunny');
  const [availableTables, setAvailableTables] = useState(12);
  const [currentReview, setCurrentReview] = useState(0);
  const [currentPress, setCurrentPress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [flavorProfile, setFlavorProfile] = useState({});
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely phenomenal dining experience! The atmosphere is sophisticated yet welcoming, and every dish was a masterpiece.",
      location: "Melbourne, VIC"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Melbourne Bistro sets the gold standard for fine dining. Impeccable service, innovative cuisine, and an unforgettable evening.",
      location: "Richmond, VIC"
    },
    {
      name: "Emma Williams",
      rating: 5,
      text: "From the moment we walked in, we were treated like royalty. The chef's tasting menu was an absolute revelation.",
      location: "Carlton, VIC"
    }
  ];

  const weatherMenuSuggestions = {
    sunny: {
      icon: <Sun className="text-yellow-400" size={24} />,
      title: "Perfect Day for Our Terrace",
      dishes: ["Grilled Barramundi", "Summer Salad", "Citrus Sorbet"],
      description: "Light, fresh dishes perfect for Melbourne's beautiful weather"
    },
    cloudy: {
      icon: <Cloud className="text-gray-400" size={24} />,
      title: "Cozy Indoor Dining",
      dishes: ["Truffle Risotto", "Braised Lamb", "Chocolate Soufflé"],
      description: "Comfort dishes to warm your soul on this overcast day"
    },
    rainy: {
      icon: <CloudRain className="text-blue-400" size={24} />,
      title: "Rainy Day Comfort",
      dishes: ["Beef Wellington", "Mushroom Soup", "Warm Apple Tart"],
      description: "Hearty, warming dishes perfect for Melbourne's rainy weather"
    }
  };

  const socialFeed = [
    {
      platform: 'instagram',
      user: '@foodie_melbourne',
      content: 'The wagyu at @melbournebistro is absolutely divine! 🥩✨',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 234,
      time: '2h ago',
      url: 'https://instagram.com/p/example1'
    },
    {
      platform: 'facebook',
      user: 'Emma Thompson',
      content: 'Celebrating our anniversary at Melbourne Bistro - what an incredible experience!',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 89,
      time: '4h ago',
      url: 'https://facebook.com/post/example1'
    },
    {
      platform: 'twitter',
      user: '@melbourne_eats',
      content: 'Just had the most amazing tasting menu @melbournebistro. Chef Marcus is a genius! 👨‍🍳',
      likes: 156,
      time: '6h ago',
      url: 'https://twitter.com/status/example1'
    }
  ];

  const foodJourney = [
    {
      location: "Yarra Valley",
      ingredient: "Premium Wagyu Beef",
      distance: "65km",
      description: "Grass-fed cattle from sustainable farms",
      id: "yarra-valley"
    },
    {
      location: "Port Phillip Bay",
      ingredient: "Fresh Barramundi",
      distance: "45km", 
      description: "Sustainably caught daily by local fishermen",
      id: "port-phillip-bay"
    },
    {
      location: "Mornington Peninsula",
      ingredient: "Organic Vegetables",
      distance: "75km",
      description: "Seasonal produce from family-owned farms",
      id: "mornington-peninsula"
    }
  ];

  const liveReviews = [
    {
      platform: "Google",
      rating: 5,
      text: "Outstanding food and service. The chef's attention to detail is remarkable.",
      author: "James Wilson",
      time: "1 hour ago"
    },
    {
      platform: "Yelp", 
      rating: 5,
      text: "Best dining experience in Melbourne. Every course was perfection.",
      author: "Lisa Chen",
      time: "3 hours ago"
    },
    {
      platform: "TripAdvisor",
      rating: 5,
      text: "Exceptional cuisine and ambiance. A must-visit restaurant in Melbourne.",
      author: "Robert Smith",
      time: "5 hours ago"
    }
  ];

  const pressFeatures = [
    {
      id: "the-age-2024",
      publication: "The Age",
      headline: "Melbourne Bistro Redefines Fine Dining",
      excerpt: "Chef Marcus Thompson's innovative approach to Australian cuisine...",
      date: "March 2024"
    },
    {
      id: "good-food-guide-2024",
      publication: "Good Food Guide",
      headline: "Three Hat Excellence in the Heart of Melbourne",
      excerpt: "A masterclass in culinary artistry and hospitality...",
      date: "February 2024"
    },
    {
      id: "broadsheet-melbourne-2024",
      publication: "Broadsheet Melbourne",
      headline: "The Restaurant Everyone's Talking About",
      excerpt: "Melbourne Bistro has quickly become the city's most sought-after...",
      date: "January 2024"
    }
  ];

  const celebrities = [
    {
      name: "Hugh Jackman",
      dish: "Wagyu Beef Tenderloin",
      quote: "Absolutely incredible! Best meal I've had in Melbourne.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Cate Blanchett", 
      dish: "Truffle Arancini",
      quote: "The attention to detail is extraordinary.",
      image: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Chris Hemsworth",
      dish: "Ocean Barramundi",
      quote: "Fresh, innovative, and perfectly executed.",
      image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const upcomingEvents = [
    {
      id: "wine-pairing-dinner",
      title: "Wine Pairing Dinner",
      date: "March 15, 2024",
      description: "5-course menu with premium Victorian wines",
      price: "$185 per person",
      spots: 8
    },
    {
      id: "chefs-table-experience",
      title: "Chef's Table Experience",
      date: "March 22, 2024", 
      description: "Exclusive 8-course tasting with Chef Marcus",
      price: "$295 per person",
      spots: 3
    },
    {
      id: "truffle-season-special",
      title: "Truffle Season Special",
      date: "March 29, 2024",
      description: "Limited menu featuring fresh Australian truffles",
      price: "$225 per person",
      spots: 12
    }
  ];

  const awards = [
    { year: "2024", award: "Restaurant of the Year", organization: "Melbourne Dining Awards" },
    { year: "2023", award: "Three Hat Rating", organization: "Good Food Guide Australia" },
    { year: "2023", award: "Chef of the Year", organization: "Victorian Culinary Excellence" },
    { year: "2022", award: "Sustainable Dining Award", organization: "Green Restaurant Certification" }
  ];

  const quizQuestions = [
    {
      question: "What flavors do you prefer?",
      options: ["Bold & Spicy", "Subtle & Delicate", "Rich & Savory", "Fresh & Light"]
    },
    {
      question: "Your ideal protein?",
      options: ["Premium Beef", "Fresh Seafood", "Plant-Based", "Poultry"]
    },
    {
      question: "Preferred cooking style?",
      options: ["Grilled", "Braised", "Raw/Cured", "Roasted"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % liveReviews.length);
    }, 4000);
    return () => clearInterval(reviewTimer);
  }, [liveReviews.length]);

  useEffect(() => {
    const pressTimer = setInterval(() => {
      setCurrentPress((prev) => (prev + 1) % pressFeatures.length);
    }, 6000);
    return () => clearInterval(pressTimer);
  }, [pressFeatures.length]);

  useEffect(() => {
    // Simulate weather API call
    const weathers = ['sunny', 'cloudy', 'rainy'];
    setCurrentWeather(weathers[Math.floor(Math.random() * weathers.length)]);
    
    // Simulate live table availability updates
    const availabilityTimer = setInterval(() => {
      setAvailableTables(prev => Math.max(0, prev + (Math.random() > 0.7 ? -1 : Math.random() > 0.3 ? 1 : 0)));
    }, 30000);
    
    return () => clearInterval(availabilityTimer);
  }, []);

  const handleQuizAnswer = (answer) => {
    setFlavorProfile(prev => ({
      ...prev,
      [quizStep]: answer
    }));
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // Quiz completed - show results
      setTimeout(() => {
        setShowQuiz(false);
        setQuizStep(0);
        setFlavorProfile({});
      }, 3000);
    }
  };

  const handleSocialClick = (post) => {
    window.open(post.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          ></div>
        </div>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Melbourne
            <span className="block text-yellow-400">Bistro</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Where culinary artistry meets sophisticated dining in the heart of Victoria
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/reservations"
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Calendar size={20} />
              <span>Reserve Your Table</span>
            </Link>
            <Link
              to="/menu"
              className="flex items-center space-x-2 border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore Menu</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Live Availability Counter */}
      <section className="py-4 bg-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 text-gray-900">
            <Eye className="animate-pulse" size={20} />
            <span className="font-bold text-lg">
              {availableTables} tables available for tonight
            </span>
            <Users size={20} />
          </div>
        </div>
      </section>

      {/* Weather-Based Menu Suggestions */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Today's Weather-Inspired Menu</h2>
            <p className="text-xl text-gray-300">Curated selections based on Melbourne's current conditions</p>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              {weatherMenuSuggestions[currentWeather].icon}
              <h3 className="text-2xl font-bold text-white ml-3">
                {weatherMenuSuggestions[currentWeather].title}
              </h3>
            </div>
            
            <p className="text-gray-300 text-center mb-8">
              {weatherMenuSuggestions[currentWeather].description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {weatherMenuSuggestions[currentWeather].dishes.map((dish, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors">
                  <h4 className="text-yellow-400 font-semibold">{dish}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Daily Special Video */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Chef's Daily Special</h2>
            <p className="text-xl text-gray-300">A personal message from Chef Marcus Thompson</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-yellow-700 transition-colors cursor-pointer">
                    <Play className="text-gray-900 ml-1" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Today's Special: Truffle Risotto</h3>
                  <p className="text-gray-300">Chef Marcus explains the inspiration behind today's creation</p>
                </div>
              </div>
              
              <div className="p-6 bg-gray-800">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.pexels.com/photos/1482329/pexels-photo-1482329.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Chef Marcus"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">Chef Marcus Thompson</h4>
                    <p className="text-gray-400 text-sm">Executive Chef & Owner</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Flavor Profile Quiz */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Discover Your Perfect Dish</h2>
          <p className="text-xl text-gray-300 mb-8">Take our flavor profile quiz for personalized recommendations</p>
          
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <Sparkles size={24} />
              <span>Start Flavor Quiz</span>
            </button>
          ) : (
            <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto">
              {quizStep < quizQuestions.length ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {quizQuestions[quizStep].question}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {quizQuestions[quizStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option)}
                        className="bg-gray-800 hover:bg-yellow-600 hover:text-gray-900 text-white p-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Check className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-white mb-4">Perfect Match Found!</h3>
                  <p className="text-gray-300 mb-6">Based on your preferences, we recommend our Wagyu Beef Tenderloin</p>
                  <Link
                    to="/menu"
                    className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Full Menu
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Food Journey Map */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">From Farm to Table</h2>
            <p className="text-xl text-gray-300">Trace the journey of our premium ingredients</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {foodJourney.map((journey, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <MapPin className="text-yellow-400 mr-3" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-white">{journey.location}</h3>
                    <p className="text-gray-400 text-sm">{journey.distance} from Melbourne</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">{journey.ingredient}</h4>
                <p className="text-gray-300">{journey.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-400 text-sm font-semibold">✓ Sustainable</span>
                  <Link
                    to={`/suppliers/${journey.id}`}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center space-x-1 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Social Media Feed */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Live from Our Guests</h2>
            <p className="text-xl text-gray-300">See what diners are sharing right now</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {socialFeed.map((post, index) => (
              <div 
                key={index} 
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleSocialClick(post)}
              >
                <img
                  src={post.image}
                  alt="Social post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {post.platform === 'instagram' && <Instagram className="text-pink-400 mr-2" size={20} />}
                    {post.platform === 'facebook' && <Facebook className="text-blue-400 mr-2" size={20} />}
                    {post.platform === 'twitter' && <Twitter className="text-blue-400 mr-2" size={20} />}
                    <span className="text-white font-semibold">{post.user}</span>
                    <span className="text-gray-400 text-sm ml-auto">{post.time}</span>
                    <ExternalLink className="text-gray-400 ml-2" size={16} />
                  </div>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  <div className="flex items-center">
                    <ThumbsUp className="text-red-400 mr-2" size={16} />
                    <span className="text-gray-400 text-sm">{post.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Events Calendar */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Exclusive Events</h2>
            <p className="text-xl text-gray-300">Join us for special culinary experiences</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center mb-4">
                  <Calendar className="text-yellow-400 mr-3" size={24} />
                  <span className="text-gray-300 font-semibold">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-yellow-400 font-bold text-lg">{event.price}</span>
                  <span className="text-green-400 text-sm">{event.spots} spots left</span>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-2 rounded-lg font-semibold transition-colors block text-center"
                >
                  Reserve Spot
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrity Guest Wall */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Celebrity Favorites</h2>
            <p className="text-xl text-gray-300">Dishes loved by our notable guests</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {celebrities.map((celebrity, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors">
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-white mb-2">{celebrity.name}</h3>
                <p className="text-yellow-400 font-semibold mb-3">{celebrity.dish}</p>
                <Quote className="text-gray-600 mx-auto mb-2" size={24} />
                <p className="text-gray-300 italic">"{celebrity.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Review Stream */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Live Reviews</h2>
            <p className="text-xl text-gray-300">Real-time feedback from our guests</p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              {[...Array(liveReviews[currentReview].rating)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={24} />
              ))}
            </div>
            
            <blockquote className="text-xl text-gray-200 mb-6 text-center italic">
              "{liveReviews[currentReview].text}"
            </blockquote>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-yellow-400">
                {liveReviews[currentReview].author}
              </p>
              <p className="text-gray-400">
                {liveReviews[currentReview].platform} • {liveReviews[currentReview].time}
              </p>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {liveReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentReview === index ? 'bg-yellow-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Award Timeline */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Award Timeline</h2>
            <p className="text-xl text-gray-300">Our journey of culinary excellence</p>
          </div>
          
          <div className="space-y-8">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center space-x-6 bg-gray-900 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Trophy className="text-gray-900" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-2xl font-bold text-yellow-400">{award.year}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{award.organization}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{award.award}</h3>
                </div>
                <Award className="text-yellow-400" size={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Mentions Carousel */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">In the Press</h2>
            <p className="text-xl text-gray-300">What critics are saying about us</p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center mb-6">
              <Newspaper className="text-yellow-400 mr-3" size={32} />
              <div>
                <h3 className="text-xl font-bold text-white">{pressFeatures[currentPress].publication}</h3>
                <p className="text-gray-400">{pressFeatures[currentPress].date}</p>
              </div>
            </div>
            
            <h4 className="text-2xl font-bold text-white mb-4">
              {pressFeatures[currentPress].headline}
            </h4>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {pressFeatures[currentPress].excerpt}
            </p>
            
            <Link
              to={`/press/${pressFeatures[currentPress].id}`}
              className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center space-x-2 transition-colors"
            >
              <span>Read Full Article</span>
              <ArrowRight size={16} />
            </Link>
            
            <div className="flex justify-center mt-8 space-x-2">
              {pressFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPress(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentPress === index ? 'bg-yellow-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Member Portal Teaser */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="mx-auto mb-6 text-gray-900" size={48} />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our Exclusive Members Club
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Get priority reservations, exclusive events, personalized dining experiences, and special member pricing
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/10 rounded-lg p-4">
              <Calendar className="mx-auto mb-2 text-gray-900" size={24} />
              <h4 className="font-semibold text-gray-900">Priority Booking</h4>
            </div>
            <div className="bg-gray-900/10 rounded-lg p-4">
              <Wine className="mx-auto mb-2 text-gray-900" size={24} />
              <h4 className="font-semibold text-gray-900">Exclusive Events</h4>
            </div>
            <div className="bg-gray-900/10 rounded-lg p-4">
              <Heart className="mx-auto mb-2 text-gray-900" size={24} />
              <h4 className="font-semibold text-gray-900">Personal Concierge</h4>
            </div>
          </div>
          
          <Link
            to="/membership"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 transform hover:scale-105 inline-block"
          >
            Become a Member
          </Link>
        </div>
      </section>

      {/* Virtual Menu Tasting Teaser */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera className="mx-auto mb-6 text-yellow-400" size={48} />
          <h2 className="text-4xl font-bold text-white mb-6">
            Virtual Menu Tasting
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience our dishes in stunning 3D before you visit. Use your phone's camera to preview our culinary creations in your own space.
          </p>
          
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="text-gray-900" size={24} />
                </div>
                <p className="text-white">AR Menu Preview</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Point your camera at any surface to see our dishes in 3D</p>
          </div>
          
          <Link
            to="/menu"
            className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 transform hover:scale-105"
          >
            Try Virtual Tasting
          </Link>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-300">
              Real experiences from our valued customers
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gray-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={24} />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div>
                <p className="text-lg font-semibold text-yellow-400">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-400">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentTestimonial === index ? 'bg-yellow-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Join us for an evening of exceptional dining, where every detail is crafted to perfection
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservations"
              className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Calendar size={20} />
              <span>Make Reservation</span>
            </Link>
            <Link
              to="/order"
              className="flex items-center space-x-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingBag size={20} />
              <span>Order Takeaway</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;