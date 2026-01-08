const ACCESS_KEY = 'sv_access_token';
const REFRESH_KEY = 'sv_refresh_token';
const USER_KEY = 'sv_user';
const COLLEGE_KEY = 'sv_college';

const SafeWindow = typeof window !== 'undefined' ? window : undefined;

// ============================================
// 1. SECURE TOKEN MANAGEMENT
// ============================================
const SecureTokenStorage = {
  setTokens({ accessToken, refreshToken }) {
    if (!SafeWindow) return;
    if (accessToken) {
      localStorage.setItem(ACCESS_KEY, accessToken);
    }
    if (refreshToken) {
      localStorage.setItem(REFRESH_KEY, refreshToken);
    }
  },

  getAccessToken() {
    if (!SafeWindow) return null;
    return localStorage.getItem(ACCESS_KEY);
  },

  getRefreshToken() {
    if (!SafeWindow) return null;
    return localStorage.getItem(REFRESH_KEY);
  },

  hasToken() {
    if (!SafeWindow) return false;
    return !!localStorage.getItem(ACCESS_KEY);
  },

  clearTokens() {
    if (!SafeWindow) return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};


// ============================================
// 2. SECURE API CALLS (lightweight fetch fallback)
// ============================================

const secureAPI = {
  async request(path, options = {}) {
    const token = SecureTokenStorage.getAccessToken();
    const baseUrl =
      process.env.REACT_APP_BACKEND_URL ||
      process.env.VITE_API_BASE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : '');

    if (!baseUrl) {
      throw new Error('API base URL is not configured. Set REACT_APP_BACKEND_URL.');
    }
    const url = `${baseUrl}${path}`;

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, config);

    if (response.status === 401) {
      SecureTokenStorage.clearTokens();
      SecureStorage.clearUser();
      SecureStorage.clearCollege();
      if (SafeWindow) {
        SafeWindow.location.href = '/login';
      }
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Request failed with status ${response.status}`);
    }

    return response.json();
  },

  get(path) {
    return this.request(path, { method: 'GET' });
  },

  post(path, data) {
    return this.request(path, { method: 'POST', body: JSON.stringify(data) });
  },

  put(path, data) {
    return this.request(path, { method: 'PUT', body: JSON.stringify(data) });
  },

  delete(path) {
    return this.request(path, { method: 'DELETE' });
  },
};

// ============================================
// 3. SECURE INPUT SANITIZATION
// ============================================

/**
 * Sanitize HTML to prevent XSS
 */
const sanitizeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Validate input before submission
 */
const validateInput = (data, rules) => {
  const errors = {};
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];
    
    // Required
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
      continue;
    }
    
    // Email
    if (rule.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field] = 'Invalid email format';
        continue;
      }
    }
    
    // Min length
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Minimum ${rule.minLength} characters required`;
      continue;
    }
    
    // Max length
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `Maximum ${rule.maxLength} characters allowed`;
      continue;
    }
    
    // Password strength
    if (rule.type === 'password' && value) {
      const strength = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*]/.test(value)
      };
      
      if (!strength.length) {
        errors[field] = 'Password must be at least 8 characters';
        continue;
      }
      if (!strength.uppercase) {
        errors[field] = 'Password must contain uppercase letter';
        continue;
      }
      if (!strength.lowercase) {
        errors[field] = 'Password must contain lowercase letter';
        continue;
      }
      if (!strength.number) {
        errors[field] = 'Password must contain number';
        continue;
      }
      if (!strength.special) {
        errors[field] = 'Password must contain special character (!@#$%^&*)';
        continue;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ============================================
// 4. SECURE LOGOUT
// ============================================

/**
 * Secure logout - clear all session data
 */
const secureLogout = async () => {
  try {
    // Notify backend to invalidate session
    await secureAPI.post('/api/auth/logout', {});
  } catch (error) {
    console.warn('Logout API error:', error);
  } finally {
    // Clear frontend storage
    SecureTokenStorage.clearTokens();
    SecureStorage.clearUser();
    SecureStorage.clearCollege();
    sessionStorage.clear();
    
    // Prevent back button
    if (SafeWindow) {
      SafeWindow.location.href = '/login';
    }
  }
};

// ============================================
// 5. SESSION TIMEOUT
// ============================================

/**
 * Auto-logout after inactivity
 */
const initSessionTimeout = (inactivityMs = 30 * 60 * 1000) => {
  let timeoutId;
  
  const resetTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.warn('Session timeout due to inactivity');
      secureLogout();
    }, inactivityMs);
  };
  
  // Track user activity
  ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetTimeout);
  });
  
  // Initialize
  resetTimeout();
  
  return () => {
    clearTimeout(timeoutId);
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.removeEventListener(event, resetTimeout);
    });
  };
};

// ============================================
// 6. CSRF PROTECTION
// ============================================

/**
 * Get CSRF token from cookie or meta tag
 */
const getCSRFToken = () => {
  // Check meta tag first
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute('content');
  }
  
  // Fallback to header
  return document.querySelector('meta[name="x-csrf-token"]')?.getAttribute('content');
};

// ============================================
// 7. SECURE DATA STORAGE
// ============================================

/**
 * Only store non-sensitive data
 * NEVER store passwords, full tokens, or personal information
 */
const SecureStorage = {
  setUser(user) {
    if (!SafeWindow || !user) return;
    const safeUser = {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      collegeId: user.collegeId,
      photo: user.photo,
    };
    sessionStorage.setItem(USER_KEY, JSON.stringify(safeUser));
  },

  getUser() {
    if (!SafeWindow) return null;
    const user = sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clearUser() {
    if (!SafeWindow) return;
    sessionStorage.removeItem(USER_KEY);
  },

  setCollege(college) {
    if (!SafeWindow || !college) return;
    sessionStorage.setItem(COLLEGE_KEY, JSON.stringify(college));
  },

  getCollege() {
    if (!SafeWindow) return null;
    const data = sessionStorage.getItem(COLLEGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  clearCollege() {
    if (!SafeWindow) return;
    sessionStorage.removeItem(COLLEGE_KEY);
  },
};

// ============================================
// EXPORTS
// ============================================

export {
  SecureTokenStorage,
  secureAPI,
  sanitizeHTML,
  validateInput,
  secureLogout,
  initSessionTimeout,
  getCSRFToken,
  SecureStorage
};
