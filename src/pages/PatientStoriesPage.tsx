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
  const [selectedStory, setSelectedStory] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      
      // Intersection Observer for animations
      const sections = document.querySelectorAll('[data-animate]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setVisibleSections(prev => new Set([...prev, section.id]))
        }
      })
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
      document.head.removeChild(script)
    }
  }, [])

  const patientStories = [
    {
      id: 1,
      name: "Priya Nair",
      age: 45,
      profession: "School Teacher",
      location: "Kottayam",
      image: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=800",
      condition: "Sensorineural hearing loss",
      solution: "Signia Motion Charge&Go X",
      rating: 5,
      type: "video", // video or review
      quote: "After struggling with hearing loss for years, Dr. Sarah's team gave me my life back. The advanced hearing aids are incredible - I can hear my students clearly again!",
      story: "As a school teacher for over 20 years, my hearing was everything to me. When I started missing what my students were saying, I knew something was wrong. Dr. Sarah and her team not only diagnosed my condition with precision but also fitted me with the perfect hearing aids. Now, I can hear every whisper in my classroom and feel like myself again.",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
      duration: "3:45",
      featured: true
    },
    {
      id: 2,
      name: "Ravi Kumar",
      age: 62,
      profession: "Retired Engineer",
      location: "Puthupally",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
      condition: "Age-related hearing loss",
      solution: "Phonak Audéo Paradise",
      rating: 5,
      type: "review",
      quote: "Professional, caring, and equipped with the latest technology. My grandson's voice sounds crystal clear now. Highly recommend to anyone in Kottayam!",
      story: "At 62, I thought hearing loss was just part of getting older. My family was getting frustrated because I kept turning up the TV volume. The Phonak hearing aids they fitted me with have Bluetooth connectivity - I can even take phone calls directly through them! Now I don't miss a single word my grandson says.",
      reviewDate: "2 weeks ago",
      googleReviewUrl: "#"
    },
    {
      id: 3,
      name: "Dr. Suresh Menon",
      age: 55,
      profession: "Cardiologist",
      location: "Kottayam",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
      condition: "Tinnitus and mild hearing loss",
      solution: "Signia Styletto IX with tinnitus therapy",
      rating: 5,
      type: "review",
      quote: "As a doctor myself, I appreciate the scientific approach and cutting-edge technology. The tinnitus relief has been life-changing.",
      story: "Being a cardiologist, when I developed persistent tinnitus along with mild hearing loss, it was affecting my ability to use my stethoscope effectively. The advanced Signia hearing aids with built-in tinnitus therapy have been a game-changer. I can focus completely on my patients again.",
      reviewDate: "1 month ago",
      googleReviewUrl: "#"
    },
    {
      id: 4,
      name: "Lakshmi Pillai",
      age: 72,
      profession: "Homemaker",
      location: "Ettumanoor",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800",
      condition: "Severe hearing loss",
      solution: "Oticon More",
      rating: 5,
      type: "review",
      quote: "I thought I'd never hear my grandchildren's laughter clearly again. Now I don't miss a single giggle or story they tell me.",
      story: "At 72, my hearing had deteriorated so much that I was becoming isolated from my own family. The Oticon hearing aids they recommended have artificial intelligence that learns from my preferences. Now I can hear my grandchildren's whispers and enjoy family conversations again.",
      reviewDate: "3 weeks ago",
      googleReviewUrl: "#"
    }
  ]

  const filteredStories = patientStories.filter(story => 
    activeFilter === 'all' || story.type === activeFilter
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  const VideoCard = ({ story }: { story: any }) => (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden group">
        <img 
          src={`https://img.youtube.com/vi/${story.videoId}/maxresdefault.jpg`}
          alt={`${story.name} testimonial video`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>

        {/* Video Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Play className="w-3 h-3" />
          VIDEO
        </div>

        {/* Duration */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {story.duration}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={story.image}
            alt={story.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{story.name}</h3>
            <p className="text-sm text-gray-500">{story.profession}, {story.location}</p>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {renderStars(story.rating)}
          </div>
          <span className="text-sm text-gray-500">({story.rating}/5)</span>
        </div>

        <blockquote className="text-gray-700 italic mb-4">
          "{story.quote}"
        </blockquote>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Treatment:</span> {story.solution}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            onClick={() => window.open(`https://www.youtube.com/watch?v=${story.videoId}`, '_blank', 'noopener,noreferrer')}
          >
            Watch Video
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ReviewCard = ({ story }: { story: any }) => (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img 
              src={story.image}
              alt={story.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{story.name}</h3>
              <p className="text-sm text-gray-500">{story.profession}, {story.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-500">Google</span>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {renderStars(story.rating)}
          </div>
          <span className="text-sm text-gray-500">({story.rating}/5)</span>
          <span className="text-sm text-gray-400 ml-auto">{story.reviewDate}</span>
        </div>

        <blockquote className="text-gray-700 mb-4">
          "{story.quote}"
        </blockquote>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Condition:</span> {story.condition}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Solution:</span> {story.solution}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button 
            className="text-blue-600 hover:text-blue-800 p-0 bg-transparent border-none cursor-pointer"
            onClick={() => alert('Full story feature coming soon!')}
          >
            Read full story →
          </button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
            onClick={() => window.open('https://www.google.com/maps/place/Just+Hearing+clinic/@9.557094,76.5709162,17z', '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View on Google
          </Button>
        </div>
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
      <section className="relative min-h-[30vh] sm:min-h-[50vh] flex items-center overflow-hidden" data-animate id="hero">
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

      {/* Side by Side Stories Section */}
      {/* Mobile: Video then Elfsight widget, no static reviews */}
      <section className="py-10 sm:py-16 bg-gray-50" data-animate id="stories">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="block lg:hidden">
            {/* Featured Video Section */}
            <div className={`mb-8 transform transition-all duration-1000 ${
              visibleSections.has('stories') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Patient Story</h2>
                <p className="text-base text-gray-600">Watch how hearing aids transformed Priya's teaching career</p>
              </div>
              {patientStories.find(story => story.featured && story.type === 'video') && (
                <VideoCard story={patientStories.find(story => story.featured && story.type === 'video')} />
              )}
            </div>
            {/* Elfsight Google Reviews Widget */}
            <div className="mb-4">
              <div 
                className="elfsight-app-0df4ded4-6ddd-4c5d-afa5-f5ebe266ece4" 
                data-elfsight-app-lazy
                style={{ minHeight: '400px' }}
              ></div>
            </div>
          </div>
          {/* Desktop: Original Side by Side Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {/* Featured Video Section */}
            <div className={`transform transition-all duration-1000 ${
              visibleSections.has('stories') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Patient Story</h2>
                <p className="text-lg text-gray-600">Watch how hearing aids transformed Priya's teaching career</p>
              </div>
              {patientStories.find(story => story.featured && story.type === 'video') && (
                <VideoCard story={patientStories.find(story => story.featured && story.type === 'video')} />
              )}
            </div>
            {/* Patient Reviews Section with Elfsight Widget and static reviews (unchanged) */}
            <div className={`transform transition-all duration-1000 delay-300 ${
              visibleSections.has('stories') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Reviews</h2>
                <p className="text-lg text-gray-600">Read authentic reviews from our satisfied patients</p>
              </div>
              {/* Elfsight Google Reviews Widget */}
              <div className="mb-8">
                <div 
                  className="elfsight-app-0df4ded4-6ddd-4c5d-afa5-f5ebe266ece4" 
                  data-elfsight-app-lazy
                  style={{ minHeight: '400px' }}
                ></div>
              </div>
              {/* Featured Review Cards */}
              <div className="space-y-6">
                {filteredStories.filter(story => story.type === 'review').slice(0, 1).map((story, index) => (
                  <motion.div 
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ReviewCard story={story} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Reviews Section removed from all devices */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
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
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Ready to Improve Your Hearing?</h2>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule your free consultation today and take the first step towards better hearing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking">
              <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
            <a href="tel:+918590310265">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                Call +91-8590310265
              </Button>
            </a>
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