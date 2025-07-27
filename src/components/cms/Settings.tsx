import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Globe, Save, Eye, EyeOff, Mail, Phone, MapPin, Clock, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    restaurantName: 'Melbourne Bistro',
    description: 'Premium dining experience in Victoria, Australia',
    address: '123 Collins Street, Melbourne, VIC 3000',
    phone: '+61 3 9XXX XXXX',
    email: 'info@melbournebistro.com.au',
    website: 'https://melbournebistro.com.au',
    
    // Business Hours
    businessHours: {
      monday: { open: '', close: '', closed: true },
      tuesday: { open: '17:00', close: '22:00', closed: false },
      wednesday: { open: '17:00', close: '22:00', closed: false },
      thursday: { open: '17:00', close: '22:00', closed: false },
      friday: { open: '17:00', close: '23:00', closed: false },
      saturday: { open: '17:00', close: '23:00', closed: false },
      sunday: { open: '17:00', close: '21:00', closed: false }
    },
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reservationAlerts: true,
    orderAlerts: true,
    reviewAlerts: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    
    // Appearance
    theme: 'dark',
    primaryColor: '#eab308',
    accentColor: '#f59e0b',
    
    // System
    timezone: 'Australia/Melbourne',
    currency: 'AUD',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // Pricing
    deliveryFee: 8.50,
    taxRate: 10,
    serviceFee: 0,
    
    // Capacity
    maxTables: 20,
    maxReservationDays: 30,
    maxPartySize: 12
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'business', name: 'Business Hours', icon: Clock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'system', name: 'System', icon: Database },
    { id: 'pricing', name: 'Pricing', icon: DollarSign }
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
            <input
              type="text"
              value={settings.restaurantName}
              onChange={(e) => handleDirectChange('restaurantName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleDirectChange('phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleDirectChange('email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={settings.website}
              onChange={(e) => handleDirectChange('website', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={settings.description}
            onChange={(e) => handleDirectChange('description', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={settings.address}
            onChange={(e) => handleDirectChange('address', e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Capacity Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Tables</label>
            <input
              type="number"
              value={settings.maxTables}
              onChange={(e) => handleDirectChange('maxTables', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Reservation Days Ahead</label>
            <input
              type="number"
              value={settings.maxReservationDays}
              onChange={(e) => handleDirectChange('maxReservationDays', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Party Size</label>
            <input
              type="number"
              value={settings.maxPartySize}
              onChange={(e) => handleDirectChange('maxPartySize', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={() => handleSave('General')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const BusinessHoursSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
      <div className="space-y-4">
        {Object.entries(settings.businessHours).map(([day, hours]) => (
          <div key={day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-24">
              <span className="font-medium text-gray-900 capitalize">{day}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!hours.closed}
                onChange={(e) => handleInputChange('businessHours', day, { ...hours, closed: !e.target.checked })}
                className="rounded text-yellow-600"
              />
              <span className="text-sm text-gray-600">Open</span>
            </div>
            
            {!hours.closed && (
              <>
                <div>
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleInputChange('businessHours', day, { ...hours, open: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                </div>
                
                <span className="text-gray-500">to</span>
                
                <div>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleInputChange('businessHours', day, { ...hours, close: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                </div>
              </>
            )}
            
            {hours.closed && (
              <span className="text-red-600 text-sm font-medium">Closed</span>
            )}
          </div>
        ))}
      </div>
      
      <button
        onClick={() => handleSave('Business Hours')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleDirectChange('emailNotifications', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">SMS Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
          </div>
          <input
            type="checkbox"
            checked={settings.smsNotifications}
            onChange={(e) => handleDirectChange('smsNotifications', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Push Notifications</h4>
            <p className="text-sm text-gray-500">Receive browser push notifications</p>
          </div>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => handleDirectChange('pushNotifications', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Reservation Alerts</h4>
            <p className="text-sm text-gray-500">Get notified of new reservations</p>
          </div>
          <input
            type="checkbox"
            checked={settings.reservationAlerts}
            onChange={(e) => handleDirectChange('reservationAlerts', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Order Alerts</h4>
            <p className="text-sm text-gray-500">Get notified of new orders</p>
          </div>
          <input
            type="checkbox"
            checked={settings.orderAlerts}
            onChange={(e) => handleDirectChange('orderAlerts', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Review Alerts</h4>
            <p className="text-sm text-gray-500">Get notified of new reviews</p>
          </div>
          <input
            type="checkbox"
            checked={settings.reviewAlerts}
            onChange={(e) => handleDirectChange('reviewAlerts', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
      </div>
      
      <button
        onClick={() => handleSave('Notifications')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={(e) => handleDirectChange('twoFactorAuth', e.target.checked)}
            className="rounded text-yellow-600"
          />
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Session Timeout</h4>
          <p className="text-sm text-gray-500 mb-3">Automatically log out after inactivity</p>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => handleDirectChange('sessionTimeout', parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
            <option value={480}>8 hours</option>
          </select>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Password Expiry</h4>
          <p className="text-sm text-gray-500 mb-3">Require password change after specified days</p>
          <select
            value={settings.passwordExpiry}
            onChange={(e) => handleDirectChange('passwordExpiry', parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value={30}>30 days</option>
            <option value={60}>60 days</option>
            <option value={90}>90 days</option>
            <option value={180}>180 days</option>
            <option value={365}>1 year</option>
          </select>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
          <p className="text-sm text-gray-500 mb-3">Update your account password</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Update Password
            </button>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => handleSave('Security')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const PricingSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Pricing Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.deliveryFee}
            onChange={(e) => handleDirectChange('deliveryFee', parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={settings.taxRate}
            onChange={(e) => handleDirectChange('taxRate', parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Fee ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.serviceFee}
            onChange={(e) => handleDirectChange('serviceFee', parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <button
        onClick={() => handleSave('Pricing')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'business':
        return <BusinessHoursSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'pricing':
        return <PricingSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="flex space-x-8">
        {/* Sidebar */}
        <div className="w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-yellow-100 text-yellow-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;