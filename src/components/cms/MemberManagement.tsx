import React, { useState } from 'react';
import { Users, Crown, Star, Mail, Phone, Search, Filter, Eye, Edit, Trash2, Plus, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const MemberManagement = () => {
  const { members, updateMember, deleteMember } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || member.membershipTier === tierFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleStatusUpdate = (id, newStatus) => {
    updateMember(id, { status: newStatus });
    toast.success(`Member ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
      toast.success('Member deleted');
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'bronze': return <Star className="text-amber-600" size={16} />;
      case 'silver': return <Star className="text-gray-600" size={16} />;
      case 'gold': return <Crown className="text-yellow-600" size={16} />;
      case 'platinum': return <Crown className="text-purple-600" size={16} />;
      default: return <Users className="text-gray-600" size={16} />;
    }
  };

  const MemberModal = () => {
    if (!selectedMember) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Member Details</h2>
            <button onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedMember.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedMember.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedMember.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <p className="text-gray-900">{selectedMember.joinDate}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Membership Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tier</label>
                  <div className="flex items-center space-x-2">
                    {getTierIcon(selectedMember.membershipTier)}
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(selectedMember.membershipTier)}`}>
                      {selectedMember.membershipTier}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                  <p className="text-gray-900">${selectedMember.totalSpent.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Visit Count</label>
                  <p className="text-gray-900">{selectedMember.visitCount} visits</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={selectedMember.status}
                    onChange={(e) => {
                      handleStatusUpdate(selectedMember.id, e.target.value);
                      setSelectedMember({...selectedMember, status: e.target.value});
                    }}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {selectedMember.preferences.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMember.preferences.map((pref, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedMember.allergies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMember.allergies.map((allergy, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
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
        <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
        <div className="text-sm text-gray-500">
          Total: {members.length} members
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['bronze', 'silver', 'gold', 'platinum'].map(tier => {
          const count = members.filter(m => m.membershipTier === tier).length;
          return (
            <div key={tier} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                {getTierIcon(tier)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 capitalize">{tier} Members</p>
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
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
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
            <span className="text-sm text-gray-600">{filteredMembers.length} results</span>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
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
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                    <div className="text-sm text-gray-500">{member.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getTierIcon(member.membershipTier)}
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(member.membershipTier)}`}>
                      {member.membershipTier}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${member.totalSpent.toFixed(2)} spent</div>
                  <div className="text-sm text-gray-500">{member.visitCount} visits</div>
                  <div className="text-sm text-gray-500">Since {member.joinDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || tierFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters' 
                : 'Members will appear here when they join the club'}
            </p>
          </div>
        )}
      </div>

      {showModal && <MemberModal />}
    </div>
  );
};

export default MemberManagement;