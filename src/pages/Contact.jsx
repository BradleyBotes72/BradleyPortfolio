import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:bradleybotes72@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Contact Form Submission'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email',
      value: 'bradleybotes72@gmail.com',
      link: 'mailto:bradleybotes72@gmail.com'
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/bradley-clint-botes',
      link: 'https://www.linkedin.com/in/bradley-clint-botes-b80a15200/'
    },
    {
      icon: <FaGithub className="text-2xl" />,
      title: 'GitHub',
      value: 'github.com/bradleybotes',
      link: 'https://github.com/bradleybotes'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Location',
      value: 'Available for Remote Work',
      link: null
    }
  ];

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
              Let's Build Something
              <span className="block text-grey-medium mt-2">Insightful Together</span>
            </h1>
            <p className="text-xl text-grey max-w-3xl mx-auto">
              Have a project in mind or want to discuss how Power BI can transform your business? 
              I'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-xl p-8 border border-grey-border"
            >
              <h2 className="text-2xl font-bold text-orange mb-6">Send a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPaperPlane className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange mb-2">Message Sent!</h3>
                  <p className="text-grey">Your email client should open shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-orange mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-grey-border rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white text-accent placeholder-grey-light"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-orange mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-grey-border rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white text-accent placeholder-grey-light"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-orange mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-grey-border rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white text-accent placeholder-grey-light"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-orange mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-grey-border rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all resize-none bg-white text-accent placeholder-grey-light"
                      placeholder="Tell me about your project or question..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-hover transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-grey-bg text-accent rounded-xl shadow-xl p-8 border border-orange">
                <h2 className="text-2xl font-bold text-orange mb-4">Get In Touch</h2>
                <p className="text-grey mb-6">
                  I'm always interested in discussing new projects, creative ideas, or opportunities 
                  to be part of your vision.
                </p>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-white rounded-lg hover:bg-grey-bg transition-colors border border-grey-border"
                    >
                      <div className="flex-shrink-0 text-orange">
                        {info.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-sm text-orange mb-1">
                          {info.title}
                        </div>
                        {info.link ? (
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-grey hover:text-orange transition-colors break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-grey">{info.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-orange rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange mb-1">Currently Available</h4>
                    <p className="text-sm text-grey">
                      I'm accepting new projects and consulting opportunities. Expected response time: within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

