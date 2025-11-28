//express modules
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import cookiesParser from 'cookie-parser'

//prevent modules
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'mongo-sanitize'
import xss from 'xss'
import hpp from 'hpp';

//error handling
import appError from './utils/appError.js'
import errorhandler from './controllers/error.controllers.js'

//importing routes
import authRouter from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import recommendationRoutes from './routes/recommendation.routes.js'

//create express app
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https://trusted.cdn.com"],
      "style-src": ["'self'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com"]
    }
  },
  crossOriginEmbedderPolicy: true,
}));

app.disable('x-powered-by');

// Body parsing and cookies (ONLY ONCE)
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookiesParser()); // Only declare once!

// Sanitize middleware
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((k) => {
      req.body[k] = mongoSanitize(req.body[k]);
    });
  }

  if (req.query && typeof req.query === 'object') {
    Object.keys(req.query).forEach((k) => {
      req.query[k] = mongoSanitize(req.query[k]);
    });
  }

  if (req.params && typeof req.params === 'object') {
    Object.keys(req.params).forEach((k) => {
      req.params[k] = mongoSanitize(req.params[k]);
    });
  }
  next();
});

app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  if (req.query) {
    for (let key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = xss(req.query[key]);
      }
    }
  }

  if (req.params) {
    for (let key in req.params) {
      if (typeof req.params[key] === 'string') {
        req.params[key] = xss(req.params[key]);
      }
    }
  }
  next();
});

app.use(hpp());

// Routes
app.use('/', authRouter)
app.use('/products' , productRoutes)
app.use("/api", productRoutes)
app.use('/recommendations', recommendationRoutes)

// Handle non-existing routes
app.all(/.*/, (req, res, next) => {
  next(new appError(`this route ${req.originalUrl} does not exist`, 404))
})

// Global error handler
app.use(errorhandler)

//exporting the app to server file
export default app;