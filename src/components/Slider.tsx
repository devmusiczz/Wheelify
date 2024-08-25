'use client';
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "All Automobile Accessories",
    description: "Find trending automobile accessories! Up to 50% off on all accessories!",
    img: "/Auto4.jpg",
    url: "/list?cat=all-products",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Car Accessories Sale",
    description: "Looking for your Car Accessories? Your search ends here!",
    img: "/Auto2.jpg",
    url: "/list?cat=cars-accessories",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Bike Accessories Sale",
    description: "Fresh deals for your bike! Up to 50% off on accessories!",
    img: "/Auto3.jpg",
    url: "/list?cat=bike",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  }
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!isPaused) {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleIndicatorClick = (index: SetStateAction<number>) => {
    setCurrent(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div
      className="h-[calc(100vh-80px)] mt-20 overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className="relative w-screen h-full flex items-center justify-center"
            key={slide.id}
          >
            <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center bg-black text-white bg-opacity-70`}>
              <h2 className="text-2xl lg:text-4xl 2xl:text-6xl font-serif">
                {slide.description}
              </h2>
              <h1 className="text-4xl lg:text-6xl 2xl:text-8xl font-bold tracking-wider">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-white text-black py-3 px-4 font-medium text-lg lg:text-xl 2xl:text-2xl mt-4">
                  SHOP NOW
                </button>
              </Link>
            </div>
            <Image
              src={slide.img}
              alt={slide.title}
              width={1920} // Adjust width as needed
              height={1080} // Adjust height as needed
              className="absolute inset-0 -z-[1] object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => handleIndicatorClick(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
