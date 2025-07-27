import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ImageUploadManager from './ImageUploadManager';
import CategoryManager from './CategoryManager';

const MenuManagement = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const defaultCategories = [
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const allCategories = categories.length > 0 ? categories : defaultCategories;
  const dietaryOptions = ['vegan', 'glutenFree', 'lowFat'];

  // Force re-render when menuItems change
  useEffect(() => {
    console.log('MenuManagement: Menu items updated:', menuItems.length);
  }, [menuItems]);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    setEditingItem(item);
    
    // Set form values
    setValue('name', item.name);
    setValue('description', item.description);
    setValue('price', item.price);
    setValue('category', item.category);
    setValue('dietary', item.dietary || []);
    setValue('arCode', item.arCode);
    setValue('available', item.available);
    setValue('ingredients', item.ingredients.join(', '));
    setValue('preparationTime', item.preparationTime);
    
    // Set images
    const images = item.images || [item.image];
    setSelectedImages(images);
    setFeaturedImage(item.image);
    
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(id);
      toast.success('Menu item deleted successfully');
    }
  };

  const onSubmit = (data) => {
    console.log('Form submitted with data:', data);
    
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    if (!featuredImage) {
      toast.error('Please select a featured image');
      return;
    }

    const menuItem = {
      id: editingItem?.id || `menu_${Date.now()}`,
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      dietary: Array.isArray(data.dietary) ? data.dietary : [data.dietary].filter(Boolean),
      image: featuredImage, // Main image for backward compatibility
      images: selectedImages, // All selected images
      arCode: data.arCode,
      available: data.available,
      ingredients: data.ingredients.split(',').map(i => i.trim()),
      preparationTime: parseInt(data.preparationTime),
      popularity: editingItem?.popularity || Math.floor(Math.random() * 100),
      nutritionalInfo: editingItem?.nutritionalInfo || { calories: 0, protein: 0, carbs: 0, fat: 0 },
      allergens: editingItem?.allergens || [],
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Saving menu item:', menuItem);

    if (editingItem) {
      updateMenuItem(editingItem.id, menuItem);
      console.log('Updated menu item');
    } else {
      addMenuItem(menuItem);
      console.log('Added new menu item');
    }

    // Reset form and close modal
    setShowModal(false);
    setEditingItem(null);
    setSelectedImages([]);
    setFeaturedImage('');
    reset();
  };

  const toggleAvailability = (item) => {
    const updatedItem = {
      ...item,
      available: !item.available,
      updatedAt: new Date().toISOString()
    };
    updateMenuItem(item.id, updatedItem);
    toast.success(`${item.name} ${!item.available ? 'enabled' : 'disabled'}`);
  };

  const MenuModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Image Upload Manager */}
          <ImageUploadManager
            selectedImages={selectedImages}
            onImagesChange={setSelectedImages}
            featuredImage={featuredImage}
            onFeaturedImageChange={setFeaturedImage}
            multiple={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {allCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time (minutes)</label>
              <input
                type="number"
                {...register('preparationTime', { required: 'Preparation time is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {errors.preparationTime && <p className="text-red-500 text-sm">{errors.preparationTime.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">AR Code</label>
              <input
                {...register('arCode', { required: 'AR Code is required' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {errors.arCode && <p className="text-red-500 text-sm">{errors.arCode.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Options</label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      {...register('dietary')}
                      className="mr-2"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma-separated)</label>
            <input
              {...register('ingredients')}
              placeholder="beef, truffle, mushrooms, wine"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('available')}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Available</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingItem(null);
                setSelectedImages([]);
                setFeaturedImage('');
                reset();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
            >
              {editingItem ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setSelectedImages([]);
            setFeaturedImage('');
            reset();
            setShowModal(true);
          }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Category Manager */}
      <CategoryManager 
        categories={categories} 
        onCategoriesChange={setCategories} 
      />

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {allCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={`${item.id}-${item.updatedAt}`} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => toggleAvailability(item)}
                  className={`p-2 rounded-full ${
                    item.available 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white`}
                >
                  {item.available ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  item.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-yellow-600">${item.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  {allCategories.find(cat => cat.id === item.category)?.name || item.category}
                </span>
                {item.dietary.map(diet => (
                  <span key={diet} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {diet}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Prep: {item.preparationTime}min</span>
                <span>AR: {item.arCode}</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No menu items found</p>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Modal */}
      {showModal && <MenuModal />}
    </div>
  );
};

export default MenuManagement;