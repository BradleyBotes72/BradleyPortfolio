import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5' : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/images/logo2.png" 
                alt="BBBi Power BI Specialist" 
                className="h-[110px] sm:h-[136px] w-auto hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors text-sm uppercase tracking-wider ${
                    location.pathname === link.path
                      ? 'text-orange'
                      : 'text-grey hover:text-orange'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange"
                    />
                  )}
                </Link>
              ))}
              <a
                href="/cv/cv_download.pdf"
                download
                className="ml-4 px-6 py-2 bg-orange text-white text-sm font-semibold rounded hover:bg-orange-hover transition-all hover:scale-105 transform"
              >
                Download CV
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-grey hover:text-orange transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-grey-border"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-2 font-medium text-sm uppercase tracking-wider ${
                      location.pathname === link.path
                        ? 'text-orange'
                        : 'text-grey'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="/cv/cv_download.pdf"
                  download
                  className="block mt-4 px-6 py-2 bg-orange text-white text-sm font-semibold rounded text-center"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow pt-16 sm:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-grey-bg border-t border-grey-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <img 
                src="/images/logo2.png" 
                alt="BBBi Power BI Specialist" 
                className="h-[136px] w-auto mb-4"
              />
              <p className="text-grey text-sm leading-relaxed">
                Transforming data into actionable insights.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-orange text-sm uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-grey hover:text-orange transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-orange text-sm uppercase tracking-wider mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-grey">
                <li>Power BI Development</li>
                <li>Dashboard Design</li>
                <li>Data Modeling</li>
                <li>Business Intelligence</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-orange text-sm uppercase tracking-wider mb-4">Connect</h3>
              <div className="flex space-x-3 mb-4">
                <a
                  href="https://www.linkedin.com/in/bradley-clint-botes-b80a15200/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://github.com/bradleybotes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="mailto:bradleybotes72@gmail.com"
                  className="w-10 h-10 bg-white border border-grey-border rounded flex items-center justify-center hover:border-orange hover:text-orange text-grey transition-all"
                  aria-label="Email"
                >
                  <FaEnvelope size={18} />
                </a>
              </div>
              <p className="text-grey text-sm">
                +27 76 071 7709
              </p>
            </div>
          </div>

          <div className="border-t border-grey-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-grey">
            <p>Copyright © 2025 <span className="text-orange">Bradley Botes</span>. All Rights Reserved.</p>
            <p className="mt-2 sm:mt-0">Designed & Developed by Bradley Botes</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

