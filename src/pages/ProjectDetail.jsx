import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectById } from '../data/projects';
import { 
  FaArrowLeft, 
  FaExternalLinkAlt, 
  FaDownload, 
  FaChevronDown, 
  FaChevronUp,
  FaDatabase,
  FaTools,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const [expandedDax, setExpandedDax] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange mb-4">Project Not Found</h1>
          <Link to="/portfolio" className="text-orange hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const toggleDax = (index) => {
    setExpandedDax(expandedDax === index ? null : index);
  };

  const nextImage = () => {
    const images = project.images || (project.image ? [project.image] : []);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    const images = project.images || (project.image ? [project.image] : []);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 bg-grey-bg text-accent border-b-4 border-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/portfolio')}
              className="inline-flex items-center text-grey hover:text-orange mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Portfolio
            </button>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white border border-grey-border rounded-full text-sm font-medium text-grey-medium"
              >
                {tag}
              </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-orange text-white rounded-lg font-semibold hover:bg-orange-hover transition-colors shadow-lg">
                <FaExternalLinkAlt className="mr-2" />
                View Live Dashboard
              </button>
              <button className="inline-flex items-center px-6 py-3 border-2 border-orange text-orange rounded-lg font-semibold hover:bg-orange hover:text-white transition-colors">
                <FaDownload className="mr-2" />
                Request Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden border border-grey-border"
          >
            {(() => {
              const images = project.images || (project.image ? [project.image] : []);
              
              if (images.length === 0) {
                return (
                  <div className="aspect-video bg-grey-bg flex items-center justify-center">
                    <div className="text-center text-grey">
                      <div className="text-8xl mb-4">📊</div>
                      <p className="text-xl font-semibold">Power BI Dashboard Preview</p>
                      <p className="text-sm text-grey-light mt-2">Interactive dashboard screenshot would appear here</p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative aspect-video bg-grey-bg">
                    <img 
                      src={images[currentImageIndex]} 
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <FaChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Image Indicators */}
                  {images.length > 1 && (
                    <div className="flex justify-center space-x-2 p-4 bg-grey-bg">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'bg-orange' 
                              : 'bg-grey-lighter hover:bg-grey-light'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-grey-border"
              >
                <h2 className="text-2xl font-bold text-orange mb-4 border-b-2 border-orange pb-2">Project Overview</h2>
                <p className="text-grey leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Business Problem */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-grey-bg rounded-xl shadow-lg p-8 border border-grey-border"
              >
                <h2 className="text-2xl font-bold text-orange mb-4 border-b-2 border-orange pb-2">Business Challenge</h2>
                <p className="text-grey leading-relaxed whitespace-pre-line">
                  {project.businessProblem}
                </p>
              </motion.div>

              {/* Key Features */}
              {project.keyFeatures && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-grey-border"
                >
                  <h2 className="text-2xl font-bold text-orange mb-6 border-b-2 border-orange pb-2">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheckCircle className="text-orange mt-1 mr-3 flex-shrink-0" />
                        <span className="text-grey">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* DAX Logic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-grey-border"
              >
                <h2 className="text-2xl font-bold text-orange mb-6 flex items-center border-b-2 border-orange pb-2">
                  <span className="mr-3">⚡</span>
                  DAX Logic Used
                </h2>
                
                <div className="space-y-4">
                  {project.daxLogic.map((dax, index) => (
                    <div
                      key={index}
                      className="border border-orange rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleDax(index)}
                        className="w-full px-6 py-4 bg-grey-bg hover:bg-orange/10 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-orange">{dax.title}</span>
                        {expandedDax === index ? (
                          <FaChevronUp className="text-orange" />
                        ) : (
                          <FaChevronDown className="text-orange" />
                        )}
                      </button>
                      
                      {expandedDax === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 py-4 bg-grey-bg"
                        >
                          <pre className="text-sm text-grey-medium font-mono overflow-x-auto">
                            <code>{dax.code}</code>
                          </pre>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-grey-border"
              >
                <h3 className="text-xl font-bold text-orange mb-4 flex items-center border-b border-orange pb-2">
                  <FaTools className="mr-3 text-orange" />
                  Technologies
                </h3>
                <div className="space-y-2">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-grey-bg rounded-lg text-sm font-medium text-grey border border-grey-border"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Data Sources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-grey-border"
              >
                <h3 className="text-xl font-bold text-orange mb-4 flex items-center border-b border-orange pb-2">
                  <FaDatabase className="mr-3 text-orange" />
                  Data Sources
                </h3>
                <div className="space-y-2">
                  {project.dataSources.map((source, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-grey-bg rounded-lg text-sm font-medium text-grey border border-grey-border"
                    >
                      {source}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-orange text-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Interested in Similar Solutions?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Let's discuss how we can build a custom solution for your business needs.
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center px-4 py-3 bg-white text-orange rounded-lg font-semibold hover:bg-grey-bg transition-colors"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

