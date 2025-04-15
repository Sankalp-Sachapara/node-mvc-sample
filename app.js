require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/database');
const middleware = require('./middleware');

// Initialize express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(middleware.requestLogger);
app.use(middleware.setGlobalViewVariables);

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
connectDB();

// Import routes
const taskRoutes = require('./routes/taskRoutes');

// Use routes
app.use('/tasks', taskRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

// 404 handler
app.use(middleware.notFound);

// Error handler
app.use(middleware.errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});