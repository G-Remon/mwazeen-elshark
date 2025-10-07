import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 bg-gray-200">
        <img
          src={project.image || '/assets/projects/placeholder.jpg'}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
          {project.value} ريال
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{project.location}</span>
          <Link
            to={`/projects/${project.id}`}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 text-sm font-medium"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;