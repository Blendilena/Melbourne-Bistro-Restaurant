import React, { useState } from 'react';
import { Star, Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, X, Award, Quote } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CelebrityManagement = () => {
  const { celebrities, addCelebrity, updateCelebrity, deleteCelebrity } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCelebrity, setEditingCelebrity] = useState(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const filteredCelebrities = celebrities.filter(celebrity => {
    const matchesSearch = celebrity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         celebrity.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         celebrity.quote.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || celebrity.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (celebrity) => {
    setEditingCelebrity(celebrity);
    setValue('name', celebrity.name);
    setValue('dish', celebrity.dish);
    setValue('quote', celebrity.quote);
    setValue('image', celebrity.image);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this celebrity entry?')) {
      deleteCelebrity(id);
      toast.success('Celebrity entry deleted');
    }
  };

  const toggleStatus = (celebrity) => {
    const newStatus = celebrity.status === 'active' ? 'inactive' : 'active';
    updateCelebrity(celebrity.id, { status: newStatus });
    toast.success(`Celebrity entry ${newStatus}`);
  };

  const onSubmit = (data) => {
    const celebrityData = {
      id: editingCelebrity?.id || `cel_${Date.now()}`,
      name: data.name,
      dish: data.dish,
      quote: data.quote,
      image: data.image,
      status: editingCelebrity?.status || 'active',
      createdAt: editingCelebrity?.createdAt || new Date().toISOString()
    };

    if (editingCelebrity) {
      updateCelebrity(editingCelebrity.id, celebrityData);
      toast.success('Celebrity entry updated successfully');
    } else {
      addCelebrity(celebrityData);
      toast.success('Celebrity entry added successfully');
    }

    setShowModal(false);
    setEditingCelebrity(null);
    reset();
  };

  const CelebrityModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingCelebrity ? 'Edit Celebrity Entry' : 'Add Celebrity Entry'}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Celebrity Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Celebrity name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Dish</label>
            <input
              {...register('dish', { required: 'Dish is required' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Their favorite dish"
            />
            {errors.dish && <p className="text-red-500 text-sm">{errors.dish.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
            <textarea
              {...register('quote', { required: 'Quote is required' })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Their testimonial quote"
            />
            {errors.quote && <p className="text-red-500 text-sm">{errors.quote.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              {...register('image', { required: 'Image URL is required' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="https://..."
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
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
              {editingCelebrity ? 'Update' : 'Add'} Celebrity
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Celebrity Management</h1>
        <button
          onClick={() => {
            setEditingCelebrity(null);
            reset();
            setShowModal(true);
          }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Celebrity</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Star className="text-yellow-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Celebrities</p>
              <p className="text-2xl font-semibold text-gray-900">{celebrities.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="text-green-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {celebrities.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <EyeOff className="text-red-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Inactive</p>
              <p className="text-2xl font-semibold text-gray-900">
                {celebrities.filter(c => c.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search celebrities..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{filteredCelebrities.length} results</span>
          </div>
        </div>
      </div>

      {/* Celebrities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCelebrities.map((celebrity) => (
          <div key={celebrity.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={celebrity.image}
                alt={celebrity.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  celebrity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {celebrity.status}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{celebrity.name}</h3>
              <p className="text-yellow-600 font-semibold mb-3">{celebrity.dish}</p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <Quote className="text-gray-400 mb-2" size={16} />
                <p className="text-gray-700 text-sm italic">"{celebrity.quote}"</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(celebrity)}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    celebrity.status === 'active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {celebrity.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(celebrity)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(celebrity.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCelebrities.length === 0 && (
        <div className="text-center py-12">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No celebrities found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters' 
              : 'Get started by adding your first celebrity testimonial'}
          </p>
        </div>
      )}

      {showModal && <CelebrityModal />}
    </div>
  );
};

export default CelebrityManagement;