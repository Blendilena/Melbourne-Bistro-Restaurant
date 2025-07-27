import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Tag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

interface CategoryManagerProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onCategoriesChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const defaultCategories: Category[] = [
    { id: 'starters', name: 'Starters', description: 'Appetizers and small plates', displayOrder: 1, isActive: true, createdAt: new Date().toISOString() },
    { id: 'mains', name: 'Main Courses', description: 'Primary dishes and entrees', displayOrder: 2, isActive: true, createdAt: new Date().toISOString() },
    { id: 'desserts', name: 'Desserts', description: 'Sweet treats and desserts', displayOrder: 3, isActive: true, createdAt: new Date().toISOString() },
    { id: 'beverages', name: 'Beverages', description: 'Drinks and cocktails', displayOrder: 4, isActive: true, createdAt: new Date().toISOString() }
  ];

  const allCategories = categories.length > 0 ? categories : defaultCategories;

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setValue('name', category.name);
    setValue('description', category.description);
    setValue('displayOrder', category.displayOrder);
    setValue('isActive', category.isActive);
    setShowModal(true);
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = allCategories.filter(cat => cat.id !== categoryId);
      onCategoriesChange(updatedCategories);
      toast.success('Category deleted successfully');
    }
  };

  const onSubmit = (data: any) => {
    const categoryData: Category = {
      id: editingCategory?.id || `cat_${Date.now()}`,
      name: data.name,
      description: data.description,
      displayOrder: parseInt(data.displayOrder),
      isActive: data.isActive,
      createdAt: editingCategory?.createdAt || new Date().toISOString()
    };

    let updatedCategories;
    if (editingCategory) {
      updatedCategories = allCategories.map(cat => 
        cat.id === editingCategory.id ? categoryData : cat
      );
      toast.success('Category updated successfully');
    } else {
      updatedCategories = [...allCategories, categoryData];
      toast.success('Category added successfully');
    }

    onCategoriesChange(updatedCategories);
    setShowModal(false);
    setEditingCategory(null);
    reset();
  };

  const CategoryModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingCategory ? 'Edit Category' : 'Add Category'}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Category name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
            <input
              type="number"
              {...register('displayOrder', { required: 'Display order is required' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="1"
            />
            {errors.displayOrder && <p className="text-red-500 text-sm">{errors.displayOrder.message}</p>}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('isActive')}
                className="mr-2 rounded text-yellow-600"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
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
              {editingCategory ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Menu Categories</h3>
        <button
          onClick={() => {
            setEditingCategory(null);
            reset();
            setShowModal(true);
          }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allCategories
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Tag className="text-yellow-600" size={16} />
                  <h4 className="font-semibold text-gray-900">{category.name}</h4>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              {category.description && (
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Order: {category.displayOrder}</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {showModal && <CategoryModal />}
    </div>
  );
};

export default CategoryManager;