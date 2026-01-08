// College registry - stores registered colleges (initially empty)
export const collegeRegistry = [];

export const addCollege = (collegeData) => {
  // Check if college code already exists
  if (collegeRegistry.find(c => c.shortCode.toUpperCase() === collegeData.shortCode.toUpperCase())) {
    throw new Error('College code already registered');
  }

  const newCollege = {
    id: `C${String(collegeRegistry.length + 1).padStart(3, '0')}`,
    ...collegeData,
    createdAt: new Date().toISOString()
  };
  collegeRegistry.push(newCollege);
  return newCollege;
};

export const getCollegeById = (id) => {
  return collegeRegistry.find(c => c.id === id);
};

export const getCollegeByCode = (shortCode) => {
  return collegeRegistry.find(c => c.shortCode.toUpperCase() === shortCode.toUpperCase());
};

export const getCollegeByName = (name) => {
  return collegeRegistry.find(c => c.name.toLowerCase() === name.toLowerCase());
};