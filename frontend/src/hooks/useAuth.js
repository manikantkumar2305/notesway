import { useState, useEffect, createContext, useContext } from 'react';
import { users, addUser, getUserByEmail } from '../data/users';
import { getCollegeById } from '../data/colleges';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    const storedCollege = localStorage.getItem('currentCollege');
    
    if (storedUser && storedCollege) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentCollege(JSON.parse(storedCollege));
    }
    setLoading(false);
  }, []);

  const registerUser = (userData) => {
    try {
      // Check if user already exists
      const existingUser = getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser = addUser(userData);
      const college = getCollegeById(userData.collegeId);
      
      setCurrentUser(newUser);
      setCurrentCollege(college);
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('currentCollege', JSON.stringify(college));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = (email, password, collegeId) => {
    try {
      const user = getUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      
      if (user.collegeId !== collegeId) {
        throw new Error('User not registered at this college');
      }
      
      const college = getCollegeById(collegeId);
      
      setCurrentUser(user);
      setCurrentCollege(college);
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('currentCollege', JSON.stringify(college));
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const googleLoginMock = (collegeId) => {
    try {
      // Pick a random user from the college for demo
      const collegeUsers = users.filter(u => u.collegeId === collegeId);
      if (collegeUsers.length === 0) {
        throw new Error('No users found for this college');
      }
      
      const user = collegeUsers[0]; // Use first user for demo
      const college = getCollegeById(collegeId);
      
      setCurrentUser(user);
      setCurrentCollege(college);
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('currentCollege', JSON.stringify(college));
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentCollege(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentCollege');
  };

  const value = {
    currentUser,
    currentCollege,
    loading,
    registerUser,
    login,
    googleLoginMock,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};