import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware - CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://task-manager-eta-one-18.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // In development, allow all localhost origins
    if (process.env.NODE_ENV !== 'production') {
      if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        return callback(null, true);
      }
    }
    
    // Check if origin is in allowed list (remove trailing slash for comparison)
    const cleanOrigin = origin.replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(allowed => {
      if (!allowed) return false;
      const cleanAllowed = allowed.replace(/\/$/, '');
      return cleanOrigin === cleanAllowed;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`⚠️  CORS blocked origin: ${origin}`);
      console.log(`   Allowed origins: ${allowedOrigins.filter(Boolean).join(', ')}`);
      callback(null, true); // Allow anyway but log it (change to callback(new Error('Not allowed by CORS')) for strict mode)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Task Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        logout: 'POST /api/auth/logout'
      },
      tasks: {
        getAll: 'GET /api/tasks',
        getStats: 'GET /api/tasks/stats',
        getOne: 'GET /api/tasks/:id',
        create: 'POST /api/tasks',
        update: 'PUT /api/tasks/:id',
        delete: 'DELETE /api/tasks/:id'
      }
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  const dbState = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  res.json({
    status: 'success',
    message: 'Task Manager API is running',
    timestamp: new Date().toISOString(),
    database: {
      status: dbState[mongoose.connection.readyState] || 'Unknown',
      state: mongoose.connection.readyState
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /api/health',
      auth: '/api/auth/*',
      tasks: '/api/tasks/*'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
