import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, Search, Filter, Eye, Edit, Trash2, Check, X, Plus, MapPin, Star, Gift, Heart, Utensils } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ReservationManagement = () => {
  const { reservations, updateReservation, deleteReservation, addReservation } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Force re-render when reservations change
  useEffect(() => {
    console.log('ReservationManagement: Reservations updated:', reservations.length);
    setLastUpdate(Date.now());
  }, [reservations]);

  // Debug logging to see what's in the store
  useEffect(() => {
    console.log('ReservationManagement: Current reservations:', reservations);
    console.log('ReservationManagement: Total count:', reservations.length);
    
    // Log individual reservations for debugging
    reservations.forEach((res, index) => {
      console.log(`Reservation ${index + 1}:`, res.customerName, res.date, res.status);
    });
  }, [reservations]);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesDate = !dateFilter || reservation.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusUpdate = (id, newStatus) => {
    updateReservation(id, { status: newStatus });
    toast.success(`Reservation ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      deleteReservation(id);
      toast.success('Reservation deleted');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'seated': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ReservationModal = () => {
    if (!selectedReservation) return null;

    const reservationDate = new Date(selectedReservation.date + ' ' + selectedReservation.time);
    const isUpcoming = reservationDate > new Date();
    const dayOfWeek = format(reservationDate, 'EEEE');
    const formattedDate = format(reservationDate, 'MMMM d, yyyy');
    const formattedTime = format(reservationDate, 'h:mm a');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-screen overflow-y-auto shadow-2xl">
          {/* Elegant Header */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white p-8 rounded-t-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-t-3xl"></div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 z-10"
            >
              <X size={24} />
            </button>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                  <Calendar size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">Reservation Details</h2>
                  <p className="text-blue-100 text-lg">
                    {dayOfWeek}, {formattedDate} at {formattedTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                  selectedReservation.status === 'confirmed' ? 'bg-green-500/20 border-green-300' :
                  selectedReservation.status === 'pending' ? 'bg-yellow-500/20 border-yellow-300' :
                  selectedReservation.status === 'seated' ? 'bg-blue-500/20 border-blue-300' :
                  selectedReservation.status === 'completed' ? 'bg-gray-500/20 border-gray-300' :
                  'bg-red-500/20 border-red-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedReservation.status === 'confirmed' ? 'bg-green-400' :
                    selectedReservation.status === 'pending' ? 'bg-yellow-400' :
                    selectedReservation.status === 'seated' ? 'bg-blue-400' :
                    selectedReservation.status === 'completed' ? 'bg-gray-400' :
                    'bg-red-400'
                  }`}></div>
                  <span className="font-semibold capitalize">{selectedReservation.status}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-blue-100">
                  <Users size={20} />
                  <span className="font-semibold">{selectedReservation.guests} Guests</span>
                </div>
                
                {isUpcoming && (
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <Clock size={16} />
                    <span className="text-sm">Upcoming</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Customer Information */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="bg-blue-500 p-2 rounded-lg mr-3">
                      <Users className="text-white" size={20} />
                    </div>
                    Guest Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Guest Name</label>
                      <p className="text-lg font-semibold text-gray-900">{selectedReservation.customerName}</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Email Address</label>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-400" />
                        <p className="text-gray-900">{selectedReservation.customerEmail}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Phone Number</label>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-400" />
                        <p className="text-gray-900">{selectedReservation.customerPhone}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Party Size</label>
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-gray-400" />
                        <p className="text-lg font-semibold text-gray-900">{selectedReservation.guests} Guests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Date & Time Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="bg-blue-500 p-2 rounded-lg mr-3">
                        <Calendar className="text-white" size={20} />
                      </div>
                      Reservation Schedule
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Date</label>
                        <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                        <p className="text-sm text-gray-600">{dayOfWeek}</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Time</label>
                        <p className="text-lg font-semibold text-gray-900">{formattedTime}</p>
                        <p className="text-sm text-gray-600">
                          {isUpcoming ? 'Upcoming reservation' : 'Past reservation'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedReservation.specialRequests && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 shadow-lg border border-amber-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <div className="bg-amber-500 p-2 rounded-lg mr-3">
                          <Star className="text-white" size={20} />
                        </div>
                        Special Requests
                      </h3>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-gray-900 leading-relaxed">{selectedReservation.specialRequests}</p>
                      </div>
                    </div>
                  )}

                  {/* Status Management */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-lg border border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="bg-green-500 p-2 rounded-lg mr-3">
                        <Check className="text-white" size={20} />
                      </div>
                      Reservation Status
                    </h3>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                      <select
                        value={selectedReservation.status}
                        onChange={(e) => {
                          handleStatusUpdate(selectedReservation.id, e.target.value);
                          setSelectedReservation({...selectedReservation, status: e.target.value});
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      >
                        <option value="pending">Pending Confirmation</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="seated">Currently Seated</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 rounded-b-3xl border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Reservation ID: {selectedReservation.id}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium">
                  Send Confirmation Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateReservationModal = () => {
    const onSubmit = (data) => {
      const newReservation = {
        id: `res_${Date.now()}`,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        date: data.date,
        time: data.time,
        guests: parseInt(data.guests),
        status: 'confirmed',
        specialRequests: data.specialRequests || '',
        tableNumber: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addReservation(newReservation);
      setShowCreateModal(false);
      reset();
      toast.success('Reservation created successfully!');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Plus size={24} />
                </div>
                <h2 className="text-2xl font-bold">Create New Reservation</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  {...register('customerName', { required: 'Name is required' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  {...register('customerEmail', { required: 'Email is required' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="customer@email.com"
                />
                {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  {...register('customerPhone', { required: 'Phone is required' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+61 4XX XXX XXX"
                />
                {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select
                  {...register('time', { required: 'Time is required' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
              <select
                {...register('guests', { required: 'Number of guests is required' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select guests</option>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
              {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
              <textarea
                {...register('specialRequests')}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requests or dietary requirements..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" key={lastUpdate}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reservation Management</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total: {reservations.length} reservations
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Reservation</span>
          </button>
        </div>
      </div>

      {/* Enhanced Debug Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">🔍 Debug Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <p><strong>Reservations in store:</strong> {reservations.length}</p>
            <p><strong>Filtered reservations:</strong> {filteredReservations.length}</p>
            <p><strong>Last update:</strong> {new Date(lastUpdate).toLocaleTimeString()}</p>
          </div>
          <div>
            {reservations.length > 0 && (
              <>
                <p><strong>Latest reservation:</strong> {reservations[reservations.length - 1]?.customerName}</p>
                <p><strong>Latest date:</strong> {reservations[reservations.length - 1]?.date}</p>
                <p><strong>Latest status:</strong> {reservations[reservations.length - 1]?.status}</p>
              </>
            )}
          </div>
        </div>
        
        {/* Show all reservation names for debugging */}
        {reservations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-xs text-blue-600">
              <strong>All reservations:</strong> {reservations.map(r => r.customerName).join(', ')}
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
                placeholder="Search by name or email..."
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
              <option value="seated">Seated</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{filteredReservations.length} results</span>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guests
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
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                    <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                    <div className="text-sm text-gray-500">{reservation.customerPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-gray-400" size={16} />
                    <div>
                      <div className="text-sm text-gray-900">{reservation.date}</div>
                      <div className="text-sm text-gray-500">{reservation.time}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users className="mr-2 text-gray-400" size={16} />
                    <span className="text-sm text-gray-900">{reservation.guests}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReservation(reservation);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(reservation.id, 'confirmed')}
                    className="text-green-600 hover:text-green-900"
                    disabled={reservation.status === 'confirmed'}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || dateFilter 
                ? 'Try adjusting your filters' 
                : 'Reservations will appear here when customers book tables'}
            </p>
            {reservations.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Debug:</strong> There are {reservations.length} reservations in the system, but none match your current filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && <ReservationModal />}
      {showCreateModal && <CreateReservationModal />}
    </div>
  );
};

export default ReservationManagement;