import React, { useState, useEffect, useRef } from "react";

const EmailCapture = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [slotsRemaining, setSlotsRemaining] = useState(50);
  const [pulse, setPulse] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Set up intersection observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Start animations when section comes into view
          setProgressWidth(90); // 90% full = 200 remaining out of 2000 total
          
          // Create pulsing effect
          setPulse(true);
          setTimeout(() => setPulse(false), 1000);
          
          // Set interval for periodic pulsing
          const pulseInterval = setInterval(() => {
            setPulse(true);
            setTimeout(() => setPulse(false), 1000);
          }, 8000);
          
          // Clean up observer and interval when component unmounts
          return () => clearInterval(pulseInterval);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!position) {
      alert("Please select your nursing section");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/nursemoves/google_sheets/eNtUfxCVDzZsffjD?tabId=Sheet1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            [name, email, position, reason, new Date().toISOString()],
          ]),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setPosition("");
        setReason("");
        setSlotsRemaining(prev => Math.max(0, prev - 1)); // Decrement remaining slots
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Failed to submit. Please try again later.");
        console.error("API Error:", result);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-800/20 animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-purple-700/20 animate-ping-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-600/20 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
          <h2 className="text-4xl font-bold text-white mb-2">
            Join the <span className="text-blue-300">Future</span> of Nursing
          </h2>
          <p className="text-indigo-200 mb-6">
            Secure your spot in our exclusive early access program
          </p>
          
          {/* Slots Remaining Indicator - Only show animation when section is in view */}
          <div className={`mb-8 transition-all duration-500 ${isSubmitted ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"} ${inView ? "translate-y-0" : "translate-y-10 opacity-0"}`}>
            <div className="relative bg-indigo-800/60 border border-indigo-400/30 rounded-2xl p-5 mb-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${pulse ? 'animate-ping bg-yellow-400' : 'bg-yellow-400'}`}></span>
                    Limited Spots Available!
                  </h3>
                  <p className="text-indigo-200 text-sm mt-1">
                    Don't miss your chance to be among the first
                  </p>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full px-4 py-2 shadow-lg transform hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">
                    {slotsRemaining} spots left
                  </span>
                </div>
              </div>
              
              <div className="relative w-full h-4 bg-indigo-900/50 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressWidth}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400/30 to-amber-500/30 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-indigo-300">
                <span>0</span>
                <span>500 total spots</span>
              </div>
            </div>
          </div>
          
          {isSubmitted ? (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl py-8 px-8 animate-pulse">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-100 text-xl font-medium">
                  Thank you! We'll notify you when we launch.
                </span>
                <p className="text-green-200 mt-2">
                  You've secured your spot among the first {2000 - slotsRemaining} nurses!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div className="relative">
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                >
                  <option value="" disabled>
                    Select your occupation
                  </option>
                    <option value="paediatric">Certified Nursing Assistant</option>
                    <option value="icu">Registered Nurse (RN)</option>
                    <option value="emergency">Licensed Practical Nurse (LPN)</option>
                    <option value="surgical">Nurse Practitioner (NP)</option>
                    <option value="other">Student Nurse</option>
                    <option value="other">Other</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Let us know the main challenges you face"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              <svg xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M11 5h2M12 19a7 7 0 100-14 7 7 0 000 14zm-4.5-7l7-7 4 4-7 7H7v-4z" />
              </svg>

              </div>
              
              <button
                type="submit"

                disabled={isLoading}
                className={`w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg ${
                  isLoading ? "opacity-80 cursor-not-allowed" : "hover:shadow-blue-500/30"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Securing your spot...
                  </div>
                ) : (
                  "Pre-Subscribe Now"
                )}
              </button>
              
              <p className="text-indigo-200 text-sm pt-2">
                Join the Nurse Community that already secured free early access.
              </p>
            </form>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default EmailCapture;