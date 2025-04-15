/**
 * Utility helper functions for the application
 */

/**
 * Format date to a readable string
 * @param {Date} date - Date object or string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {String} Formatted date string
 */
exports.formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Truncate text to a specified length
 * @param {String} str - String to truncate
 * @param {Number} length - Maximum length
 * @returns {String} Truncated string
 */
exports.truncateText = (str, length = 100) => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Get priority class for styling
 * @param {String} priority - Priority level
 * @returns {String} CSS class
 */
exports.getPriorityClass = (priority) => {
  switch (priority) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'secondary';
  }
};

/**
 * Check if a date is past due
 * @param {Date} date - Date to check
 * @returns {Boolean} True if past due
 */
exports.isPastDue = (date) => {
  if (!date) return false;
  
  const dueDate = new Date(date);
  const today = new Date();
  
  // Reset time part for accurate comparison
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

/**
 * Check if a date is due today
 * @param {Date} date - Date to check
 * @returns {Boolean} True if due today
 */
exports.isDueToday = (date) => {
  if (!date) return false;
  
  const dueDate = new Date(date);
  const today = new Date();
  
  return (
    dueDate.getDate() === today.getDate() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Generate pagination links
 * @param {Number} currentPage - Current page number
 * @param {Number} totalPages - Total number of pages
 * @param {String} baseUrl - Base URL for pagination links
 * @returns {Object} Pagination data
 */
exports.generatePagination = (currentPage, totalPages, baseUrl) => {
  currentPage = parseInt(currentPage) || 1;
  
  const pagination = {
    currentPage,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    nextPage: currentPage + 1,
    prevPage: currentPage - 1,
    pages: []
  };
  
  // Generate array of page numbers to display
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    pagination.pages.push(i);
  }
  
  // Generate URLs
  pagination.nextUrl = `${baseUrl}?page=${pagination.nextPage}`;
  pagination.prevUrl = `${baseUrl}?page=${pagination.prevPage}`;
  
  return pagination;
};