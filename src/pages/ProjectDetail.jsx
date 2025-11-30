import { useState, useRef } from 'react';
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
  FaChevronRight,
  FaFilePdf
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const [expandedDax, setExpandedDax] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef(null);

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

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      // Hide embed section
      const embedSection = document.querySelector('[data-embed-section]');
      const originalDisplay = embedSection?.style.display;
      if (embedSection) {
        embedSection.style.display = 'none';
      }

      // Scroll to top first
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Capture the ENTIRE page - let html2canvas auto-detect full height
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        removeContainer: false,
      });
      
      // Restore embed section
      if (embedSection) {
        embedSection.style.display = originalDisplay;
      }
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Scale image to fit page width
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;
      
      let yPosition = 0;
      let heightLeft = scaledHeight;
      
      // Helper function to add contact footer
      const addContactFooter = (pdfPage) => {
        const footerY = pdfHeight - 8;
        pdfPage.setFontSize(8);
        pdfPage.setFont('helvetica', 'normal');
        
        // Email
        pdfPage.setTextColor(107, 107, 107); // #6B6B6B grey
        pdfPage.text('Email:', 10, footerY);
        pdfPage.setTextColor(255, 107, 53); // #FF6B35 orange
        pdfPage.textWithLink('bradleybotes72@gmail.com', 30, footerY, { url: 'mailto:bradleybotes72@gmail.com' });
        
        // Phone
        pdfPage.setTextColor(107, 107, 107);
        pdfPage.text('Phone:', 100, footerY);
        pdfPage.setTextColor(255, 107, 53);
        pdfPage.textWithLink('+27 76 071 7709', 120, footerY, { url: 'tel:+27760717709' });
        
        // LinkedIn
        pdfPage.setTextColor(107, 107, 107);
        pdfPage.text('LinkedIn:', 10, footerY + 4);
        pdfPage.setTextColor(255, 107, 53);
        pdfPage.textWithLink('linkedin.com/in/bradley-clint-botes', 30, footerY + 4, { url: 'https://www.linkedin.com/in/bradley-clint-botes-b80a15200/' });
        
        // GitHub
        pdfPage.setTextColor(107, 107, 107);
        pdfPage.text('GitHub:', 100, footerY + 4);
        pdfPage.setTextColor(255, 107, 53);
        pdfPage.textWithLink('github.com/bradleybotes', 120, footerY + 4, { url: 'https://github.com/bradleybotes' });
      };
      
      // Add first page with clickable header - matching site style
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      
      // "Visit:" label in grey
      pdf.setTextColor(107, 107, 107); // #6B6B6B grey
      pdf.text('Visit:', 10, 8);
      
      // Website link in orange
      pdf.setTextColor(255, 107, 53); // #FF6B35 orange
      pdf.textWithLink('www.bradleybotes.co.za', 25, 8, { url: 'https://www.bradleybotes.co.za' });
      
      // "Download CV" button in orange
      pdf.setTextColor(255, 107, 53); // #FF6B35 orange
      pdf.textWithLink('Download CV', pdfWidth - 40, 8, { url: 'https://www.bradleybotes.co.za/cv/cv_download.pdf' });
      
      // Calculate available height
      const headerHeight = 12;
      const availableHeight = pdfHeight - headerHeight;
      
      pdf.addImage(imgData, 'PNG', 0, headerHeight, pdfWidth, scaledHeight);
      heightLeft -= availableHeight;
      
      // Add remaining pages
      while (heightLeft > 0) {
        pdf.addPage();
        yPosition = -(scaledHeight - heightLeft);
        pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, scaledHeight);
        heightLeft -= availableHeight;
      }
      
      // Add contact footer only on the last page
      addContactFooter(pdf);
      
      pdf.save(`Bradley_Botes_${project.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
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
              {project.embedUrl && (
                <a
                  href={project.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-light transition-colors shadow-lg"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  View Live Dashboard
                </a>
              )}
              <button
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FaFilePdf className="mr-2" />
                    Download as PDF
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content wrapper for PDF generation */}
      <div ref={contentRef}>

      {/* Dashboard Preview - Static Images */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg-white rounded-xl shadow-2xl overflow-hidden border border-border-light"
          >
            {(() => {
              const images = project.images || (project.image ? [project.image] : []);
              
              if (images.length === 0) {
                return (
                  <div className="aspect-video bg-bg-light flex items-center justify-center">
                    <div className="text-center text-text-medium">
                      <div className="text-8xl mb-4">📊</div>
                      <p className="text-xl font-semibold">Power BI Dashboard Preview</p>
                      <p className="text-sm text-text-light mt-2">Interactive dashboard screenshot would appear here</p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative aspect-video bg-bg-light">
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
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondary/50 hover:bg-secondary/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary/50 hover:bg-secondary/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <FaChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Image Indicators */}
                  {images.length > 1 && (
                    <div className="flex justify-center space-x-2 p-4 bg-bg-light">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'bg-accent' 
                              : 'bg-border-medium hover:bg-text-light'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-secondary/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </div>
      </section>

      {/* Live Dashboard Embed */}
      {project.embedUrl && (
        <section className="py-12" data-embed-section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-bg-white rounded-xl shadow-2xl overflow-hidden border border-border-light"
            >
              <div className="p-6 border-b border-border-light">
                <h3 className="text-2xl font-bold text-text-dark">Live Interactive Dashboard</h3>
                <p className="text-text-medium mt-2">Explore the interactive Power BI report below</p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                <iframe
                  title={`${project.title} - Interactive Dashboard`}
                  src={project.embedUrl}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen={true}
                  style={{ minHeight: '600px' }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
    </div>
  );
};

export default ProjectDetail;

