import { useState, useEffect } from "react"
import { ArrowRight, Calendar, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SEOHead } from "@/components/seo/SEOHead"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { HeroSection } from "@/components/sections/HeroSection"
import AboutUsSection from "@/components/sections/AboutUsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { ProductsSection } from "@/components/sections/ProductsSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { AudiologistProfile } from "@/components/sections/AudiologistProfile"
import BookAppointmentSection from "@/components/sections/BookAppointmentSection"

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      
      // Intersection Observer for section animations
      const sections = document.querySelectorAll('[data-animate]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setVisibleSections(prev => new Set([...prev, section.id]))
        }
      })
    }
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    handleScroll() // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const homePageStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Just Hearing Clinic",
    "description": "Clinic for audiology, hearing aids, and speech therapy in Puthupally, Kottayam.",
    "url": "https://justhearingclinic.com",
    "telephone": "+91-8590310265",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Puthupally",
      "addressLocality": "Kottayam",
      "addressRegion": "Kerala",
      "postalCode": "686011",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.557094,
      "longitude": 76.5709162
    },
    "foundingDate": "2008",
    "founder": {
      "@type": "Person",
      "name": "Remya Nair"
    },
    "openingHours": ["Mo-Sa 09:00-18:00", "Su 10:00-16:00"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Just Hearing Clinic - Best Audiologist & Hearing Aids in Kottayam, Kerala"
        description="Leading hearing care clinic in Kottayam, Kerala. Expert audiologists, advanced hearing aids, free hearing tests. Serving Puthupally, Changanassery & surrounding areas since 2008. Book consultation today!"
        keywords="hearing aids Kottayam, audiologist Kerala, hearing test Puthupally, speech therapy Kottayam, hearing clinic Kerala, best audiologist Kottayam, hearing loss treatment, cochlear implants Kerala"
        canonicalUrl="https://justhearingclinic.com"
        structuredData={homePageStructuredData}
      />
      
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <HeroSection />
      
      {/* About Us Section with proper heading */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 relative overflow-hidden mobile-section-spacing" data-animate id="about">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-cyan-400 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-400 ease-out ${
            visibleSections.has('about') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-4 mobile-heading-scale">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 animate-gradient-x">
                Just Hearing Clinic
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mobile-text-scale">
              Kottayam's premier hearing care center, dedicated to transforming lives through exceptional audiological services since 2008
            </p>
          </div>
          <div className={`transform transition-all duration-400 delay-100 ease-out ${
            visibleSections.has('about') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <AboutUsSection />
          </div>
        </div>
      </section>
      
      <div data-animate id="services">
        <ServicesSection />
      </div>
      <div data-animate id="products">
        <ProductsSection />
      </div>
      <div data-animate id="audiologist">
        <AudiologistProfile />
      </div>
      <div data-animate id="testimonials">
        <TestimonialsSection />
      </div>
      
      <div data-animate id="booking">
        <BookAppointmentSection />
      </div>

      
      
      <Footer />
      <FloatingActionButtons />
      
      {/* Custom CSS for animations */}
      <style >{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-random {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 1.5s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-float-random {
          animation: float-random 2.5s ease-in-out infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hover effects for interactive elements */
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  )
}