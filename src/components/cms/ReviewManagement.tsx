import React, { useState } from 'react';
import { Star, Search, Filter, Eye, Check, X, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const ReviewManagement = () => {
  const { reviews, updateReview, deleteReview } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    const matchesPlatform = platformFilter === 'all' || review.platform === platformFilter;
    return matchesSearch && matchesStatus && matchesRating && matchesPlatform;
  });

  const handleStatusUpdate = (id, newStatus) => {
    updateReview(id, { status: newStatus });
    toast.success(`Review ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
      toast.success('Review deleted');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Google': return 'bg-blue-100 text-blue-800';
      case 'Yelp': return 'bg-red-100 text-red-800';
      case 'TripAdvisor': return 'bg-green-100 text-green-800';
      case 'Facebook': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ReviewModal = () => {
    if (!selectedReview) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Review Details</h2>
            <button onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer</label>
                <p className="text-gray-900">{selectedReview.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Platform</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(selectedReview.platform)}`}>
                  {selectedReview.platform}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="text-gray-900">{format(new Date(selectedReview.date), 'MMM d, yyyy')}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Text</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">{selectedReview.text}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedReview.status}
                onChange={(e) => {
                  handleStatusUpdate(selectedReview.id, e.target.value);
                  setSelectedReview({...selectedReview, status: e.target.value});
                }}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {selectedReview.response && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedReview.response}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
        <div className="text-sm text-gray-500">
          Total: {reviews.length} reviews
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Star className="text-yellow-400" size={24} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">
                {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0'}
              </p>
            </div>
          </div>
        </div>
        
        {['pending', 'approved', 'rejected'].map(status => {
          const count = reviews.filter(r => r.status === status).length;
          return (
            <div key={status} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${
                  status === 'approved' ? 'bg-green-400' : 
                  status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 capitalize">{status}</p>
                  <p className="text-2xl font-semibold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reviews..."
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
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="Google">Google</option>
              <option value="Yelp">Yelp</option>
              <option value="TripAdvisor">TripAdvisor</option>
              <option value="Facebook">Facebook</option>
            </select>
          </div>

          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{filteredReviews.length} results</span>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer & Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review
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
            {filteredReviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{review.customerName}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(review.platform)}`}>
                      {review.platform}
                    </span>
                    <div className="text-sm text-gray-500">{format(new Date(review.date), 'MMM d, yyyy')}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {review.text}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(review.id, 'approved')}
                    className="text-green-600 hover:text-green-900"
                    disabled={review.status === 'approved'}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(review.id, 'rejected')}
                    className="text-red-600 hover:text-red-900"
                    disabled={review.status === 'rejected'}
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || ratingFilter !== 'all' || platformFilter !== 'all'
                ? 'Try adjusting your filters' 
                : 'Reviews will appear here when customers leave feedback'}
            </p>
          </div>
        )}
      </div>

      {showModal && <ReviewModal />}
    </div>
  );
};

export default ReviewManagement;