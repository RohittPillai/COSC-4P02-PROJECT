"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  return (
    <section ref={faqRef} className="py-16 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } } : {}}
        className="max-w-4xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          {faqData.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1, transition: { duration: 0.4, delay: index * 0.1 } } : {}}
              className="bg-white p-4 rounded-lg shadow transition hover:shadow-lg"
            >
              <summary className="font-semibold cursor-pointer">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Sample FAQ Data
const faqData = [
  { question: "Do you offer refunds?", answer: "We do not offer refunds, but you can cancel anytime." },
  { question: "What does early access include?", answer: "You get beta features, priority support, and discounts." },
  { question: "Can I use my own API keys?", answer: "Yes, premium users can integrate custom API keys." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards and PayPal." },
  { question: "How can I get support?", answer: "Our support team is available via email and live chat." },
  { question: "Are there any discounts available?", answer: "Yes, students and startups can apply for discounts." },
  { question: "Can I switch between monthly and yearly billing?", answer: "Yes, you can upgrade or downgrade anytime." },
  { question: "Can I cancel my subscription?", answer: "Yes, cancel anytime from your account settings." },
];
