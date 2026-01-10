"use client";

import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiPlus, FiMinus } from "react-icons/fi";
import { faqCategories } from "@/lib/data";

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
          {question}
        </span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <FiMinus className="text-primary" />
          ) : (
            <FiPlus className={isDark ? "text-gray-500" : "text-gray-400"} />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <main 
        className="min-h-screen pt-32 pb-20 px-6 animate-pop-in"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
              Frequently Asked Questions
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
              Everything you need to know about Yummy. Can't find the answer you're looking for? 
              <a href="/contact" className="text-primary font-bold hover:underline ml-2">Chat to our friendly team.</a>
            </p>
          </div>

          <div className="space-y-12">
            {faqCategories.map((category, idx) => (
              <div key={idx} className="bg-opacity-50 rounded-3xl p-8 shadow-sm" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: isDark ? '#e2e8f0' : '#334155' }}>
                  {category.title}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((q, i) => (
                    <AccordionItem key={i} question={q.q} answer={q.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
