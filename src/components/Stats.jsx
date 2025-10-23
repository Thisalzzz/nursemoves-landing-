import React, { useState, useEffect } from 'react';

const StatsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stats = [
    {
      number: "62%",
      text: "of nurses in the US reported experiencing burnout (American Nurses Foundation, 2023)",
    },
    {
      number: "56%",
      text: "of nurses report feeling burned out at least once a week (NIOSH)",
    },
    {
      number: "80%+",
      text: "of nurses report chronic back, shoulder, or foot pain due to physical demands",
    },
    {
      number: "EVERY MOVE MATTERS",
      text: "Every nurse counts. Burnout ends here. NurseMoves is redefining wellness and combating burnout.",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, stats.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + stats.length) % stats.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
        {/* Main slider */}
        <div className="relative h-80 md:h-96">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center p-8 text-center ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0'
                  : index < currentIndex
                  ? '-translate-x-full opacity-0'
                  : 'translate-x-full opacity-0'
              }`}
            >
              <div className={`${index === 3 ? 'text-3xl md:text-5xl' : 'text-5xl md:text-7xl'} font-bold text-blue-800 mb-6 transition-all duration-500`}>
                {stat.number}
              </div>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                {stat.text}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-800 rounded-full p-3 shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-800 rounded-full p-3 shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
          {stats.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-blue-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSlider;