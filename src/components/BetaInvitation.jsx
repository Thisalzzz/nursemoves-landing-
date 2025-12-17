import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const BetaInvitation = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Is this free?",
      answer: "Yes, 100% free for all beta testers during the NurseMoves Beta phase.",
    },
    {
      question: "What’s expected from me?",
      answer:
        "Use the app, provide honest feedback, and keep all beta content confidential until public release.",
    },
    {
      question: "Will my data be safe?",
      answer:
        "Absolutely. NurseMoves is fully compliant with U.S. data privacy and HIPAA protection standards.",
    },
  ];

  return (
    <section
      id="beta-invitation"
      className="relative bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-20 px-6 lg:px-20 text-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>

      <motion.div
        className="relative max-w-4xl mx-auto z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Become a{" "}
          <span className="text-blue-700">Founding Beta Nurse</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-700 mb-12">
          Join an exclusive group of nurses shaping the next generation of
          mental, physical, and spiritual wellness for healthcare heroes.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800 mb-16">
          <motion.div
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="font-semibold text-xl text-blue-700 mb-2">
              🎁 Early Access
            </h3>
            <p>Get exclusive access to all premium NurseMoves features before public release.</p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="font-semibold text-xl text-blue-700 mb-2">
              💬 Direct Feedback Impact
            </h3>
            <p>Your feedback will directly shape the app’s next features and improvements.</p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="font-semibold text-xl text-blue-700 mb-2">
              🌟 Founding Recognition
            </h3>
            <p>Be recognized in-app as a <strong>Founding Beta Nurse</strong> — forever part of the movement.</p>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto text-left">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform ${
                      openFAQ === index ? "rotate-180 text-blue-700" : "text-gray-500"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      className="px-6 pb-4 text-gray-600"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BetaInvitation;
