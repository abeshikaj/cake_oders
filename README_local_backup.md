# Cake Ordering System - Frontend (React.js)

A complete frontend application for an online cake ordering system built with React.js. This application uses localStorage for temporary data storage and includes features for customers and workers (admins).

## Features

### Customer Features
- **Home Page**: Browse cake categories with beautiful UI
- **Cake Categories**: 
  - 🎂 Wedding Cakes
  - 🎉 Birthday Cakes
  - 🍫 Brownies
  - 🧁 Cupcakes
  - 🍰 Custom Cakes
  - 🥮 Anniversary Cakes
  - 🧒 Kids Cakes
  - 🎁 Gift Boxes

- **Cake Details**: 
  - Select size, flavour, and color
  - Add optional add-ons (icing, toppings, decorations, etc.)
  - Live price calculation
  - Custom message on cake

- **Order Management**:
  - Place orders with delivery details
  - Track order status (Pending → Accepted → Preparing → Ready → Delivered)
  - View order history
  - Cancel pending orders
  - Payment options (COD/Online)

### Worker/Admin Features
- **New Orders Tab**: 
  - View all incoming orders
  - Accept or reject orders
  - Add extra charges with descriptions

- **In-Process Orders Tab**:
  - Update order status
  - Mark orders as preparing, ready, or completed

- **Completed Orders Tab**:
  - View all completed orders

- **Settings**:
  - Manage cakes (add/remove)
  - Manage add-ons (add/edit/delete)
  - Price management

## Tech Stack
- **React.js** (v18.2.0)
- **React Router** (v6.20.0) - for navigation
- **localStorage** - for temporary data storage
- **CSS3** - for styling with gradients and animations

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps to Run

1. **Navigate to the project directory**
   ```powershell
   cd "c:\Users\abesh\OneDrive\Desktop\cake making\Frontend_ReactJS"
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Start the development server**
   ```powershell
   npm start
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to `http://localhost:3000`

## Project Structure

```
Frontend_ReactJS/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomePage.js
│   │   ├── CakeListingPage.js
│   │   ├── CakeDetailsPage.js
│   │   ├── WorkerDashboard.js
│   │   ├── CustomerDashboard.js
│   │   └── Navigation.js
│   ├── styles/
│   │   ├── HomePage.css
│   │   ├── CakeListingPage.css
│   │   ├── CakeDetailsPage.css
│   │   ├── WorkerDashboard.css
│   │   ├── CustomerDashboard.css
│   │   └── Navigation.css
│   ├── utils/
│   │   └── localStorage.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Usage Guide

### For Customers

1. **Browse Cakes**:
   - Visit home page and select a category
   - View all cakes in that category

2. **Order a Cake**:
   - Click on "View Details" for any cake
   - Select weight, flavour, and color
   - Add optional add-ons
   - Click "Order Now" and fill the order form
   - Submit the order

3. **Track Orders**:
   - Go to "My Orders" in the navigation
   - Enter your phone number (10 digits)
   - View all your orders and their status
   - Cancel orders that are still pending

### For Workers/Admins

1. **Manage New Orders**:
   - Go to "Worker Dashboard"
   - Click on "New Orders" tab
   - Accept or reject orders
   - Add extra charges if needed

2. **Process Orders**:
   - Go to "In Process" tab
   - Update order status as you work on them
   - Mark as "Preparing" → "Ready" → "Completed"

3. **View History**:
   - Go to "Completed" tab to see all completed orders

4. **Manage System**:
   - Go to "Settings" tab
   - Add/remove cakes
   - Add/edit/remove add-ons

## Data Storage

This application uses **localStorage** for temporary data storage. All data is stored in your browser and will persist until you clear browser data.

### Storage Keys:
- `cakes` - All cake products
- `orders` - All customer orders
- `addons` - Available add-ons
- `customerPhone` - Customer login session

### Default Data:
The app comes pre-loaded with:
- 8 sample cakes across all categories
- 8 default add-ons
- Empty orders array

## Features Breakdown

### Order Status Flow
1. **Pending** - Order placed, waiting for worker approval
2. **Accepted** - Worker accepted the order
3. **Preparing** - Worker is preparing the cake
4. **Ready** - Cake is ready for delivery
5. **Completed/Delivered** - Order completed

### Price Calculation
- Base price depends on selected weight
- Add-ons increase total price
- Extra charges can be added by workers
- All calculations happen in real-time

### Add-ons Available
- Icing Design (+₹200)
- Chocolate Syrup (+₹100)
- Extra Toppings (+₹150)
- Ribbon Decoration (+₹80)
- Fresh Flowers (+₹300)
- Custom Message (+₹50)
- Photo Print Top (+₹250)
- Candle Pack (+₹100)

## Customization

### Adding New Cakes
Workers can add new cakes through the Settings section, but for development:
1. Open `src/utils/localStorage.js`
2. Add new cake object to `defaultCakes` array
3. Clear localStorage and refresh

### Styling
All styles are in the `src/styles/` directory. Each component has its own CSS file for easy customization.

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Notes
- This is a frontend-only application
- No backend server required
- Data is stored in browser localStorage
- Perfect for demonstration and testing purposes

## Future Enhancements (Backend Integration)
When you're ready to add a backend:
- Replace localStorage with API calls
- Add user authentication
- Implement real payment gateway
- Add image upload functionality
- Send email/SMS notifications
- Add database for persistent storage

## Support
For any issues or questions, please refer to the code comments or create an issue in the repository.

## License
MIT License - Feel free to use and modify as needed.

---

**Enjoy building with the Cake Ordering System! 🎂**
