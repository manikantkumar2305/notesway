// Registration codes for creating professor and admin accounts
// Students can register freely without codes

export const registrationCodes = [
  {
    id: 1,
    code: 'PROF001',
    role: 'professor',
    collegeId: 'C001',
    collegeName: 'ABC College of Engineering',
    createdAt: '2024-01-01',
    usedBy: null,
    usedAt: null,
    isActive: true,
    maxUses: 1,
    currentUses: 0
  },
  {
    id: 2,
    code: 'PROF002',
    role: 'professor',
    collegeId: 'C001',
    collegeName: 'ABC College of Engineering',
    createdAt: '2024-01-01',
    usedBy: null,
    usedAt: null,
    isActive: true,
    maxUses: 1,
    currentUses: 0
  },
  {
    id: 3,
    code: 'ADMIN001',
    role: 'admin',
    collegeId: 'C001',
    collegeName: 'ABC College of Engineering',
    createdAt: '2024-01-01',
    usedBy: null,
    usedAt: null,
    isActive: true,
    maxUses: 1,
    currentUses: 0
  },
  {
    id: 4,
    code: 'PROF003',
    role: 'professor',
    collegeId: 'C002',
    collegeName: 'XYZ University',
    createdAt: '2024-01-05',
    usedBy: null,
    usedAt: null,
    isActive: true,
    maxUses: 1,
    currentUses: 0
  },
];

// Generate a unique registration code
export const generateRegistrationCode = (role, collegeId, collegeName) => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `${role.substring(0, 3).toUpperCase()}${timestamp}${random}`;
  
  const newCode = {
    id: registrationCodes.length + 1,
    code,
    role,
    collegeId,
    collegeName,
    createdAt: new Date().toISOString().split('T')[0],
    usedBy: null,
    usedAt: null,
    isActive: true,
    maxUses: 1,
    currentUses: 0
  };
  
  registrationCodes.push(newCode);
  return newCode;
};

// Validate registration code
export const validateRegistrationCode = (code) => {
  const regCode = registrationCodes.find(c => c.code === code);
  
  if (!regCode) {
    return { valid: false, error: 'Invalid registration code' };
  }
  
  if (!regCode.isActive) {
    return { valid: false, error: 'This registration code is inactive' };
  }
  
  if (regCode.currentUses >= regCode.maxUses) {
    return { valid: false, error: 'This registration code has reached its usage limit' };
  }
  
  return { 
    valid: true, 
    code: regCode,
    role: regCode.role,
    collegeId: regCode.collegeId
  };
};

// Use registration code
export const useRegistrationCode = (code, userName) => {
  const codeIndex = registrationCodes.findIndex(c => c.code === code);
  
  if (codeIndex === -1) {
    return { success: false, error: 'Code not found' };
  }
  
  const regCode = registrationCodes[codeIndex];
  
  if (regCode.currentUses >= regCode.maxUses) {
    return { success: false, error: 'Code usage limit reached' };
  }
  
  registrationCodes[codeIndex] = {
    ...regCode,
    currentUses: regCode.currentUses + 1,
    usedBy: userName,
    usedAt: new Date().toISOString().split('T')[0],
    isActive: regCode.currentUses + 1 >= regCode.maxUses ? false : regCode.isActive
  };
  
  return { success: true, message: 'Code used successfully' };
};

// Deactivate a code
export const deactivateCode = (code) => {
  const codeIndex = registrationCodes.findIndex(c => c.code === code);
  
  if (codeIndex === -1) {
    return { success: false, error: 'Code not found' };
  }
  
  registrationCodes[codeIndex].isActive = false;
  return { success: true, message: 'Code deactivated' };
};

// Get all codes for a college (admin only)
export const getCodesByCollege = (collegeId) => {
  return registrationCodes.filter(c => c.collegeId === collegeId);
};

// Get all active codes for a college
export const getActiveCodesByCollege = (collegeId) => {
  return registrationCodes.filter(c => c.collegeId === collegeId && c.isActive);
};
