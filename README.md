# 🛒 GrabbIt – Your Everyday Grocery Delivery Hub

**GrabbIt** is a feature-rich grocery delivery website where users can browse, search, and purchase everyday essentials like fruits, vegetables, grains, dairy, cold drinks, and bakery products. The app offers a smooth experience for both **users** and **sellers** — including login, product details, cart, checkout with **Cash on Delivery (COD)** or **Stripe**, and a dedicated seller dashboard with product and order management.

---

## ✨ Features

### 🛍️ For Users
- ✅ **Login/Signup** – Secure user authentication.
- ✅ **All Products Page** – Browse groceries by categories.
- ✅ **Product Details Page** – Includes description, related products, add to cart & buy now buttons.
- ✅ **Add to Cart & Checkout** – COD and Stripe payment options.
- ✅ **Add Address** – Save delivery addresses for faster checkout.
- ✅ **My Orders** – View and track previous orders.

### 🧑‍💼 For Sellers
- ✅ **Seller Login** – Dedicated login for sellers/admins.
- ✅ **Add Product** – Upload and manage grocery items.
- ✅ **Product List** – View/edit/delete product entries.
- ✅ **Orders Page** – See all customer orders in one place.

> 🔐 **Test Seller/Admin Credentials:**
> - **Email**: `admin@example.com`  
> - **Password**: `greatstack123`

---

## 🛠️ Tech Stack

**Frontend**
- React.js  
- Tailwind CSS  
- JavaScript

**Backend**
- Node.js  
- Express.js  
- MongoDB  
- Nodemon

**Integrations & Tools**
- Stripe Payment Gateway  
- JWT (JSON Web Tokens)  
- Cloudinary (for image uploads)  
- dotenv (for environment variables)  
- cookie-parser

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Stripe account
- Cloudinary account

---

1. **Clone the Repository**  
   ```sh
   git clone 
   cd client #for frontend
   cd server #for backend
2. **Install Dependencies**
   ```sh
   npm install
3. **Set Up Environment Variables**
   ```sh
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    
    # Admin credentials
    SELLER_EMAIL=admin@example.com
    SELLER_PASSWORD=greatstack123
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    
    # Stripe
    STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

4. **Run the Development Server**
   ```sh
   npm run dev  # or yarn dev

## 👤 Author  

Developed by **Mahi Jadaun** 🚀  

Feel free to **contribute**, **suggest improvements**, or **report issues**! 😊  


