"use client";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categoryImages = {
  Sunglasses: ["/images/categories/sunglasses1.jpg", "/images/categories/sunglasses2.jpg"],
  Eyeglasses: ["/images/categories/eyeglasses1.jpg", "/images/categories/eyeglasses2.jpg"],
  ContactLenses: ["/images/categories/contactlens1.jpg", "/images/categories/contactlens2.jpg"],
};

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

export default function CategorySlider({ category }) {
  return (
    <div className="w-[95%] mx-auto max-w-5xl">
      <Slider {...sliderSettings}>
        {categoryImages[category]?.map((image, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={image}
              alt={`${category} ${index + 1}`}
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
