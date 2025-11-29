import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import CakeListingPage from './components/CakeListingPage';
import CakeDetailsPage from './components/CakeDetailsPage';
import WorkerDashboard from './components/WorkerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cakes/:category" element={<CakeListingPage />} />
          <Route path="/cake-details/:id" element={<CakeDetailsPage />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
