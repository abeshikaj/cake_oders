import React, { useState } from 'react';
import ManageCategories from './ManageCategories';
import ManageCakes from './ManageCakes';
import ManageAddons from './ManageAddons';
import '../styles/Settings.css';

const Settings = () => {
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    cakes: false,
    addons: true
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="settings-section">
      <h2>System Settings</h2>
      
      {/* Manage Categories */}
      <div className="settings-card collapsible">
        <div className="settings-card-header" onClick={() => toggleSection('categories')}>
          <h3>Manage Categories</h3>
          <button className="collapse-btn">
            {collapsedSections.categories ? '▼' : '▲'}
          </button>
        </div>
        {!collapsedSections.categories && <ManageCategories />}
      </div>

      {/* Manage Cakes */}
      <div className="settings-card collapsible">
        <div className="settings-card-header" onClick={() => toggleSection('cakes')}>
          <h3>Manage Cakes</h3>
          <button className="collapse-btn">
            {collapsedSections.cakes ? '▼' : '▲'}
          </button>
        </div>
        {!collapsedSections.cakes && <ManageCakes />}
      </div>

      {/* Manage Add-ons */}
      <div className="settings-card collapsible">
        <div className="settings-card-header" onClick={() => toggleSection('addons')}>
          <h3>Manage Add-ons</h3>
          <button className="collapse-btn">
            {collapsedSections.addons ? '▼' : '▲'}
          </button>
        </div>
        {!collapsedSections.addons && <ManageAddons />}
      </div>
    </div>
  );
};

export default Settings;