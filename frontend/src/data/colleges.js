// Dummy college data
export const colleges = [
  {
    id: 'C001',
    name: 'ABC College of Engineering',
    shortCode: 'ACE',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop'
  },
  {
    id: 'C002',
    name: 'XYZ University',
    shortCode: 'XYZ',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop'
  }
];

export const addCollege = (collegeData) => {
  const newCollege = {
    id: `C${String(colleges.length + 1).padStart(3, '0')}`,
    ...collegeData
  };
  colleges.push(newCollege);
  return newCollege;
};

export const getCollegeById = (id) => {
  return colleges.find(c => c.id === id);
};