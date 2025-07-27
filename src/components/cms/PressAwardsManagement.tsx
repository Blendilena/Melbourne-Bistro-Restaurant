import React, { useState } from 'react';
import { Award, Newspaper, Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, X, Trophy, Calendar, ExternalLink } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const PressAwardsManagement = () => {
  const { awards, pressFeatures, addAward, updateAward, deleteAward, addPressFeature, updatePressFeature, deletePressFeature } = useStore();
  const [activeTab, setActiveTab] = useState('awards');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState('award');
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const filteredAwards = awards.filter(award => {
    const matchesSearch = award.award.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         award.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || award.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPress = pressFeatures.filter(press => {
    const matchesSearch = press.publication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         press.headline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || press.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setModalType(type);
    
    if (type === 'award') {
      setValue('year', item.year);
      setValue('award', item.award);
      setValue('organization', item.organization);
    } else {
      setValue('publication', item.publication);
      setValue('headline', item.headline);
      setValue('excerpt', item.excerpt);
      setValue('date', item.date);
      setValue('link', item.link || '');
    }
    
    setShowModal(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'award') {
        deleteAward(id);
      } else {
        deletePressFeature(id);
      }
      toast.success(`${type} deleted`);
    }
  };

  const toggleStatus = (item, type) => {
    const newStatus = item.status === 'active' ? 'inactive' : 'active';
    if (type === 'award') {
      updateAward(item.id, { status: newStatus });
    } else {
      updatePressFeature(item.id, { status: newStatus });
    }
    toast.success(`${type} ${newStatus}`);
  };

  const onSubmit = (data) => {
    if (modalType === 'award') {
      const awardData = {
        id: editingItem?.id || `award_${Date.now()}`,
        year: data.year,
        award: data.award,
        organization: data.organization,
        status: editingItem?.status || 'active',
        createdAt: editingItem?.createdAt || new Date().toISOString()
      };

      if (editingItem) {
        updateAward(editingItem.id, awardData);
        toast.success('Award updated successfully');
      } else {
        addAward(awardData);
        toast.success('Award added successfully');
      }
    } else {
      const pressData = {
        id: editingItem?.id || `press_${Date.now()}`,
        publication: data.publication,
        headline: data.headline,
        excerpt: data.excerpt,
        date: data.date,
        link: data.link || undefined,
        status: editingItem?.status || 'active',
        createdAt: editingItem?.createdAt || new Date().toISOString()
      };

      if (editingItem) {
        updatePressFeature(editingItem.id, pressData);
        toast.success('Press feature updated successfully');
      } else {
        addPressFeature(pressData);
        toast.success('Press feature added successfully');
      }
    }

    setShowModal(false);
    setEditingItem(null);
    reset();
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingItem ? 'Edit' : 'Add'} {modalType === 'award' ? 'Award' : 'Press Feature'}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {modalType === 'award' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    {...register('year', { required: 'Year is required' })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="2024"
                  />
                  {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input
                    {...register('organization', { required: 'Organization is required' })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Award organization"
                  />
                  {errors.organization && <p className="text-red-500 text-sm">{errors.organization.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Name</label>
                <input
                  {...register('award', { required: 'Award name is required' })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Award title"
                />
                {errors.award && <p className="text-red-500 text-sm">{errors.award.message}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publication</label>
                  <input
                    {...register('publication', { required: 'Publication is required' })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Publication name"
                  />
                  {errors.publication && <p className="text-red-500 text-sm">{errors.publication.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    {...register('date', { required: 'Date is required' })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="March 2024"
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                <input
                  {...register('headline', { required: 'Headline is required' })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Article headline"
                />
                {errors.headline && <p className="text-red-500 text-sm">{errors.headline.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  {...register('excerpt', { required: 'Excerpt is required' })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Brief excerpt from the article"
                />
                {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
                <input
                  {...register('link')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </>
          )}

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
              {editingItem ? 'Update' : 'Add'} {modalType === 'award' ? 'Award' : 'Press Feature'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Press & Awards Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditingItem(null);
              setModalType('award');
              reset();
              setShowModal(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Award</span>
          </button>
          <button
            onClick={() => {
              setEditingItem(null);
              setModalType('press');
              reset();
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Press</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('awards')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'awards'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Award className="inline mr-2" size={16} />
            Awards ({awards.length})
          </button>
          <button
            onClick={() => setActiveTab('press')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'press'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Newspaper className="inline mr-2" size={16} />
            Press Features ({pressFeatures.length})
          </button>
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Trophy className="text-yellow-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Awards</p>
              <p className="text-2xl font-semibold text-gray-900">{awards.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Newspaper className="text-blue-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Press Features</p>
              <p className="text-2xl font-semibold text-gray-900">{pressFeatures.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="text-green-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Items</p>
              <p className="text-2xl font-semibold text-gray-900">
                {[...awards, ...pressFeatures].filter(item => item.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="text-purple-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">This Year</p>
              <p className="text-2xl font-semibold text-gray-900">
                {awards.filter(award => award.year === '2024').length}
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
                placeholder={`Search ${activeTab}...`}
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
            <span className="text-sm text-gray-600">
              {activeTab === 'awards' ? filteredAwards.length : filteredPress.length} results
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'awards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwards.map((award) => (
            <div key={award.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-400" size={24} />
                  <span className="text-2xl font-bold text-yellow-600">{award.year}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  award.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {award.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{award.award}</h3>
              <p className="text-gray-600 mb-4">{award.organization}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(award, 'award')}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    award.status === 'active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {award.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(award, 'award')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(award.id, 'award')}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPress.map((press) => (
            <div key={press.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Newspaper className="text-blue-400" size={20} />
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                      {press.publication}
                    </span>
                    <span className="text-gray-500 text-sm">{press.date}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      press.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {press.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{press.headline}</h3>
                  <p className="text-gray-600 mb-3">{press.excerpt}</p>
                  
                  {press.link && (
                    <a
                      href={press.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                    >
                      <ExternalLink size={14} />
                      <span>Read full article</span>
                    </a>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => toggleStatus(press, 'press')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      press.status === 'active'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {press.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleEdit(press, 'press')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(press.id, 'press')}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {((activeTab === 'awards' && filteredAwards.length === 0) || 
        (activeTab === 'press' && filteredPress.length === 0)) && (
        <div className="text-center py-12">
          {activeTab === 'awards' ? (
            <Trophy className="mx-auto h-12 w-12 text-gray-400" />
          ) : (
            <Newspaper className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No {activeTab} found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters' 
              : `Get started by adding your first ${activeTab === 'awards' ? 'award' : 'press feature'}`}
          </p>
        </div>
      )}

      {showModal && <Modal />}
    </div>
  );
};

export default PressAwardsManagement;