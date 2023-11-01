import slides from "@/assets/images/slides";
import Image from "next/image";
import { LeftArrowIcon, RightArrowIcon } from "@/assets/icons/icons";
import { useState } from "react";

const Banner = () => {

  const [currentIndex, setIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === (slides.length - 1);
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setIndex(newIndex);
  }

  return (
    <>
      <div className=" relative group">
        <div className="absolute w-full h-32 bg-gradient-to-t md:from-gray-100 to-transparent bottom-0 z-20" />
        <Image
          src={slides[currentIndex].url}
          width={1920}
          height={600}
          alt="banner"
          placeholder="blur"
          blurDataURL={slides[currentIndex].url}
          className=" w-full transition-all duration-500"
        />
        <div className="hidden group-hover:block absolute top-1/4 left-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-40"
          onClick={prevSlide}
        >
          <LeftArrowIcon />
        </div>

        <div className="hidden group-hover:block absolute top-1/4 right-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-40"
          onClick={nextSlide}
        >
          <RightArrowIcon />
        </div>
      </div>
    </>
  );
};

export default Banner;

