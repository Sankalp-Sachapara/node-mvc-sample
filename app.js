require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/database');

// Initialize express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    error: err,
    message: 'Something went wrong!'
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});