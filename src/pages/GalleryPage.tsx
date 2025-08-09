import { useState, useEffect } from "react"
import { SEOHead } from "@/components/seo/SEOHead"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Award, Users, Heart, ArrowRight, Phone, Calendar } from "lucide-react"
import banner from "../assets/banner/about us.jpg"
import gallery1 from "../assets/gallery/gallery1.jpeg"
import gallery2 from "../assets/gallery/gallery2.jpeg"
import gallery3 from "../assets/gallery/gallery3.jpeg"
import gallery4 from "../assets/gallery/gallery4.jpeg"
import gallery5 from "../assets/gallery/gallery5.jpeg"
import gallery6 from "../assets/gallery/gallery6.jpeg"
import gallery7 from "../assets/gallery/gallery7.jpeg"
import gallery8 from "../assets/gallery/gallery8.jpeg"
import gallery9 from "../assets/gallery/gallery9.jpeg"
import gallery10 from "../assets/gallery/gallery10.jpeg"
import gallery11 from "../assets/gallery/gallery11.jpeg"
import gallery12 from "../assets/gallery/gallery12.jpeg"




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
    "url": "https://justhearing.in/gallery"
  }

  const galleryImages = [
    {
      id: 1,
      src : gallery7,
      title: "Advanced Audiometry Testing",
      category: "equipment",
      description: "State-of-the-art audiometry equipment for precise hearing assessments"
    },
    {
      id: 2,
src : gallery3,
      title: "Patient Consultation",
      category: "consultation",
      description: "Personalized consultation with our expert audiologists"
    },
    {
      id: 3,
src : gallery5,

title: "Pediatric Hearing Care",
      category: "pediatric",
      description: "Specialized hearing care for children in a comfortable environment"
    },
    {
      id: 4,
src : gallery4,
      title: "Premium Hearing Aids",
      category: "equipment",
      description: "Latest generation hearing aids with advanced technology"
    },
    {
      id: 5,
src : gallery6,      title: "Tinnitus Treatment Session",
      category: "treatment",
      description: "Comprehensive tinnitus evaluation and treatment"
    },
    {
      id: 6,
src : gallery1,      title: "Hearing Aid Fitting",
      category: "consultation",
      description: "Professional hearing aid fitting and adjustment"
    },
    {
      id: 7,
src : gallery2,      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
    },
    {
      id: 8,
src : gallery8,      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
    },
    {
      id: 9,
src : gallery9,      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
    },
    {
      id: 10,
src : gallery10,      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
    },
    {
      id: 11,
src : gallery11,      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
    },
    {
      id: 12,
src : gallery12,      title: "Expert Audiologist",
      category: "team",
      description: "Our experienced team of certified audiologists"
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
        canonicalUrl="https://justhearing.in/gallery"
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
      src={banner}
      alt="About Just Hearing Clinic background"
      className="w-full h-full object-cover"
    />
  </div>
   <div className="absolute inset-0 bg-black/20"></div>

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
                  <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <ZoomIn className="w-8 h-8 text-white" />
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

            
          </div>
        </div>
      )}

      

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