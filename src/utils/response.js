/**
 * Standard API response wrapper
 * @param {Object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} message - Response message
 * @param {*} data - Response data
 */
const response = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data
  });
};

module.exports = response; 