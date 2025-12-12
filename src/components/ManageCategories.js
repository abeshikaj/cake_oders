import React, { useState, useEffect } from 'react';
import '../styles/ManageCategories.css';

const API_BASE_URL = 'http://localhost:5000/api';

// API functions for categories
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Categories`);
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    alert('Error creating category');
    return null;
  }
};

const updateCategoryAPI = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    alert('Error updating category');
    return false;
  }
};

const deleteCategoryAPI = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    alert('Error deleting category');
    return false;
  }
};

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catImage, setCatImage] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categoriesData = await fetchCategories();
    console.log('Categories loaded:', categoriesData);
    setCategories(Array.isArray(categoriesData) ? categoriesData : []);
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCatImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCategory = async () => {
    if (!catName) {
      alert('Please enter category name');
      return;
    }
    const categoryData = {
      categoryName: catName,
      description: catDescription || '',
      imageUrl: catImage || ''
    };
    const newCategory = await createCategory(categoryData);
    if (newCategory) {
      await loadCategories();
      setCatName('');
      setCatDescription('');
      setCatImage('');
      alert('Category added successfully!');
    }
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat.categoryId);
    setCatName(cat.categoryName);
    setCatDescription(cat.description || '');
    setCatImage(cat.imageUrl || '');
  };

  const handleSaveCategory = async () => {
    if (!editingCategory) return;
    if (!catName) {
      alert('Please enter category name');
      return;
    }
    const categoryData = {
      categoryName: catName,
      description: catDescription || '',
      imageUrl: catImage || ''
    };
    const success = await updateCategoryAPI(editingCategory, categoryData);
    if (success) {
      await loadCategories();
      setEditingCategory(null);
      setCatName('');
      setCatDescription('');
      setCatImage('');
      alert('Category updated successfully!');
    }
  };

  const handleCancelCategoryEdit = () => {
    setEditingCategory(null);
    setCatName('');
    setCatDescription('');
    setCatImage('');
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const success = await deleteCategoryAPI(categoryId);
      if (success) {
        await loadCategories();
        alert('Category deleted successfully!');
      }
    }
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h3>Manage Categories</h3>
      </div>

      <div className="settings-card-content">
        {/* Category Add/Edit Form */}
        <div className="category-form">
          <input
            type="text"
            placeholder="Category name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleCategoryImageChange}
          />
          {catImage && (
            <div className="category-image-preview">
              <img
                src={catImage}
                alt="preview"
                style={{ width: '150px', borderRadius: '6px', marginTop: '8px' }}
              />
            </div>
          )}
          <textarea
            placeholder="Description"
            value={catDescription}
            onChange={(e) => setCatDescription(e.target.value)}
          />
          {editingCategory ? (
            <div className="category-form-actions">
              <button className="save-btn" onClick={handleSaveCategory}>Save</button>
              <button className="cancel-btn" onClick={handleCancelCategoryEdit}>Cancel</button>
            </div>
          ) : (
            <button className="add-btn" onClick={handleAddCategory}>+ Add Category</button>
          )}
        </div>

        {/* Categories List */}
        <div className="categories-list">
          {categories && categories.length > 0 ? (
            categories.map(cat => (
              <div
                key={cat.categoryId}
                className="category-item"
                style={{ marginBottom: '15px', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px' }}
              >
                {editingCategory === cat.categoryId ? (
                  <div className="category-edit-form">
                    <input
                      type="text"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      placeholder="Category name"
                      style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    {(catImage || cat.imageUrl) && (
                      <div style={{ marginBottom: '10px', borderRadius: '4px', overflow: 'hidden', maxHeight: '150px' }}>
                        <img
                          src={catImage || cat.imageUrl}
                          alt="preview"
                          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCategoryImageChange}
                      style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <textarea
                      value={catDescription}
                      onChange={(e) => setCatDescription(e.target.value)}
                      placeholder="Description (optional)"
                      rows="2"
                      style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="save-btn" onClick={handleSaveCategory} style={{ flex: 1 }}>Save</button>
                      <button className="cancel-btn" onClick={handleCancelCategoryEdit} style={{ flex: 1 }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="category-display">
                    {cat.imageUrl && (
                      <div style={{ marginBottom: '10px', borderRadius: '4px', overflow: 'hidden', maxHeight: '150px' }}>
                        <img
                          src={cat.imageUrl}
                          alt={cat.categoryName}
                          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="category-details" style={{ marginBottom: '10px' }}>
                      <h4 style={{ margin: '0 0 5px 0' }}>{cat.categoryName}</h4>
                      {cat.description && (
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{cat.description}</p>
                      )}
                    </div>
                    <div className="category-actions" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditCategory(cat)}
                        style={{ flex: 1, padding: '6px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCategory(cat.categoryId)}
                        style={{ flex: 1, padding: '6px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#999' }}>No categories available. Click "+ Add Category" to create one.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
