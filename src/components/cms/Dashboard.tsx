import React from 'react';
import { 
  Calendar, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Star,
  Eye
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';

const Dashboard = () => {
  const { 
    reservations, 
    orders, 
    members, 
    analytics, 
    availableTables,
    reviews 
  } = useStore();

  const todayReservations = reservations.filter(r => 
    r.date === format(new Date(), 'yyyy-MM-dd')
  );
  
  const todayOrders = orders.filter(o => 
    o.createdAt.startsWith(format(new Date(), 'yyyy-MM-dd'))
  );

  const recentReviews = reviews
    .filter(r => r.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      name: 'Today\'s Reservations',
      value: todayReservations.length,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Today\'s Orders',
      value: todayOrders.length,
      icon: ShoppingBag,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Total Members',
      value: members.length,
      icon: Users,
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'Monthly Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  const upcomingReservations = reservations
    .filter(r => r.status === 'confirmed' && new Date(r.date + ' ' + r.time) > new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
    .slice(0, 5);

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-md`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Status */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Live Restaurant Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{availableTables}</div>
            <div className="text-sm text-gray-500">Available Tables</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {reservations.filter(r => r.status === 'seated').length}
            </div>
            <div className="text-sm text-gray-500">Currently Seated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'preparing').length}
            </div>
            <div className="text-sm text-gray-500">Orders in Kitchen</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Reservations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Reservations</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingReservations.map((reservation) => (
              <div key={reservation.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {reservation.customerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {reservation.guests} guests • {reservation.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{reservation.date}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      reservation.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.type} • {order.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'preparing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReviews.map((review) => (
            <div key={review.id} className="px-6 py-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{review.text}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{review.customerName}</p>
                    <span className="text-gray-300">•</span>
                    <p className="text-sm text-gray-500">{review.platform}</p>
                    <span className="text-gray-300">•</span>
                    <p className="text-sm text-gray-500">
                      {format(new Date(review.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;