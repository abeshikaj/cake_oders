// Local Storage utility functions for temporary data storage

export const storageKeys = {
  CAKES: 'cakes',
  ORDERS: 'orders',
  ADDONS: 'addons',
  CATEGORIES: 'categories',
  CUSTOMER_INFO: 'customerInfo'
};

// Initialize default data
export const initializeDefaultData = () => {
  if (!localStorage.getItem(storageKeys.CAKES)) {
    const defaultCakes = [
      {
        id: 1,
        name: "Classic Wedding Elegance",
        category: "wedding",
        image: "https://via.placeholder.com/300x300?text=Wedding+Cake",
        basePrice: 5000,
        description: "Elegant multi-tier wedding cake with beautiful decorations",
        sizes: [
          { weight: "0.5kg", price: 5000 },
          { weight: "1kg", price: 8000 },
          { weight: "2kg", price: 15000 },
          { weight: "4kg", price: 28000 }
        ],
        flavours: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet"],
        colors: ["White", "Pink", "Gold", "Ivory"],
        deliveryTime: "48 hours"
      },
      {
        id: 2,
        name: "Birthday Celebration",
        category: "birthday",
        image: "https://via.placeholder.com/300x300?text=Birthday+Cake",
        basePrice: 800,
        description: "Colorful birthday cake perfect for celebrations",
        sizes: [
          { weight: "0.5kg", price: 800 },
          { weight: "1kg", price: 1200 },
          { weight: "2kg", price: 2000 },
          { weight: "4kg", price: 3500 }
        ],
        flavours: ["Chocolate", "Vanilla", "Butter-scotch", "Strawberry"],
        colors: ["Rainbow", "Blue", "Pink", "Red"],
        deliveryTime: "24 hours"
      },
      {
        id: 3,
        name: "Chocolate Brownie Delight",
        category: "brownies",
        image: "https://via.placeholder.com/300x300?text=Brownies",
        basePrice: 500,
        description: "Rich and fudgy chocolate brownies",
        sizes: [
          { weight: "0.5kg", price: 500 },
          { weight: "1kg", price: 900 },
          { weight: "2kg", price: 1700 }
        ],
        flavours: ["Chocolate", "Walnut Chocolate", "Triple Chocolate"],
        colors: ["Brown"],
        deliveryTime: "12 hours"
      },
      {
        id: 4,
        name: "Cupcake Collection",
        category: "cupcakes",
        image: "https://via.placeholder.com/300x300?text=Cupcakes",
        basePrice: 600,
        description: "Assorted cupcakes with various toppings",
        sizes: [
          { weight: "0.5kg", price: 600 },
          { weight: "1kg", price: 1000 },
          { weight: "2kg", price: 1800 }
        ],
        flavours: ["Vanilla", "Chocolate", "Red Velvet", "Lemon"],
        colors: ["Mixed", "Pink", "Blue", "White"],
        deliveryTime: "12 hours"
      },
      {
        id: 5,
        name: "Custom Designer Cake",
        category: "custom",
        image: "https://via.placeholder.com/300x300?text=Custom+Cake",
        basePrice: 2000,
        description: "Fully customizable cake based on your requirements",
        sizes: [
          { weight: "1kg", price: 2000 },
          { weight: "2kg", price: 3500 },
          { weight: "4kg", price: 6500 }
        ],
        flavours: ["Chocolate", "Vanilla", "Strawberry", "Black Forest", "Pineapple"],
        colors: ["Any Color"],
        deliveryTime: "48 hours"
      },
      {
        id: 6,
        name: "Anniversary Romance",
        category: "anniversary",
        image: "https://via.placeholder.com/300x300?text=Anniversary+Cake",
        basePrice: 1500,
        description: "Romantic cake perfect for anniversaries",
        sizes: [
          { weight: "0.5kg", price: 1500 },
          { weight: "1kg", price: 2200 },
          { weight: "2kg", price: 4000 }
        ],
        flavours: ["Red Velvet", "Chocolate", "Vanilla", "Strawberry"],
        colors: ["Red", "Pink", "Gold", "White"],
        deliveryTime: "24 hours"
      },
      {
        id: 7,
        name: "Kids Cartoon Special",
        category: "kids",
        image: "https://via.placeholder.com/300x300?text=Kids+Cake",
        basePrice: 1200,
        description: "Fun cartoon-themed cakes for kids",
        sizes: [
          { weight: "0.5kg", price: 1200 },
          { weight: "1kg", price: 1800 },
          { weight: "2kg", price: 3200 }
        ],
        flavours: ["Chocolate", "Vanilla", "Butter-scotch", "Strawberry"],
        colors: ["Colorful", "Blue", "Pink", "Yellow"],
        deliveryTime: "24 hours"
      },
      {
        id: 8,
        name: "Premium Gift Box",
        category: "giftbox",
        image: "https://via.placeholder.com/300x300?text=Gift+Box",
        basePrice: 800,
        description: "Beautiful gift box with assorted treats",
        sizes: [
          { weight: "0.5kg", price: 800 },
          { weight: "1kg", price: 1400 },
          { weight: "2kg", price: 2600 }
        ],
        flavours: ["Mixed", "Chocolate", "Vanilla"],
        colors: ["Gift Wrapped"],
        deliveryTime: "12 hours"
      }
    ];
    localStorage.setItem(storageKeys.CAKES, JSON.stringify(defaultCakes));
  }

  if (!localStorage.getItem(storageKeys.ADDONS)) {
    const defaultAddons = [
      { id: 1, name: "Icing Design", price: 200, type: "decoration" },
      { id: 2, name: "Chocolate Syrup", price: 100, type: "topping" },
      { id: 3, name: "Extra Toppings", price: 150, type: "topping" },
      { id: 4, name: "Ribbon Decoration", price: 80, type: "decoration" },
      { id: 5, name: "Fresh Flowers", price: 300, type: "decoration" },
      { id: 6, name: "Custom Message", price: 50, type: "message" },
      { id: 7, name: "Photo Print Top", price: 250, type: "photo" },
      { id: 8, name: "Candle Pack", price: 100, type: "accessory" }
    ];
    localStorage.setItem(storageKeys.ADDONS, JSON.stringify(defaultAddons));
  }

  if (!localStorage.getItem(storageKeys.CATEGORIES)) {
    const defaultCategories = [
      { id: 1, name: 'wedding', image: 'https://via.placeholder.com/200x120?text=Wedding', description: 'Cakes suitable for weddings and large celebrations' },
      { id: 2, name: 'birthday', image: 'https://via.placeholder.com/200x120?text=Birthday', description: 'Birthday cakes and themed designs' },
      { id: 3, name: 'custom', image: 'https://via.placeholder.com/200x120?text=Custom', description: 'Fully customizable designer cakes' }
    ];
    localStorage.setItem(storageKeys.CATEGORIES, JSON.stringify(defaultCategories));
  }

  if (!localStorage.getItem(storageKeys.ORDERS)) {
    localStorage.setItem(storageKeys.ORDERS, JSON.stringify([]));
  }
};

// Cake operations
export const getCakes = () => {
  return JSON.parse(localStorage.getItem(storageKeys.CAKES) || '[]');
};

export const getCakeById = (id) => {
  const cakes = getCakes();
  return cakes.find(cake => cake.id === parseInt(id));
};

export const getCakesByCategory = (category) => {
  const cakes = getCakes();
  return cakes.filter(cake => cake.category === category);
};

export const addCake = (cake) => {
  const cakes = getCakes();
  const newCake = { ...cake, id: Date.now() };
  cakes.push(newCake);
  localStorage.setItem(storageKeys.CAKES, JSON.stringify(cakes));
  return newCake;
};

export const deleteCake = (id) => {
  const cakes = getCakes();
  const filtered = cakes.filter(cake => cake.id !== id);
  localStorage.setItem(storageKeys.CAKES, JSON.stringify(filtered));
};

// Add-ons operations
export const getAddons = () => {
  return JSON.parse(localStorage.getItem(storageKeys.ADDONS) || '[]');
};

export const updateAddons = (addons) => {
  localStorage.setItem(storageKeys.ADDONS, JSON.stringify(addons));
};

// Category operations
export const getCategories = () => {
  return JSON.parse(localStorage.getItem(storageKeys.CATEGORIES) || '[]');
};

export const addCategory = (category) => {
  const categories = getCategories();
  const newCategory = { ...category, id: Date.now() };
  categories.push(newCategory);
  localStorage.setItem(storageKeys.CATEGORIES, JSON.stringify(categories));
  return newCategory;
};

export const updateCategory = (categoryId, updates) => {
  const categories = getCategories();
  const idx = categories.findIndex(c => c.id === categoryId);
  if (idx !== -1) {
    categories[idx] = { ...categories[idx], ...updates };
    localStorage.setItem(storageKeys.CATEGORIES, JSON.stringify(categories));
    return categories[idx];
  }
  return null;
};

export const deleteCategory = (categoryId) => {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== categoryId);
  localStorage.setItem(storageKeys.CATEGORIES, JSON.stringify(filtered));
};

// Order operations
export const getOrders = () => {
  return JSON.parse(localStorage.getItem(storageKeys.ORDERS) || '[]');
};

export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: 'ORD' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  localStorage.setItem(storageKeys.ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const updateOrder = (orderId, updates) => {
  const orders = getOrders();
  const index = orders.findIndex(order => order.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    localStorage.setItem(storageKeys.ORDERS, JSON.stringify(orders));
    return orders[index];
  }
  return null;
};

export const getOrdersByStatus = (status) => {
  const orders = getOrders();
  return orders.filter(order => order.status === status);
};

export const getOrdersByCustomer = (customerPhone) => {
  const orders = getOrders();
  return orders.filter(order => order.customerPhone === customerPhone);
};
