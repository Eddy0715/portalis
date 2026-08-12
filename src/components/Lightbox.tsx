"use client";

import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  project: {
    title: string;
    category: string;
    desc: string;
    images: string[];
  };
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  project,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onSelectImage,
}: LightboxProps) {
  const [autoplay, setAutoplay] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  // Key navigation & escape close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setSlideDirection("right");
        onNext();
      }
      if (e.key === "ArrowLeft") {
        setSlideDirection("left");
        onPrev();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  // Autoplay Logic
  useEffect(() => {
    if (!autoplay || !isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setProgress(0);
      return;
    }

    const duration = 5000; // 5 seconds per slide
    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setSlideDirection("right");
        onNext();
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [autoplay, currentIndex, isOpen, onNext]);

  if (!isOpen || !project || !project.images || project.images.length === 0) return null;

  const currentImage = project.images[currentIndex];

  const slideVariants = {
    initial: (direction: "left" | "right") => ({
      opacity: 0,
      scale: 1.02,
      x: direction === "right" ? 40 : -40,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: (direction: "left" | "right") => ({
      opacity: 0,
      scale: 0.98,
      x: direction === "right" ? -40 : 40,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const handleNextClick = () => {
    setSlideDirection("right");
    onNext();
  };

  const handlePrevClick = () => {
    setSlideDirection("left");
    onPrev();
  };

  const handleThumbnailClick = (idx: number) => {
    if (idx > currentIndex) {
      setSlideDirection("right");
    } else if (idx < currentIndex) {
      setSlideDirection("left");
    }
    onSelectImage(idx);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between select-none overflow-hidden font-body"
      >
        {/* Decorative Grid Lines / Glassmorphism backing */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-green/20 via-transparent to-transparent pointer-events-none" />

        {/* TOP BAR */}
        <div className="relative z-10 flex justify-between items-center px-6 py-5 border-b border-white/5 bg-black/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-warm-gold/25 bg-warm-gold/5 text-warm-gold">
              <Compass size={14} className="animate-spin-slow" />
            </span>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.3em] text-warm-gold font-semibold">
                {project.category}
              </span>
              <h2 className="font-heading text-base tracking-wide text-white font-medium mt-0.5">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`p-2 rounded-full border transition-all duration-300 ${
                autoplay 
                  ? "bg-warm-gold/10 border-warm-gold text-warm-gold" 
                  : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
              }`}
              title={autoplay ? "Pause Autoplay" : "Play Autoplay"}
            >
              {autoplay ? <Pause size={14} /> : <Play size={14} />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 border border-white/10 hover:border-warm-gold text-white/60 hover:text-warm-gold transition-all duration-300 rounded-full bg-white/5 hover:bg-warm-gold/5"
              aria-label="Close Gallery"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* MAIN AREA: Image + Right Side Info Panel */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
          
          {/* IMAGE SLIDER (Left side / center) */}
          <div className="relative flex-1 flex items-center justify-center p-4 lg:p-8 bg-black/20">
            {/* Previous Action Trigger */}
            <button
              onClick={handlePrevClick}
              className="absolute left-6 p-4 rounded-full border border-white/5 bg-black/40 text-white/60 hover:text-warm-gold hover:border-warm-gold/50 transition-all duration-300 z-20 hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Active Image Box */}
            <div className="relative w-full h-full max-w-4xl max-h-[62vh] lg:max-h-[72vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImage}
                    alt={`${project.title} - Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 900px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Action Trigger */}
            <button
              onClick={handleNextClick}
              className="absolute right-6 p-4 rounded-full border border-white/5 bg-black/40 text-white/60 hover:text-warm-gold hover:border-warm-gold/50 transition-all duration-300 z-20 hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Autoplay progress bar */}
            {autoplay && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
                <div 
                  className="h-full bg-warm-gold transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* PROJECT DESCRIPTION SIDEBAR */}
          <div className="w-full lg:w-[350px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 bg-black/40 backdrop-blur-lg p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full border border-warm-gold/30 bg-warm-gold/5 text-[9px] uppercase tracking-[0.2em] text-warm-gold font-semibold mb-3">
                  {project.category}
                </span>
                <h3 className="font-heading text-2xl text-white leading-snug">
                  {project.title}
                </h3>
              </div>

              <div className="h-[1px] w-12 bg-warm-gold/30" />

              <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Thumbnail selector inside Sidebar */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 block mb-3 font-semibold">
                Explore Gallery
              </span>
              <div className="flex flex-wrap gap-2">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all duration-300 shrink-0 ${
                      idx === currentIndex
                        ? "border-warm-gold ring-2 ring-warm-gold/20 scale-105"
                        : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM PAGINATION BAR */}
        <div className="relative z-10 px-6 py-4 border-t border-white/5 bg-black/20 text-center text-white/50 text-[10px] tracking-[0.3em] uppercase">
          Slide <span className="text-white font-medium">{currentIndex + 1}</span> of {project.images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
