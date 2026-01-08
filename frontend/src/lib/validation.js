// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email) return { valid: false, error: 'Email is required' };
  if (!EMAIL_REGEX.test(email)) return { valid: false, error: 'Invalid email format' };
  return { valid: true };
};

export const validateName = (name) => {
  if (!name) return { valid: false, error: 'Name is required' };
  if (name.trim().length === 0) return { valid: false, error: 'Name cannot be empty' };
  if (name.length > 50) return { valid: false, error: 'Name must be less than 50 characters' };
  return { valid: true };
};

export const validatePassword = (password) => {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 6) return { valid: false, error: 'Password must be at least 6 characters' };
  if (password.length > 30) return { valid: false, error: 'Password must be less than 30 characters' };
  return { valid: true };
};

export const validateForm = (data, fields) => {
  const errors = {};
  
  fields.forEach(field => {
    if (field === 'email') {
      const result = validateEmail(data.email);
      if (!result.valid) errors.email = result.error;
    }
    if (field === 'name') {
      const result = validateName(data.name);
      if (!result.valid) errors.name = result.error;
    }
    if (field === 'password') {
      const result = validatePassword(data.password);
      if (!result.valid) errors.password = result.error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
