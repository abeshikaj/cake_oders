import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCakeById, getAddons, addOrder } from '../utils/localStorage';
import '../styles/CakeDetailsPage.css';

const CakeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [addons, setAddons] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavour, setSelectedFlavour] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  // Order form state
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '',
    customMessage: '',
    specialInstructions: '',
    paymentType: 'COD'
  });

  useEffect(() => {
    const cakeData = getCakeById(id);
    if (cakeData) {
      setCake(cakeData);
      setSelectedSize(cakeData.sizes[0]);
      setSelectedFlavour(cakeData.flavours[0]);
      setSelectedColor(cakeData.colors[0]);
      setTotalPrice(cakeData.sizes[0].price);
    }
    const addonsData = getAddons();
    setAddons(addonsData);
  }, [id]);

  useEffect(() => {
    if (selectedSize) {
      let total = selectedSize.price;
      selectedAddons.forEach(addonId => {
        const addon = addons.find(a => a.id === addonId);
        if (addon) total += addon.price;
      });
      setTotalPrice(total);
    }
  }, [selectedSize, selectedAddons, addons]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  const handleFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    
    const order = {
      cakeId: cake.id,
      cakeName: cake.name,
      cakeImage: cake.image,
      size: selectedSize.weight,
      flavour: selectedFlavour,
      color: selectedColor,
      addons: selectedAddons.map(id => addons.find(a => a.id === id)),
      totalPrice: totalPrice,
      ...orderForm
    };

    const newOrder = addOrder(order);
    alert(`Order placed successfully! Your Order ID is: ${newOrder.id}`);
    navigate('/customer-dashboard');
  };

  if (!cake) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="cake-details-page">
      <div className="details-container">
        {/* Left side - Cake Details */}
        <div className="cake-details-left">
          <div className="cake-main-image">
            <img src={cake.image} alt={cake.name} />
          </div>
          
          <div className="cake-info-section">
            <h1>{cake.name}</h1>
            <p className="cake-description">{cake.description}</p>
            
            {/* Size Selection */}
            <div className="selection-group">
              <h3>Select Weight</h3>
              <div className="size-options">
                {cake.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`size-btn ${selectedSize?.weight === size.weight ? 'active' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size.weight}
                    <span className="size-price">₹{size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavour Selection */}
            <div className="selection-group">
              <h3>Select Flavour</h3>
              <select 
                value={selectedFlavour} 
                onChange={(e) => setSelectedFlavour(e.target.value)}
                className="select-input"
              >
                {cake.flavours.map((flavour, index) => (
                  <option key={index} value={flavour}>{flavour}</option>
                ))}
              </select>
            </div>

            {/* Color Selection */}
            <div className="selection-group">
              <h3>Select Color</h3>
              <select 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="select-input"
              >
                {cake.colors.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Delivery Time */}
            <div className="info-badge">
              <span>⏱️ Expected Delivery: {cake.deliveryTime}</span>
            </div>

            {/* Add-ons Section */}
            <div className="addons-section">
              <h3>Add-ons (Optional)</h3>
              <div className="addons-grid">
                {addons.map(addon => (
                  <label key={addon.id} className="addon-item">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonToggle(addon.id)}
                    />
                    <span className="addon-name">{addon.name}</span>
                    <span className="addon-price">+₹{addon.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Total Price */}
            <div className="total-price-section">
              <h2>Total Price: ₹{totalPrice}</h2>
              <button 
                className="order-now-main-btn"
                onClick={() => setShowOrderForm(true)}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Order Form */}
        {showOrderForm && (
          <div className="order-form-section">
            <h2>Complete Your Order</h2>
            <form onSubmit={handleOrderSubmit} className="order-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={orderForm.customerName}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={orderForm.customerPhone}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  name="deliveryAddress"
                  value={orderForm.deliveryAddress}
                  onChange={handleFormChange}
                  required
                  placeholder="Enter complete delivery address"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={orderForm.deliveryDate}
                    onChange={handleFormChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Time *</label>
                  <input
                    type="time"
                    name="deliveryTime"
                    value={orderForm.deliveryTime}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Custom Message on Cake</label>
                <input
                  type="text"
                  name="customMessage"
                  value={orderForm.customMessage}
                  onChange={handleFormChange}
                  placeholder="e.g., Happy Birthday!"
                  maxLength="50"
                />
              </div>

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  value={orderForm.specialInstructions}
                  onChange={handleFormChange}
                  placeholder="Any special requirements or instructions"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Payment Type *</label>
                <select
                  name="paymentType"
                  value={orderForm.paymentType}
                  onChange={handleFormChange}
                  required
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-item">
                  <span>Cake:</span>
                  <span>{cake.name}</span>
                </div>
                <div className="summary-item">
                  <span>Weight:</span>
                  <span>{selectedSize.weight}</span>
                </div>
                <div className="summary-item">
                  <span>Flavour:</span>
                  <span>{selectedFlavour}</span>
                </div>
                <div className="summary-item">
                  <span>Color:</span>
                  <span>{selectedColor}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="summary-item">
                    <span>Add-ons:</span>
                    <span>{selectedAddons.length} items</span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total Amount:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button type="submit" className="submit-order-btn">
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeDetailsPage;
