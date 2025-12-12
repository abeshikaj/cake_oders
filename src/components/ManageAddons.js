import React, { useState, useEffect } from 'react';
import '../styles/ManageAddons.css';

// Change to Backend2 API URL
const API_BASE_URL = 'http://localhost:5000/api';

// API functions for addons
const fetchAddons = async () => {
  try {
    console.log('Fetching addons from:', `${API_BASE_URL}/Addons`);

    const response = await fetch(`${API_BASE_URL}/Addons`);

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch addons: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched addons:', data);
    return data;

  } catch (error) {
    console.error('Error fetching addons:', error);
    alert(`Error fetching addons: ${error.message}`);
    return [];
  }
};


const createAddon = async (addonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Addons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addonData),
    });
    if (!response.ok) throw new Error('Failed to create addon');
    return await response.json();
  } catch (error) {
    console.error('Error creating addon:', error);
    alert('Error creating addon');
    return null;
  }
};

const updateAddon = async (id, addonData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Addons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addonData),
    });
    if (!response.ok) throw new Error('Failed to update addon');
    return true;
  } catch (error) {
    console.error('Error updating addon:', error);
    alert('Error updating addon');
    return false;
  }
};

const deleteAddon = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Addons/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete addon');
    return true;
  } catch (error) {
    console.error('Error deleting addon:', error);
    alert('Error deleting addon');
    return false;
  }
};

const ManageAddons = () => {
  const [addons, setAddons] = useState([]);
  const [editingAddon, setEditingAddon] = useState(null);
  const [editAddonName, setEditAddonName] = useState('');
  const [editAddonPrice, setEditAddonPrice] = useState('');
  const [editAddonDescription, setEditAddonDescription] = useState('');
  const [showAddAddonForm, setShowAddAddonForm] = useState(false);
  const [newAddonName, setNewAddonName] = useState('');
  const [newAddonPrice, setNewAddonPrice] = useState('');
  const [newAddonDescription, setNewAddonDescription] = useState('');

  useEffect(() => {
    testAPIConnection();
  }, []);

  const testAPIConnection = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch(`${API_BASE_URL}/status`);
      if (response.ok) {
        console.log('API connection successful');
        loadAddons();
      } else {
        console.log('API status endpoint not available, trying addons directly...');
        loadAddons();
      }
    } catch (error) {
      console.error('API connection test failed:', error);
      alert(`Cannot connect to API at ${API_BASE_URL}. Make sure the backend is running.`);
    }
  };

  const loadAddons = async () => {
    console.log('Loading addons...');
    const addonsData = await fetchAddons();
    console.log('Loaded addons data:', addonsData);
    setAddons(Array.isArray(addonsData) ? addonsData : []);
  };

  const handleAddAddon = async () => {
    if (!newAddonName || !newAddonPrice) {
      alert('Please enter addon name and price');
      return;
    }

    const addonData = {
      name: newAddonName,
      description: newAddonDescription || '',
      price: parseFloat(newAddonPrice),
      isAvailable: true
    };
    
    const newAddon = await createAddon(addonData);
    if (newAddon) {
      await loadAddons();
      setNewAddonName('');
      setNewAddonPrice('');
      setNewAddonDescription('');
      setShowAddAddonForm(false);
      alert('Add-on added successfully!');
    }
  };

  const handleCancelAddAddon = () => {
    setShowAddAddonForm(false);
    setNewAddonName('');
    setNewAddonPrice('');
    setNewAddonDescription('');
  };

  const handleDeleteAddon = async (addonId) => {
    if (window.confirm('Delete this add-on?')) {
      const success = await deleteAddon(addonId);
      if (success) {
        await loadAddons();
        alert('Add-on deleted!');
      }
    }
  };

  const handleEditAddon = (addon) => {
    setEditingAddon(addon.addonId);
    setEditAddonName(addon.name);
    setEditAddonPrice(addon.price.toString());
    setEditAddonDescription(addon.description || '');
  };

  const handleSaveAddon = async (addonId) => {
    if (editAddonName && editAddonPrice) {
      const addonData = {
        name: editAddonName,
        description: editAddonDescription,
        price: parseFloat(editAddonPrice),
        isAvailable: true
      };
      
      const success = await updateAddon(addonId, addonData);
      if (success) {
        await loadAddons();
        setEditingAddon(null);
        setEditAddonName('');
        setEditAddonPrice('');
        setEditAddonDescription('');
        alert('Add-on updated successfully!');
      }
    } else {
      alert('Please enter valid name and price');
    }
  };

  const handleCancelEdit = () => {
    setEditingAddon(null);
    setEditAddonName('');
    setEditAddonPrice('');
    setEditAddonDescription('');
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h3>Manage Add_ons</h3>
      </div>
      
      <div className="settings-card-content">
        {!showAddAddonForm ? (
          <button className="add-btn" onClick={() => setShowAddAddonForm(true)}>+ Add New Add-on</button>
        ) : (
          <div className="addon-form">
            <h4>Add New Add-on</h4>
            <input
              type="text"
              value={newAddonName}
              onChange={(e) => setNewAddonName(e.target.value)}
              placeholder="Add-on name (e.g., Extra Chocolate, Nuts)"
            />
            <textarea
              value={newAddonDescription}
              onChange={(e) => setNewAddonDescription(e.target.value)}
              placeholder="Description (optional)"
              rows="2"
            />
            <input
              type="number"
              step="0.01"
              value={newAddonPrice}
              onChange={(e) => setNewAddonPrice(e.target.value)}
              placeholder="Price"
            />
            <div className="form-actions">
              <button 
                className="save-btn"
                onClick={handleAddAddon}
              >
                Add Add_on
              </button>
              <button 
                className="cancel-btn"
                onClick={handleCancelAddAddon}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="addons-list">
          {addons && addons.length > 0 ? (
            addons.map(addon => (
              <div key={addon.addonId} className="addon-item">
                {editingAddon === addon.addonId ? (
                  <div className="addon-edit-form">
                    <input
                      type="text"
                      value={editAddonName}
                      onChange={(e) => setEditAddonName(e.target.value)}
                      placeholder="Addon name"
                    />
                    <textarea
                      value={editAddonDescription}
                      onChange={(e) => setEditAddonDescription(e.target.value)}
                      placeholder="Description (optional)"
                      rows="2"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editAddonPrice}
                      onChange={(e) => setEditAddonPrice(e.target.value)}
                      placeholder="Price"
                    />
                    <div className="form-actions">
                      <button 
                        className="save-btn"
                        onClick={() => handleSaveAddon(addon.addonId)}
                      >
                        Save
                      </button>
                      <button 
                        className="cancel-btn"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="addon-display">
                    <div className="addon-details">
                      <div className="addon-header">
                        <div className="addon-info">
                          <h4>{addon.name}</h4>
                          {addon.description && (
                            <p className="addon-description">{addon.description}</p>
                          )}
                        </div>
                        <span className="addon-price">₹{addon.price}</span>
                      </div>
                    </div>
                    <div className="addon-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditAddon(addon)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteAddon(addon.addonId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-message">No add-ons available. Click "Add New Add-on" to create one.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddons;
