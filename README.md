# 📋 Task Manager - Full Stack MERN Application

A modern, feature-rich task management application built with the MERN stack (MongoDB, Express, React, Node.js). Stay organized, track your productivity, and never miss a deadline with our intuitive task management platform.

![Task Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Node](https://img.shields.io/badge/Node.js-18+-339933.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248.svg)

## 🌐 Live Demo

### **Frontend (Client)**
🔗 **Live URL:** [Client](https://task-manager-eta-one-18.vercel.app/)

### **Backend (Server)**
🔗 **API URL:** [Server](https://taskmanager-x2io.onrender.com)  
📡 **API Health Check:** [Health](https://taskmanager-x2io.onrender.com/api/health)

---

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected API routes and frontend pages
- Persistent sessions with automatic token refresh
- User-specific task isolation (multi-tenancy)

### 📝 **Task Management**
- Create, read, update, and delete tasks (CRUD)
- Task status tracking: Pending, In Progress, Completed
- Set due dates and track deadlines
- Search tasks by title
- Filter tasks by status
- Real-time task statistics dashboard

### 🎨 **Modern UI/UX**
- Beautiful gradient-themed interface
- Responsive design (mobile, tablet, desktop)
- Dedicated landing/welcome page
- Smooth animations and transitions
- Shadcn UI component library
- Tailwind CSS styling

### 📊 **Dashboard Features**
- Task statistics overview
- Visual task cards with status indicators
- Quick actions (edit, delete)
- Real-time updates
- User greeting with personalized welcome

## 🏗️ Project Structure

```
deployment-and-devops-essentials-Muhindisk/
│
├── client/                          # React Frontend Application
│   ├── public/
│   │   ├── favicon.svg             # Custom app favicon
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn UI components (48 components)
│   │   │   ├── NavLink.jsx
│   │   │   ├── TaskCard.jsx        # Task display card
│   │   │   ├── TaskFilters.jsx     # Search & filter component
│   │   │   ├── TaskFormModal.jsx   # Create/Edit task modal
│   │   │   ├── TaskStats.jsx       # Statistics dashboard
│   │   │   └── ProtectedRoute.jsx  # Route authentication guard
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx     # Global auth state management
│   │   ├── hooks/
│   │   │   ├── use-mobile.jsx
│   │   │   └── use-toast.js
│   │   ├── lib/
│   │   │   └── utils.js            # Utility functions
│   │   ├── pages/
│   │   │   ├── Welcome.jsx         # Landing page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Index.jsx           # Main dashboard
│   │   │   └── NotFound.jsx        # 404 page
│   │   ├── services/
│   │   │   └── api.js              # API client with auth headers
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── .env                        # Environment variables
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                          # Express Backend Application
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   └── taskController.js       # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification middleware
│   │   ├── validation.js           # Request validation
│   │   └── errorHandler.js         # Global error handler
│   ├── models/
│   │   ├── User.js                 # User schema & model
│   │   └── Task.js                 # Task schema & model
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── taskRoutes.js           # Task endpoints
│   ├── .env                        # Environment variables (SECRET)
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   # Express app entry point
│
├── AUTH_README.md                   # Detailed authentication docs
├── README.md                        # This file
└── Week7-Assignment.md
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/deployment-and-devops-essentials-Muhindisk.git
   cd deployment-and-devops-essentials-Muhindisk
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```

   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   
   JWT_SECRET=your_cryptographically_secure_secret_key_here
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   ```

   Create `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start the Frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:8080`

4. **Access the Application**
   - Open your browser and navigate to: `http://localhost:8080`
   - You'll see the welcome landing page
   - Click "Get Started" to create an account or "Sign In" to login

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Task Endpoints

All task endpoints require authentication (JWT token in Authorization header).

#### Get All Tasks
```http
GET /api/tasks?status=Pending&sortBy=createdAt&order=desc
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "success",
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": "507f191e810c19729de860ea",
      "title": "Complete project documentation",
      "description": "Write comprehensive README",
      "status": "Pending",
      "dueDate": "2025-11-15T00:00:00.000Z",
      "createdAt": "2025-11-09T10:00:00.000Z",
      "updatedAt": "2025-11-09T10:00:00.000Z"
    }
  ]
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "Pending",
  "dueDate": "2025-11-15"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "In-progress"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /api/tasks/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "total": 10,
    "pending": 3,
    "inProgress": 5,
    "completed": 2
  }
}
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  status: String (enum: ['Pending', 'In-progress', 'Completed']),
  dueDate: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.19** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Shadcn UI** - Re-usable component library
- **Lucide React** - Icon library
- **TanStack Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.18.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0.0** - MongoDB ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing
- **express-validator 7.0.1** - Request validation
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.3.1** - Environment variables

### Development Tools
- **nodemon** - Auto-restart server on changes
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with salt rounds (10)
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Protected Routes** - Middleware authentication
- ✅ **Input Validation** - express-validator sanitization
- ✅ **CORS Configuration** - Restricted origins
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **User Data Isolation** - Tasks scoped to users
- ✅ **HTTP-only Cookies** - (Optional for production)

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px and above)

## 🎨 Design Highlights

- **Landing Page** - Engaging welcome page with feature highlights
- **Gradient Themes** - Blue/Indigo for login, Purple/Pink for register
- **Modern Cards** - Shadow effects and hover states
- **Icon Integration** - Lucide icons throughout
- **Loading States** - Smooth loading indicators
- **Toast Notifications** - User feedback for actions
- **Modal Forms** - Clean task creation/editing interface

## 🧪 Testing the Application

### Manual Testing Steps

1. **Visit Landing Page** - `http://localhost:8080/welcome`
2. **Register Account** - Click "Get Started" or "Sign up"
3. **Verify Email Format** - Test validation
4. **Login** - Use created credentials
5. **Create Task** - Click "Add Task" button
6. **Update Task** - Click edit icon on task card
7. **Filter Tasks** - Use status filter dropdown
8. **Search Tasks** - Type in search box
9. **Delete Task** - Click delete icon
10. **View Statistics** - Check dashboard stats
11. **Logout** - Click logout button

### API Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Tasks (replace <TOKEN> with actual JWT)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>"

# Create Task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Test","status":"Pending","dueDate":"2025-12-31"}'
```

## 🚢 Production Deployment

### Backend Deployment (Railway, Render, Heroku)

1. **Set Environment Variables:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   JWT_SECRET=<strong-production-secret>
   JWT_EXPIRE=30d
   NODE_ENV=production
   ```

2. **Update CORS:**
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com',
     credentials: true
   }));
   ```

### Frontend Deployment (Vercel, Netlify)

1. **Update Environment Variable:**
   ```env
   VITE_API_URL=https://your-backend-api.com/api
   ```

2. **Build Command:**
   ```bash
   npm run build
   ```

3. **Deploy `dist` folder**

## 📝 Environment Variables Reference

### Server `.env`
```env
PORT=5000                           # Server port
MONGODB_URI=<connection-string>     # MongoDB connection
JWT_SECRET=<secure-random-string>   # JWT signing key (min 64 chars)
JWT_EXPIRE=30d                      # Token expiration time
NODE_ENV=development                # Environment (development/production)
```

### Client `.env`
```env
VITE_API_URL=http://localhost:5000/api   # Backend API URL
```

## 🐛 Troubleshooting

### Common Issues

**Problem:** Cannot connect to MongoDB
- **Solution:** Check MongoDB service is running (`mongod`)
- Verify connection string in `.env`
- For Atlas, whitelist your IP address

**Problem:** CORS errors in browser
- **Solution:** Verify client URL in server CORS config
- Check both servers are running
- Clear browser cache

**Problem:** JWT token expired
- **Solution:** Login again to get new token
- Check JWT_EXPIRE value in server `.env`

**Problem:** Tasks not loading
- **Solution:** Check browser console for errors
- Verify token in localStorage
- Check server logs for API errors

**Problem:** Build fails
- **Solution:** Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility

## 📄 Scripts Reference

### Server Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Client Scripts
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Muhindisk**
- GitHub: [@Muhindisk](https://github.com/Muhindisk)
- Repository: [deployment-and-devops-essentials-Muhindisk](https://github.com/PLP-MERN-Stack-Development/deployment-and-devops-essentials-Muhindisk)

## 🙏 Acknowledgments

- **Shadcn UI** - For the beautiful component library
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible NoSQL database
- **Express.js** - For the robust web framework
- **React** - For the powerful UI library

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Built with ❤️ using the MERN Stack**

⭐ **Star this repo if you find it helpful!**
