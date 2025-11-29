import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCakes, getCakesByCategory } from '../utils/localStorage';
import '../styles/CakeListingPage.css';

const CakeListingPage = () => {
  const { category } = useParams();
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);

  useEffect(() => {
    if (category === 'all') {
      const allCakes = getCakes();
      setCakes(allCakes);
      setFilteredCakes(allCakes);
    } else {
      const categoryCakes = getCakesByCategory(category);
      setCakes(categoryCakes);
      setFilteredCakes(categoryCakes);
    }
  }, [category]);

  const getCategoryTitle = () => {
    const titles = {
      wedding: 'Wedding Cakes',
      birthday: 'Birthday Cakes',
      brownies: 'Brownies',
      cupcakes: 'Cupcakes',
      custom: 'Custom Cakes',
      anniversary: 'Anniversary Cakes',
      kids: 'Kids Cakes',
      giftbox: 'Gift Boxes',
      all: 'All Cakes'
    };
    return titles[category] || 'Cakes';
  };

  return (
    <div className="cake-listing-page">
      <div className="listing-header">
        <h1>{getCategoryTitle()}</h1>
        <p>Choose from our delicious selection</p>
      </div>

      {filteredCakes.length === 0 ? (
        <div className="no-cakes">
          <p>No cakes available in this category yet.</p>
          <Link to="/" className="back-home-btn">Back to Home</Link>
        </div>
      ) : (
        <div className="cakes-grid">
          {filteredCakes.map(cake => (
            <div key={cake.id} className="cake-card">
              <div className="cake-image">
                <img src={cake.image} alt={cake.name} />
              </div>
              <div className="cake-info">
                <h3 className="cake-name">{cake.name}</h3>
                <p className="cake-description">{cake.description}</p>
                <div className="cake-footer">
                  <div className="cake-price">
                    <span className="price-label">Starting from</span>
                    <span className="price-value">₹{cake.basePrice}</span>
                  </div>
                  <Link to={`/cake-details/${cake.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CakeListingPage;
