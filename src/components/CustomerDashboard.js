import React, { useState, useEffect } from 'react';
import { getOrders, updateOrder } from '../utils/localStorage';
import '../styles/CustomerDashboard.css';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const savedPhone = localStorage.getItem('customerPhone');
    if (savedPhone) {
      setCustomerPhone(savedPhone);
      setIsLoggedIn(true);
      loadOrders(savedPhone);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      filterOrders();
    }
  }, [activeTab, orders]);

  const loadOrders = (phone) => {
    const allOrders = getOrders();
    const customerOrders = allOrders.filter(o => o.customerPhone === phone);
    setOrders(customerOrders);
  };

  const filterOrders = () => {
    let filtered = [];
    switch(activeTab) {
      case 'all':
        filtered = orders;
        break;
      case 'pending':
        filtered = orders.filter(o => o.status === 'pending');
        break;
      case 'active':
        filtered = orders.filter(o => ['accepted', 'preparing', 'ready'].includes(o.status));
        break;
      case 'completed':
        filtered = orders.filter(o => o.status === 'completed' || o.status === 'delivered');
        break;
      default:
        filtered = orders;
    }
    setFilteredOrders(filtered);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (customerPhone && customerPhone.length === 10) {
      localStorage.setItem('customerPhone', customerPhone);
      setIsLoggedIn(true);
      loadOrders(customerPhone);
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerPhone');
    setIsLoggedIn(false);
    setCustomerPhone('');
    setOrders([]);
    setFilteredOrders([]);
  };

  const handleCancelOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order.status !== 'pending') {
      alert('Cannot cancel order. Please contact us directly.');
      return;
    }
    
    if (window.confirm('Are you sure you want to cancel this order?')) {
      updateOrder(orderId, { status: 'cancelled' });
      loadOrders(customerPhone);
      alert('Order cancelled successfully');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa500',
      accepted: '#2196f3',
      preparing: '#9c27b0',
      ready: '#4caf50',
      completed: '#4caf50',
      delivered: '#4caf50',
      rejected: '#f44336',
      cancelled: '#757575'
    };
    return colors[status] || '#757575';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pending Approval',
      accepted: 'Accepted',
      preparing: 'Preparing',
      ready: 'Ready for Delivery',
      completed: 'Completed',
      delivered: 'Delivered',
      rejected: 'Rejected',
      cancelled: 'Cancelled'
    };
    return texts[status] || status;
  };

  if (!isLoggedIn) {
    return (
      <div className="customer-login">
        <div className="login-container">
          <h2>Customer Dashboard</h2>
          <p>Enter your phone number to view your orders</p>
          <form onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
            <button type="submit">View My Orders</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Orders</h1>
          <p>Phone: {customerPhone}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders ({orders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="customer-order-card">
              <div className="order-card-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="order-card-body">
                <div className="order-image">
                  <img src={order.cakeImage} alt={order.cakeName} />
                </div>
                <div className="order-info">
                  <h4>{order.cakeName}</h4>
                  <div className="info-row">
                    <span>Weight:</span>
                    <span>{order.size}</span>
                  </div>
                  <div className="info-row">
                    <span>Flavour:</span>
                    <span>{order.flavour}</span>
                  </div>
                  <div className="info-row">
                    <span>Color:</span>
                    <span>{order.color}</span>
                  </div>
                  <div className="info-row">
                    <span>Delivery:</span>
                    <span>{order.deliveryDate} at {order.deliveryTime}</span>
                  </div>
                  <div className="info-row">
                    <span>Address:</span>
                    <span>{order.deliveryAddress}</span>
                  </div>
                  {order.customMessage && (
                    <div className="info-row">
                      <span>Message:</span>
                      <span>{order.customMessage}</span>
                    </div>
                  )}
                  {order.addons && order.addons.length > 0 && (
                    <div className="info-row">
                      <span>Add-ons:</span>
                      <span>{order.addons.map(a => a.name).join(', ')}</span>
                    </div>
                  )}
                  {order.extraCharges && (
                    <div className="info-row extra-charges">
                      <span>Extra Charges:</span>
                      <span>₹{order.extraCharges} ({order.chargeDescription})</span>
                    </div>
                  )}
                  <div className="info-row total-price">
                    <span>Total Amount:</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                  <div className="info-row">
                    <span>Payment:</span>
                    <span>{order.paymentType}</span>
                  </div>
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="order-timeline">
                <div className={`timeline-step ${['pending', 'accepted', 'preparing', 'ready', 'completed'].includes(order.status) ? 'completed' : ''}`}>
                  <div className="timeline-dot"></div>
                  <span>Order Placed</span>
                </div>
                <div className={`timeline-step ${['accepted', 'preparing', 'ready', 'completed'].includes(order.status) ? 'completed' : ''}`}>
                  <div className="timeline-dot"></div>
                  <span>Accepted</span>
                </div>
                <div className={`timeline-step ${['preparing', 'ready', 'completed'].includes(order.status) ? 'completed' : ''}`}>
                  <div className="timeline-dot"></div>
                  <span>Preparing</span>
                </div>
                <div className={`timeline-step ${['ready', 'completed'].includes(order.status) ? 'completed' : ''}`}>
                  <div className="timeline-dot"></div>
                  <span>Ready</span>
                </div>
                <div className={`timeline-step ${order.status === 'completed' ? 'completed' : ''}`}>
                  <div className="timeline-dot"></div>
                  <span>Delivered</span>
                </div>
              </div>

              <div className="order-actions">
                {order.status === 'pending' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === 'rejected' && order.rejectionReason && (
                  <div className="rejection-reason">
                    <strong>Rejection Reason:</strong> {order.rejectionReason}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
