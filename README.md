# Nilesh Marketplace - MERN Stack eCommerce Platform

Welcome to **Nilesh Marketplace**, an eCommerce platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. This project offers a comprehensive online shopping experience with advanced functionalities for both users and administrators.

## ✨ Features

### 🛒 User Features

- **Full-Featured Shopping Cart**: Add, remove, and manage products in the cart.
- **Product Reviews & Ratings**: Leave feedback and rate products.
- **Top Products Carousel**: Display featured or top-rated products.
- **Product Pagination**: Navigate through products efficiently.
- **Product Search**: Search for products based on keywords.
- **User Profiles**: Track order history and manage user details.

### 🛠️ Admin Features

- **Admin Dashboard**: Manage the marketplace effectively.
- **Admin Management**: Add or remove admin accounts.
- **Product Management**: Add, edit, and delete products.
- **User Management**: Manage registered users.
- **Order Management**: View order details and mark orders as delivered.

### 💳 Payment & Checkout

- **Seamless Checkout Process**: Supports multiple payment and shipping options.
- **Razorpay Integration**: Secure online payments via Razorpay.
- **Order Tracking**: Users can view order status updates.

### 🗃️ Additional Features

- **Database Seeder**: Populate the database with sample data for easy setup.
- **Secure Authentication**: JWT-based authentication.

---

## 🛠 Getting Started

### 📌 Prerequisites

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/nilesh-marketplace.git
      
   cd nilesh-marketplace

   
3. Create a MongoDB database and get your MongoDB URI from MongoDB Atlas.

### 🔧 Environment Variables
1. Rename .env.example to .env and configure the following:
    ```bash
    NODE_ENV=development
    PORT=5000
    JWT_SECRET=ADD_YOUR_JWT_SECRET_HERE
    MONGO_URI=ADD_YOUR_MONGO_URI_HERE
    
### 📦 Install Dependencies
Run the following commands to install dependencies for both backend and frontend:

      npm install
      cd frontend
      npm install

### ▶️ Run the Application
To run both the frontend and backend concurrently:

    npm run dev

To run only the backend:

    npm run server

### 🚀 Build & Deploy
To create a production build for the frontend:
    cd frontend
    npm run build
