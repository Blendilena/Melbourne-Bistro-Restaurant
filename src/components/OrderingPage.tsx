import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, Clock, CreditCard, MapPin, Phone, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useWebSocket } from '../hooks/useWebSocket';
import toast from 'react-hot-toast';

const OrderingPage = () => {
  const { menuItems, cart, updateCartItem, removeFromCart, clearCart, addToCart, addOrder } = useStore();
  const { triggerOrderNotification } = useWebSocket();
  const [orderType, setOrderType] = useState('pickup');
  const [scheduledTime, setScheduledTime] = useState('asap');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCartFromMenu = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  const updateQuantity = (id, change) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      const newQuantity = cartItem.quantity + change;
      if (newQuantity > 0) {
        updateCartItem(id, newQuantity);
      } else {
        removeFromCart(id);
      }
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 8.50 : 0;
  const tax = (subtotal + deliveryFee) * 0.1;
  const total = subtotal + deliveryFee + tax;

  const timeSlots = [
    'ASAP (20-30 mins)',
    '30 minutes',
    '45 minutes', 
    '1 hour',
    '1 hour 15 mins',
    '1 hour 30 mins'
  ];

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (orderType === 'delivery' && !customerInfo.address) {
      toast.error('Please provide a delivery address');
      return;
    }

    const newOrder = {
      id: `ord_${Date.now()}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      items: cart.map(item => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions
      })),
      type: orderType,
      status: 'pending',
      scheduledTime: scheduledTime === 'asap' ? 'ASAP' : scheduledTime,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      deliveryAddress: orderType === 'delivery' ? customerInfo.address : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Debug logging
    console.log('Creating order:', newOrder);
    
    // Add to store first
    addOrder(newOrder);
    
    // Log after adding to store
    console.log('Order added to store');
    
    // Then trigger notification
    triggerOrderNotification(newOrder);
    
    clearCart();
    setShowCheckout(false);
    setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    
    toast.success('Order placed successfully! You will receive a confirmation email shortly.');
  };

  const CheckoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Complete Your Order</h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="+61 4XX XXX XXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {orderType === 'delivery' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your full delivery address"
                  rows={3}
                />
              </div>
            )}

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white border-t border-gray-700 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Order Online</h1>
          <p className="text-xl text-gray-300">
            Enjoy Melbourne Bistro's premium cuisine from the comfort of your home
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Select Your Items</h2>
              
              {/* Order Type Selection */}
              <div className="flex bg-gray-800 rounded-lg p-1 mb-6 w-fit">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    orderType === 'pickup'
                      ? 'bg-yellow-600 text-gray-900'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Pickup
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    orderType === 'delivery'
                      ? 'bg-yellow-600 text-gray-900'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Delivery
                </button>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {menuItems.slice(0, 8).map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <span className="text-lg font-bold text-yellow-400">${item.price}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                    <button
                      onClick={() => addToCartFromMenu(item)}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus size={18} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <ShoppingBag className="mr-2 text-yellow-400" size={24} />
                Your Order ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-yellow-400 font-semibold">${item.price}</p>
                          {item.specialInstructions && (
                            <p className="text-gray-400 text-xs">{item.specialInstructions}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Time Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Clock className="inline mr-2" size={16} />
                      {orderType === 'pickup' ? 'Pickup' : 'Delivery'} Time
                    </label>
                    <select
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
                    >
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={index === 0 ? 'asap' : slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <CreditCard className="inline mr-2" size={16} />
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-yellow-600"
                        />
                        <span className="text-white">Credit/Debit Card</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-yellow-600"
                        />
                        <span className="text-white">Cash on {orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {orderType === 'delivery' && (
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>${deliveryFee.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax (GST)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-white border-t border-gray-700 pt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-3 rounded-lg font-bold text-lg transition-colors"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Contact Info */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-2">Questions about your order?</p>
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <Phone size={14} />
                      <span className="text-sm">+61 3 9XXX XXXX</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && <CheckoutModal />}
    </div>
  );
};

export default OrderingPage;