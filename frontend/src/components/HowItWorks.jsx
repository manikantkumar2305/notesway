import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Share2, Activity } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Notes',
    description: 'Simply drag and drop your documents, PDFs, or create new notes directly in the platform.'
  },
  {
    icon: Share2,
    title: 'Share with Your Team',
    description: 'Control access with role-based permissions. Share notes with classmates and professors while maintaining security and privacy.'
  },
  {
    icon: Activity,
    title: 'Activity Overview',
    description: 'View complete activity logs with real-time updates. Track file access, downloads, and sharing to maintain visibility across your academic workspace.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It
            <span className="text-[#3B82F6]"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps and transform your note-sharing experience.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6]/20 via-[#3B82F6] to-[#3B82F6]/20 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <motion.div
                    className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-gray-200 hover:border-[#3B82F6] transition-all"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    {/* Step Number */}
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>

                    <motion.div
                      className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-10 h-10 text-[#3B82F6]" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;