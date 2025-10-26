// server.js - FIXED VERSION
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Compression
app.use(compression());

// Body Parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// ============================================
// CORS CONFIGURATION - FIXED!
// ============================================

// Define allowed origins properly
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'https://saalik.prepedo.com',
      'https://www.saalik.prepedo.com',
      'https://saalik-api.prepedo.com'
    ];

console.log('🌐 CORS Allowed Origins:', allowedOrigins);

// CORS Options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    // Reject in production if not in allowed list
    console.log('❌ CORS Blocked:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// ============================================
// STATIC FILE SERVING
// ============================================

const uploadPath = process.env.FILE_UPLOAD_PATH || './uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadPath)));

// ============================================
// API ROUTES
// ============================================

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/stories', require('./routes/storyRoutes'));
app.use('/api/v1/partners', require('./routes/partnerRoutes'));
app.use('/api/v1/initiatives', require('./routes/initiativeRoutes'));
app.use('/api/v1/waitlist', require('./routes/waitlistRoutes'));
app.use('/api/v1/contact', require('./routes/contactRoutes'));
app.use('/api/v1/suggestions', require('./routes/suggestionRoutes'));

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Saalik API is running smoothly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root info route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    name: 'Saalik Tourism & Heritage Platform',
    version: '1.0.0',
    message: 'Welcome to the Saalik API 🌿',
    docs: '/api/v1'
  });
});

// ============================================
// SERVE REACT FRONTEND
// ============================================

const clientDistPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDistPath));

// Fallback for React Router
app.get('*', (req, res) => {
  // If the request starts with /api, skip and send 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ 
      success: false, 
      message: 'Route not found' 
    });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// Catch CORS errors
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    console.error('🔥 CORS Error:', {
      origin: req.headers.origin,
      method: req.method,
      path: req.path
    });
    
    return res.status(403).json({
      success: false,
      message: 'CORS policy: Origin not allowed',
      origin: req.headers.origin
    });
  }
  
  // Other errors
  console.error('🔥 Error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('⚠️ Database connection failed.');
      process.exit(1);
    }

    // Start listening
    app.listen(PORT, HOST, () => {
      console.log('');
      console.log('🌿========================================');
      console.log('     SAALIK API SERVER STARTED 🚀');
      console.log('🌿========================================');
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Server running at: http://${HOST}:${PORT}`);
      console.log(`Health check: http://${HOST}:${PORT}/api/health`);
      console.log(`Allowed Origins: ${allowedOrigins.length} configured`);
      console.log('🌿========================================\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// ============================================
// HANDLE UNEXPECTED CRASHES
// ============================================

process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

// ============================================
// START THE SERVER
// ============================================

startServer();

module.exports = app;