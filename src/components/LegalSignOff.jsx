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
                  ? `Welcome to the NurseMoves Beta Program. By participating, you agree to the following terms and conditions:

                    1. Use of Beta Software
                      a.The app is provided solely for personal evaluation purposes.
                      b.Beta testers may not use the app for commercial purposes.

                    2. Eligibility
                      a.Participation is limited to registered nurses selected for the beta program.
                      b.All users must be at least 18 years old.

                    3. Confidential Feedback
                      a.Any feedback, bug reports, or suggestions submitted become the property of NurseMoves.
                      b.Testers agree that NurseMoves may use anonymized feedback for product development, research, or marketing.

                    4. No Reverse Engineering
                      a.Testers shall not attempt to decompile, reverse engineer, or extract source code.

                    5. Account & Security
                      a.Testers are responsible for keeping login credentials confidential.
                      b.Unauthorized access to another account is strictly prohibited.

                    6. Privacy & Data Usage
                      a.Tester data will be handled in accordance with U.S. data privacy laws and NurseMoves’ Privacy Policy.
                      b.Testers consent to the collection of usage data for app improvement purposes.

                    7. Termination
                      a.NurseMoves may revoke beta access at any time for violation of these terms.
                      b.Testers may withdraw from the beta program at any time by notifying NurseMoves.

                    8. No Warranty
                      a.The app is provided “as-is”. NurseMoves does not guarantee that it is error-free or uninterrupted.
                      b.Use of the beta software is at your own risk.

                    9. Limitation of Liability
                      a.NurseMoves is not liable for any damages or losses resulting from participation in the beta program.

                    10. Modifications
                      a.NurseMoves may update the Terms & Conditions at any time.
                      b.Testers will be notified of any significant changes. Continued participation constitutes acceptance of updated terms.`


                  : `1. NON-DISCLOSURE, NON-COMPETE, AND INTELLECTUAL PROPERTY AGREEMENT (EMPLOYEE)
                      This Agreement is entered into on [Date] by and between Protect Your Temple Fitness LLC d/b/a Nurse Moves (“Company” or “Nurse Moves”), incorporated under the laws of Illinois, USA, with principal offices at 159 N. Sangamon Ave, Chicago, IL 60607, and [Employee Name], residing at [Employee Address] (“Employee”).
                      1. PURPOSE
                      This Agreement governs the protection of all confidential, proprietary, and sensitive business, technical, and user-related information disclosed or accessed by the Employee during and after employment with Nurse Moves.
                      2. DEFINITIONS
                      •	Confidential Information includes, without limitation, all business, technical, financial, product, and strategic information (including user data, healthcare data, designs, algorithms, wireframes, UI/UX concepts, source code, trade secrets, pricing, financials, marketing plans, and internal operations).
                      •	Work Product means all deliverables, inventions, writings, designs, media, algorithms, processes, and intellectual property created by Employee during employment that relates to Nurse Moves’ business.
                      3. OBLIGATIONS OF CONFIDENTIALITY
                      Employee shall:
                      a. Keep all Confidential Information strictly confidential and not disclose to any third party without prior written consent.
                      b. Use Confidential Information solely for the benefit of Nurse Moves.
                      c. Not reproduce, reverse engineer, decompile, or create derivative works of Confidential Information.
                      d. Comply with all applicable data protection laws (HIPAA, GDPR where applicable).
                      e. Immediately notify Nurse Moves of any unauthorized use or disclosure.
                      f. Maintain confidentiality indefinitely, including after termination.
                      4. NON-COMPETE AND NON-SOLICITATION
                      For eighteen (18) months following termination of employment, Employee shall not, without prior written consent of Nurse Moves:
                      a. Engage, directly or indirectly, with any business that is substantially similar to or competes with Nurse Moves’ mental health, wellness, or nurse-focused technology services within North America or any territory where Nurse Moves operates or has active business plans.
                      b. Solicit or induce employees, contractors, users, or clients of Nurse Moves with whom Employee had material contact during the last twelve (12) months of employment.
                      Note: If any court deems this restriction too broad, the parties agree it shall be modified to the maximum enforceable scope.
                      5. OWNERSHIP AND INTELLECTUAL PROPERTY
                      a. All Work Product created by Employee is the sole and exclusive property of Nurse Moves.
                      b. Employee irrevocably assigns all rights, title, and interest, including copyrights, patents, trademarks, trade secrets, and moral rights, to Nurse Moves.
                      c. Employee waives all moral rights to the extent permitted by law.
                      6. RETURN AND DESTRUCTION OF MATERIALS
                      Within ten (10) business days after termination, Employee shall return or destroy all Nurse Moves property and Confidential Information and certify in writing such return/destruction.
                      7. GOVERNING LAW AND JURISDICTION
                      This Agreement shall be governed by and construed under the laws of the State of Illinois, USA, and the Employee agrees to submit to the exclusive jurisdiction of Illinois courts.
                      8. REMEDIES
                      Nurse Moves shall be entitled to injunctive relief, equitable remedies, and damages without the need to show actual harm or post bond.
                      9. MISCELLANEOUS
                      •	Binding on successors and assigns.
                      •	No waiver unless in writing.
                      •	Severability applies if any provision is invalid.
                      Modifications must be in writing and signed by both parties
`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LegalSignOff;
