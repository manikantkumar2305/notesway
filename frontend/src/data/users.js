// Dummy user data
// Seeded users: first admin, some students, professors
export const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@ace.edu',
    password: 'admin123',
    role: 'admin',
    collegeId: 'C001',
    photo: null
  },
  {
    id: 2,
    name: 'Manikant Sharma',
    email: 'mani@ace.edu',
    password: 'password123',
    role: 'student',
    collegeId: 'C001',
    photo: null
  },
  {
    id: 3,
    name: 'Priya Patel',
    email: 'priya@ace.edu',
    password: 'password123',
    role: 'student',
    collegeId: 'C001',
    photo: null
  },
  {
    id: 4,
    name: 'Dr. Ramesh Rao',
    email: 'rao@ace.edu',
    password: 'password123',
    role: 'professor',
    collegeId: 'C001',
    photo: null
  },
  {
    id: 5,
    name: 'Dr. Sarah Johnson',
    email: 'sarah@xyz.edu',
    password: 'password123',
    role: 'professor',
    collegeId: 'C002',
    photo: null
  }
];

// Pending professor requests: { userId, name, email, collegeId }
const PENDING_KEY = 'pendingProfessorRequests';

// Load pending requests from localStorage if available (keeps data across reloads in the browser)
let pendingProfessorRequests = [];
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (raw) pendingProfessorRequests = JSON.parse(raw);
  }
} catch (err) {
  // ignore localStorage errors
}

const persistPending = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(PENDING_KEY, JSON.stringify(pendingProfessorRequests));
    }
  } catch (err) {
    // ignore
  }
};

export const getPendingProfessorRequests = () => pendingProfessorRequests;

export const addPendingProfessorRequest = (user) => {
  if (!pendingProfessorRequests.find(r => r.userId === user.id)) {
    pendingProfessorRequests.push({
      userId: user.id,
      name: user.name,
      email: user.email,
      collegeId: user.collegeId
    });
    persistPending();
  }
};

export const removePendingProfessorRequest = (userId) => {
  const idx = pendingProfessorRequests.findIndex(r => r.userId === userId);
  if (idx !== -1) {
    pendingProfessorRequests.splice(idx, 1);
    persistPending();
  }
};

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

export const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};