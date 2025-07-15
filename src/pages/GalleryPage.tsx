import { useState, useEffect } from "react"
import { SEOHead } from "@/components/seo/SEOHead"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Award, Users, Heart, ArrowRight, Phone, Calendar } from "lucide-react"

export function GalleryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const galleryPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Just Hearing Clinic Gallery",
    "description": "View our state-of-the-art hearing clinic facility, advanced equipment, and expert team serving Kottayam, Kerala.",
    "url": "https://justhearingclinic.com/gallery"
  }

  const galleryImages = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/5214420/pexels-photo-5214420.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Advanced Audiometry Testing",
      category: "equipment",
      description: "State-of-the-art audiometry equipment for precise hearing assessments"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Patient Consultation",
      category: "consultation",
      description: "Personalized consultation with our expert audiologists"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/6303655/pexels-photo-6303655.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Pediatric Hearing Care",
      category: "pediatric",
      description: "Specialized hearing care for children in a comfortable environment"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Premium Hearing Aids",
      category: "equipment",
      description: "Latest generation hearing aids with advanced technology"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Tinnitus Treatment Session",
      category: "treatment",
      description: "Comprehensive tinnitus evaluation and treatment"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Hearing Aid Fitting",
      category: "consultation",
      description: "Professional hearing aid fitting and adjustment"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Modern Clinic Interior",
      category: "facility",
      description: "Clean, modern, and comfortable clinic environment"
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Patient Success Story",
      category: "testimonial",
      description: "Happy patient sharing their hearing improvement journey"
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Family Consultation",
      category: "consultation",
      description: "Family-centered approach to hearing healthcare"
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Patient Care Excellence",
      category: "testimonial",
      description: "Dedicated to providing exceptional patient care"
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Clinic Reception Area",
      category: "facility",
      description: "Welcoming reception area for patient comfort"
    }
  ]

  const categories = [
    { key: 'all', label: 'All Photos', icon: Award, count: galleryImages.length },
    { key: 'equipment', label: 'Equipment', icon: Award, count: galleryImages.filter(img => img.category === 'equipment').length },
    { key: 'consultation', label: 'Consultations', icon: Users, count: galleryImages.filter(img => img.category === 'consultation').length },
    { key: 'pediatric', label: 'Pediatric Care', icon: Heart, count: galleryImages.filter(img => img.category === 'pediatric').length },
    { key: 'treatment', label: 'Treatments', icon: Award, count: galleryImages.filter(img => img.category === 'treatment').length },
    { key: 'team', label: 'Our Team', icon: Users, count: galleryImages.filter(img => img.category === 'team').length },
    { key: 'facility', label: 'Facility', icon: Award, count: galleryImages.filter(img => img.category === 'facility').length },
    { key: 'testimonial', label: 'Patient Stories', icon: Heart, count: galleryImages.filter(img => img.category === 'testimonial').length }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(filteredImages[index].id)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(filteredImages[nextIndex].id)
  }

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(filteredImages[prevIndex].id)
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Gallery - Just Hearing Clinic | Facility & Equipment Photos Kottayam"
        description="View our modern hearing clinic facility in Kottayam, Kerala. See our advanced audiological equipment, comfortable consultation rooms, and expert team photos."
        keywords="hearing clinic photos Kottayam, audiologist facility Kerala, hearing clinic gallery, modern hearing equipment, Just Hearing Clinic images"
        canonicalUrl="https://justhearingclinic.com/gallery"
        structuredData={galleryPageStructuredData}
      />
      
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
    {/* Hero Section */}
<section className="relative min-h-[35vh] md:min-h-[50vh] flex items-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img 
      src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="About Just Hearing Clinic background"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="container mx-auto px-4 pt-12 sm:pt-16 md:pt-20 lg:pt-24 relative z-10">
    <div className="max-w-4xl mx-auto text-center text-white">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in-up leading-tight">
        Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
          Gallery
        </span>
      </h1>
      <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300 px-4">
        Take a visual journey through our state of the art facility.
      </p>
    </div>
  </div>
</section>


      
      {/* Modern Gallery Grid - Mobile Optimized */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Desktop Grid (unchanged) */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Sliding Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-12">
                    
                    
                    {/* Title */}
                    <h3 className="text-white font-semibold text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {image.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-200 text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {image.description}
                    </p>
                  </div>
                </div>
                
                {/* Modern Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Mobile Grid - Staggered Layout to Avoid Doom Scrolling */}
          <div className="lg:hidden">
            {/* Mobile: 2-column staggered grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {filteredImages.map((image, index) => {
                // Create staggered heights for visual interest
                const isEven = index % 2 === 0
                const heightClass = isEven ? 'aspect-[3/4]' : 'aspect-square'
                
                return (
                  <div 
                    key={image.id} 
                    className={`group relative ${heightClass} overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 ${
                      index % 4 === 1 || index % 4 === 2 ? 'mt-4 sm:mt-6' : ''
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Image */}
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Mobile Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Mobile Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Mobile Text Overlay - Always Visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1 leading-tight line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-gray-200 text-xs sm:text-sm leading-relaxed line-clamp-2 opacity-90">
                        {image.description}
                      </p>
                    </div>
                    
                    {/* Mobile Border Effect */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-300"></div>
                  </div>
                )
              })}
            </div>

            {/* Mobile: Load More Button (if needed for large galleries) */}
            {filteredImages.length > 12 && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  className="border-2 border-gray-300 hover:border-cyan-500 text-gray-700 hover:text-cyan-600 px-6 py-3 transition-all duration-300 hover:scale-105"
                >
                  Load More Images
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modern Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          <div className="relative max-w-6xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 group touch-target"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 group touch-target"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 group touch-target"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Image */}
            <img 
              src={filteredImages[currentImageIndex].src} 
              alt={filteredImages[currentImageIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-2xl animate-scale-in"
            />

            {/* Modern Image Info */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-black/60 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-6 text-white border border-white/10 animate-slide-up">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2">{filteredImages[currentImageIndex].title}</h3>
                  <p className="text-gray-200 text-sm sm:text-base mb-2 sm:mb-3">{filteredImages[currentImageIndex].description}</p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

       {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4 sm:gap-0">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center sm:mr-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">Ready to Improve Your Hearing?</h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Schedule your free consultation today and take the first step towards better hearing
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a href="#booking">
              <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto touch-target">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Schedule Free Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
            <a href="tel:+918590310265">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10 w-full sm:w-auto touch-target">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Call +91-8590310265
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionButtons />
      
      {/* Modern CSS Animations */}
      <style jsx>{`
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
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out 0.2s both;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }

        /* Mobile-specific optimizations */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .touch-target {
          min-height: 44px;
          min-width: 44px;
        }

        /* Smooth scrolling for mobile */
        @media (max-width: 1024px) {
          html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Mobile gallery optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  )
}