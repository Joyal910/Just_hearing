import { useState, useEffect } from "react"
import { SEOHead } from "@/components/seo/SEOHead"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star, Award, Users, Clock, MapPin, CheckCircle, Target, Eye, Lightbulb, TrendingUp, Shield, Globe, Sparkles, Zap, ArrowRight, Phone, Calendar, CreditCard as CreditCardIcon } from "lucide-react"

export function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [counters, setCounters] = useState({
    patients: 0,
    years: 0,
    success: 0,
    rating: 0
  })
  const [hasAnimatedCounters, setHasAnimatedCounters] = useState(false)

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

  // Counter animation effect - only run once
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000
      const targets = { patients: 1000, years: 15, success: 95, rating: 4.9 }
      const startTime = Date.now()
      
      const updateCounters = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        setCounters({
          patients: Math.floor(targets.patients * progress),
          years: Math.floor(targets.years * progress),
          success: Math.floor(targets.success * progress),
          rating: parseFloat((targets.rating * progress).toFixed(1))
        })
        
        if (progress < 1) {
          requestAnimationFrame(updateCounters)
        }
      }
      
      updateCounters()
    }
    
    if (visibleSections.has('achievements') && !hasAnimatedCounters) {
      animateCounters()
      setHasAnimatedCounters(true)
    }
  }, [visibleSections, hasAnimatedCounters])

  const aboutPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Just Hearing Clinic",
    "description": "Learn about Just Hearing Clinic's history, mission, and expert team of audiologists serving Kottayam, Kerala since 2008.",
    "url": "https://justhearingclinic.com/about",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Just Hearing Clinic",
      "foundingDate": "2008",
      "founder": {
        "@type": "Person",
        "name": "Remya Nair"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Dr. Sarah Thomas",
          "jobTitle": "Lead Audiologist & Clinic Director",
          "hasCredential": "Master's in Audiology - AIISH, Mysore"
        }
      ]
    }
  }

  const teamMembers = [
    {
      name: "Remya Ravi, M.ASLP",
      role: "Chief Audiologist & Speech-Language Pathologist | Co-founder",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
      qualifications: ["Master's in Audiology & Speech Language Pathology - Sri Ramachandra Medical College, Chennai", "15+ Years Clinical Experience", "Consultant at SDM Medical College, Hubli"],
      specialties: ["Diagnostics", "Speech & Language Disorders", "Patient-Centered Care"]
    }
  ]


  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="About Us - Just Hearing Clinic | Expert Audiologists in Kottayam, Kerala"
        description="Learn about Just Hearing Clinic's 15+ years of excellence in hearing care. Meet our expert team of RCI-certified audiologists serving Kottayam, Kerala since 2008."
        keywords="about just hearing clinic, audiologist team Kottayam, hearing clinic history Kerala, RCI certified audiologists, hearing care experts Kottayam"
        canonicalUrl="https://justhearingclinic.com/about"
        structuredData={aboutPageStructuredData}
      />
      
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[35vh] sm:min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="About Just Hearing Clinic background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto px-2 sm:px-4 pt-16 sm:pt-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
                Just Hearing
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300">
              Dedicated to transforming lives through exceptional hearing care since 2009
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-10 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" data-animate id="story">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-16 items-center">
            <div className={`transform transition-all duration-1000 ${
              visibleSections.has('story') ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-blue-900">Our Story</h2>
              </div>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded by Remya & Uday | Audiologists & Speech-Language Pathologists | Est. 2008 | Pvt. Ltd. since 2014
                </p>
                <p>
                 Just Hearing began not as a business venture, but as a shared vision between two passionate professionals and life partners—Remya and Uday. As experienced audiologists and speech-language pathologists with years of clinical and hospital practice, we had witnessed the deep emotional and social impact of untreated hearing loss. It affects more than just sound—it touches confidence, connection, livelihood, and dignity. In 2008, driven by a simple yet powerful question—"Why should quality hearing care be out of reach for the common man?"—we set out to make hearing health more accessible, reliable, and affordable.
                </p>
                <p>
                 What started as a small clinic rooted in purpose soon grew into something much larger. By 2014, Just Hearing was officially incorporated as a Private Limited Company, a step that allowed us to expand our services, build stronger systems, and reach more lives—all while staying grounded in our core values. Today, Just Hearing stands as a symbol of care, trust, and dedication. For us, it has never been just about treating hearing loss—it has always been about giving people the dignity of being heard.
                </p>
              </div>
              
             
            </div>
            <div className={`relative transform transition-all duration-1000 delay-300 ${
              visibleSections.has('story') ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <img 
                src="https://lh3.googleusercontent.com/p/AF1QipMR_qKClC9_R8M3JqU1ntyic9jbrFSKK128svCl=s1360-w1360-h1020-rw" 
                alt="Just Hearing Clinic team" 
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative z-10 w-full max-h-48 sm:max-h-none object-cover"
              />
              <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 sm:p-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-20">
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold flex items-center">
                    15+ <Zap className="w-4 h-4 sm:w-6 sm:h-6 ml-2 animate-pulse" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-10 sm:py-20 bg-white relative overflow-hidden" data-animate id="foundation">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 animate-gradient-x"></div>
        </div>
        
        <div className="container mx-auto px-2 sm:px-4">
          <div className={`text-center mb-8 sm:mb-16 transform transition-all duration-1000 ${
            visibleSections.has('foundation') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-2 sm:mb-4">Our Foundation</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Just Hearing Clinic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <Card className={`border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group transform ${
              visibleSections.has('foundation') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '100ms' }}>
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4">Our Mission</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  To provide exceptional, personalized hearing care that transforms lives and reconnects 
                  people with the sounds they love, using the latest technology and compassionate expertise.
                </p>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group transform ${
              visibleSections.has('foundation') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '200ms' }}>
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4">Our Vision</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  To be Kerala's leading hearing care center, recognized for clinical excellence, 
                  innovation, and our commitment to making quality hearing care accessible to all.
                </p>
              </CardContent>
            </Card>

            <Card className={`border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group transform ${
              visibleSections.has('foundation') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '300ms' }}>
              <CardContent className="p-4 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4">Our Values</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Compassion, Excellence, Innovation, and Integrity guide every interaction. 
                  We believe in treating every patient like family and delivering care that exceeds expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    {/* Team Section - Moved here after foundation */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" data-animate id="team">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleSections.has('team') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our RCI-certified audiologists bring decades of combined experience and a passion for hearing care
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className={`border-0 shadow-2xl overflow-hidden transform transition-all duration-1000 ${
                visibleSections.has('team') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">{member.name}</h3>
                        <p className="text-lg text-cyan-600 font-semibold">{member.role}</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Qualifications & Experience:</h4>
                          <ul className="space-y-1 text-gray-700">
                            {member.qualifications.map((qual, i) => (
                              <li key={i}>• {qual}</li>
                            ))}
                            <li>• Expert in {member.specialties.join(', ')}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Professional Approach:</h4>
                          <p className="text-gray-700">
                            Remya brings deep expertise in diagnostics, speech and language disorders, audiology, and patient-centered care. 
                            Her approach blends clinical excellence with empathy, focusing on accessible and innovative solutions for individuals 
                            with hearing and communication challenges.
                          </p>
                        </div>
                      </div>
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        <a href="/booking" className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Appointment with {member.name.split(',')[0]}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden" data-animate id="achievements">
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
        
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleSections.has('achievements') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`text-center transform transition-all duration-1000 hover:scale-110 ${
              visibleSections.has('achievements') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '100ms' }}>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.patients}+</div>
              <div className="text-blue-100">Patients Served</div>
            </div>
            
            <div className={`text-center transform transition-all duration-1000 hover:scale-110 ${
              visibleSections.has('achievements') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all duration-300 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.years}+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            
            <div className={`text-center transform transition-all duration-1000 hover:scale-110 ${
              visibleSections.has('achievements') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '300ms' }}>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all duration-300 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.success}%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            
            <div className={`text-center transform transition-all duration-1000 hover:scale-110 ${
              visibleSections.has('achievements') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '400ms' }}>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all duration-300 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.rating}/5</div>
              <div className="text-blue-100">Patient Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Just Hearing Section */}
      <section className="py-10 sm:py-16 bg-white relative overflow-hidden" data-animate id="why-just-hearing">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-2 sm:mb-4">Why Just Hearing</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">Discover what sets us apart and why families trust us for their hearing care</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Feature: Quality Assurance */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <Shield className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">Quality Assurance</div>
                <div className="text-gray-600 text-sm sm:text-base">Highest standards in every service and product</div>
              </div>
            </div>
            {/* Feature: Certified Audiologist */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <Award className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">Certified Audiologist</div>
                <div className="text-gray-600 text-sm sm:text-base">RCI-certified, experienced professionals</div>
              </div>
            </div>
            {/* Feature: Years of Experience */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <Clock className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">Years of Experience</div>
                <div className="text-gray-600 text-sm sm:text-base">Serving since 2008 with 15+ years of care</div>
              </div>
            </div>
            {/* Feature: EMI Option */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <CreditCardIcon className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">EMI Option</div>
                <div className="text-gray-600 text-sm sm:text-base">Flexible payment plans for your convenience</div>
              </div>
            </div>
            {/* Feature: Hearing Aids of all brands & Models */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <Globe className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">All Brands & Models</div>
                <div className="text-gray-600 text-sm sm:text-base">Wide range of hearing aids to suit every need</div>
              </div>
            </div>
            {/* Feature: Advanced Hearing tests with accurate results */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <CheckCircle className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">Advanced Hearing Tests</div>
                <div className="text-gray-600 text-sm sm:text-base">Modern equipment for precise, reliable results</div>
                        </div>
                  </div>
            {/* Feature: Affordable, Reliable & Reachable */}
            <div className="flex items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow p-4 sm:p-6">
              <TrendingUp className="w-7 h-7 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-blue-900 text-base sm:text-lg mb-1">Affordable, Reliable & Reachable</div>
                <div className="text-gray-600 text-sm sm:text-base">Care you can trust, always within your reach</div>
                </div>
            </div>
          </div>
        </div>
      </section>

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
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
export default AboutPage