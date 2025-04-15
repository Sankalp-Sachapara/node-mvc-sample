/**
 * Application middleware functions
 */

// Inject helpers to make them available in all views
exports.setGlobalViewVariables = (req, res, next) => {
  const helpers = require('../utils/helpers');
  
  // Pass current page URL for active menu highlighting
  res.locals.currentPath = req.path;
  
  // Make helper functions available in templates
  res.locals.helpers = helpers;
  
  next();
};

// Log all requests to console (development only)
exports.requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    if (Object.keys(req.body).length > 0) {
      console.log('Body:', req.body);
    }
  }
  next();
};

// Catch 404 and forward to error handler
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// Error handler
exports.errorHandler = (err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.locals.stack = process.env.NODE_ENV !== 'production' ? err.stack : '';

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { 
    title: 'Error',
    status: err.status || 500 
  });
};