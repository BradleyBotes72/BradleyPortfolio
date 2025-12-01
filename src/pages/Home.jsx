import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaChartBar, FaCloud, FaDatabase, FaBrain, FaDownload, FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaArrowRight, FaFilePdf } from 'react-icons/fa';
import { projects } from '../data/projects';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Home = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef(null);

  const quotes = [
    "The future belongs to those who understand data.",
    "Data are just summaries of thousands of stories—tell a few of those stories to help make the data meaningful. — Dan Heath",
    "It is a capital mistake to theorize before one has data. — Sherlock Holmes",
    "We are surrounded by data, but starved for insights. — Jay Baer",
    "Data is a tool for enhancing intuition. — Hilary Mason",
    "The core advantage of data is that it tells you something about the world that you didn't know before. — Hilary Mason",
    "It is true that data visualization is part data science and part art. That being said, even the most creative art is supported by theories that explain why it works. — Michiko I. Wolcott",
    "You can achieve simplicity in the design of effective charts, graphs and tables by remembering three fundamental principles: restrain, reduce, emphasize. — Garr Reynolds",
    "The purpose of visualization is insight, not pictures. — Ben A. Shneiderman"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 12000); // Change quote every 12 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGeneratingPDF(true);
    try {
      const element = contentRef.current;
      
      // Store original styles
      const originalOverflow = element.style.overflow;
      const originalHeight = element.style.height;
      const originalMaxHeight = element.style.maxHeight;
      
      // Make element fully visible and expanded
      element.style.overflow = 'visible';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      
      // Scroll to top
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get actual dimensions after expansion
      const fullHeight = Math.max(
        element.scrollHeight,
        element.offsetHeight,
        element.clientHeight
      );
      const fullWidth = Math.max(
        element.scrollWidth,
        element.offsetWidth,
        element.clientWidth
      );
      
      // Capture the ENTIRE page
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        removeContainer: false,
        height: fullHeight,
        width: fullWidth,
        scrollX: 0,
        scrollY: 0,
      });
      
      // Restore original styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
      
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
      
      pdf.save('Bradley_Botes_Portfolio.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const services = [
    {
      icon: <FaChartBar className="text-3xl" />,
      title: 'Power BI Development',
      description: 'Custom dashboards and reports tailored to your business needs with advanced DAX calculations.'
    },
    {
      icon: <FaCloud className="text-3xl" />,
      title: 'Cloud Integration',
      description: 'Seamless integration with Azure, AWS, and other cloud platforms for scalable solutions.'
    },
    {
      icon: <FaDatabase className="text-3xl" />,
      title: 'Data Modeling',
      description: 'Efficient data models optimized for performance and insights extraction.'
    },
    {
      icon: <FaBrain className="text-3xl" />,
      title: 'Business Intelligence',
      description: 'Transform raw data into strategic business insights and actionable intelligence.'
    },
  ];

  const skills = [
    { name: 'Power BI', level: 95, category: 'Visualization' },
    { name: 'DAX', level: 90, category: 'Development' },
    { name: 'Data Modeling & Cleaning', level: 85, category: 'Database' },
    { name: 'Azure', level: 80, category: 'Cloud' },
    { name: 'Microsoft 365 Ecosystem', level: 75, category: 'Integration' },
    { name: 'AI and Automation', level: 90, category: 'Innovation' },
  ];

  return (
    <div className="min-h-screen bg-white" ref={contentRef}>
      {/* Hero Section - Split Screen */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Frosted Glass Effect */}
        <div className="absolute inset-0">
          <img 
            src="/images/background.webp" 
            alt="Background" 
            className="w-full h-full object-contain scale-75"
          />
          {/* Lighter Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
          {/* Lighter tinted overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-grey-bg/30 via-white/40 to-grey-bg/30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-grey text-sm uppercase tracking-widest mb-4"
              >
                Welcome, I'm
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-accent mb-2"
              >
                Bradley Botes
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange mb-8"
              >
                Power BI Specialist
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-grey text-lg leading-relaxed mb-8 max-w-xl"
              >
                I transform complex data into clear, actionable insights. Specializing in Power BI development, 
                data modeling, and business intelligence solutions that drive real results.
              </motion.p>

              {/* Rotating Quotes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <div className="bg-grey-bg backdrop-blur-sm rounded-lg p-6 border border-grey-border">
                  <motion.p
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-grey-medium text-lg italic text-center leading-relaxed"
                  >
                    "{quotes[currentQuoteIndex]}"
                  </motion.p>
                  <div className="flex justify-center mt-4">
                    <div className="flex space-x-2">
                      {quotes.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentQuoteIndex 
                              ? 'bg-orange' 
                              : 'bg-grey-lighter'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 bg-orange text-white rounded font-semibold hover:bg-orange-hover transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  View Portfolio
                  <FaArrowRight className="ml-2" />
                </Link>
                
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center px-8 py-4 border-2 border-orange text-orange rounded font-semibold hover:bg-orange hover:text-white transition-all"
                >
                  <FaDownload className="mr-2" />
                  Download CV
                </a>
                
                <button
                  onClick={downloadPDF}
                  disabled={isGeneratingPDF}
                  className="inline-flex items-center px-8 py-4 border-2 border-accent text-accent rounded font-semibold hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center space-x-4"
              >
                <a
                  href="https://linkedin.com/in/bradleybotes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all hover:scale-110 transform"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/bradleybotes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all hover:scale-110 transform"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://instagram.com/bradleybotes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all hover:scale-110 transform"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="mailto:bradley@bbbi.dev"
                  className="w-12 h-12 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all hover:scale-110 transform"
                >
                  <FaEnvelope size={20} />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-72 h-72 border-2 border-grey-border rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 border-2 border-grey-border rounded-full"></div>
                
                {/* Image container with gradient overlay */}
                <div className="relative z-10">
                  <div className="relative overflow-hidden rounded-lg bg-white">
                    {/* Profile Image */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-white">
                      {/* Solid white background layer */}
                      <div className="absolute inset-0 bg-white"></div>
                      <img 
                        src="/images/profile.webp" 
                        alt="Bradley Botes - Power BI Specialist" 
                        className="w-full h-full object-contain relative"
                        style={{ 
                          backgroundColor: 'white',
                          isolation: 'isolate'
                        }}
                      />
                    </div>
                  </div>

                  {/* Grey accent bar */}
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-grey-border opacity-80 -z-10"></div>
                  <div className="absolute -top-6 -right-6 w-32 h-2 bg-grey-border"></div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-grey-lighter rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-orange rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-grey-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-grey text-sm uppercase tracking-widest mb-4">What I Do</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-orange mb-4">
              Services
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Comprehensive Power BI and Business Intelligence solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg border border-grey-border hover:border-orange transition-all group hover:transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                <div className="text-orange mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl text-orange mb-3">{service.title}</h3>
                <p className="text-grey text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-grey text-sm uppercase tracking-widest mb-4">My Work</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-orange mb-4">
              Portfolio Preview
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Explore interactive Power BI dashboards and reports that transform data into actionable insights
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {projects.slice(0, 6).map((project, index) => {
              const displayImage = project.images ? project.images[0] : project.image;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg bg-white border border-grey-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Link to={`/project/${project.id}`} className="block">
                    {/* Image Container - Landscape, Same Size */}
                    <div className="relative aspect-[16/9] bg-grey-bg overflow-hidden flex items-center justify-center">
                      {displayImage ? (
                        <>
                          <img 
                            src={displayImage} 
                            alt={project.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                            style={{ 
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              objectPosition: 'center'
                            }}
                          />
                          {/* Hover Overlay with Details */}
                          <div className="absolute inset-0 bg-orange/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white text-center px-4">
                              <p className="text-lg font-bold mb-2">{project.title}</p>
                              <p className="text-xs opacity-95 leading-relaxed mb-2 line-clamp-2">{project.shortDescription}</p>
                              {project.images && project.images.length > 1 && (
                                <p className="text-xs mt-2 opacity-80">
                                  {project.images.length} images
                                </p>
                              )}
                              <p className="text-xs mt-2 opacity-75 italic">Click to view</p>
                            </div>
                          </div>
                          {/* Image Count Badge */}
                          {project.images && project.images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-orange text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              {project.images.length}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-grey p-6">
                            <div className="text-6xl mb-2">📊</div>
                            <div className="text-sm font-medium opacity-80">Power BI Dashboard</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 border-2 border-orange text-orange rounded font-semibold hover:bg-orange hover:text-white transition-all"
            >
              View All Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="aspect-square rounded-lg overflow-hidden border-4 border-grey-border relative bg-white">
                  <div className="absolute inset-0 bg-white"></div>
                  <img 
                    src="/images/profile.webp" 
                    alt="Bradley Botes" 
                    className="w-full h-full object-contain relative"
                    style={{ 
                      backgroundColor: 'white',
                      isolation: 'isolate'
                    }}
                  />
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-grey-border rounded-lg -z-10"></div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-grey text-sm uppercase tracking-widest mb-4">🧠 About Me</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-accent mb-6">
                I'm Bradley Botes & <span className="text-orange">Power BI Specialist</span>
              </h2>
              
              <p className="text-grey text-lg leading-relaxed mb-6">
                "Where data meets financial insight."
              </p>

              <p className="text-grey-medium text-lg leading-relaxed mb-6">
                I'm Bradley Botes, the creator of BBbi — a Power BI Specialist brand built on a foundation of finance, accounting, and bookkeeping expertise. With years of experience working hands-on with financial systems, reports, and ledgers, I bring a deep understanding of numbers and business flow into every dashboard I design.
              </p>

              <p className="text-grey-medium text-lg leading-relaxed mb-8">
                At BBbi, I transform raw financial and operational data into clear, interactive, and intelligent Power BI dashboards — helping businesses track performance, manage budgets, and make confident, data-driven decisions. My approach blends financial precision with clean visual design and technical excellence to turn your data into a strategic advantage.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-orange text-white rounded font-semibold hover:bg-orange-hover transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Let's Talk
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>

          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-orange text-center mb-12">Skills & Expertise</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Circular progress */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-grey-dark"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                          whileInView={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - skill.level / 100) }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="text-orange"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-orange">✓</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-orange mb-1">{skill.name}</h4>
                    <p className="text-grey text-sm">{skill.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Logos Section */}
      <section className="py-16 bg-grey-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-orange mb-4">
              Technologies & Tools
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Working with the latest Microsoft ecosystem and data tools to deliver exceptional results
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6"
          >
            {[
              { name: 'Dynamics 365', logo: '/images/Logos/ms365.png' },
              { name: 'Azure', logo: '/images/Logos/Azure.webp' },
              { name: 'Business Central', logo: '/images/Logos/Dynamics_365_Business_Central_logo.svg.png' },
              { name: 'Power Automate', logo: '/images/Logos/microsoft-power-automate-logo.webp' },
              { name: 'Azure Document Intelligence', logo: '/images/Logos/Azure-AI-Document-Intelligence-Logo.jpg' },
              { name: 'Azure OpenAI', logo: '/images/Logos/Azure Open AI LOGO.jpg' },
              { name: 'Copilot Studio', logo: '/images/Logos/Microsoft-Copilot-Studio.webp' },
              { name: 'SSMS', logo: '/images/Logos/SSMS.png' },
              { name: 'Power BI', logo: '/images/Logos/New_Power_BI_Logo.svg.png' },
              { name: 'Excel', logo: '/images/Logos/microsoft-excel.webp' },
              { name: 'Microsoft Dataverse', logo: '/images/Logos/Dataverse (1).webp' },
              { name: 'XrmToolBox', logo: '/images/Logos/xrmtoolbox.png' },
              { name: 'Xero', logo: '/images/Logos/xero.webp' },
              { name: 'Visual Studio Code', logo: '/images/Logos/Visual_Studio_Code_1.35_icon.svg.png' },
              { name: 'Python', logo: '/images/Logos/Pythonlogo.jpg' },
              { name: 'Azure Logic Apps', logo: '/images/Logos/Logicapp.jpg' },
              { name: 'Azure Functions', logo: '/images/Logos/Azure Functions.png' },
              { name: 'Azure Data Factory', logo: '/images/Logos/Azure_Data_Factory_Logo.png' },
              { name: 'Microsoft Fabric', logo: '/images/Logos/microsoft-fabric-logo.webp' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:bg-grey-bg transition-colors group shadow-sm hover:shadow-md"
              >
                <div className="w-24 h-24 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center">
                  {tech.logo.includes('/') ? (
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{tech.logo}</span>
                  )}
                </div>
                <span className="text-grey text-xs font-medium text-center group-hover:text-orange transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-grey-bg relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-orange">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 text-grey max-w-2xl mx-auto leading-relaxed">
              Ready to transform your data into powerful insights? Let's discuss how I can help 
              your business make better decisions through intelligent BI solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-orange text-white rounded font-semibold hover:bg-orange-hover transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                View My Work
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-orange text-orange rounded font-semibold hover:bg-orange hover:text-white transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
