import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Shield } from 'lucide-react';

const roles = [
  {
    icon: GraduationCap,
    title: 'Students',
    shortDesc: 'Access and organize your study materials',
    fullDesc: 'Students can upload, organize, and share notes with classmates. Collaborate on group projects, access shared resources, and keep all your academic materials in one secure place.'
  },
  {
    icon: BookOpen,
    title: 'Professors',
    shortDesc: 'Share course materials and manage content',
    fullDesc: 'Professors can distribute lecture notes, assignments, and course materials to students. Control access permissions, track engagement, and provide resources that enhance learning outcomes.'
  },
  {
    icon: Shield,
    title: 'Administrators',
    shortDesc: 'Manage users and oversee platform security',
    fullDesc: 'Administrators have full control over user management, access permissions, and platform settings. Monitor activity, ensure compliance, and maintain institutional data security standards.'
  }
];

const UserRoles = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for
            <span className="text-[#3B82F6]"> Every Role</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored features for students, professors, and administrators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <motion.div
                  layout
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#3B82F6] transition-all cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-8 h-8 text-[#3B82F6]" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {role.shortDesc}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {role.fullDesc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-center mt-4">
                    <span className="text-[#3B82F6] text-sm font-medium">
                      {isExpanded ? 'Click to collapse' : 'Click to expand'}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserRoles;