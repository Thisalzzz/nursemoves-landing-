import React, { useState, useEffect } from "react";
import phone1 from "../assets/phone1.png";
import phone2 from "../assets/phone2.png";
import phone3 from "../assets/phone3.png";
import phone4 from "../assets/phone4.png";
import phone5 from "../assets/phone5.png";
import phone6 from "../assets/phone6.png";


const features = [
  {
    id: "01",
    title: "Fast Performance",
    description:
      "Experience lightning-fast speeds and smooth navigation throughout the app.",
  },
  {
    id: "02",
    title: "User Friendly",
    description:
      "An intuitive interface designed for simplicity and easy usage by everyone.",
  },
  {
    id: "03",
    title: "Secure & Reliable",
    description:
      "Your data is protected with top-notch security measures and encryption.",
  },
];

const slides = [
  {
    image: phone1,
    title: "nurse tunes",
  },
  {
    image: phone2,
    title: "smart grocery picks",
  },
  {
    image: phone3,
    title: "mental toolkit",
  },
    {
    image: phone4,
    title: "Nurse Laughs",
  },
      {
    image: phone5,
    title: "Sleep Support",
  },
      {
    image: phone6,
    title: "Burnout Tracker",
  },
];

const ApplicationFeatures = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Blue Background with Slider - Extended to left edge */}
        <div className="relative">
          <div className="bg-blue-800 flex justify-center items-center py-12 rounded-xl lg:rounded-l-none lg:pl-0 lg:pr-0">
            <div className="w-full px-4">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {slides.map((slide, idx) => (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 flex flex-col items-center justify-center"
                    >
                      <img
                        src={slide.image}
                        alt={`App Screenshot ${idx + 1}`}
                        className="w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[280px] rounded-xl"
                      />
                      <p className="mt-4 text-white font-semibold text-lg text-center">
                        {slide.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-6">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full mx-2 transition-colors ${
                      idx === currentIndex ? "bg-white" : "bg-blue-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute top-0 bottom-0 -left-48 w-48 bg-blue-800"></div>
        </div>

        {/* Right: Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Application Features
          </h2>
          <div className="w-16 h-1 bg-blue-600 my-4"></div>

          <div className="space-y-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start space-x-4">
                {/* Number Circle */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                  {feature.id}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ApplicationFeatures;