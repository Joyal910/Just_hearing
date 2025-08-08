import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, MapPin, Calendar, Heart, Users, Award, Play, ChevronLeft, ChevronRight, ExternalLink, Sparkles, ArrowRight, Phone } from "lucide-react"

export function PatientStoriesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load Elfsight script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    document.head.appendChild(script)
    
    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // YouTube video data with your actual YouTube links
  const patientVideos = [
    {
      id: 1,
      name: "Patient Success Story",
      age: 45,
      profession: "Patient Testimonial",
      location: "Kottayam",
      image: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=800",
      condition: "Hearing Loss",
      solution: "Advanced Hearing Aid Solution",
      youtubeUrl: "https://youtu.be/GDowPJ-DsSE",
      videoId: "GDowPJ-DsSE",
      quote: "The transformation in my hearing has been incredible. I can now participate fully in conversations and enjoy life to the fullest.",
      story: "This patient shares their journey from struggling with hearing loss to finding the perfect hearing aid solution. Their testimonial showcases the life-changing impact of proper hearing care and professional audiological services.",
      featured: true
    },
    {
      id: 2,
      name: "Patient Testimonial",
      age: 62,
      profession: "Success Story",
      location: "Kottayam",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
      condition: "Hearing Difficulty",
      solution: "Professional Hearing Care",
      youtubeUrl: "https://youtube.com/shorts/oHtgKmkY9EM",
      videoId: "oHtgKmkY9EM",
      quote: "Professional, caring service with the latest technology. The results speak for themselves.",
      story: "Another inspiring patient story showcasing the quality of care and advanced hearing solutions provided. This testimonial highlights the professional approach and successful outcomes achieved through expert audiological care."
    }
  ]

  const VideoCard = ({ video }: { video: any }) => (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-video bg-gray-100 overflow-hidden group">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
          title="Patient testimonial video"
          className="w-full h-full bg-white"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 text-center">Patient Success Story</h3>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[30vh] sm:min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Patient success stories background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto px-2 sm:px-4 pt-12 sm:pt-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-2xl sm:text-5xl lg:text-7xl font-bold mb-3 sm:mb-6 animate-fade-in-up">
              Patient{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
                Success Stories
              </span>
            </h1>
            <p className="text-sm sm:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300">
              Real transformations from real people who rediscovered the joy of clear hearing
            </p>
          </div>
        </div>
      </section>

      {/* Video Stories Section */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {/* All Videos */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Success Stories</h2>
                <p className="text-base text-gray-600">Watch how hearing aids transformed lives</p>
              </div>
              
              {/* All Videos */}
              <div className="space-y-6 mb-8">
                {patientVideos.map((video) => (
                  <div key={video.id}>
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>

            {/* Google Reviews Widget */}
            <div className="mb-4">
              <div 
                className="elfsight-app-0df4ded4-6ddd-4c5d-afa5-f5ebe266ece4" 
                data-elfsight-app-lazy
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {/* All Videos Section */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Success Stories</h2>
                <p className="text-lg text-gray-600">Watch how hearing aids transformed lives</p>
              </div>
              
              {/* All Videos */}
              <div className="space-y-6">
                {patientVideos.map((video) => (
                  <div key={video.id}>
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>

            {/* Google Reviews Widget */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Reviews</h2>
                <p className="text-lg text-gray-600">Read authentic reviews from our satisfied patients</p>
              </div>
              
              <div className="mb-8">
                <div 
                  className="elfsight-app-0df4ded4-6ddd-4c5d-afa5-f5ebe266ece4" 
                  data-elfsight-app-lazy
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

       



     

      <Footer />
      <FloatingActionButtons />
      
      {/* Custom CSS for animations */}
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
          animation: fade-in-up 1s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        /* Elfsight widget styling */
        .elfsight-app-0df4ded4-6ddd-4c5d-afa5-f5ebe266ece4 {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          background: white;
        }
      `}</style>
    </div>
  )
}

export default PatientStoriesPage