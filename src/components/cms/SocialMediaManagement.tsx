import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, MessageSquare, Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, Heart, Share2, TrendingUp, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SocialMediaManagement = () => {
  const { socialPosts, addSocialPost, updateSocialPost, deleteSocialPost } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const filteredPosts = socialPosts.filter(post => {
    const matchesSearch = post.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleEdit = (post) => {
    setEditingPost(post);
    setValue('platform', post.platform);
    setValue('user', post.user);
    setValue('content', post.content);
    setValue('image', post.image || '');
    setValue('likes', post.likes);
    setValue('time', post.time);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteSocialPost(id);
      toast.success('Post deleted');
    }
  };

  const toggleStatus = (post) => {
    const newStatus = post.status === 'active' ? 'hidden' : 'active';
    updateSocialPost(post.id, { status: newStatus });
    toast.success(`Post ${newStatus}`);
  };

  const onSubmit = (data) => {
    const postData = {
      id: editingPost?.id || `social_${Date.now()}`,
      platform: data.platform,
      user: data.user,
      content: data.content,
      image: data.image || undefined,
      likes: parseInt(data.likes),
      time: data.time,
      status: editingPost?.status || 'active',
      createdAt: editingPost?.createdAt || new Date().toISOString()
    };

    if (editingPost) {
      updateSocialPost(editingPost.id, postData);
      toast.success('Post updated successfully');
    } else {
      addSocialPost(postData);
      toast.success('Post added successfully');
    }

    setShowModal(false);
    setEditingPost(null);
    reset();
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Instagram className="text-pink-400" size={20} />;
      case 'facebook': return <Facebook className="text-blue-400" size={20} />;
      case 'twitter': return <Twitter className="text-blue-400" size={20} />;
      default: return <MessageSquare className="text-gray-400" size={20} />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'twitter': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PostModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingPost ? 'Edit Social Post' : 'Add Social Post'}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select
                {...register('platform', { required: 'Platform is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select platform</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
              </select>
              {errors.platform && <p className="text-red-500 text-sm">{errors.platform.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
              <input
                {...register('user', { required: 'User is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="@username"
              />
              {errors.user && <p className="text-red-500 text-sm">{errors.user.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              {...register('content', { required: 'Content is required' })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Post content..."
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
            <input
              {...register('image')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Likes</label>
              <input
                type="number"
                {...register('likes', { required: 'Likes count is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {errors.likes && <p className="text-red-500 text-sm">{errors.likes.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                {...register('time', { required: 'Time is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="2h ago"
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
            </div>
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
              {editingPost ? 'Update' : 'Add'} Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Social Media Management</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            reset();
            setShowModal(true);
          }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Post</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['instagram', 'facebook', 'twitter', 'total'].map(platform => {
          const count = platform === 'total' 
            ? socialPosts.length 
            : socialPosts.filter(p => p.platform === platform).length;
          const totalLikes = platform === 'total'
            ? socialPosts.reduce((sum, p) => sum + p.likes, 0)
            : socialPosts.filter(p => p.platform === platform).reduce((sum, p) => sum + p.likes, 0);
          
          return (
            <div key={platform} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                {platform === 'total' ? (
                  <TrendingUp className="text-green-500" size={24} />
                ) : (
                  getPlatformIcon(platform)
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 capitalize">
                    {platform === 'total' ? 'Total Posts' : `${platform} Posts`}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-500">{totalLikes} total likes</p>
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
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
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
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{filteredPosts.length} results</span>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getPlatformIcon(post.platform)}
                  <span className="font-semibold text-gray-900">{post.user}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {post.status}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post.content}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Heart className="text-red-400" size={16} />
                  <span>{post.likes} likes</span>
                </div>
                <span>{post.time}</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(post)}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    post.status === 'active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {post.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <Share2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || platformFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters' 
              : 'Get started by adding your first social media post'}
          </p>
        </div>
      )}

      {showModal && <PostModal />}
    </div>
  );
};

export default SocialMediaManagement;