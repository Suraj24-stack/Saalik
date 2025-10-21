// backend/server.js

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

// Middleware setup
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Allowed Origins (comma-separated in .env)
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8081'];

// app.use(cors({
//   origin: 'http://localhost:5173', // or whatever port your frontend runs on (Vite default is 5173)
//   credentials: true
// }));



  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }));

// app.use(cors({
//   origin: "http://localhost:5173", // your frontend URL
//   credentials: true,               // if using cookies or auth headers
// }));


// Static file serving
app.use('/uploads', express.static('uploads'));

// -------------------------------
// 📦 API Routes
// -------------------------------
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/stories', require('./routes/storyRoutes'));
app.use('/api/v1/partners', require('./routes/partnerRoutes'));
app.use('/api/v1/initiatives', require('./routes/initiativeRoutes'));
app.use('/api/v1/waitlist', require('./routes/waitlistRoutes'));
app.use('/api/v1/contact', require('./routes/contactRoutes'));
app.use('/api/v1/suggestions', require('./routes/suggestionRoutes'));
app.use('/api/v1/users',require('./routes/userRoute'));

// -------------------------------
// 🩺 Health & Root Routes
// -------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Saalik API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'Saalik Tourism & Heritage Platform',
    version: '1.0.0',
    message: 'Welcome to the Saalik API 🌿',
    docs: '/api/v1',
    endpoints: {
      auth: '/api/v1/auth',
      admin: '/api/v1/admin',
      stories: '/api/v1/stories',
      partners: '/api/v1/partners',
      initiatives: '/api/v1/initiatives',
      waitlist: '/api/v1/waitlist',
      contact: '/api/v1/contact',
      suggestions: '/api/v1/suggestions',
      users: '/api/v1/users',
    },
  });
});

// -------------------------------
// ❌ 404 Handler
// -------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// -------------------------------
// ⚠️ Global Error Handler
// -------------------------------
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// -------------------------------
// 🚀 Start Server
// -------------------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('⚠️ Database connection failed.');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('');
      console.log('🌿========================================');
      console.log('     SAALIK API SERVER STARTED 🚀');
      console.log('🌿========================================');
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Server running at: http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log('🌿========================================\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unexpected crashes
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

startServer();

module.exports = app;