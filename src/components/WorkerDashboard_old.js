import React, { useState, useEffect } from 'react';
import { getOrders, updateOrder } from '../utils/localStorage';
import Settings from './Settings';
import '../styles/WorkerDashboard.css';

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [extraCharges, setExtraCharges] = useState(0);
  const [chargeDescription, setChargeDescription] = useState('');

  useEffect(() => {
    loadOrders();
  }, [activeTab]);

  const loadOrders = () => {
    const allOrders = getOrders();
    let filtered = [];
    
    switch(activeTab) {
      case 'new':
        filtered = allOrders.filter(o => o.status === 'pending');
        break;
      case 'inprocess':
        filtered = allOrders.filter(o => o.status === 'accepted' || o.status === 'preparing');
        break;
      case 'completed':
        filtered = allOrders.filter(o => o.status === 'completed' || o.status === 'delivered');
        break;
      case 'settings':
        break;
      default:
        filtered = allOrders;
    }
    
    setOrders(filtered);
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAcceptOrder = (orderId) => {
    if (window.confirm('Accept this order?')) {
      updateOrder(orderId, { status: 'accepted' });
      loadOrders();
      alert('Order accepted successfully!');
    }
  };

  const handleRejectOrder = (orderId) => {
    const reason = window.prompt('Enter rejection reason:');
    if (reason) {
      updateOrder(orderId, { status: 'rejected', rejectionReason: reason });
      loadOrders();
      alert('Order rejected.');
    }
  };

  const handleAddExtraCharges = (orderId) => {
    if (extraCharges > 0 && chargeDescription) {
      const order = orders.find(o => o.id === orderId);
      const newTotal = order.totalPrice + parseInt(extraCharges);
      updateOrder(orderId, { 
        totalPrice: newTotal,
        extraCharges: extraCharges,
        chargeDescription: chargeDescription
      });
      setExtraCharges(0);
      setChargeDescription('');
      setSelectedOrder(null);
      loadOrders();
      alert('Extra charges added successfully!');
    } else {
      alert('Please enter valid charges and description');
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrder(orderId, { status: newStatus });
    loadOrders();
    alert(`Order status updated to ${newStatus}`);
  };

  const handleDeleteCake = (cakeId) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
      deleteCake(cakeId);
      setCakes(getCakes());
      alert('Cake deleted successfully!');
    }
  };

  const handleAddAddon = () => {
    const name = prompt('Enter add-on name:');
    const price = prompt('Enter add-on price:');
    if (name && price) {
      const newAddon = {
        id: Date.now(),
        name: name,
        price: parseInt(price),
        type: 'custom'
      };
      const updatedAddons = [...addons, newAddon];
      updateAddons(updatedAddons);
      setAddons(updatedAddons);
      alert('Add-on added successfully!');
    }
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

  const handleAddCategory = () => {
    if (!catName) {
      alert('Please enter category name');
      return;
    }
    const newCat = {
      name: catName,
      description: catDescription || '',
      image: catImage || ''
    };
    const added = addCategory(newCat);
    setCategories(getCategories());
    setCatName('');
    setCatDescription('');
    setCatImage('');
    alert('Category added');
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat.id);
    setCatName(cat.name);
    setCatDescription(cat.description || '');
    setCatImage(cat.image || '');
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    updateCategory(editingCategory, { name: catName, description: catDescription, image: catImage });
    setCategories(getCategories());
    setEditingCategory(null);
    setCatName('');
    setCatDescription('');
    setCatImage('');
    alert('Category updated');
  };

  const handleCancelCategoryEdit = () => {
    setEditingCategory(null);
    setCatName('');
    setCatDescription('');
    setCatImage('');
  };

  const handleDeleteCategory = (catId) => {
    if (window.confirm('Delete this category?')) {
      deleteCategory(catId);
      setCategories(getCategories());
      alert('Category deleted');
    }
  };

  const handleCakeImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCakeFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCakeFormChange = (field, value) => {
    setCakeFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWeightChange = (index, field, value) => {
    const newWeights = [...cakeFormData.weights];
    newWeights[index] = { ...newWeights[index], [field]: value };
    setCakeFormData(prev => ({ ...prev, weights: newWeights }));
  };

  const addWeightRow = () => {
    setCakeFormData(prev => ({
      ...prev,
      weights: [...prev.weights, { weight: '', price: '' }]
    }));
  };

  const removeWeightRow = (index) => {
    if (cakeFormData.weights.length > 1) {
      const newWeights = cakeFormData.weights.filter((_, i) => i !== index);
      setCakeFormData(prev => ({ ...prev, weights: newWeights }));
    }
  };

  const handleAddCake = () => {
    if (!cakeFormData.name || !cakeFormData.category) {
      alert('Please enter cake name and category');
      return;
    }
    
    const validWeights = cakeFormData.weights.filter(w => w.weight && w.price);
    if (validWeights.length === 0) {
      alert('Please add at least one weight and price');
      return;
    }

    const newCake = {
      name: cakeFormData.name,
      category: cakeFormData.category,
      description: cakeFormData.description,
      image: cakeFormData.image || 'https://via.placeholder.com/300x300?text=Cake',
      basePrice: parseInt(validWeights[0].price),
      sizes: validWeights.map(w => ({ weight: w.weight, price: parseInt(w.price) })),
      flavours: ['Vanilla', 'Chocolate', 'Strawberry'],
      colors: ['White', 'Pink', 'Brown'],
      deliveryTime: '24 hours'
    };

    addCake(newCake);
    setCakes(getCakes());
    setCakeFormData({
      name: '',
      category: '',
      description: '',
      image: '',
      weights: [{ weight: '', price: '' }]
    });
    alert('Cake added successfully!');
  };

  const handleEditCake = (cake) => {
    setEditingCake(cake.id);
    setCakeFormData({
      name: cake.name,
      category: cake.category,
      description: cake.description,
      image: cake.image,
      weights: cake.sizes || [{ weight: '', price: '' }]
    });
  };

  const handleSaveCake = () => {
    // Since we don't have updateCake function, we'll delete and add
    handleDeleteCake(editingCake);
    handleAddCake();
    setEditingCake(null);
  };

  const handleCancelCakeEdit = () => {
    setEditingCake(null);
    setCakeFormData({
      name: '',
      category: '',
      description: '',
      image: '',
      weights: [{ weight: '', price: '' }]
    });
  };

  const handleDeleteAddon = (addonId) => {
    if (window.confirm('Delete this add-on?')) {
      const updatedAddons = addons.filter(a => a.id !== addonId);
      updateAddons(updatedAddons);
      setAddons(updatedAddons);
      alert('Add-on deleted!');
    }
  };

  const handleEditAddon = (addon) => {
    setEditingAddon(addon.id);
    setEditAddonName(addon.name);
    setEditAddonPrice(addon.price.toString());
  };

  const handleSaveAddon = (addonId) => {
    if (editAddonName && editAddonPrice) {
      const updatedAddons = addons.map(addon => 
        addon.id === addonId 
          ? { ...addon, name: editAddonName, price: parseInt(editAddonPrice) }
          : addon
      );
      updateAddons(updatedAddons);
      setAddons(updatedAddons);
      setEditingAddon(null);
      setEditAddonName('');
      setEditAddonPrice('');
      alert('Add-on updated successfully!');
    } else {
      alert('Please enter valid name and price');
    }
  };

  const handleCancelEdit = () => {
    setEditingAddon(null);
    setEditAddonName('');
    setEditAddonPrice('');
  };

  const renderNewOrders = () => (
    <div className="orders-list">
      <h2>New Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No new orders</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order ID: {order.id}</h3>
              <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="order-details">
              <div className="detail-row">
                <strong>Customer:</strong> {order.customerName} | {order.customerPhone}
              </div>
              <div className="detail-row">
                <strong>Cake:</strong> {order.cakeName} ({order.size})
              </div>
              <div className="detail-row">
                <strong>Flavour:</strong> {order.flavour} | <strong>Color:</strong> {order.color}
              </div>
              <div className="detail-row">
                <strong>Delivery:</strong> {order.deliveryDate} at {order.deliveryTime}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {order.deliveryAddress}
              </div>
              {order.customMessage && (
                <div className="detail-row">
                  <strong>Message:</strong> {order.customMessage}
                </div>
              )}
              {order.addons && order.addons.length > 0 && (
                <div className="detail-row">
                  <strong>Add-ons:</strong> {order.addons.map(a => a.name).join(', ')}
                </div>
              )}
              {order.specialInstructions && (
                <div className="detail-row">
                  <strong>Special Instructions:</strong> {order.specialInstructions}
                </div>
              )}
              <div className="detail-row price-row">
                <strong>Total Price:</strong> ₹{order.totalPrice}
              </div>
            </div>
            <div className="order-actions">
              <button 
                className="accept-btn"
                onClick={() => handleAcceptOrder(order.id)}
              >
                ✔ Accept Order
              </button>
              <button 
                className="reject-btn"
                onClick={() => handleRejectOrder(order.id)}
              >
                ❌ Reject Order
              </button>
              <button 
                className="extra-charge-btn"
                onClick={() => setSelectedOrder(order.id)}
              >
                📝 Add Extra Charges
              </button>
            </div>
            
            {selectedOrder === order.id && (
              <div className="extra-charges-form">
                <h4>Add Extra Charges</h4>
                <input
                  type="number"
                  placeholder="Amount"
                  value={extraCharges}
                  onChange={(e) => setExtraCharges(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description (e.g., Premium decoration)"
                  value={chargeDescription}
                  onChange={(e) => setChargeDescription(e.target.value)}
                />
                <button onClick={() => handleAddExtraCharges(order.id)}>Add Charges</button>
                <button onClick={() => setSelectedOrder(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  const renderInProcessOrders = () => (
    <div className="orders-list">
      <h2>Orders In Process</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders in process</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card in-process">
            <div className="order-header">
              <h3>Order ID: {order.id}</h3>
              <span className="status-badge">{order.status}</span>
            </div>
            <div className="order-details">
              <div className="detail-row">
                <strong>Customer:</strong> {order.customerName}
              </div>
              <div className="detail-row">
                <strong>Cake:</strong> {order.cakeName} ({order.size})
              </div>
              <div className="detail-row">
                <strong>Delivery:</strong> {order.deliveryDate} at {order.deliveryTime}
              </div>
              <div className="detail-row price-row">
                <strong>Total:</strong> ₹{order.totalPrice}
              </div>
            </div>
            <div className="order-actions">
              {order.status === 'accepted' && (
                <button 
                  className="status-btn"
                  onClick={() => handleUpdateStatus(order.id, 'preparing')}
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button 
                  className="status-btn"
                  onClick={() => handleUpdateStatus(order.id, 'ready')}
                >
                  Mark Ready for Delivery
                </button>
              )}
              {order.status === 'ready' && (
                <button 
                  className="status-btn"
                  onClick={() => handleUpdateStatus(order.id, 'completed')}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderCompletedOrders = () => (
    <div className="orders-list">
      <h2>Completed Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No completed orders</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card completed">
            <div className="order-header">
              <h3>Order ID: {order.id}</h3>
              <span className="status-badge completed">{order.status}</span>
            </div>
            <div className="order-details">
              <div className="detail-row">
                <strong>Customer:</strong> {order.customerName}
              </div>
              <div className="detail-row">
                <strong>Cake:</strong> {order.cakeName}
              </div>
              <div className="detail-row">
                <strong>Delivered:</strong> {order.deliveryDate}
              </div>
              <div className="detail-row price-row">
                <strong>Total:</strong> ₹{order.totalPrice}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-header">
        <h2>🛠️ System Management</h2>
        <p>Configure your bakery's categories, products and add-ons</p>
      </div>
      
      <div className="settings-tabs">
        <button 
          className={`settings-tab ${activeSettingsTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveSettingsTab('categories')}
        >
          <span className="tab-icon">🏷️</span>
          <span className="tab-text">Categories</span>
        </button>
        <button 
          className={`settings-tab ${activeSettingsTab === 'cakes' ? 'active' : ''}`}
          onClick={() => setActiveSettingsTab('cakes')}
        >
          <span className="tab-icon">🎂</span>
          <span className="tab-text">Cakes</span>
        </button>
        <button 
          className={`settings-tab ${activeSettingsTab === 'addons' ? 'active' : ''}`}
          onClick={() => setActiveSettingsTab('addons')}
        >
          <span className="tab-icon">✨</span>
          <span className="tab-text">Add-ons</span>
        </button>
      </div>

      <div className="settings-content">
        {activeSettingsTab === 'categories' && (
          <div className="tab-panel">
            <div className="panel-header">
              <h3>Manage Categories</h3>
              <span className="panel-subtitle">Organize your cake collections</span>
            </div>
            
            <div className="settings-grid">
              <div className="form-section">
                <div className="form-card">
                  <h4>Add New Category</h4>
                  <div className="modern-form">
                    <div className="input-group">
                      <label>Category Name</label>
                      <input
                        type="text"
                        placeholder="Enter category name"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Category Image</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCategoryImageChange}
                          id="cat-image"
                        />
                        <label htmlFor="cat-image" className="file-label">
                          📸 Choose Image
                        </label>
                      </div>
                      {catImage && (
                        <div className="image-preview">
                          <img src={catImage} alt="preview" />
                        </div>
                      )}
                    </div>
                    
                    <div className="input-group">
                      <label>Description</label>
                      <textarea
                        placeholder="Describe this category"
                        value={catDescription}
                        onChange={(e) => setCatDescription(e.target.value)}
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-actions">
                      {editingCategory ? (
                        <>
                          <button className="btn-primary" onClick={handleSaveCategory}>
                            💾 Save Changes
                          </button>
                          <button className="btn-secondary" onClick={handleCancelCategoryEdit}>
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <button className="btn-primary" onClick={handleAddCategory}>
                          ➕ Add Category
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="list-section">
                <div className="list-card">
                  <h4>Existing Categories</h4>
                  <div className="items-grid">
                    {categories && categories.length > 0 ? (
                      categories.map(cat => (
                        <div key={cat.id} className="item-card">
                          <div className="item-image">
                            {cat.image ? (
                              <img src={cat.image} alt={cat.name} />
                            ) : (
                              <div className="placeholder-image">🏷️</div>
                            )}
                          </div>
                          <div className="item-details">
                            <h5>{cat.name}</h5>
                            <p>{cat.description}</p>
                          </div>
                          <div className="item-actions">
                            <button className="btn-edit" onClick={() => handleEditCategory(cat)}>
                              ✏️
                            </button>
                            <button className="btn-delete" onClick={() => handleDeleteCategory(cat.id)}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <span>🏷️</span>
                        <p>No categories yet</p>
                        <small>Add your first category to get started</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSettingsTab === 'cakes' && (
          <div className="tab-panel">
            <div className="panel-header">
              <h3>Manage Cakes</h3>
              <span className="panel-subtitle">Add and manage your cake products</span>
            </div>
            
            <div className="settings-grid">
              <div className="form-section">
                <div className="form-card">
                  <h4>Add New Cake</h4>
                  <div className="modern-form">
                    <div className="form-row">
                      <div className="input-group">
                        <label>Cake Name</label>
                        <input
                          type="text"
                          placeholder="Enter cake name"
                          value={cakeFormData.name}
                          onChange={(e) => handleCakeFormChange('name', e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <label>Category</label>
                        <select
                          value={cakeFormData.category}
                          onChange={(e) => handleCakeFormChange('category', e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="input-group">
                      <label>Description</label>
                      <textarea
                        placeholder="Describe your cake"
                        value={cakeFormData.description}
                        onChange={(e) => handleCakeFormChange('description', e.target.value)}
                        rows="3"
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Cake Image</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCakeImageChange}
                          id="cake-image"
                        />
                        <label htmlFor="cake-image" className="file-label">
                          🖼️ Choose Image
                        </label>
                      </div>
                      {cakeFormData.image && (
                        <div className="image-preview">
                          <img src={cakeFormData.image} alt="preview" />
                        </div>
                      )}
                    </div>

                    <div className="weights-container">
                      <label>Weight & Pricing</label>
                      <div className="weights-list">
                        {cakeFormData.weights.map((weightItem, index) => (
                          <div key={index} className="weight-item">
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
                            {cakeFormData.weights.length > 1 && (
                              <button 
                                type="button" 
                                className="btn-remove"
                                onClick={() => removeWeightRow(index)}
                              >
                                ❌
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" className="btn-add-weight" onClick={addWeightRow}>
                          ➕ Add Weight Option
                        </button>
                      </div>
                    </div>

                    <div className="form-actions">
                      {editingCake ? (
                        <>
                          <button className="btn-primary" onClick={handleSaveCake}>
                            💾 Save Changes
                          </button>
                          <button className="btn-secondary" onClick={handleCancelCakeEdit}>
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <button className="btn-primary" onClick={handleAddCake}>
                          🎂 Add Cake
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="list-section">
                <div className="list-card">
                  <h4>Your Cakes</h4>
                  <div className="items-grid">
                    {cakes.map(cake => (
                      <div key={cake.id} className="item-card">
                        <div className="item-image">
                          <img src={cake.image} alt={cake.name} />
                        </div>
                        <div className="item-details">
                          <h5>{cake.name}</h5>
                          <p className="category-badge">{cake.category}</p>
                          <p className="price">Base: ₹{cake.basePrice}</p>
                          {cake.sizes && (
                            <p className="sizes">
                              {cake.sizes.map(s => `${s.weight}(₹${s.price})`).join(', ')}
                            </p>
                          )}
                        </div>
                        <div className="item-actions">
                          <button className="btn-edit" onClick={() => handleEditCake(cake)}>
                            ✏️
                          </button>
                          <button className="btn-delete" onClick={() => handleDeleteCake(cake.id)}>
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSettingsTab === 'addons' && (
          <div className="tab-panel">
            <div className="panel-header">
              <h3>Manage Add-ons</h3>
              <span className="panel-subtitle">Extra services and toppings</span>
            </div>
            
            <div className="addons-section">
              <div className="addon-form-card">
                <button className="btn-primary" onClick={handleAddAddon}>
                  ✨ Add New Add-on
                </button>
              </div>
              
              <div className="addons-grid">
                {addons.map(addon => (
                  <div key={addon.id} className="addon-card">
                    {editingAddon === addon.id ? (
                      <div className="addon-edit">
                        <input
                          type="text"
                          value={editAddonName}
                          onChange={(e) => setEditAddonName(e.target.value)}
                          placeholder="Add-on name"
                        />
                        <input
                          type="number"
                          value={editAddonPrice}
                          onChange={(e) => setEditAddonPrice(e.target.value)}
                          placeholder="Price"
                        />
                        <div className="edit-actions">
                          <button className="btn-save" onClick={() => handleSaveAddon(addon.id)}>
                            💾
                          </button>
                          <button className="btn-cancel" onClick={handleCancelEdit}>
                            ❌
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="addon-display">
                        <div className="addon-info">
                          <h5>{addon.name}</h5>
                          <p className="price">₹{addon.price}</p>
                        </div>
                        <div className="addon-actions">
                          <button className="btn-edit" onClick={() => handleEditAddon(addon)}>
                            ✏️
                          </button>
                          <button className="btn-delete" onClick={() => handleDeleteAddon(addon.id)}>
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="worker-dashboard">
      <div className="dashboard-header">
        <h1>Worker Dashboard</h1>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          New Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inprocess' ? 'active' : ''}`}
          onClick={() => setActiveTab('inprocess')}
        >
          In Process
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'new' && renderNewOrders()}
        {activeTab === 'inprocess' && renderInProcessOrders()}
        {activeTab === 'completed' && renderCompletedOrders()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default WorkerDashboard;