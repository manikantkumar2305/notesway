import { useState } from 'react';

export const useSidebarState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (state) => {
    if (typeof state === 'boolean') {
      setIsSidebarOpen(state);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar
  };
};
