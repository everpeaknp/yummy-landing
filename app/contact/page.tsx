"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <main 
        className="min-h-screen pt-24 pb-20"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <section className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              Get in Touch
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
              Have questions about pricing, features, or need a custom demo? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-8"
            >
               <div className="p-8 rounded-3xl" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}>
                  <h3 className="text-2xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Contact Information</h3>
                  <div className="space-y-6">
                      <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                              <FiMapPin size={24} />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg mb-1" style={{ color: isDark ? '#e5e5e5' : '#334155' }}>Our Office</h4>
                              <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>Chhorepatan, Pokhara<br/>Gandaki Province, Nepal</p>
                          </div>
                      </div>

                       <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              <FiMail size={24} />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg mb-1" style={{ color: isDark ? '#e5e5e5' : '#334155' }}>Email Us</h4>
                              <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                                  <a href="mailto:yummyever.np@gmail.com" className="hover:text-primary transition-colors">yummyever.np@gmail.com</a><br/>
                                  <a href="mailto:support@yummypos.com" className="hover:text-primary transition-colors">support@yummypos.com</a>
                              </p>
                          </div>
                      </div>

                       <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                              <FiPhone size={24} />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg mb-1" style={{ color: isDark ? '#e5e5e5' : '#334155' }}>Call Us</h4>
                              <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                                  <a href="tel:+9779807134097" className="hover:text-primary transition-colors">+977 9807134097</a><br/>
                                  <span className="text-sm opacity-70">Sun-Fri, 9am - 6pm</span>
                              </p>
                          </div>
                      </div>
                  </div>
               </div>

               {/* Map Placeholder */}
               <div className="h-64 w-full rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative group">
                   <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14064.095068971437!2d83.95764720172605!3d28.204558506691523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995951d4512c1b7%3A0xc3c9484084f7b60e!2sChhorepatan%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1704900000000!5m2!1sen!2snp" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                   ></iframe>
               </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-8 md:p-10 rounded-3xl shadow-xl"
              style={{ backgroundColor: isDark ? '#171717' : '#ffffff' }}
            >
                <h3 className="text-2xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Send us a Message</h3>
                <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold" style={{ color: isDark ? '#d4d4d4' : '#475569' }}>Name</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                style={{ 
                                    backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
                                    borderColor: isDark ? '#262626' : '#e2e8f0',
                                    color: isDark ? '#ffffff' : '#0f172a' 
                                }}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-semibold" style={{ color: isDark ? '#d4d4d4' : '#475569' }}>Email</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                style={{ 
                                    backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
                                    borderColor: isDark ? '#262626' : '#e2e8f0',
                                    color: isDark ? '#ffffff' : '#0f172a' 
                                }}
                                placeholder="john@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: isDark ? '#d4d4d4' : '#475569' }}>Category</label>
                        <select 
                            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                             style={{ 
                                    backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
                                    borderColor: isDark ? '#262626' : '#e2e8f0',
                                    color: isDark ? '#ffffff' : '#0f172a' 
                                }}
                        >
                            <option>General Inquiry</option>
                            <option>Sales & Pricing</option>
                            <option>Technical Support</option>
                            <option>Partnership</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: isDark ? '#d4d4d4' : '#475569' }}>Message</label>
                        <textarea 
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                            style={{ 
                                backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
                                borderColor: isDark ? '#262626' : '#e2e8f0',
                                color: isDark ? '#ffffff' : '#0f172a' 
                            }}
                            placeholder="Tell us how we can help..."
                        ></textarea>
                    </div>

                    <button 
                        type="button"
                        className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        Send Message <FiSend size={18} />
                    </button>
                </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
