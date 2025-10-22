import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
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

    // Simple validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.country ||
      !formData.signature ||
      !formData.checkbox1 ||
      !formData.checkbox2 ||
      !formData.checkbox3
    ) {
      alert("Please fill all required fields and check all boxes.");
      return;
    }

    setLoading(true);

    try {
      // Save to Firebase
      await addDoc(collection(db, "beta_signups"), {
        ...formData,
        date,
      });

      // Send confirmation email via EmailJS
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
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="signup-form" className="relative bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-20 px-6 lg:px-20">
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

          {/* Nursing Role */}
          <input
            type="text"
            name="role"
            placeholder="Nursing Role (Optional)"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

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
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-all duration-300"
          >
            {loading ? "Submitting..." : "Submit & Join Beta"}
          </button>

          {success && (
            <p className="text-green-600 mt-4 text-center font-medium">
              ✅ Successfully submitted! Check your email for confirmation.
            </p>
          )}
        </form>
      </motion.div>

      {/* Modals */}
{/* Modals */}
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
          {openModal === "terms" ? "Terms & Conditions" : "Beta Tester NDA"}
        </h2>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {openModal === "terms"
            ? `Welcome to Nurse Moves! Please read these Terms and Conditions ("Terms") carefully before using our services.

1. ACCEPTANCE OF TERMS
By accessing or using our app, website, or related services, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.

2. ELIGIBILITY
You must be at least 18 years old or the age of majority in your jurisdiction to use Nurse Moves. By using our services, you represent that you meet this requirement.

3. USER ACCOUNT
• You are responsible for maintaining the confidentiality of your login credentials.
• You agree to provide accurate and up-to-date information.
• Any unauthorized use of your account must be reported immediately.

4. USE OF SERVICES
• Nurse Moves provides wellness and professional development tools for nurses and healthcare workers.
• You agree not to misuse the platform, including any attempt to reverse-engineer, distribute harmful software, or access restricted areas.

5. INTELLECTUAL PROPERTY
All content, logos, designs, data, and materials within Nurse Moves are owned or licensed by Nurse Moves LLC. You may not reproduce, distribute, or modify any part of the platform without prior written consent.

6. DATA PRIVACY
Your personal information is handled in accordance with our Privacy Policy. We take reasonable measures to protect your data, but you acknowledge that no digital system is 100% secure.

7. LIMITATION OF LIABILITY
Nurse Moves is not liable for any indirect, incidental, or consequential damages arising from your use or inability to use the platform.

8. MEDICAL DISCLAIMER
Content within Nurse Moves is for wellness support and educational purposes only and should not replace professional medical advice, diagnosis, or treatment.

9. TERMINATION
We may suspend or terminate access to your account at any time for breach of these Terms or misuse of the platform.

10. GOVERNING LAW
These Terms shall be governed by the laws of Illinois, USA. Any disputes shall be resolved under the exclusive jurisdiction of Illinois courts.

11. UPDATES
Nurse Moves reserves the right to modify these Terms at any time. Continued use after updates constitutes acceptance.

Effective Date: January 1, 2025`
            : `1. NON-DISCLOSURE, NON-COMPETE, AND INTELLECTUAL PROPERTY AGREEMENT (EMPLOYEE / BETA TESTER)
This Agreement is entered into on [Date] by and between Protect Your Temple Fitness LLC d/b/a Nurse Moves (“Company” or “Nurse Moves”), incorporated under the laws of Illinois, USA, with principal offices at 159 N. Sangamon Ave, Chicago, IL 60607, and [Employee or Beta Tester Name], residing at [Address] (“Participant”).

1. PURPOSE
This Agreement governs the protection of all confidential, proprietary, and sensitive business, technical, and user-related information disclosed or accessed by the Participant during their engagement with Nurse Moves.

2. DEFINITIONS
• Confidential Information includes all business, technical, financial, product, and strategic information (including user data, healthcare data, wireframes, source code, trade secrets, pricing, marketing plans, and internal operations).
• Work Product means all deliverables, inventions, writings, designs, algorithms, and intellectual property created or suggested during participation.

3. OBLIGATIONS OF CONFIDENTIALITY
Participant shall:
a. Keep all Confidential Information strictly confidential and not disclose it to any third party.
b. Use Confidential Information solely for the benefit of Nurse Moves.
c. Not reproduce, reverse engineer, or derive competing products from Confidential Information.
d. Notify Nurse Moves immediately upon any unauthorized disclosure or security concern.

4. NON-COMPETE AND NON-SOLICITATION
For eighteen (18) months following termination or completion of the beta program, Participant shall not:
a. Engage with competing apps or services related to healthcare or wellness technology within North America.
b. Solicit Nurse Moves’ users, contractors, or clients for any competing purpose.

5. INTELLECTUAL PROPERTY AND OWNERSHIP
a. All Work Product created or suggested under this program shall be the exclusive property of Nurse Moves.
b. Participant irrevocably assigns all rights and interests to Nurse Moves.
c. Participant agrees not to use any proprietary assets or ideas developed here for future commercial gain without written consent.

6. DATA HANDLING AND SECURITY
• Participant must protect all user or company data received during testing.
• No screenshots, screen recordings, or public discussions of internal features are permitted.
• Any discovered vulnerabilities must be reported privately to Nurse Moves.

7. TERMINATION AND RETURN OF MATERIALS
Upon program completion or upon request, Participant shall return or permanently delete all Nurse Moves data and materials.

8. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of Illinois, USA.

9. ADDITIONAL CLAUSES
• Participation in the beta program does not establish employment.
• No compensation, unless otherwise stated, is guaranteed for participation.
• Violation of this NDA may result in removal from the program and legal action.

10. ACKNOWLEDGMENT
By continuing participation, the Participant acknowledges having read, understood, and agreed to all terms of this Agreement.`}
        </p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
};

export default LegalSignOff;
