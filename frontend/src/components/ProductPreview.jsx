import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const screenshots = [
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/cll3rruk_image.png',
    title: 'Recent Notes',
    description: 'View and manage all your shared notes'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/ekqwh872_image.png',
    title: 'Search & Discover',
    description: 'Find notes instantly with powerful search'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/ng16s9pu_image.png',
    title: 'Profile Management',
    description: 'Customize your account and preferences'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_36d9e875-a237-4e46-930b-686fabb257b4/artifacts/ii4qtjl4_image.png',
    title: 'Admin Control',
    description: 'Manage users and system settings'
  }
];

const ProductPreview = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See It in
            <span className="text-[#3B82F6]"> Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power and simplicity of Noteway interface.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Screenshot Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-8"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="relative w-full flex items-center justify-center p-8"
                >
                  <img
                    src={screenshots[selectedIndex].url}
                    alt={screenshots[selectedIndex].title}
                    className="w-full h-[480px] object-cover object-[center_90%] rounded-lg shadow-xl"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
                </motion.div>
              </AnimatePresence>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 z-10"
              >
                <span className="text-sm font-semibold text-gray-900">Live Interface</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group rounded-2xl overflow-hidden transition-all ${
                  selectedIndex === index
                    ? 'ring-4 ring-[#3B82F6] shadow-xl'
                    : 'ring-2 ring-gray-200 hover:ring-[#3B82F6]/50 shadow-md'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-2">
                  <img
                    src={screenshot.url}
                    alt={screenshot.title}
                    className={`w-full h-full object-cover object-[center_90%] transition-all duration-300 ${
                      selectedIndex === index ? 'scale-100' : 'scale-95 opacity-60 group-hover:opacity-80'
                    }`}
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      selectedIndex === index
                        ? 'bg-[#3B82F6]/10'
                        : 'bg-black/10 group-hover:bg-black/5'
                    }`}
                  ></div>
                </div>

                {/* Label */}
                <div className="p-4 bg-white">
                  <h3
                    className={`font-semibold mb-1 transition-colors ${
                      selectedIndex === index ? 'text-[#3B82F6]' : 'text-gray-900'
                    }`}
                  >
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {screenshot.description}
                  </p>
                </div>

                {/* Active indicator */}
                {selectedIndex === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-3 left-3 w-3 h-3 bg-[#3B82F6] rounded-full shadow-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;