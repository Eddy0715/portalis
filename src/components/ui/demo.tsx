import React from "react"

import { CardCarousel } from "@/components/ui/card-carousel"

const CardCaroursalDemo = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "Modern Luxury Villa Interior" },
    { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", alt: "Contemporary Living Room" },
    { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", alt: "Elegant Minimalist Interior" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", alt: "Luxury Dining Space" },
    { src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80", alt: "High-end Lounge Fit-out" }
  ]

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCaroursalDemo
