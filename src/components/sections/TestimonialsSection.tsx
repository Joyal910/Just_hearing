import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronRight, ChevronLeft, MapPin, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Idicheria Ninan",
    age: 45,
    location: "Kottayam",
    rating: 5,
    quote: "Just Hearing Clinic is highly recommended for those who are challenged like me. Remya the chief audiologist is extremely professional, friendly, reliable and supportive. The ambience is great as is the accessibility of the centre. She drove 45 km to fix my uncle's hearing aid. She corrected a major mistake that was made by the US facility that installed his expensive hearing aid. I recommend Remya's services whole heartedly. Just one visit, and you will soon feel as if adopted into her family.",
    condition: "Sensorineural hearing loss",
  },
  {
    name: "Jain Mathew",
    age: 62,
    location: "Puthupally",
    rating: 5,
    quote: "The clinic offers exceptional hearing healthcare services with a patient-centered approach. Advanced diagnostic equipment and techniques ensure accurate assessments and personalized treatment plans. The highly skilled audiologists provide compassionate care and support throughout the entire process. Patients appreciate the comfortable and welcoming atmosphere of the clinic. Overall, the clinic demonstrably improves patients' quality of life through better hearing., caring, and equipped with the latest technology. My grandson's voice sounds crystal clear now. Highly recommend to anyone in Kottayam!",
    condition: "Age-related hearing loss",
  },
  {
    name: "Meera Thomas",
    age: 38,
    location: "Changanassery",
    rating: 5,
    quote: "Had a wonderful experience at Just Hearing under Remya Ma'am. She was kind, professional, and explained the hearing test clearly. The process was smooth, and her guidance made everything easy. Highly recommend her for anyone needing hearing care and aids! My daughter's hearing issue early and provided excellent pediatric care. The child-friendly approach made all the difference.",
    condition: "Pediatric hearing assessment",
  },
]

// Google-style colors for profile initials
const profileColors = [
  'bg-blue-500',
  'bg-green-500', 
  'bg-red-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500'
]

// Function to get initials from name
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

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
    <section id="testimonials" className="py-6 sm:py-16 lg:py-20 mobile-section-spacing" style={{backgroundColor: '#011749'}}>
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div id="testimonials-section" className={`text-center mb-6 sm:mb-16 transform transition-all duration-700 sm:duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 mobile-heading-scale">
            Real Transformations from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-gradient-x">
              Real People
            </span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto mobile-text-scale">
            Hear directly from our patients about their life-changing experiences 
            with our hearing care services.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className={`relative max-w-2xl sm:max-w-4xl mx-auto transform transition-all duration-700 sm:duration-1000 sm:delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-8 items-center mobile-grid-1">
              {/* Patient Photo with Google-style initials */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full ${profileColors[currentTestimonial % profileColors.length]} flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-lg hover:scale-105 transition-transform duration-300`}>
                    {getInitials(testimonials[currentTestimonial].name)}
                  </div>
                </div>
                <div className="mt-2 sm:mt-4">
                  <h4 className="text-base sm:text-xl font-bold text-slate-800">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  
                  
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
                  <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mb-2 sm:mb-4 opacity-60" />
                  <blockquote className="text-sm sm:text-lg lg:text-xl text-slate-700 leading-relaxed mb-2 sm:mb-6 mobile-text-scale font-medium">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4 sm:mt-8">
            <button
              onClick={prevTestimonial}
              className="w-8 h-8 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-blue-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:-translate-x-1 touch-target backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            
            <div className="flex space-x-1 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 touch-target ${
                    index === currentTestimonial ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-8 h-8 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-blue-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 hover:translate-x-1 touch-target backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
        
        {/* See More Reviews Button */}
        <div className="text-center mt-4 sm:mt-8">
          <a href="/patient-stories">
            <button className="inline-block bg-white/90 hover:bg-white text-blue-900 font-bold rounded-full px-6 py-3 text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm">
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