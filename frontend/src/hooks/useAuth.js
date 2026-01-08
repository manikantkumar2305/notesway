import {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { toast } from 'sonner';

import { validateForm } from '../lib/validation';

import {
  login as authLogin,
  registerUser as authRegisterUser,
  registerCollege,
  fetchMe,
  updateProfile,
  logout as authLogout,
  fetchCollegeByCode,
} from '../services/authApi';

import {
  createProfessorRequest,
  listProfessorRequests,
  approveProfessorRequest as approveProfessorRequestApi,
  rejectProfessorRequest as rejectProfessorRequestApi,
} from '../services/professorApi';

import {
  SecureTokenStorage,
  SecureStorage,
  initSessionTimeout,
} from '../utils/secureAuth';

/* =========================================================
   Auth Context
========================================================= */
const AuthContext = createContext();

/* =========================================================
   Auth Provider
========================================================= */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const [pendingProfessorRequests, setPendingProfessorRequests] = useState([]);
  const [sessionCleanup, setSessionCleanup] = useState(null);

  /* =======================================================
     Bootstrap Session
  ======================================================= */
  useEffect(() => {
    bootstrapSession();
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadPendingProfessorRequests();
    }
  }, [currentUser]);

  const bootstrapSession = async () => {
    try {
      const storedUser = SecureStorage.getUser();
      const storedCollege = SecureStorage.getCollege();

      if (storedUser) setCurrentUser(storedUser);
      if (storedCollege) setCurrentCollege(storedCollege);

      if (SecureTokenStorage.hasToken()) {
        try {
          const user = await fetchMe();
          setCurrentUser(user);
        } catch {
          await handleLogout(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     Session Timer
  ======================================================= */
  const startSessionTimer = () => {
    if (sessionCleanup) sessionCleanup();

    const cleanup = initSessionTimeout(30 * 60 * 1000);
    setSessionCleanup(() => cleanup);
  };

  /* =======================================================
     Login
  ======================================================= */
  const handleLogin = async (email, password, collegeCode) => {
    try {
      setIsLoggingIn(true);

      const validation = validateForm(
        { email, password, name: 'temp' },
        ['email', 'password']
      );

      if (!validation.isValid) {
        const errorMsg = Object.values(validation.errors)[0];
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      const college = await fetchCollegeByCode(collegeCode.trim());
      const data = await authLogin({ email, password });

      if (college && data?.college?._id !== college._id) {
        toast.error('User not registered at this college');
        return {
          success: false,
          error: 'User not registered at this college',
        };
      }

      setCurrentUser(data.user);
      setCurrentCollege(data.college || college);

      SecureStorage.setUser(data.user);
      SecureStorage.setCollege(data.college || college);

      startSessionTimer();
      toast.success(`Welcome back, ${data.user.name}!`);

      return { success: true, user: data.user };
    } catch (error) {
      let message = 'Something went wrong. Please try again.';

      if (error.response) {
        const status = error.response.status;
        const detail =
          error.response.data?.detail ||
          error.response.data?.message;

        if (status === 400) {
          message = detail || 'Invalid input';
        } else if (status === 401) {
          message = 'Invalid email or password';
        } else if (status === 404) {
          message = 'Invalid college code or account not found';
        } else if (status === 403) {
          message = 'Access denied';
        } else if (status >= 500) {
          message = 'Server error. Please try again later.';
        }
      }

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoggingIn(false);
    }
  };

  /* =======================================================
     Student Registration
  ======================================================= */
  const handleRegisterStudent = async ({
    name,
    email,
    password,
    collegeCode,
  }) => {
    try {
      setIsRegistering(true);

      const validation = validateForm(
        { name, email, password },
        ['name', 'email', 'password']
      );

      if (!validation.isValid) {
        const errorMsg = Object.values(validation.errors)[0];
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      const college = await fetchCollegeByCode(collegeCode.trim());
      const data = await authRegisterUser({
        name,
        email,
        password,
        collegeCode: collegeCode.trim(),
      });

      setCurrentUser(data.user);
      setCurrentCollege(data.college || college);

      SecureStorage.setUser(data.user);
      SecureStorage.setCollege(data.college || college);

      startSessionTimer();
      toast.success('Registration successful! Welcome!');

      return { success: true, user: data.user };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Registration failed';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsRegistering(false);
    }
  };

  /* =======================================================
     College Registration
  ======================================================= */
  const handleRegisterCollege = async (payload) => {
    try {
      setIsRegistering(true);

      const data = await registerCollege(payload);

      setCurrentUser(data.user);
      setCurrentCollege(data.college);

      SecureStorage.setUser(data.user);
      SecureStorage.setCollege(data.college);

      startSessionTimer();
      toast.success('College registered and admin account created');

      return { success: true, user: data.user };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Registration failed';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsRegistering(false);
    }
  };

  /* =======================================================
     Logout
  ======================================================= */
  const handleLogout = async (redirect = true) => {
    try {
      await authLogout();
    } finally {
      setCurrentUser(null);
      setCurrentCollege(null);

      SecureTokenStorage.clearTokens();
      SecureStorage.clearUser();
      SecureStorage.clearCollege();

      if (sessionCleanup) sessionCleanup();

      if (redirect && typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  };

  /* =======================================================
     Profile Updates
  ======================================================= */
  const updateUserPhoto = async (photoData) => {
    if (!currentUser) return { success: false };

    try {
      const updated = await updateProfile({ photo: photoData });
      setCurrentUser(updated);
      SecureStorage.setUser(updated);
      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Failed to update photo';

      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateUserName = async (newName) => {
    if (!currentUser) return { success: false };

    try {
      const updated = await updateProfile({ name: newName });
      setCurrentUser(updated);
      SecureStorage.setUser(updated);
      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Failed to update profile';

      toast.error(message);
      return { success: false, error: message };
    }
  };

  /* =======================================================
     Professor Requests
  ======================================================= */
  const requestProfessorAccess = async () => {
    if (!currentUser) return { success: false };

    try {
      setIsProcessingRequest(true);

      await createProfessorRequest('');

      const updatedUser = {
        ...currentUser,
        role:
          currentUser.role === 'student'
            ? 'pending'
            : currentUser.role,
      };

      setCurrentUser(updatedUser);
      SecureStorage.setUser(updatedUser);

      toast.success('Professor access request submitted');
      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Failed to submit request';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsProcessingRequest(false);
    }
  };

  const loadPendingProfessorRequests = async () => {
    try {
      const data = await listProfessorRequests();
      setPendingProfessorRequests(data.requests || []);
    } catch (error) {
      console.error('Failed to load professor requests', error);
    }
  };

  const approveProfessorRequest = async (requestId) => {
    try {
      setIsProcessingRequest(true);

      await approveProfessorRequestApi(requestId);
      toast.success('Professor request approved');

      await loadPendingProfessorRequests();
      setRefreshTrigger((prev) => prev + 1);

      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Failed to approve request';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsProcessingRequest(false);
    }
  };

  const rejectProfessorRequest = async (requestId) => {
    try {
      setIsProcessingRequest(true);

      await rejectProfessorRequestApi(requestId);
      toast.info('Professor request rejected');

      await loadPendingProfessorRequests();
      setRefreshTrigger((prev) => prev + 1);

      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error.message ||
        'Failed to reject request';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsProcessingRequest(false);
    }
  };

  /* =======================================================
     Context Value
  ======================================================= */
  const value = {
    currentUser,
    currentCollege,
    loading,
    isRegistering,
    isLoggingIn,
    isProcessingRequest,

    registerStudent: handleRegisterStudent,
    registerCollege: handleRegisterCollege,
    registerUser: handleRegisterStudent,
    login: handleLogin,
    logout: handleLogout,

    updateUserPhoto,
    updateUserName,

    requestProfessorAccess,
    approveProfessorRequest,
    rejectProfessorRequest,

    pendingProfessorRequests,
    refreshTrigger,
    setRefreshTrigger,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================================================
   useAuth Hook
========================================================= */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
