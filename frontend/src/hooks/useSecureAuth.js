import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'sonner';
import { 
  SecureTokenStorage, 
  secureAPI, 
  validateInput,
  SecureStorage,
  secureLogout,
  initSessionTimeout 
} from '../utils/secureAuth';

const SecureAuthContext = createContext();

export const SecureAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Initialize on mount
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = () => {
    // Check if token exists
    if (SecureTokenStorage.hasToken()) {
      // Verify token with backend
      verifyToken();
      // Start inactivity timer
      const cleanup = initSessionTimeout(30 * 60 * 1000); // 30 minutes
      setSessionTimeout(cleanup);
    }
    setLoading(false);
  };

  /**
   * Verify token is still valid on backend
   */
  const verifyToken = async () => {
    try {
      const response = await secureAPI.get('/api/auth/verify');
      if (response.success) {
        setCurrentUser(response.user);
        setCurrentCollege(response.college);
        setIsAuthenticated(true);
      } else {
        // Token invalid
        SecureTokenStorage.clearToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      SecureTokenStorage.clearToken();
      setIsAuthenticated(false);
    }
  };

  /**
   * Secure registration with validation
   */
  const register = async (userData) => {
    try {
      // Validate inputs on client
      const validation = validateInput(userData, {
        name: { required: true, minLength: 1, maxLength: 50 },
        email: { required: true, type: 'email' },
        password: { required: true, type: 'password' },
        collegeId: { required: true }
      });

      if (!validation.isValid) {
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return { success: false, errors: validation.errors };
      }

      // Send to backend for validation + storage
      const response = await secureAPI.post('/api/auth/register', {
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password, // Sent only over HTTPS
        collegeId: userData.collegeId
      });

      if (response.success) {
        // Backend returns token (NOT password)
        SecureTokenStorage.setToken(response.token);
        SecureStorage.setUser(response.user);
        setCurrentUser(response.user);
        setCurrentCollege(response.college);
        setIsAuthenticated(true);
        
        // Start session timeout
        const cleanup = initSessionTimeout(30 * 60 * 1000);
        setSessionTimeout(cleanup);
        
        toast.success('Registration successful! Welcome!');
        return { success: true };
      } else {
        toast.error(response.error || 'Registration failed');
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  /**
   * Secure login
   */
  const login = async (email, password, collegeId) => {
    try {
      // Validate inputs
      const validation = validateInput(
        { email, password },
        {
          email: { required: true, type: 'email' },
          password: { required: true, minLength: 6 }
        }
      );

      if (!validation.isValid) {
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return { success: false, errors: validation.errors };
      }

      // Send credentials to backend (over HTTPS only)
      const response = await secureAPI.post('/api/auth/login', {
        email: email.toLowerCase().trim(),
        password: password, // Only sent over HTTPS
        collegeId
      });

      if (response.success) {
        // Store secure token (NOT password)
        SecureTokenStorage.setToken(response.token);
        SecureStorage.setUser(response.user);
        setCurrentUser(response.user);
        setCurrentCollege(response.college);
        setIsAuthenticated(true);

        // Start session timeout
        const cleanup = initSessionTimeout(30 * 60 * 1000);
        setSessionTimeout(cleanup);

        toast.success(`Welcome back, ${response.user.name}!`);
        return { success: true, user: response.user };
      } else {
        toast.error(response.error || 'Login failed');
        // Log failed attempt (backend already logs this)
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  /**
   * Secure logout
   */
  const logout = async () => {
    try {
      // Stop inactivity timer
      if (sessionTimeout) {
        sessionTimeout();
      }

      // Call secure logout (clears backend session)
      await secureLogout();

      // Clear state
      setCurrentUser(null);
      setCurrentCollege(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Check if user has permission
   */
  const hasPermission = (action) => {
    if (!currentUser) return false;

    const permissions = {
      'student': ['view:notes', 'download:notes', 'upload:notes', 'request:professor'],
      'professor': ['view:notes', 'download:notes', 'upload:notes', 'manage:students', 'manage:panel'],
      'admin': ['*'], // Admin has all permissions
    };

    const userPermissions = permissions[currentUser.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(action);
  };

  /**
   * Refresh token (automatically called before expiration)
   */
  const refreshToken = async () => {
    try {
      const response = await secureAPI.post('/api/auth/refresh', {});
      if (response.success) {
        SecureTokenStorage.setToken(response.token);
        return { success: true };
      } else {
        // Refresh failed, logout user
        await logout();
        return { success: false };
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return { success: false };
    }
  };

  const value = {
    currentUser,
    currentCollege,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    hasPermission,
    refreshToken,
    verifyToken
  };

  return (
    <SecureAuthContext.Provider value={value}>
      {children}
    </SecureAuthContext.Provider>
  );
};

/**
 * Hook to use secure auth context
 */
export const useSecureAuth = () => {
  const context = useContext(SecureAuthContext);
  if (!context) {
    throw new Error('useSecureAuth must be used within SecureAuthProvider');
  }
  return context;
};

export default SecureAuthContext;
