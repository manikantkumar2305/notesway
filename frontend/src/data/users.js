// Dummy user data
export const users = [
  {
    id: 1,
    name: 'Dr. Ramesh Rao',
    email: 'rao@ace.edu',
    password: 'password123',
    role: 'professor',
    collegeId: 'C001'
  },
  {
    id: 2,
    name: 'Manikant Sharma',
    email: 'mani@ace.edu',
    password: 'password123',
    role: 'student',
    collegeId: 'C001'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@ace.edu',
    password: 'admin123',
    role: 'admin',
    collegeId: 'C001'
  },
  {
    id: 4,
    name: 'Priya Patel',
    email: 'priya@ace.edu',
    password: 'password123',
    role: 'student',
    collegeId: 'C001'
  },
  {
    id: 5,
    name: 'Dr. Sarah Johnson',
    email: 'sarah@xyz.edu',
    password: 'password123',
    role: 'professor',
    collegeId: 'C002'
  }
];

export const addUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData
  };
  users.push(newUser);
  return newUser;
};

export const getUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

export const updateUser = (id, updates) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    return users[index];
  }
  return null;
};