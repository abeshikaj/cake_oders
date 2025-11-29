import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeDefaultData } from '../utils/localStorage';
import '../styles/HomePage.css';

const HomePage = () => {
  useEffect(() => {
    initializeDefaultData();
  }, []);

  const categories = [
    { id: 'wedding', name: 'Wedding Cakes',  description: 'Elegant multi-tier cakes', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=300&fit=crop' },
    { id: 'birthday', name: 'Birthday Cakes', icon: '🎉', description: 'Colorful celebration cakes', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop' },
    { id: 'brownies', name: 'Brownies', icon: '🍫', description: 'Rich chocolate brownies', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop' },
    { id: 'cupcakes', name: 'Cupcakes', icon: '🧁', description: 'Assorted cupcakes', image: 'https://images.unsplash.com/photo-1426869884541-df7117556757?w=400&h=300&fit=crop' },
    { id: 'custom', name: 'Custom Cakes', icon: '🍰', description: 'Design your own cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
    { id: 'anniversary', name: 'Anniversary Cakes', icon: '🥮', description: 'Romantic anniversary cakes', image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=300&fit=crop' },
    { id: 'kids', name: 'Kids Cakes', icon: '🧒', description: 'Fun cartoon-themed cakes', image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop' },
    { id: 'giftbox', name: 'Gift Boxes', icon: '🎁', description: 'Premium gift boxes', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop' }
  ];

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Cake Paradise</h1>
          <p className="hero-subtitle">Delicious Cakes Made Fresh Daily</p>
          <p className="hero-description">
            Order custom cakes, brownies, cupcakes, and more for your special occasions
          </p>
          <Link to="/cakes/all" className="order-now-btn">
            Order Now
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://via.placeholder.com/600x400?text=Delicious+Cakes" 
            alt="Beautiful Cakes" 
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Browse Our Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              to={`/cakes/${category.id}`} 
              key={category.id} 
              className="category-card"
            >
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} className="category-image" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Cake Designs Section */}
      <section className="cake-designs-section">
        <div className="designs-header">
          <h2 className="section-title">Our Cake Designs</h2>
          <Link to="/cakes/all" className="see-more-btn">See More →</Link>
        </div>
        <div className="designs-grid">
          <div className="design-card">
            <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=400&fit=crop" alt="Chocolate Delight" className="design-image" />
            <div className="design-info">
              <h3 className="design-name">Chocolate Delight</h3>
              <p className="design-desc">Rich chocolate layers with ganache</p>
              <p className="design-price">$45.00</p>
            </div>
          </div>
          <div className="design-card">
            <img src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=500&h=400&fit=crop" alt="Strawberry Dream" className="design-image" />
            <div className="design-info">
              <h3 className="design-name">Strawberry Dream</h3>
              <p className="design-desc">Fresh strawberries with cream</p>
              <p className="design-price">$42.00</p>
            </div>
          </div>
          <div className="design-card">
            <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop" alt="Vanilla Classic" className="design-image" />
            <div className="design-info">
              <h3 className="design-name">Vanilla Classic</h3>
              <p className="design-desc">Elegant vanilla with buttercream</p>
              <p className="design-price">$40.00</p>
            </div>
          </div>
          <div className="design-card">
            <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&h=400&fit=crop" alt="Red Velvet" className="design-image" />
            <div className="design-info">
              <h3 className="design-name">Red Velvet</h3>
              <p className="design-desc">Classic red velvet with cream cheese</p>
              <p className="design-price">$48.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Custom Designs</h3>
            <p>Personalize your cake with custom designs and messages</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery to your doorstep</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>Quality Ingredients</h3>
            <p>Made with the finest and freshest ingredients</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing with no hidden charges</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
