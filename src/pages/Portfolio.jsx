import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

const Portfolio = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 data-grid-bg opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-grey max-w-3xl mx-auto">
              A showcase of intelligent Power BI solutions that transform complex data into 
              actionable insights for strategic decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover group border border-grey-border"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-grey-bg overflow-hidden">
                  {(() => {
                    // Get the first image from images array or fall back to single image
                    const displayImage = project.images ? project.images[0] : project.image;
                    
                    if (displayImage) {
                      return (
                        <>
                          <img 
                            src={displayImage} 
                            alt={project.title}
                            className="w-full h-full object-contain"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-orange/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white text-center">
                              <p className="text-sm font-medium">
                                {project.images && project.images.length > 1 
                                  ? `View ${project.images.length} images` 
                                  : 'Click to view details'
                                }
                              </p>
                            </div>
                          </div>
                          {/* Multiple images indicator */}
                          {project.images && project.images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-orange text-white px-2 py-1 rounded-full text-xs font-medium">
                              {project.images.length} images
                            </div>
                          )}
                        </>
                      );
                    } else {
                      return (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-grey p-6">
                            <div className="text-6xl mb-2">📊</div>
                            <div className="text-sm font-medium opacity-80">Power BI Dashboard</div>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange mb-3 group-hover:text-orange-hover transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-grey text-sm mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-grey-bg text-grey-medium text-xs font-medium rounded-full border border-grey-border"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 bg-grey-bg text-grey text-xs font-medium rounded-full border border-grey-border">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/project/${project.id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange text-white rounded-lg font-medium hover:bg-orange-hover transition-colors text-sm"
                    >
                      <FaFileAlt className="mr-2" />
                      Case Study
                    </Link>
                    <button
                      className="px-4 py-2 border-2 border-orange text-orange rounded-lg font-medium hover:bg-orange hover:text-white transition-colors text-sm"
                      title="View Live Dashboard"
                    >
                      <FaExternalLinkAlt />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-grey-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-orange mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-grey mb-8">
              Let's discuss how we can transform your data into powerful insights.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-hover transition-all shadow-lg hover:shadow-xl"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;

