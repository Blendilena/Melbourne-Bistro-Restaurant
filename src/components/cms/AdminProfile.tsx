import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, Bell, Globe, 
  Camera, Edit, Save, X, Eye, EyeOff, Key, Activity, 
  Settings, Download, Upload, Trash2, Clock, Award,
  BarChart3, Users, ShoppingBag, Star, TrendingUp
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const { adminUser, updateAdminUser, notifications, orders, reservations, reviews } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'stats', name: 'My Stats', icon: BarChart3 }
  ];

  const onSubmit = (data) => {
    updateAdminUser({
      name: data.name,
      email: data.email,
      preferences: {
        ...adminUser?.preferences,
        language: data.language,
        timezone: data.timezone
      }
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (data) => {
    // In a real app, this would validate current password and update
    toast.success('Password updated successfully!');
    setShowPasswordForm(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateAdminUser({
          avatar: e.target?.result as string
        });
        toast.success('Avatar updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const recentActivity = [
    { action: 'Updated menu item "Wagyu Beef"', time: '2 hours ago', type: 'edit' },
    { action: 'Approved new review', time: '4 hours ago', type: 'approve' },
    { action: 'Created new event "Wine Tasting"', time: '1 day ago', type: 'create' },
    { action: 'Updated reservation status', time: '2 days ago', type: 'update' },
    { action: 'Added new member', time: '3 days ago', type: 'create' }
  ];

  const myStats = {
    totalActions: 156,
    thisWeek: 23,
    avgPerDay: 3.3,
    mostActive: 'Menu Management'
  };

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            {isEditing ? <X size={16} /> : <Edit size={16} />}
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img
              src={adminUser?.avatar}
              alt={adminUser?.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{adminUser?.name}</h2>
            <p className="text-gray-600 capitalize">{adminUser?.role} Administrator</p>
            <p className="text-sm text-gray-500">Member since {new Date(adminUser?.createdAt || '').toLocaleDateString()}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  defaultValue={adminUser?.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  defaultValue={adminUser?.email}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  {...register('language')}
                  defaultValue={adminUser?.preferences.language}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  {...register('timezone')}
                  defaultValue={adminUser?.preferences.timezone}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Australia/Melbourne">Melbourne (AEST)</option>
                  <option value="Australia/Sydney">Sydney (AEST)</option>
                  <option value="Australia/Perth">Perth (AWST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{adminUser?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Role</label>
                <p className="text-gray-900 capitalize">{adminUser?.role}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Language</label>
                <p className="text-gray-900">{adminUser?.preferences.language.toUpperCase()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Timezone</label>
                <p className="text-gray-900">{adminUser?.preferences.timezone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Password</h4>
              <p className="text-sm text-gray-500">Last changed 30 days ago</p>
            </div>
            <button
              onClick={() => setShowPasswordForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Change Password
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
              Enable 2FA
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Login Sessions</h4>
              <p className="text-sm text-gray-500">Manage your active sessions</p>
            </div>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm">
              View Sessions
            </button>
          </div>
        </div>
      </div>

      {showPasswordForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h4>
          <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                {...register('currentPassword', { required: 'Current password is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                {...register('newPassword', { required: 'New password is required', minLength: 8 })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                {...register('confirmPassword', { required: 'Please confirm your password' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              checked={adminUser?.preferences.notifications}
              onChange={(e) => updateAdminUser({
                preferences: {
                  ...adminUser?.preferences,
                  notifications: e.target.checked
                }
              })}
              className="rounded text-blue-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-500">Receive browser notifications</p>
            </div>
            <input type="checkbox" className="rounded text-blue-600" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive notifications via SMS</p>
            </div>
            <input type="checkbox" className="rounded text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Display Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Theme</h4>
              <p className="text-sm text-gray-500">Choose your preferred theme</p>
            </div>
            <select
              value={adminUser?.preferences.theme}
              onChange={(e) => updateAdminUser({
                preferences: {
                  ...adminUser?.preferences,
                  theme: e.target.value as 'light' | 'dark'
                }
              })}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'create' ? 'bg-green-500' :
                activity.type === 'edit' ? 'bg-blue-500' :
                activity.type === 'approve' ? 'bg-yellow-500' :
                'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const StatsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Activity className="text-blue-500" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Actions</p>
              <p className="text-2xl font-semibold text-gray-900">{myStats.totalActions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="text-green-500" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">This Week</p>
              <p className="text-2xl font-semibold text-gray-900">{myStats.thisWeek}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <BarChart3 className="text-purple-500" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Avg Per Day</p>
              <p className="text-2xl font-semibold text-gray-900">{myStats.avgPerDay}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Award className="text-yellow-500" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Most Active</p>
              <p className="text-lg font-semibold text-gray-900">{myStats.mostActive}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{orders.length}</div>
            <div className="text-sm text-gray-500">Orders Managed</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{reservations.length}</div>
            <div className="text-sm text-gray-500">Reservations Handled</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{reviews.length}</div>
            <div className="text-sm text-gray-500">Reviews Processed</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'preferences':
        return <PreferencesTab />;
      case 'activity':
        return <ActivityTab />;
      case 'stats':
        return <StatsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg">
            <Download size={16} />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Upload size={16} />
            <span>Import Settings</span>
          </button>
        </div>
      </div>
      
      <div className="flex space-x-8">
        {/* Sidebar */}
        <div className="w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;