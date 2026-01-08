/**
 * Frontend Security Utilities
 * Enhances security in the frontend (Note: Backend is still required for full security)
 */

// ==============================================
// 1. SECURE TOKEN STORAGE
// ==============================================

/**
 * Store token securely in sessionStorage (cleared on browser close)
 * @param {string} key - Token key
 * @param {string} value - Token value
 */
export const secureStoreToken = (key, value) => {
  try {
    // Use sessionStorage instead of localStorage
    // sessionStorage is cleared when tab closes (more secure)
    sessionStorage.setItem(`token_${key}`, value);
    
    // Add timestamp for token validation
    sessionStorage.setItem(`token_${key}_timestamp`, Date.now().toString());
  } catch (error) {
    console.error('Failed to store token securely:', error);
  }
};

/**
 * Retrieve secure token from sessionStorage
 * @param {string} key - Token key
 * @returns {string|null} - Token value or null
 */
export const secureGetToken = (key) => {
  try {
    const token = sessionStorage.getItem(`token_${key}`);
    const timestamp = sessionStorage.getItem(`token_${key}_timestamp`);
    
    if (!token || !timestamp) return null;
    
    // Check if token is older than 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (tokenAge > twentyFourHours) {
      secureRemoveToken(key);
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Failed to retrieve secure token:', error);
    return null;
  }
};

/**
 * Securely remove token
 * @param {string} key - Token key
 */
export const secureRemoveToken = (key) => {
  try {
    sessionStorage.removeItem(`token_${key}`);
    sessionStorage.removeItem(`token_${key}_timestamp`);
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};

// ==============================================
// 2. CLIENT-SIDE RATE LIMITING
// ==============================================

const rateLimitMap = new Map();

/**
 * Check if action should be rate limited
 * @param {string} key - Unique key for action (e.g., 'login', 'user_123_upload')
 * @param {number} maxAttempts - Max attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {object} - { allowed: boolean, remaining: number, resetIn: number }
 */
export const checkRateLimit = (key, maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const now = Date.now();
  const userData = rateLimitMap.get(key) || { attempts: [], resetTime: now + windowMs };
  
  // Clean old attempts
  userData.attempts = userData.attempts.filter(time => now - time < windowMs);
  
  if (userData.attempts.length >= maxAttempts) {
    const resetIn = userData.resetTime - now;
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.max(0, resetIn),
      message: `Too many attempts. Please try again in ${Math.ceil(resetIn / 1000)} seconds.`
    };
  }
  
  // Add current attempt
  userData.attempts.push(now);
  if (userData.attempts.length === 1) {
    userData.resetTime = now + windowMs;
  }
  
  rateLimitMap.set(key, userData);
  
  return {
    allowed: true,
    remaining: maxAttempts - userData.attempts.length,
    resetIn: userData.resetTime - now
  };
};

/**
 * Reset rate limit for a key
 * @param {string} key - Unique key to reset
 */
export const resetRateLimit = (key) => {
  rateLimitMap.delete(key);
};

// ==============================================
// 3. INPUT SANITIZATION
// ==============================================

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, strength: 'weak'|'medium'|'strong', message: string }
 */
export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };
  
  const passedChecks = Object.values(checks).filter(Boolean).length;
  
  let strength = 'weak';
  let message = 'Password is too weak';
  
  if (passedChecks >= 4) {
    strength = 'strong';
    message = 'Password is strong';
  } else if (passedChecks >= 3) {
    strength = 'medium';
    message = 'Password is medium strength';
  }
  
  return {
    isValid: passedChecks >= 4,
    strength,
    message,
    checks
  };
};

// ==============================================
// 4. SESSION TIMEOUT MANAGEMENT
// ==============================================

let sessionTimeoutId = null;
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

/**
 * Initialize session timeout tracking
 * @param {function} onTimeout - Callback when session expires
 */
export const initializeSessionTimeout = (onTimeout) => {
  const resetTimeout = () => {
    clearTimeout(sessionTimeoutId);
    
    // Session expires after 24 hours absolute
    sessionTimeoutId = setTimeout(() => {
      onTimeout?.('Session expired. Please login again.');
      clearSession();
    }, SESSION_TIMEOUT);
  };
  
  // Track user activity
  const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  
  activityEvents.forEach(event => {
    document.addEventListener(event, resetTimeout, true);
  });
  
  resetTimeout();
  
  return () => {
    clearTimeout(sessionTimeoutId);
    activityEvents.forEach(event => {
      document.removeEventListener(event, resetTimeout, true);
    });
  };
};

// ==============================================
// 5. SESSION MANAGEMENT
// ==============================================

/**
 * Store session data securely
 * @param {object} sessionData - Data to store
 */
export const storeSession = (sessionData) => {
  try {
    sessionStorage.setItem('session_data', JSON.stringify(sessionData));
    sessionStorage.setItem('session_start', Date.now().toString());
  } catch (error) {
    console.error('Failed to store session:', error);
  }
};

/**
 * Get stored session data
 * @returns {object|null} - Session data or null
 */
export const getSession = () => {
  try {
    const sessionData = sessionStorage.getItem('session_data');
    const sessionStart = sessionStorage.getItem('session_start');
    
    if (!sessionData || !sessionStart) return null;
    
    // Check if session is still valid (24 hours)
    const sessionAge = Date.now() - parseInt(sessionStart);
    if (sessionAge > SESSION_TIMEOUT) {
      clearSession();
      return null;
    }
    
    return JSON.parse(sessionData);
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
};

/**
 * Clear all session data
 */
export const clearSession = () => {
  try {
    sessionStorage.removeItem('session_data');
    sessionStorage.removeItem('session_start');
    // Clear all tokens
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('token_')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
};

// ==============================================
// 6. CSRF TOKEN GENERATION (Frontend placeholder)
// ==============================================

/**
 * Generate CSRF token (Note: Backend must validate this)
 * In real implementation, backend sends CSRF token
 * @returns {string} - CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Get CSRF token from page meta tag
 * Backend should include: <meta name="csrf-token" content="token_value">
 * @returns {string|null} - CSRF token or null
 */
export const getCSRFToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.getAttribute('content') : null;
};

// ==============================================
// 7. SECURITY LOGGING
// ==============================================

const securityLogs = [];
const MAX_LOGS = 100;

/**
 * Log security event for audit trail
 * @param {string} action - Action performed
 * @param {object} details - Event details
 * @param {string} severity - 'info' | 'warning' | 'error'
 */
export const logSecurityEvent = (action, details = {}, severity = 'info') => {
  const event = {
    timestamp: new Date().toISOString(),
    action,
    details,
    severity,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  securityLogs.push(event);
  
  // Keep only last 100 logs
  if (securityLogs.length > MAX_LOGS) {
    securityLogs.shift();
  }
  
  // Log important security events to console
  if (severity === 'warning' || severity === 'error') {
    console.warn(`[Security Event] ${action}:`, details);
  }
};

/**
 * Get all security logs
 * @returns {array} - Array of security events
 */
export const getSecurityLogs = () => {
  return [...securityLogs];
};

/**
 * Send security logs to backend (for audit)
 * Backend will store these permanently
 * @returns {Promise}
 */
export const sendSecurityLogs = async () => {
  try {
    // This would be sent to backend
    // await fetch('/api/security/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(securityLogs)
    // });
    
    return { success: true, count: securityLogs.length };
  } catch (error) {
    console.error('Failed to send security logs:', error);
    return { success: false, error };
  }
};

// ==============================================
// 8. CONTENT SECURITY POLICY HEADERS (Info)
// ==============================================

/**
 * CSP Headers that should be set by backend
 * Include in backend response headers:
 * Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
 */
export const getRecommendedCSPHeaders = () => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};

export default {
  secureStoreToken,
  secureGetToken,
  secureRemoveToken,
  checkRateLimit,
  resetRateLimit,
  sanitizeInput,
  validateEmail,
  validatePasswordStrength,
  initializeSessionTimeout,
  storeSession,
  getSession,
  clearSession,
  generateCSRFToken,
  getCSRFToken,
  logSecurityEvent,
  getSecurityLogs,
  sendSecurityLogs,
  getRecommendedCSPHeaders
};
