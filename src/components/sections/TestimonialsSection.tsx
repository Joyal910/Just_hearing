import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronRight, ChevronLeft, MapPin, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Nair",
    age: 45,
    location: "Kottayam",
    rating: 5,
    quote: "After struggling with hearing loss for years, Dr. Sarah's team gave me my life back. The advanced hearing aids are incredible - I can hear my students clearly again!",
    condition: "Sensorineural hearing loss",
    image: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Ravi Kumar",
    age: 62,
    location: "Puthupally",
    rating: 5,
    quote: "Professional, caring, and equipped with the latest technology. My grandson's voice sounds crystal clear now. Highly recommend to anyone in Kottayam!",
    condition: "Age-related hearing loss",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Meera Thomas",
    age: 38,
    location: "Changanassery",
    rating: 5,
    quote: "They diagnosed my daughter's hearing issue early and provided excellent pediatric care. The child-friendly approach made all the difference.",
    condition: "Pediatric hearing assessment",
    image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('testimonials-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-6 sm:py-16 lg:py-20 bg-white mobile-section-spacing">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div id="testimonials-section" className={`text-center mb-6 sm:mb-16 transform transition-all duration-700 sm:duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 sm:mb-4 mobile-heading-scale">
            Real Transformations from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01184a] to-[#01184a] animate-gradient-x">
              Real People
            </span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto mobile-text-scale">
            Hear directly from our patients about their life-changing experiences 
            with our hearing care services.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className={`relative max-w-2xl sm:max-w-4xl mx-auto transform transition-all duration-700 sm:duration-1000 sm:delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-slate-50 to-[#01184a]/10 rounded-2xl p-4 sm:p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-8 items-center mobile-grid-1">
              {/* Patient Photo */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg mx-auto lg:mx-0 hover:scale-105 transition-transform duration-300 mobile-image"
                  />
                  <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs sm:text-sm font-bold"> </span>
                  </div>
                </div>
                <div className="mt-2 sm:mt-4">
                  <h4 className="text-base sm:text-xl font-bold text-slate-800">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-base">
                    Age {testimonials[currentTestimonial].age}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start space-x-1 mt-1 sm:mt-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-xs sm:text-sm text-slate-500">
                      {testimonials[currentTestimonial].location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="mb-3 sm:mb-6">
                  <div className="flex items-center space-x-1 mb-2 sm:mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current hover:scale-110 transition-transform duration-200" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-600 mb-2 sm:mb-4 opacity-50 animate-pulse" />
                  <blockquote className="text-sm sm:text-lg lg:text-xl text-slate-700 leading-relaxed mb-2 sm:mb-6 mobile-text-scale">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="bg-white rounded-lg p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Condition: {testimonials[currentTestimonial].condition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4 sm:mt-8">
            <button
              onClick={prevTestimonial}
              className="w-8 h-8 sm:w-12 sm:h-12 bg-[#01184a] text-white rounded-full flex items-center justify-center hover:bg-[#01184a]/90 transition-all duration-300 shadow-lg hover:scale-110 hover:-translate-x-1 touch-target"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            
            <div className="flex space-x-1 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 touch-target ${
                    index === currentTestimonial ? 'bg-[#01184a]' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-8 h-8 sm:w-12 sm:h-12 bg-[#01184a] text-white rounded-full flex items-center justify-center hover:bg-[#01184a]/90 transition-all duration-300 shadow-lg hover:scale-110 hover:translate-x-1 touch-target"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
        {/* See More Reviews Button */}
        <div className="text-center mt-4 sm:mt-8">
          <a href="/patient-stories">
            <button className="inline-block bg-[#01184a] hover:bg-[#01184a]/90 text-white font-semibold rounded-full px-6 py-2 text-sm sm:text-base shadow-md transition-all duration-300">
              See More Reviews
            </button>
          </a>
        </div>
      </div>
      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  )
}
export default TestimonialsSection