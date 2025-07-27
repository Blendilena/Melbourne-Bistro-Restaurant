import React, { useState } from 'react';
import { Filter, Search, QrCode, Leaf, WheatOff, Heart, X, Plus, Minus, Eye, Star, Clock, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const MenuPage = () => {
  const { menuItems, addToCart, cart } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    glutenFree: false,
    lowFat: false,
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDietary = Object.entries(dietaryFilters).every(([key, value]) => {
      if (!value) return true;
      return item.dietary.includes(key);
    });
    return matchesSearch && matchesCategory && matchesDietary;
  });

  const getDietaryIcon = (dietary) => {
    switch (dietary) {
      case 'vegan':
        return <Leaf className="text-green-400" size={16} />;
      case 'glutenFree':
        return <WheatOff className="text-blue-400" size={16} />;
      case 'lowFat':
        return <Heart className="text-red-400" size={16} />;
      default:
        return null;
    }
  };

  const handleQuickView = (item) => {
    setSelectedItem(item);
    setShowQuickView(true);
  };

  const handleAddToCart = (item, quantity = 1, specialInstructions = '') => {
    addToCart(item, quantity, specialInstructions);
    toast.success(`${item.name} added to cart!`);
  };

  const getCartItemCount = (itemId) => {
    return cart.filter(cartItem => cartItem.menuItemId === itemId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  const QuickViewModal = () => {
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');

    if (!selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="relative">
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 z-10 bg-gray-900 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-3xl font-bold text-white">{selectedItem.name}</h2>
                  <span className="text-3xl font-bold text-yellow-400">${selectedItem.price}</span>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedItem.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((ingredient, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Preparation Time</h4>
                      <div className="flex items-center text-gray-300">
                        <Clock className="mr-2" size={16} />
                        <span>{selectedItem.preparationTime} minutes</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Popularity</h4>
                      <div className="flex items-center text-gray-300">
                        <Users className="mr-2" size={16} />
                        <span>{selectedItem.popularity}% loved</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedItem.nutritionalInfo && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Nutritional Information</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                        <div>Calories: {selectedItem.nutritionalInfo.calories}</div>
                        <div>Protein: {selectedItem.nutritionalInfo.protein}g</div>
                        <div>Carbs: {selectedItem.nutritionalInfo.carbs}g</div>
                        <div>Fat: {selectedItem.nutritionalInfo.fat}g</div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Dietary Information</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.dietary.map((diet, index) => (
                        <div key={index} className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                          {getDietaryIcon(diet)}
                          <span className="text-gray-300 text-sm ml-1">{diet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedItem.allergens.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Allergens</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.allergens.map((allergen, index) => (
                          <span key={index} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedItem.chefNotes && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Chef's Notes</h4>
                      <p className="text-gray-300 italic">{selectedItem.chefNotes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Quantity</h4>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-xl font-semibold text-white w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Special Instructions</h4>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or modifications..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-300">Total:</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${(selectedItem.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleAddToCart(selectedItem, quantity, specialInstructions);
                      setShowQuickView(false);
                      setQuantity(1);
                      setSpecialInstructions('');
                    }}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors duration-200 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <QrCode className="text-yellow-400 mr-2" size={20} />
                    <span className="text-gray-300">AR Code: {selectedItem.arCode}</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Scan with your phone to see this dish in 3D
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our Menu</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated selection of contemporary Australian cuisine, 
            featuring premium local ingredients and innovative culinary techniques
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-800 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-yellow-600 text-gray-900'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Dietary Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Filter size={18} />
                <span>Dietary Filters</span>
              </button>
              
              {showFilters && (
                <div className="flex items-center space-x-4 bg-gray-700 px-4 py-2 rounded-lg">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters.vegan}
                      onChange={(e) => setDietaryFilters({...dietaryFilters, vegan: e.target.checked})}
                      className="rounded text-yellow-600"
                    />
                    <Leaf className="text-green-400" size={16} />
                    <span className="text-white text-sm">Vegan</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters.glutenFree}
                      onChange={(e) => setDietaryFilters({...dietaryFilters, glutenFree: e.target.checked})}
                      className="rounded text-yellow-600"
                    />
                    <WheatOff className="text-blue-400" size={16} />
                    <span className="text-white text-sm">Gluten-Free</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters.lowFat}
                      onChange={(e) => setDietaryFilters({...dietaryFilters, lowFat: e.target.checked})}
                      className="rounded text-yellow-600"
                    />
                    <Heart className="text-red-400" size={16} />
                    <span className="text-white text-sm">Heart Healthy</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const cartCount = getCartItemCount(item.id);
              
              return (
                <div key={item.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-2">
                      <button 
                        onClick={() => handleQuickView(item)}
                        className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Eye size={20} />
                        <span className="text-xs font-medium">Quick View</span>
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-2">
                      <button className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors">
                        <QrCode size={20} />
                        <span className="text-xs font-medium">AR View</span>
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex space-x-1">
                      {item.dietary.map((dietary) => (
                        <div key={dietary} className="bg-gray-900/80 backdrop-blur-sm rounded-full p-1">
                          {getDietaryIcon(dietary)}
                        </div>
                      ))}
                    </div>
                    {!item.available && (
                      <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Currently Unavailable</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-2xl font-bold text-yellow-400">
                        ${item.price}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{item.preparationTime}min</span>
                        </div>
                        <div className="flex items-center">
                          <Star size={14} className="mr-1 text-yellow-400" />
                          <span>{item.popularity}%</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-yellow-400">{item.arCode}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleQuickView(item)}
                        disabled={!item.available}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.available}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                        <span>Add to Cart</span>
                        {cartCount > 0 && (
                          <span className="bg-gray-900 text-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            {cartCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No items match your current filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* AR Information */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-8">
            <QrCode className="mx-auto mb-4 text-gray-900" size={48} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience Our Dishes in AR
            </h3>
            <p className="text-gray-800 leading-relaxed">
              Scan the AR codes next to each dish with your smartphone camera to see stunning 3D previews 
              of our culinary creations before you order. Experience the future of dining!
            </p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && <QuickViewModal />}
    </div>
  );
};

export default MenuPage;