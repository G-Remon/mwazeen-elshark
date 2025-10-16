// components/SwiperComponent.jsx
import React, { forwardRef, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay, Lazy } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';

const SwiperComponent = forwardRef(({
  children,
  thumbs = false,
  thumbsSwiper,
  onSwiper,
  onSlideChange,
  onImagesReady,
  onThumbClick,
  activeIndex,
  images = [],
  isArabic = false,
  ...props
}, ref) => {
  
  const swiperConfig = thumbs ? {
    modules: [Navigation, Thumbs],
    watchSlidesProgress: true,
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    breakpoints: {
      320: { slidesPerView: 3, spaceBetween: 6 },
      640: { slidesPerView: 4, spaceBetween: 8 },
      1024: { slidesPerView: 5, spaceBetween: 12 },
    },
  } : {
    modules: [Navigation, Thumbs, Autoplay, Lazy],
    thumbs: { swiper: thumbsSwiper },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600,
    spaceBetween: 0,
    slidesPerView: 1,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    },
  };

  if (thumbs) {
    return (
      <Swiper
        {...swiperConfig}
        onSwiper={onSwiper}
        dir={isArabic ? 'rtl' : 'ltr'}
        className="project-thumbs-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => onThumbClick?.(index)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full ${
                activeIndex === index 
                  ? 'border-blue-600 scale-105 shadow-md' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
              }`}
              aria-label={`${isArabic ? 'عرض صورة' : 'View image'} ${index + 1}`}
              aria-pressed={activeIndex === index}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-16 md:h-20 object-cover hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  width={80}
                  height={60}
                />
              </div>
              {activeIndex === index && (
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg" aria-hidden="true" />
              )}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <Swiper
      ref={ref}
      {...swiperConfig}
      onSwiper={onSwiper}
      onSlideChange={onSlideChange}
      onImagesReady={onImagesReady}
      dir={isArabic ? 'rtl' : 'ltr'}
      className="project-main-swiper rounded-2xl"
    >
      {children}
    </Swiper>
  );
});

SwiperComponent.displayName = 'SwiperComponent';

export default memo(SwiperComponent);