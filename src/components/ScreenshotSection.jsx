import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Smartphone, Radio, Brain } from "lucide-react"; // ✅ Icons
import pulse from "../assets/pulse.png";
import radio from "../assets/radio.png";
import tunes from "../assets/tunes.png";
import back from "../assets/part2.jpg";

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: 'Tailored Stretch Routines',
      description: 'Relieve tension, prevent injury, and keep your body strong with quick, nurse-specific stretches you can do pre-shift, on-shift, and post-shift.',
      description2: "From scrubs to sneakers, these short, targeted routines are designed around the real movements, strain points, and time limits nurses face every day.",
      highlight: 'Because when you take care of your body, you’re taking care of your career.',
      phoneImage: back,
      reverse: false,
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      borderColor: "border-blue-200",
      icon: <Dumbbell className="w-6 h-6 text-blue-600" /> // yoga/stretch icon replacement
    },
    {
      id: 2,
      title: 'Pulse Social',
      description: 'This social platform is built exclusively for nurses to connect, share, and thrive.',
      description2: "A social space where every post, comment, and connection speaks your language — nursing. → No explaining, no judgment — just a safe, inspiring space to share your wins, vent your struggles, and connect with nurses around the world.",
      highlight: 'You deserve a place where your voice is heard, your experiences are understood, and your journey is celebrated.',
      phoneImage: pulse,
      reverse: true,
      bgColor: "bg-pink-50",
      accentColor: "text-pink-600",
      borderColor: "border-pink-200",
      icon: <Smartphone className="w-6 h-6 text-pink-600" /> // phone/social icon
    },
    {
      id: 3,
      title: 'Nurse Radio',
      description: 'Your daily dose of connection, knowledge, and a little inspiration — right in your ears.',
      description2: "Tune in for fresh conversations on nursing life, career growth, mental health, and real-world stories from the frontlines. Whether you’re commuting, charting, or winding down, you’ll always have a voice in your corner.",
      highlight: 'Whether you’re on the subway, on the bus, or heading back from work and winding down, you’ll always have a safe corner that you understand — and that understands you.',
      phoneImage: radio,
      reverse: false,
      bgColor: "bg-amber-50",
      accentColor: "text-amber-600",
      borderColor: "border-amber-200",
      icon: <Radio className="w-6 h-6 text-amber-600" /> // radio icon
    },
    {
      id: 4,
      title: 'Mindfullness',
      description: 'Short audio meditations designed to recharge you in the middle of chaos.',
      description2: "Whether it’s 2 minutes between call lights or 5 minutes before you head home, these meditations help you release the stress of the moment, lower your heart rate, and recenter your focus — so you return to your patients calmer, clearer, and ready to give your best.",
      highlight: 'Because your mind deserves care just as much as your patients do.',
      phoneImage: tunes,
      reverse: true,
      bgColor: "bg-violet-50",
      accentColor: "text-violet-600",
      borderColor: "border-violet-200",
      icon: <Brain className="w-6 h-6 text-violet-600" /> // thinking/brain icon
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Designed <span className="text-blue-600">Exclusively</span> for Nursing Personnel.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Be a part of this groundbreaking, tailor-made app designed specifically for the world of nurses.
          </p>
        </div>
        
        {/* Features */}
        <div className="space-y-24">
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 md:gap-12`}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <img 
                  src={feature.phoneImage} 
                  alt="Feature" 
                  className="w-full max-w-lg rounded-xl"
                />
              </div>
              
              {/* Text */}
              <div className="w-full lg:w-1/2">
                <div className="p-6 rounded-xl bg-white border-l-4 border-blue-500 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${feature.bgColor} flex items-center justify-center ${feature.borderColor} border-2`}>
                      {feature.icon} {/* ✅ Replaced number with icon */}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{feature.description}</p>
                  <p className="text-gray-600 mb-4">{feature.description2}</p>
                  
                  {feature.highlight && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-lg font-bold italic text-gray-900">
                        {feature.highlight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
