"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

export interface CarouselImage {
  src: string
  alt: string
  num?: string
  label?: string
}

interface CarouselProps {
  images: CarouselImage[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 2000,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
    padding-top: 10px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 240px;
  }
  
  @media (min-width: 640px) {
    .swiper-slide {
      width: 270px;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }

  .swiper-pagination-bullet-active {
    background: #C6A87D !important;
  }
  `

  return (
    <div className="w-full relative">
      <style>{css}</style>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={showPagination}
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : undefined
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="flex flex-col group cursor-pointer transition-all duration-500">
              <div className="relative w-full aspect-[9/13] rounded-[20px] overflow-hidden border border-warm-gold/20 shadow-sm group-hover:shadow-md transition-all duration-500">
                <Image
                  src={image.src}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  alt={image.alt}
                  sizes="(max-width: 640px) 240px, 270px"
                />
              </div>
              {(image.num || image.label) && (
                <div className="mt-4 text-center">
                  {image.num && (
                    <span className="text-[10px] uppercase font-bold text-warm-gold tracking-widest block mb-1">
                      {image.num}
                    </span>
                  )}
                  {image.label && (
                    <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-forest-green group-hover:text-warm-gold transition-colors duration-300">
                      {image.label}
                    </h4>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
        {showNavigation && (
          <>
            <div className="swiper-button-prev !text-warm-gold hover:scale-110 transition-transform" />
            <div className="swiper-button-next !text-warm-gold hover:scale-110 transition-transform" />
          </>
        )}
      </Swiper>
    </div>
  )
}
