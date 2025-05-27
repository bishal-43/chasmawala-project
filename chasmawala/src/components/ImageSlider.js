"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Using Category Images in Hero Slider
const heroImages = [
  "/images/categories/sunglasses1.jpg",
  "/images/categories/eyeglasses2.jpg",
  "/images/categories/contactlens3.jpg",
];

const sliderSettings = {
  dots: false, // ❌ Remove dots
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
};

export default function ImageSlider() {
  return (
    <div className="w-[95%] mx-auto max-w-5xl">
      <Slider {...sliderSettings}>
        {heroImages.map((image, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={image}
              alt={`Hero Slide ${index + 1}`}
              width={1200}
              height={400}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
