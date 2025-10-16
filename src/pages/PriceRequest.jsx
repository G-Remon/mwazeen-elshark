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
      transition={{ duration: 0.6 }}
      className="min-h-screen py-12 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceRequestForm />
      </div>
    </motion.div>
  );
};

export default PriceRequest;