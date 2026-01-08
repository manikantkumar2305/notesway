import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Share2, Lock, Bell, Search, FileText } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Organized Note Management',
    description: 'Keep all your academic notes structured and easily accessible in one secure platform.'
  },
  {
    icon: Share2,
    title: 'Seamless Sharing',
    description: 'Share notes instantly with classmates, professors, and study groups with just a few clicks.'
  },
  {
    icon: Lock,
    title: 'Role-Based Access Control',
    description: 'Granular permissions ensure only authorized users can view, edit, or manage specific content.'
  },
  {
    icon: Bell,
    title: 'Activity Feed & Notifications',
    description: 'Real-time updates on file access and shares. Track activities instantly and stay informed about your workspace.'
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Find any note instantly with advanced search filters by title, subject, or keywords.'
  },
  {
    icon: FileText,
    title: 'Rich Content Support',
    description: 'Upload and share PDFs, images, documents, and multimedia content effortlessly.'
  }
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="text-[#3B82F6]"> Academic Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to share, collaborate, and manage academic content securely.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#3B82F6]/50 transition-all shadow-sm hover:shadow-xl cursor-pointer"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3B82F6] transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-[#3B82F6] group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#3B82F6] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#3B82F6]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;