# 🏡 Airbnb Clone  

A full-stack Airbnb-inspired web application where users can explore, list, and book stays. Built with the **MERN stack** and modern tools for a seamless user experience.  

---

## 🚀 Features  

- 🔑 **Authentication & Authorization** – Secure login & signup with JWT  
- 🏠 **Property Listings** – Create, edit, delete, and view properties  
- 📸 **Image Uploads** – Cloud storage using **Cloudinary**  
- 🔍 **Search & Filters** – Find stays by location, price, category, etc.  
- 📅 **Booking System** – Check availability & book properties  
- ❤️ **Favorites** – Save listings for later  
- 📱 **Responsive UI** – Mobile-first design with **Tailwind CSS**  
- ⚡ **Optimized Backend** – RESTful APIs built with Express.js & MongoDB  

---

## 🛠 Tech Stack  

### Frontend  
- **React.js** – Component-based UI  
- **Tailwind CSS** – Utility-first styling  
- **Axios** – API requests  
- **React Router** – Navigation & routing  

### Backend  
- **Node.js** – JavaScript runtime  
- **Express.js** – REST API framework  
- **MongoDB + Mongoose** – NoSQL database & schema modeling  
- **JWT (JSON Web Token)** – Secure authentication  
- **Bcrypt.js** – Password hashing  

### Cloud & Tools  
- **Cloudinary** – Image & media management  
- **Multer** – File upload handling  
- **dotenv** – Environment configuration  
- **Git & GitHub** – Version control  

---

## ⚙️ Installation  

### 1. Clone the repo  
```bash
git clone https://github.com/yourusername/airbnb-clone.git
cd airbnb-clone
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm start

The app will be live at:
👉 Frontend: http://localhost:3000
👉 Backend: http://localhost:5000

📜 License

This project is licensed under the MIT License.
