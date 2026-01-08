import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'All your notes are encrypted with industry-standard 256-bit AES encryption.'
  },
  {
    icon: Lock,
    title: 'Secure Access Control',
    description: 'Role-based permissions ensure only authorized users can access sensitive content.'
  },
  {
    icon: Eye,
    title: 'Privacy First',
    description: 'We never sell your data. Your academic content remains private and secure.'
  },
  {
    icon: CheckCircle2,
    title: 'Regular Security Audits',
    description: 'Our platform undergoes regular security audits to maintain the highest standards.'
  }
];

const SecuritySection = () => {
  return (
    <section id="security" className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose
            <span className="text-[#3B82F6]"> Notesway</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your security and privacy are our top priorities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#3B82F6] transition-all shadow-md hover:shadow-xl text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 text-[#3B82F6]" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;