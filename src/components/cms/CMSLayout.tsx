import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Star, 
  Award, 
  Newspaper,
  Cloud,
  Instagram,
  UserCheck,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  User,
  ChevronDown,
  Search,
  Moon,
  Sun,
  Globe,
  Shield,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const CMSLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const { 
    reservations, 
    orders, 
    reviews, 
    notifications, 
    adminUser,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    updateAdminUser
  } = useStore();

  const navigation = [
    { name: 'Dashboard', href: '/cms', icon: LayoutDashboard },
    { name: 'Menu Management', href: '/cms/menu', icon: UtensilsCrossed },
    { name: 'Reservations', href: '/cms/reservations', icon: Calendar },
    { name: 'Orders', href: '/cms/orders', icon: ShoppingBag },
    { name: 'Members', href: '/cms/members', icon: Users },
    { name: 'Events', href: '/cms/events', icon: UserCheck },
    { name: 'Reviews', href: '/cms/reviews', icon: Star },
    { name: 'Social Media', href: '/cms/social', icon: Instagram },
    { name: 'Celebrities', href: '/cms/celebrities', icon: Award },
    { name: 'Press & Awards', href: '/cms/press', icon: Newspaper },
    { name: 'Weather Menu', href: '/cms/weather', icon: Cloud },
    { name: 'Analytics', href: '/cms/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/cms/settings', icon: Settings },
  ];

  const pendingReservations = reservations.filter(r => r.status === 'pending').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    // Navigate to relevant page based on notification type
    if (notification.type === 'reservation') {
      window.location.href = '/cms/reservations';
    } else if (notification.type === 'order') {
      window.location.href = '/cms/orders';
    } else if (notification.type === 'review') {
      window.location.href = '/cms/reviews';
    }
  };

  const toggleTheme = () => {
    const newTheme = adminUser?.preferences.theme === 'dark' ? 'light' : 'dark';
    updateAdminUser({
      preferences: {
        ...adminUser?.preferences,
        theme: newTheme
      }
    });
  };

  const NotificationDropdown = () => (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <div className="flex space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all read
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="mx-auto mb-2 text-gray-400" size={24} />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.slice(0, 10).map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'reservation' ? 'bg-blue-500' :
                      notification.type === 'order' ? 'bg-green-500' :
                      notification.type === 'review' ? 'bg-yellow-500' :
                      notification.type === 'member' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}></div>
                    <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.length > 10 && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );

  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={adminUser?.avatar}
            alt={adminUser?.name}
          />
          <div>
            <p className="font-medium text-gray-900">{adminUser?.name}</p>
            <p className="text-sm text-gray-500">{adminUser?.email}</p>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        <Link
          to="/cms/profile"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <User className="mr-3" size={16} />
          Profile Settings
        </Link>
        
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {adminUser?.preferences.theme === 'dark' ? (
            <Sun className="mr-3" size={16} />
          ) : (
            <Moon className="mr-3" size={16} />
          )}
          {adminUser?.preferences.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        
        <Link
          to="/cms/security"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Shield className="mr-3" size={16} />
          Security
        </Link>
        
        <Link
          to="/cms/help"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <HelpCircle className="mr-3" size={16} />
          Help & Support
        </Link>
        
        <div className="border-t border-gray-200 my-2"></div>
        
        <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
          <LogOut className="mr-3" size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">Melbourne Bistro CMS</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-yellow-100 text-yellow-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">Melbourne Bistro CMS</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-yellow-100 text-yellow-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {navigation.find(nav => nav.href === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            
            {/* Search */}
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-4 text-sm">
                {pendingReservations > 0 && (
                  <Link
                    to="/cms/reservations"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <Calendar size={16} />
                    <span>{pendingReservations} pending</span>
                  </Link>
                )}
                
                {pendingOrders > 0 && (
                  <Link
                    to="/cms/orders"
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    <ShoppingBag size={16} />
                    <span>{pendingOrders} new</span>
                  </Link>
                )}
                
                {pendingReviews > 0 && (
                  <Link
                    to="/cms/reviews"
                    className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-800"
                  >
                    <Star size={16} />
                    <span>{pendingReviews} reviews</span>
                  </Link>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-500"
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </button>
                {showNotifications && <NotificationDropdown />}
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={adminUser?.avatar}
                    alt={adminUser?.name}
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{adminUser?.role}</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {showProfileMenu && <ProfileDropdown />}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Click outside handlers */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowNotifications(false)}
        />
      )}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  );
};

export default CMSLayout;