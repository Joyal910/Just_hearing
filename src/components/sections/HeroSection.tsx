import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  const slides = [
    {
      image: "https://images.squarespace-cdn.com/content/v1/63cfd8ca14f6e861bd2a47bc/513df17e-34f9-470c-8d2d-3a7d024ac4ab/childrens-hearing-aids-newbury-thatcham.jpg",
      title: "Rediscover Life's Beautiful",
      highlight: "Sounds",
      subtitle: "Kottayam's Premier Hearing Care Center with Advanced Technology & Compassionate Audiologists",
      ctaText: "Schedule Your FREE Hearing Assessment",
      
    },
    {
      image: "https://www.audibel.com/wp-content/uploads/2022/10/audibel_quarterly-hearing-check_aside-1024x683.webp",
      title: "Award-Winning",
      highlight: "Excellence",
      subtitle: "Travancore Hearing Solutions is proud to be recognized with multiple awards, showcasing our commitment to delivering outstanding hearing care.",
      ctaText: "Learn About Our Awards",
      
    },
    {
      image: "https://gainesvilleaudiologist.com/wp-content/uploads/2021/03/10-mistaken-ideas-people-have-about-hearing-loss.jpg",
      title: "Advanced Hearing Aid",
      highlight: "Technology",
      subtitle: "Experience the latest in hearing aid technology with our state-of-the-art devices designed for crystal-clear sound quality and comfort.",
      ctaText: "Explore Our Technology",
     
    },
    {
      image: "https://thailaitrust.com/wp-content/uploads/2023/08/hearing-aid.jpg",
      title: "Personalized Care &",
      highlight: "Support",
      subtitle: "Our experienced audiologists provide comprehensive hearing evaluations and personalized treatment plans tailored to your unique needs.",
      ctaText: "Meet Our Specialists",
      
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative min-h-[60vh] sm:min-h-screen overflow-hidden mobile-hero">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 sm:duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-[60vh] sm:min-h-screen flex items-center">
        <div className="container mx-auto px-2 sm:px-4 pt-16 sm:pt-24">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className={`space-y-5 sm:space-y-8 relative transform transition-all duration-700 sm:duration-1500 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 sm:duration-1000 ease-in-out transform ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0 scale-100 relative' 
                      : 'opacity-0 translate-x-4 scale-95 absolute inset-0'
                  }`}
                >
                  <div className="space-y-5 sm:space-y-8">
                    <div className="space-y-2 sm:space-y-4">
                      <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up mobile-large-heading-scale">
                        {slide.title}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block animate-gradient-x">
                          {slide.highlight}
                        </span>
                      </h1>
                      <p className="text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl animate-fade-in-up mobile-text-scale">
                        {slide.subtitle}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 animate-fade-in-up">
                      <a href="#booking">
                        <Button 
                          size="lg" 
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 sm:px-8 lg:px-10 py-3 sm:py-6 text-sm sm:text-lg lg:text-xl rounded-full shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto touch-target"
                        >
                          <span className="group-hover:animate-pulse">{slide.ctaText}</span>
                        </Button>
                      </a>
                      <a href="tel:+918590310265">
                        <Button 
                          size="lg" 
                          variant="outline"
                          className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-4 sm:px-8 lg:px-10 py-3 sm:py-6 text-sm sm:text-lg lg:text-xl rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto touch-target"
                        >
                          Call Now: +91-8590310265
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-1 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-4 transition-all duration-300 hover:scale-110 hover:-translate-x-1 group touch-target"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-1 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-4 transition-all duration-300 hover:scale-110 hover:translate-x-1 group touch-target"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/80 transition-colors duration-300">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      
      {/* Custom CSS for hero animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out;
        }
      `}</style>
    </section>
  )
}