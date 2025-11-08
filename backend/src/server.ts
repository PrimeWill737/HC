import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.get('/api', (_req, res) => {
  res.json({
    message: 'Healthcare Base API',
    version: process.env.API_VERSION || 'v1',
    company: process.env.COMPANY_NAME || 'CBRILLIANCE AI-Techs LTD',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      patients: '/api/v1/patients',
      doctors: '/api/v1/doctors',
      appointments: '/api/v1/appointments',
      payments: '/api/v1/payments',
      admin: '/api/v1/admin',
      notifications: '/api/v1/notifications',
    },
  });
});

// TODO: Import and use route handlers
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/patients', patientRoutes);
// app.use('/api/v1/doctors', doctorRoutes);
// app.use('/api/v1/appointments', appointmentRoutes);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/admin', adminRoutes);
// app.use('/api/v1/notifications', notificationRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   Healthcare Base API Server                         ║
║   Company: CBRILLIANCE AI-Techs LTD                   ║
╠═══════════════════════════════════════════════════════╣
║   Environment: ${process.env.NODE_ENV?.padEnd(39) || 'development'.padEnd(39)}║
║   Port: ${String(PORT).padEnd(45)}║
║   API Version: ${(process.env.API_VERSION || 'v1').padEnd(40)}║
╚═══════════════════════════════════════════════════════╝

Server is running at http://localhost:${PORT}
Health check: http://localhost:${PORT}/health
API Info: http://localhost:${PORT}/api
  `);
});

export default app;
