import React, { useState } from "react";
import Card from "./Card";

const Carousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < cards.length - cardsPerView) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const transformValue = currentIndex * (100 / cardsPerView);

  return (
    <>
      <div className="px-4 relative w-full max-w-4xl mx-auto mt-2">
        <div className="w-full mb-10 text-3xl text-left font-bold text-gray-700  z-10 relative">
          Popular Courses
        </div>
        <div className="px-4 absolute top-8 right-0 flex space-x-2 z-10">
          <button
            onClick={prevSlide}
            className={`px-3 py-1 bg-[#0D99FF] text-white rounded-lg hover:brightness-75 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className={`px-3 py-1 bg-[#0D99FF] text-white rounded-lg hover:brightness-75 ${
              currentIndex >= cards.length - cardsPerView
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentIndex >= cards.length - cardsPerView}
          >
            &gt;
          </button>
        </div>
        <div className="flex overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${transformValue}%)`,
              width: `${33 * (cards.length / cardsPerView)}%`,
            }}
          >
            {cards.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-1/3 px-1">
                <Card course={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
