import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import heroimage1 from "../../assets/images/heroimage1.jpeg"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100) // Small delay to ensure smooth animation start
    return () => clearTimeout(timer)
  }, [])
  
  const slides = [
    {
      image: heroimage1,
      title: "Advanced Hearing Aid",
      highlight: "Technology",
      subtitle: "Discover cutting-edge hearing aid technology with our advanced devices, engineered for exceptional sound clarity and all-day comfort.",
      ctaText: "Explore Our Technology",
      ctaLink: "#/products", // Link to technology/products page
      ctaType: "hash-route" // hash-based routing
    },
    {
      image: "https://images.squarespace-cdn.com/content/v1/63cfd8ca14f6e861bd2a47bc/513df17e-34f9-470c-8d2d-3a7d024ac4ab/childrens-hearing-aids-newbury-thatcham.jpg",
      title: "Rediscover Life's Beautiful",
      highlight: "Sounds",
      subtitle: "Kottayam's Leading Hearing Care Center – Bringing Advanced Technology and Compassionate Expertise Right to Your Home.",
      ctaText: "Schedule Your Hearing Assessment",
      ctaLink: "#booking", // Link to booking section on same page
      ctaType: "anchor"
    },
    {
      image: "https://www.audibel.com/wp-content/uploads/2022/10/audibel_quarterly-hearing-check_aside-1024x683.webp",
      title: "Award-Winning",
      highlight: "Excellence",
      subtitle: "Just Hearing is recognized for award-winning excellence in hearing tests, accurate diagnostics, and exceptional patient care.",
      ctaText: "Learn About Us",
      ctaLink: "#/about", // Link to about page
      ctaType: "hash-route" // hash-based routing
    },
    {
      image: "https://thailaitrust.com/wp-content/uploads/2023/08/hearing-aid.jpg",
      title: "Personalized Care &",
      highlight: "Support",
      subtitle: "Our experienced audiologists offer comprehensive hearing evaluations and personalized treatment plans tailored to your individual needs.",
      ctaText: "Meet Our Specialists",
      ctaLink: "#team", // Link to team section on same page
      ctaType: "anchor"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000) // Increased from 5000ms to 12000ms (12 seconds) for better readability
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Function to handle CTA button click based on slide
  const handleCtaClick = (e, slide) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('CTA clicked:', slide.ctaText, slide.ctaType, slide.ctaLink) // Debug log
    
    if (slide.ctaType === 'external') {
      window.open(slide.ctaLink, '_blank')
    } else if (slide.ctaType === 'phone') {
      window.location.href = slide.ctaLink
    } else if (slide.ctaType === 'hash-route') {
      // Hash-based routing (like #/products, #/about)
      console.log('Navigating to hash route:', slide.ctaLink) // Debug log
      window.location.hash = slide.ctaLink.startsWith('#') ? slide.ctaLink.substring(1) : slide.ctaLink
    } else if (slide.ctaType === 'anchor') {
      // Internal anchor link - smooth scroll to section on same page
      const element = document.querySelector(slide.ctaLink)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        console.warn('Element not found:', slide.ctaLink)
      }
    }
  }

  const handlePhoneClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Phone button clicked') // Debug log
    window.location.href = 'tel:+918590310265'
  }

  return (
    <section className="relative min-h-[60vh] sm:min-h-screen overflow-hidden mobile-hero">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-[60vh] sm:min-h-screen flex items-center">
        <div className="container mx-auto px-2 sm:px-4 pt-16 sm:pt-24">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className={`space-y-5 sm:space-y-8 relative transform transition-all duration-300 ease-out ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-800 ease-in-out transform ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0 scale-100 relative z-10' 
                      : 'opacity-0 translate-x-4 scale-95 absolute inset-0 z-0 pointer-events-none'
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 animate-fade-in-up relative z-20">
                      <Button 
                        onClick={(e) => handleCtaClick(e, slide)}
                        size="lg" 
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 sm:px-8 lg:px-10 py-3 sm:py-6 text-sm sm:text-lg lg:text-xl rounded-full shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 group w-full sm:w-auto touch-target cursor-pointer relative z-30"
                        type="button"
                      >
                        <span className="group-hover:animate-pulse">{slide.ctaText}</span>
                      </Button>
                      <Button 
                        onClick={handlePhoneClick}
                        size="lg" 
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-4 sm:px-8 lg:px-10 py-3 sm:py-6 text-sm sm:text-lg lg:text-xl rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto touch-target cursor-pointer relative z-30"
                        type="button"
                      >
                        Call Now: +91-8590310265
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile (sm and below), visible on desktop */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-1 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-4 transition-all duration-200 hover:scale-110 hover:-translate-x-1 group touch-target cursor-pointer"
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-1 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-4 transition-all duration-200 hover:scale-110 hover:translate-x-1 group touch-target cursor-pointer"
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
              index === currentSlide 
                ? 'bg-white shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>

      {/* Scroll Indicator - Hidden on mobile (sm and below), visible on desktop */}
      <div className="hidden sm:block absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-200">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/80 transition-colors duration-200">
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
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 2s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.25s ease-out;
        }
      `}</style>
    </section>
  )
}