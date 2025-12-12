import React, { useState, useEffect } from 'react';
import '../styles/ManageCakes.css';

const API_BASE_URL = 'http://localhost:5000/api';

const ManageCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cakeFormData, setCakeFormData] = useState({
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    basePrice: '',
    sizes: [{ weight: '', price: '' }],
    flavours: [],
    colors: [],
    deliveryTime: '24 hours'
  });
  const [editingCake, setEditingCake] = useState(null);

  useEffect(() => {
    loadCakes();
    loadCategories();
  }, []);

  const loadCakes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Cakes`);
      if (!response.ok) throw new Error('Failed to fetch cakes');
      const data = await response.json();
      setCakes(data);
    } catch (error) {
      console.error('Error fetching cakes:', error);
      alert('Failed to load cakes');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCake = async (cakeId) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/Cakes/${cakeId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete cake');
        await loadCakes();
        alert('Cake deleted successfully!');
      } catch (error) {
        console.error('Error deleting cake:', error);
        alert('Failed to delete cake');
      }
    }
  };

  const handleCakeImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCakeFormData(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCakeFormChange = (field, value) => {
    setCakeFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWeightChange = (index, field, value) => {
    const newSizes = [...cakeFormData.sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setCakeFormData(prev => ({ ...prev, sizes: newSizes }));
  };

  const addWeightRow = () => {
    setCakeFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { weight: '', price: '' }]
    }));
  };

  const removeWeightRow = (index) => {
    if (cakeFormData.sizes.length > 1) {
      const newSizes = cakeFormData.sizes.filter((_, i) => i !== index);
      setCakeFormData(prev => ({ ...prev, sizes: newSizes }));
    }
  };

  const handleAddCake = async () => {
    if (!cakeFormData.name || !cakeFormData.category) {
      alert('Please enter cake name and category');
      return;
    }
    
    const validSizes = cakeFormData.sizes.filter(s => s.weight && s.price);
    if (validSizes.length === 0) {
      alert('Please add at least one weight and price');
      return;
    }

    const newCake = {
      name: cakeFormData.name,
      category: cakeFormData.category,
      description: cakeFormData.description || '',
      imageUrl: cakeFormData.imageUrl || 'https://via.placeholder.com/300x300?text=Cake',
      basePrice: parseFloat(validSizes[0].price),
      sizes: validSizes.map(s => ({ 
        weight: s.weight, 
        price: parseFloat(s.price) 
      })),
      flavours: cakeFormData.flavours.length > 0 ? cakeFormData.flavours : ['Vanilla', 'Chocolate', 'Strawberry'],
      colors: cakeFormData.colors.length > 0 ? cakeFormData.colors : ['White', 'Pink', 'Brown'],
      deliveryTime: cakeFormData.deliveryTime || '24 hours',
      isAvailable: true
    };

    try {
      const response = await fetch(`${API_BASE_URL}/Cakes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCake)
      });
      
      if (!response.ok) throw new Error('Failed to add cake');
      
      await loadCakes();
      setCakeFormData({
        name: '',
        category: '',
        description: '',
        imageUrl: '',
        basePrice: '',
        sizes: [{ weight: '', price: '' }],
        flavours: [],
        colors: [],
        deliveryTime: '24 hours'
      });
      alert('Cake added successfully!');
    } catch (error) {
      console.error('Error adding cake:', error);
      alert('Failed to add cake');
    }
  };

  const handleEditCake = (cake) => {
    setEditingCake(cake.cakeId);
    setCakeFormData({
      name: cake.name,
      category: cake.category,
      description: cake.description || '',
      imageUrl: cake.imageUrl || '',
      basePrice: cake.basePrice.toString(),
      sizes: cake.sizes && cake.sizes.length > 0 ? cake.sizes : [{ weight: '', price: '' }],
      flavours: cake.flavours || [],
      colors: cake.colors || [],
      deliveryTime: cake.deliveryTime || '24 hours'
    });
  };

  const handleSaveCake = async () => {
    if (!cakeFormData.name || !cakeFormData.category) {
      alert('Please enter cake name and category');
      return;
    }
    
    const validSizes = cakeFormData.sizes.filter(s => s.weight && s.price);
    if (validSizes.length === 0) {
      alert('Please add at least one weight and price');
      return;
    }

    const updatedCake = {
      name: cakeFormData.name,
      category: cakeFormData.category,
      description: cakeFormData.description || '',
      imageUrl: cakeFormData.imageUrl || 'https://via.placeholder.com/300x300?text=Cake',
      basePrice: parseFloat(cakeFormData.basePrice || validSizes[0].price),
      sizes: validSizes.map(s => ({ 
        weight: s.weight, 
        price: parseFloat(s.price) 
      })),
      flavours: cakeFormData.flavours.length > 0 ? cakeFormData.flavours : ['Vanilla', 'Chocolate', 'Strawberry'],
      colors: cakeFormData.colors.length > 0 ? cakeFormData.colors : ['White', 'Pink', 'Brown'],
      deliveryTime: cakeFormData.deliveryTime || '24 hours',
      isAvailable: true
    };

    try {
      const response = await fetch(`${API_BASE_URL}/Cakes/${editingCake}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCake)
      });
      
      if (!response.ok) throw new Error('Failed to update cake');
      
      await loadCakes();
      setEditingCake(null);
      setCakeFormData({
        name: '',
        category: '',
        description: '',
        imageUrl: '',
        basePrice: '',
        sizes: [{ weight: '', price: '' }],
        flavours: [],
        colors: [],
        deliveryTime: '24 hours'
      });
      alert('Cake updated successfully!');
    } catch (error) {
      console.error('Error updating cake:', error);
      alert('Failed to update cake');
    }
  };

  const handleCancelCakeEdit = () => {
    setEditingCake(null);
    setCakeFormData({
      name: '',
      category: '',
      description: '',
      imageUrl: '',
      basePrice: '',
      sizes: [{ weight: '', price: '' }],
      flavours: [],
      colors: [],
      deliveryTime: '24 hours'
    });
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h3>Manage Cakes</h3>
      </div>
      
      <div className="settings-card-content">
        <div className="cake-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Cake name"
              value={cakeFormData.name}
              onChange={(e) => handleCakeFormChange('name', e.target.value)}
            />
            <select
              value={cakeFormData.category}
              onChange={(e) => handleCakeFormChange('category', e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.categoryId} value={cat.categoryName}>{cat.categoryName}</option>
              ))}
            </select>
          </div>
          
          <textarea
            placeholder="Description"
            value={cakeFormData.description}
            onChange={(e) => handleCakeFormChange('description', e.target.value)}
          />
          
          <input
            type="file"
            accept="image/*"
            onChange={handleCakeImageChange}
          />
          {cakeFormData.imageUrl && (
            <div className="cake-image-preview">
              <img src={cakeFormData.imageUrl} alt="preview" />
            </div>
          )}

          <div className="weights-section">
            <h4>Weight & Pricing</h4>
            {cakeFormData.sizes.map((weightItem, index) => (
              <div key={index} className="weight-row">
                <input
                  type="text"
                  placeholder="Weight (e.g., 1kg)"
                  value={weightItem.weight}
                  onChange={(e) => handleWeightChange(index, 'weight', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={weightItem.price}
                  onChange={(e) => handleWeightChange(index, 'price', e.target.value)}
                />
                {cakeFormData.sizes.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-weight-btn"
                    onClick={() => removeWeightRow(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-weight-btn" onClick={addWeightRow}>
              + Add Weight Option
            </button>
          </div>

          {editingCake ? (
            <div className="cake-form-actions">
              <button className="save-btn" onClick={handleSaveCake}>Save Changes</button>
              <button className="cancel-btn" onClick={handleCancelCakeEdit}>Cancel</button>
            </div>
          ) : (
            <button className="add-btn" onClick={handleAddCake}>+ Add Cake</button>
          )}
        </div>

        <div className="cakes-list">
          {cakes.map(cake => (
            <div key={cake.cakeId} className="cake-item">
              <img src={cake.imageUrl} alt={cake.name} />
              <div className="cake-item-info">
                <h4>{cake.name}</h4>
                <p>Category: {cake.category}</p>
                <p>Base Price: ₹{cake.basePrice}</p>
                {cake.sizes && (
                  <p>Sizes: {cake.sizes.map(s => `${s.weight}(₹${s.price})`).join(', ')}</p>
                )}
              </div>
              <div className="cake-item-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEditCake(cake)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteCake(cake.cakeId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCakes;
