import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, X, UtensilsCrossed } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const WeatherMenuManagement = () => {
  const { weatherSuggestions, addWeatherSuggestion, updateWeatherSuggestion, deleteWeatherSuggestion } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherFilter, setWeatherFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const filteredSuggestions = weatherSuggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.dishes.some(dish => dish.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWeather = weatherFilter === 'all' || suggestion.weatherType === weatherFilter;
    const matchesStatus = statusFilter === 'all' || suggestion.status === statusFilter;
    return matchesSearch && matchesWeather && matchesStatus;
  });

  const handleEdit = (suggestion) => {
    setEditingSuggestion(suggestion);
    setValue('weatherType', suggestion.weatherType);
    setValue('title', suggestion.title);
    setValue('description', suggestion.description);
    setValue('dishes', suggestion.dishes.join(', '));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this weather suggestion?')) {
      deleteWeatherSuggestion(id);
      toast.success('Weather suggestion deleted');
    }
  };

  const toggleStatus = (suggestion) => {
    const newStatus = suggestion.status === 'active' ? 'inactive' : 'active';
    updateWeatherSuggestion(suggestion.id, { status: newStatus });
    toast.success(`Weather suggestion ${newStatus}`);
  };

  const onSubmit = (data) => {
    const suggestionData = {
      id: editingSuggestion?.id || `weather_${Date.now()}`,
      weatherType: data.weatherType,
      title: data.title,
      description: data.description,
      dishes: data.dishes.split(',').map(dish => dish.trim()),
      status: editingSuggestion?.status || 'active',
      createdAt: editingSuggestion?.createdAt || new Date().toISOString()
    };

    if (editingSuggestion) {
      updateWeatherSuggestion(editingSuggestion.id, suggestionData);
      toast.success('Weather suggestion updated successfully');
    } else {
      addWeatherSuggestion(suggestionData);
      toast.success('Weather suggestion added successfully');
    }

    setShowModal(false);
    setEditingSuggestion(null);
    reset();
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'sunny': return <Sun className="text-yellow-400" size={24} />;
      case 'cloudy': return <Cloud className="text-gray-400" size={24} />;
      case 'rainy': return <CloudRain className="text-blue-400" size={24} />;
      case 'cold': return <Snowflake className="text-blue-300" size={24} />;
      default: return <Wind className="text-gray-400" size={24} />;
    }
  };

  const getWeatherColor = (weatherType) => {
    switch (weatherType) {
      case 'sunny': return 'bg-yellow-100 text-yellow-800';
      case 'cloudy': return 'bg-gray-100 text-gray-800';
      case 'rainy': return 'bg-blue-100 text-blue-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SuggestionModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingSuggestion ? 'Edit Weather Suggestion' : 'Add Weather Suggestion'}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weather Type</label>
              <select
                {...register('weatherType', { required: 'Weather type is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select weather type</option>
                <option value="sunny">Sunny</option>
                <option value="cloudy">Cloudy</option>
                <option value="rainy">Rainy</option>
                <option value="cold">Cold</option>
              </select>
              {errors.weatherType && <p className="text-red-500 text-sm">{errors.weatherType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Perfect Day for Our Terrace"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Light, fresh dishes perfect for Melbourne's beautiful weather"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Dishes</label>
            <input
              {...register('dishes', { required: 'At least one dish is required' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Grilled Barramundi, Summer Salad, Citrus Sorbet (comma-separated)"
            />
            {errors.dishes && <p className="text-red-500 text-sm">{errors.dishes.message}</p>}
            <p className="text-xs text-gray-500 mt-1">Separate multiple dishes with commas</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
            >
              {editingSuggestion ? 'Update' : 'Add'} Suggestion
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Weather Menu Management</h1>
        <button
          onClick={() => {
            setEditingSuggestion(null);
            reset();
            setShowModal(true);
          }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Weather Suggestion</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['sunny', 'cloudy', 'rainy', 'cold', 'total'].map(weather => {
          const count = weather === 'total' 
            ? weatherSuggestions.length 
            : weatherSuggestions.filter(s => s.weatherType === weather).length;
          
          return (
            <div key={weather} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                {weather === 'total' ? (
                  <UtensilsCrossed className="text-green-500" size={24} />
                ) : (
                  getWeatherIcon(weather)
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 capitalize">
                    {weather === 'total' ? 'Total' : weather}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search suggestions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={weatherFilter}
              onChange={(e) => setWeatherFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Weather Types</option>
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="rainy">Rainy</option>
              <option value="cold">Cold</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{filteredSuggestions.length} results</span>
          </div>
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(suggestion.weatherType)}
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getWeatherColor(suggestion.weatherType)}`}>
                  {suggestion.weatherType}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                suggestion.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {suggestion.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{suggestion.title}</h3>
            <p className="text-gray-600 mb-4">{suggestion.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommended Dishes:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestion.dishes.map((dish, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {dish}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => toggleStatus(suggestion)}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  suggestion.status === 'active'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {suggestion.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                onClick={() => handleEdit(suggestion)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(suggestion.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <Cloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No weather suggestions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || weatherFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters' 
              : 'Get started by adding your first weather-based menu suggestion'}
          </p>
        </div>
      )}

      {showModal && <SuggestionModal />}
    </div>
  );
};

export default WeatherMenuManagement;