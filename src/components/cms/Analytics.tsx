import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, Calendar, Star, Clock, Download, Filter, RefreshCw } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Analytics = () => {
  const { reservations, orders, members, reviews, menuItems } = useStore();
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  // Calculate analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalReservations = reservations.length;
  const totalOrders = orders.length;
  const totalMembers = members.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  // Revenue by month data
  const revenueByMonth = [
    { month: 'Jan', revenue: 45000, orders: 120 },
    { month: 'Feb', revenue: 52000, orders: 135 },
    { month: 'Mar', revenue: 48000, orders: 128 },
    { month: 'Apr', revenue: 61000, orders: 156 },
    { month: 'May', revenue: 55000, orders: 142 },
    { month: 'Jun', revenue: 67000, orders: 178 },
    { month: 'Jul', revenue: 72000, orders: 189 },
    { month: 'Aug', revenue: 69000, orders: 182 },
    { month: 'Sep', revenue: 74000, orders: 195 },
    { month: 'Oct', revenue: 78000, orders: 205 },
    { month: 'Nov', revenue: 82000, orders: 218 },
    { month: 'Dec', revenue: 89000, orders: 235 }
  ];

  // Popular items data
  const popularItems = menuItems
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5)
    .map(item => ({
      name: item.name,
      orders: Math.floor(item.popularity * 2.5),
      revenue: Math.floor(item.popularity * item.price * 2.5)
    }));

  // Order types distribution
  const orderTypes = [
    { name: 'Pickup', value: orders.filter(o => o.type === 'pickup').length, color: '#8884d8' },
    { name: 'Delivery', value: orders.filter(o => o.type === 'delivery').length, color: '#82ca9d' }
  ];

  // Reservation status distribution
  const reservationStatus = [
    { name: 'Confirmed', value: reservations.filter(r => r.status === 'confirmed').length, color: '#10b981' },
    { name: 'Pending', value: reservations.filter(r => r.status === 'pending').length, color: '#f59e0b' },
    { name: 'Completed', value: reservations.filter(r => r.status === 'completed').length, color: '#6b7280' },
    { name: 'Cancelled', value: reservations.filter(r => r.status === 'cancelled').length, color: '#ef4444' }
  ];

  // Daily reservations (last 7 days)
  const dailyReservations = [
    { day: 'Mon', reservations: 12, orders: 8 },
    { day: 'Tue', reservations: 15, orders: 12 },
    { day: 'Wed', reservations: 18, orders: 15 },
    { day: 'Thu', reservations: 22, orders: 18 },
    { day: 'Fri', reservations: 28, orders: 25 },
    { day: 'Sat', reservations: 35, orders: 32 },
    { day: 'Sun', reservations: 30, orders: 28 }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const StatCard = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '' }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change && (
            <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 text-sm font-medium">
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
            <span>Refresh</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={totalRevenue}
          change={15.2}
          icon={DollarSign}
          color="bg-green-500"
          prefix="$"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          change={8.1}
          icon={ShoppingBag}
          color="bg-blue-500"
        />
        <StatCard
          title="Reservations"
          value={totalReservations}
          change={12.5}
          icon={Calendar}
          color="bg-purple-500"
        />
        <StatCard
          title="Members"
          value={totalMembers}
          change={23.1}
          icon={Users}
          color="bg-yellow-500"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Average Order Value"
          value={averageOrderValue.toFixed(2)}
          change={5.3}
          icon={DollarSign}
          color="bg-indigo-500"
          prefix="$"
        />
        <StatCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          change={2.1}
          icon={Star}
          color="bg-yellow-500"
          suffix="/5"
        />
        <StatCard
          title="Avg Prep Time"
          value="18"
          change={-3.2}
          icon={Clock}
          color="bg-red-500"
          suffix=" min"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#eab308" fill="#eab308" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyReservations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="reservations" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Items */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularItems} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="orders" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Types */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reservation Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reservationStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {reservationStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="text-green-500" size={20} />
              <span className="ml-2 text-sm font-medium text-green-800">Revenue Growth</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">+15.2%</p>
            <p className="text-sm text-green-600">vs last month</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="text-blue-500" size={20} />
              <span className="ml-2 text-sm font-medium text-blue-800">Customer Retention</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">87%</p>
            <p className="text-sm text-blue-600">returning customers</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Star className="text-yellow-500" size={20} />
              <span className="ml-2 text-sm font-medium text-yellow-800">Satisfaction</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900 mt-2">{averageRating.toFixed(1)}/5</p>
            <p className="text-sm text-yellow-600">average rating</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="text-purple-500" size={20} />
              <span className="ml-2 text-sm font-medium text-purple-800">Efficiency</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">18min</p>
            <p className="text-sm text-purple-600">avg prep time</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">New reservation from John Smith</span>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">Order #1234 completed</span>
            </div>
            <span className="text-xs text-gray-500">5 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">New 5-star review received</span>
            </div>
            <span className="text-xs text-gray-500">10 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">New member joined: Sarah Johnson</span>
            </div>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;