import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../services/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const LegalSignOff = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    role: "",
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    signature: "",
  });

  const [date] = useState(new Date().toLocaleDateString());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // 🌟 new
  const [openModal, setOpenModal] = useState(null); // 'terms' or 'nda'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Simple validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.country ||
      !formData.role ||
      !formData.signature ||
      !formData.checkbox1 ||
      !formData.checkbox2 ||
      !formData.checkbox3
    ) {
      setError("⚠️ Please fill all required fields and agree to all conditions.");
      return;
    }

    setLoading(true);

    try {
      // 🔹 Check if this email already exists in Firestore
      const q = query(
        collection(db, "beta_signups"),
        where("email", "==", formData.email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("🚫 This email has already been registered for the beta program.");
        setLoading(false);
        return;
      }

      // 🔹 Save to Firebase
      await addDoc(collection(db, "beta_signups"), {
        ...formData,
        date,
      });

      // 🔹 Send confirmation email via EmailJS
      await emailjs.send(
        "service_oqldb6i",
        "template_44t8yeb",
        {
          full_name: formData.fullName,
          email: formData.email,
          role: formData.role || "N/A",
          date,
        },
        "R1Yco2FB3rvLnXYQu"
      );

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        country: "",
        role: "",
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        signature: "",
      });
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="signup-form"
      className="relative bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-20 px-6 lg:px-20"
    >
      <motion.div
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Legal Agreement & Beta Sign-Up
        </h2>
        <p className="text-gray-700 mb-8 text-center">
          Please read and sign the agreement below to join the NurseMoves Beta Program.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Country/State */}
          <input
            type="text"
            name="country"
            placeholder="Country/State *"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Nursing Role (Dropdown) */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          >
            <option value="">Select Nursing Role *</option>
            <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
            <option value="Nurse Practitioner (NP)">Nurse Practitioner (NP)</option>
            <option value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</option>
            <option value="Certified Nursing Assistant">Certified Nursing Assistant</option>
            <option value="Student Nurse">Student Nurse</option>
            <option value="Other">Other</option>
          </select>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="checkbox1"
                checked={formData.checkbox1}
                onChange={handleChange}
                className="mr-2"
              />
              I have read and agree to the{" "}
              <button
                type="button"
                onClick={() => setOpenModal("terms")}
                className="text-blue-700 underline ml-1"
              >
                Terms & Conditions
              </button>
              .
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="checkbox2"
                checked={formData.checkbox2}
                onChange={handleChange}
                className="mr-2"
              />
              I have read and agree to the{" "}
              <button
                type="button"
                onClick={() => setOpenModal("nda")}
                className="text-blue-700 underline ml-1"
              >
                Beta Tester NDA
              </button>
              .
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="checkbox3"
                checked={formData.checkbox3}
                onChange={handleChange}
                className="mr-2"
              />
              I understand this is a pre-release version and I waive any right to claim damages or compensation.
            </label>
          </div>

          {/* Signature */}
          <input
            type="text"
            name="signature"
            placeholder="Type your full name as signature *"
            value={formData.signature}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Auto-filled date */}
          <input
            type="text"
            name="date"
            value={date}
            readOnly
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-full transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 text-white hover:bg-blue-800"
            }`}
          >
            {loading ? "Submitting..." : "Submit & Join Beta"}
          </button>

          {/* Animated Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-center bg-red-50 border border-red-300 text-red-600 font-medium rounded-lg py-3"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-center bg-green-50 border border-green-300 text-green-700 font-medium rounded-lg py-3"
              >
                ✅ Successfully submitted! Check your email for confirmation.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Modals (unchanged) */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
                onClick={() => setOpenModal(null)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">
                {openModal === "terms"
                  ? "Terms & Conditions"
                  : "Beta Tester NDA"}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {openModal === "terms"
                  ? `Welcome to Nurse Moves!...`
                  : `1. NON-DISCLOSURE, NON-COMPETE, ...`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LegalSignOff;
