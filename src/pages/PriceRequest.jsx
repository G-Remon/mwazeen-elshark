// pages/PriceRequest.js
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import PriceRequestForm from '../components/PriceRequestForm';

const PriceRequest = () => {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceRequestForm />
      </div>
    </motion.div>
  );
};

export default PriceRequest;