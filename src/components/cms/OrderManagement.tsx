import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, User, Phone, MapPin, Search, Filter, Eye, Edit, Trash2, Check, X, Star, Calendar, CreditCard, Package, Truck, ChefHat, Timer, DollarSign, Mail, UtensilsCrossed, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const OrderManagement = () => {
  const { orders, updateOrder, deleteOrder, menuItems, addOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const [selectedItems, setSelectedItems] = useState([]);

  // Force re-render when orders change
  useEffect(() => {
    console.log('OrderManagement: Orders updated:', orders.length);
    setLastUpdate(Date.now());
  }, [orders]);

  // Debug logging
  useEffect(() => {
    console.log('OrderManagement: Current orders:', orders);
    console.log('OrderManagement: Total count:', orders.length);
    
    orders.forEach((order, index) => {
      console.log(`Order ${index + 1}:`, order.customerName, order.type, order.status);
    });
  }, [orders]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusUpdate = (id, newStatus) => {
    updateOrder(id, { status: newStatus });
    toast.success(`Order ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id);
      toast.success('Order deleted');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-600" size={16} />;
      case 'confirmed': return <Check className="text-blue-600" size={16} />;
      case 'preparing': return <ChefHat className="text-orange-600" size={16} />;
      case 'ready': return <Package className="text-green-600" size={16} />;
      case 'completed': return <Check className="text-gray-600" size={16} />;
      case 'cancelled': return <X className="text-red-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getMenuItemImage = (menuItemId) => {
    const item = menuItems.find(item => item.id === menuItemId);
    return item?.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const getMenuItemDetails = (menuItemId) => {
    return menuItems.find(item => item.id === menuItemId);
  };

  const OrderModal = () => {
    if (!selectedOrder) return null;

    const orderDate = new Date(selectedOrder.createdAt);
    
    // Helper function to parse duration strings like "30 minutes", "1 hour", etc.
    const parseDuration = (timeString) => {
      if (timeString === 'ASAP') {
        return 30; // 30 minutes for ASAP orders
      }
      
      // Handle time formats like "19:00", "7:30 PM", etc.
      if (timeString.includes(':')) {
        // This is a specific time, calculate minutes from now
        const [hours, minutes] = timeString.split(':').map(Number);
        const now = new Date();
        const targetTime = new Date(now);
        targetTime.setHours(hours, minutes || 0, 0, 0);
        
        // If target time is in the past, assume it's for tomorrow
        if (targetTime < now) {
          targetTime.setDate(targetTime.getDate() + 1);
        }
        
        return Math.max(15, Math.floor((targetTime.getTime() - now.getTime()) / 60000)); // At least 15 minutes
      }
      
      // Handle duration strings like "30 minutes", "1 hour", "2 hours"
      const match = timeString.match(/(\d+)\s*(minute|hour|min|hr)s?/i);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        
        if (unit.startsWith('hour') || unit.startsWith('hr')) {
          return value * 60; // Convert hours to minutes
        } else {
          return value; // Already in minutes
        }
      }
      
      // Default fallback
      return 30;
    };
    
    const durationMinutes = parseDuration(selectedOrder.scheduledTime);
    const estimatedTime = new Date(orderDate.getTime() + durationMinutes * 60000);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-screen overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Order #{selectedOrder.id.slice(-8)}</h2>
                <p className="text-blue-100">
                  Placed on {format(orderDate, 'MMMM d, yyyy \'at\' h:mm a')}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                {getStatusIcon(selectedOrder.status)}
                <span className="font-semibold capitalize">{selectedOrder.status}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                {selectedOrder.type === 'delivery' ? <Truck size={16} /> : <Package size={16} />}
                <span className="capitalize">{selectedOrder.type}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Customer Information */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="mr-2 text-blue-600" size={20} />
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-gray-900 font-medium">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-gray-400" />
                        <p className="text-gray-900">{selectedOrder.customerEmail}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <div className="flex items-center space-x-2">
                        <Phone size={14} className="text-gray-400" />
                        <p className="text-gray-900">{selectedOrder.customerPhone}</p>
                      </div>
                    </div>
                    {selectedOrder.deliveryAddress && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Delivery Address</label>
                        <div className="flex items-start space-x-2">
                          <MapPin size={14} className="text-gray-400 mt-1" />
                          <p className="text-gray-900">{selectedOrder.deliveryAddress}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="mr-2 text-blue-600" size={20} />
                    Order Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Order Type</label>
                      <p className="text-gray-900 font-medium capitalize">{selectedOrder.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Scheduled Time</label>
                      <p className="text-gray-900">{selectedOrder.scheduledTime}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Estimated Ready</label>
                      <p className="text-gray-900">{format(estimatedTime, 'h:mm a')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Method</label>
                      <div className="flex items-center space-x-2">
                        <CreditCard size={14} className="text-gray-400" />
                        <p className="text-gray-900 capitalize">{selectedOrder.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      handleStatusUpdate(selectedOrder.id, e.target.value);
                      setSelectedOrder({...selectedOrder, status: e.target.value});
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Items */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <UtensilsCrossed className="mr-2 text-blue-600" size={20} />
                  Order Items ({selectedOrder.items.length})
                </h3>
                
                <div className="space-y-4 mb-6">
                  {selectedOrder.items.map((item, index) => {
                    const menuItem = getMenuItemDetails(item.menuItemId);
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <img
                            src={getMenuItemImage(item.menuItemId)}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                                {menuItem?.description && (
                                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{menuItem.description}</p>
                                )}
                                {menuItem?.preparationTime && (
                                  <div className="flex items-center space-x-1 mt-2">
                                    <Timer size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-500">{menuItem.preparationTime} min prep</span>
                                  </div>
                                )}
                                {item.specialInstructions && (
                                  <div className="mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <p className="text-sm text-yellow-800">
                                      <strong>Special Instructions:</strong> {item.specialInstructions}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-gray-500">Qty:</span>
                                  <span className="font-semibold text-gray-900">{item.quantity}</span>
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ${item.price} each
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="mr-2 text-green-600" size={20} />
                    Order Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({selectedOrder.items.length} items)</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedOrder.deliveryFee > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (GST)</span>
                      <span>${selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Order ID: {selectedOrder.id}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateOrderModal = () => {
    const watchedType = watch('type');
    
    const addMenuItem = (menuItem) => {
      const existingItem = selectedItems.find(item => item.menuItemId === menuItem.id);
      if (existingItem) {
        setSelectedItems(selectedItems.map(item => 
          item.menuItemId === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setSelectedItems([...selectedItems, {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
          specialInstructions: ''
        }]);
      }
    };

    const removeMenuItem = (menuItemId) => {
      setSelectedItems(selectedItems.filter(item => item.menuItemId !== menuItemId));
    };

    const updateQuantity = (menuItemId, quantity) => {
      if (quantity <= 0) {
        removeMenuItem(menuItemId);
      } else {
        setSelectedItems(selectedItems.map(item => 
          item.menuItemId === menuItemId ? { ...item, quantity } : item
        ));
      }
    };

    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = watchedType === 'delivery' ? 8.50 : 0;
    const tax = (subtotal + deliveryFee) * 0.1;
    const total = subtotal + deliveryFee + tax;

    const onSubmit = (data) => {
      if (selectedItems.length === 0) {
        toast.error('Please add at least one item to the order');
        return;
      }

      const newOrder = {
        id: `ord_${Date.now()}`,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        items: selectedItems,
        type: data.type,
        status: 'confirmed',
        scheduledTime: data.scheduledTime || 'ASAP',
        paymentMethod: data.paymentMethod,
        subtotal,
        deliveryFee,
        tax,
        total,
        deliveryAddress: data.type === 'delivery' ? data.deliveryAddress : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addOrder(newOrder);
      setShowCreateModal(false);
      setSelectedItems([]);
      reset();
      toast.success('Order created successfully!');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-screen overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Plus size={24} />
                </div>
                <h2 className="text-2xl font-bold">Create New Order</h2>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedItems([]);
                  reset();
                }}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                      <input
                        {...register('customerName', { required: 'Name is required' })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter customer name"
                      />
                      {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        {...register('customerPhone', { required: 'Phone is required' })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+61 4XX XXX XXX"
                      />
                      {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      {...register('customerEmail', { required: 'Email is required' })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="customer@email.com"
                    />
                    {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                      <select
                        {...register('type', { required: 'Order type is required' })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                      </select>
                      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <select
                        {...register('paymentMethod', { required: 'Payment method is required' })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select payment</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="cash">Cash</option>
                      </select>
                      {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
                    </div>
                  </div>

                  {watchedType === 'delivery' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                      <textarea
                        {...register('deliveryAddress', { required: watchedType === 'delivery' ? 'Address is required for delivery' : false })}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter full delivery address"
                      />
                      {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
                    <select
                      {...register('scheduledTime')}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="ASAP">ASAP (20-30 mins)</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="1 hour">1 hour</option>
                      <option value="1 hour 30 minutes">1 hour 30 minutes</option>
                    </select>
                  </div>
                </div>

                {/* Menu Items Selection */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Select Menu Items</h3>
                  
                  <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                    <div className="grid gap-2 p-4">
                      {menuItems.slice(0, 10).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">${item.price}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => addMenuItem(item)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Items */}
              {selectedItems.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items ({selectedItems.length})</h3>
                  <div className="space-y-3 mb-6">
                    {selectedItems.map((item) => (
                      <div key={item.menuItemId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">${item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-8 h-8 rounded flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-8 h-8 rounded flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeMenuItem(item.menuItemId)}
                            className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center"
                          >
                            ×
                          </button>
                          <span className="font-bold text-gray-900 w-20 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-100 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>${deliveryFee.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax (GST)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedItems([]);
                    reset();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" key={lastUpdate}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total: {orders.length} orders
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Order</span>
          </button>
        </div>
      </div>

      {/* Enhanced Debug Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">🛍️ Debug Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
          <div>
            <p><strong>Orders in store:</strong> {orders.length}</p>
            <p><strong>Filtered orders:</strong> {filteredOrders.length}</p>
            <p><strong>Last update:</strong> {new Date(lastUpdate).toLocaleTimeString()}</p>
          </div>
          <div>
            {orders.length > 0 && (
              <>
                <p><strong>Latest order:</strong> {orders[orders.length - 1]?.customerName}</p>
                <p><strong>Latest type:</strong> {orders[orders.length - 1]?.type}</p>
                <p><strong>Latest status:</strong> {orders[orders.length - 1]?.status}</p>
              </>
            )}
          </div>
        </div>
        
        {orders.length > 0 && (
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-xs text-green-600">
              <strong>All orders:</strong> {orders.map(o => `${o.customerName} (${o.type})`).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{filteredOrders.length} results</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    <div className="text-sm text-gray-500">{order.customerPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {order.type === 'delivery' ? <MapPin className="mr-2 text-gray-400" size={16} /> : <ShoppingBag className="mr-2 text-gray-400" size={16} />}
                    <span className="text-sm text-gray-900 capitalize">{order.type}</span>
                  </div>
                  <div className="text-sm text-gray-500">{order.scheduledTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">{order.items.length} items</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                    className="text-green-600 hover:text-green-900"
                    disabled={order.status === 'confirmed'}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters' 
                : 'Orders will appear here when customers place them'}
            </p>
            {orders.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Debug:</strong> There are {orders.length} orders in the system, but none match your current filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && <OrderModal />}
      {showCreateModal && <CreateOrderModal />}
    </div>
  );
};

export default OrderManagement;