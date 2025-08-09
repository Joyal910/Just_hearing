import { useState, useEffect } from "react"
import { SEOHead } from "@/components/seo/SEOHead"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Phone, Star, Stethoscope, Heart, Ear, Clock, Sparkles, Zap, ArrowRight } from "lucide-react"
import pta from "../assets/Services/pure tone testing.jpg"
import hearingaid1 from "../assets/Services/Hearing-Aid-Selection-1024x640.webp"
import hearingaid2 from "../assets/Services/woman-having-new-hearing-aids-fitted-by-her-hearing-specialist.jpg"
import hearingaid3 from "../assets/Services/59fb1d3aea67e28806fcbfd5118639f1880e06b0.jpeg"
import hearingaid4 from "../assets/Services/fitting-hearing-aids-with-glasses-1024x1024.jpg"
import hearingaid5 from "../assets/Services/Follow-ups-3-min.png"
import speechtherapy1 from "../assets/Services/woman-doing-speech-therapy-with-little-boy-her-clinic.jpg"
import speechtherapy2 from "../assets/Services/woman-doing-speech-therapy-with-little-blonde-boy.jpg"
import speechtherapy3 from "../assets/Services/psychologist-helping-little-girl-speech-therapy.jpg"
import speechtherapy4 from "../assets/Services/swallowing therapy.jpg"
import speechtherapy5 from "../assets/Services/auditory therappy.png"




export function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
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

  const servicesPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Just Hearing Clinic Services",
    "description": "Comprehensive hearing healthcare services including diagnostic tests, hearing aids, and therapy services in Kottayam, Kerala.",
    "url": "https://justhearingclinic.in/services"
  }

  const services = [
    // Diagnostic Services
    {
      id: 'pure-tone-audiometry',
      title: "Pure Tone Audiometry",
      description: "A standard hearing test that measures the softest sounds a person can hear at different pitches and volumes.",
      detailedDescription: "Pure Tone Audiometry (PTA) is the gold standard for hearing assessment. This comprehensive test evaluates your hearing sensitivity across different frequencies and intensities, providing crucial information about the type, degree, and configuration of hearing loss. The test is conducted in a soundproof booth using calibrated audiometric equipment to ensure accurate results.",
      image: pta,
      category: "diagnostic",
      duration: "45-60 minutes",
      preparation: "No special preparation required",
      included: [
        "Assesses hearing thresholds across frequencies",
        "Identifies type and degree of hearing loss",
        "Essential for hearing aid fitting",
        "Comprehensive audiogram analysis"
      ],
      benefits: [
        "Early detection of hearing problems",
        "Baseline for future hearing monitoring",
        "Guides treatment recommendations",
        "Insurance documentation support"
      ],
      whoNeedsIt: [
        "Adults experiencing hearing difficulties",
        "Children with suspected hearing loss",
        "Workers in noisy environments",
        "Anyone requiring hearing assessment"
      ]
    },
    {
      id: 'speech-audiometry',
      title: "Speech Audiometry",
      description: "Evaluates a person's ability to hear and understand speech under various listening conditions.",
      detailedDescription: "Speech Audiometry complements pure tone testing by evaluating how well you understand speech at different volume levels. This test helps determine your functional hearing ability in real-world situations and is crucial for hearing aid fitting and rehabilitation planning.",
      image: "https://baslpcourse.com/wp-content/uploads/2020/06/what-is-speech-audiometry-test.jpg",
      category: "diagnostic",
      duration: "30-45 minutes",
      preparation: "Ensure you're well-rested for optimal performance",
      included: [
        "Tests speech recognition and discrimination",
        "Useful in diagnosing functional hearing abilities",
        "Helps determine hearing aid benefit",
        "Multiple listening condition assessments"
      ],
      benefits: [
        "Evaluates real-world hearing function",
        "Predicts hearing aid success",
        "Identifies central auditory processing issues",
        "Guides rehabilitation strategies"
      ],
      whoNeedsIt: [
        "Hearing aid candidates",
        "Patients with unclear speech understanding",
        "Those with normal hearing but speech difficulties",
        "Cochlear implant candidates"
      ]
    },
    {
      id: 'special-tests',
      title: "Special Tests (TDT, SISI, ABLB)",
      description: "Advanced audiological evaluations to detect specific hearing disorders and differentiate types of hearing loss.",
      detailedDescription: "These specialized tests provide detailed information about the site of lesion and help differentiate between conductive, sensorineural, and retrocochlear hearing losses. TDT (Tone Decay Test) identifies auditory nerve pathology, SISI (Short Increment Sensitivity Index) detects cochlear damage, and ABLB (Alternate Binaural Loudness Balance) compares loudness perception between ears.",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/5/415316161/RZ/MB/OH/22158648/audiometry-testing-machine-on-rent-500x500.jpg",
      category: "diagnostic",
      duration: "60-90 minutes",
      preparation: "Avoid loud noise exposure 24 hours before testing",
      included: [
        "TDT: Identifies auditory nerve fatigue",
        "SISI: Detects cochlear damage",
        "ABLB: Compares loudness perception between ears",
        "Comprehensive hearing disorder analysis"
      ],
      benefits: [
        "Precise diagnosis of hearing disorders",
        "Differentiates types of hearing loss",
        "Guides medical referrals",
        "Optimizes treatment planning"
      ],
      whoNeedsIt: [
        "Patients with asymmetric hearing loss",
        "Those with suspected retrocochlear pathology",
        "Complex hearing loss cases",
        "Pre-surgical evaluations"
      ]
    },
    {
      id: 'impedance-audiometry',
      title: "Impedance Audiometry",
      description: "Assesses the condition of the middle ear, including eardrum and ossicles, using acoustic impedance techniques.",
      detailedDescription: "Impedance Audiometry, including Tympanometry and Acoustic Reflex Testing, evaluates middle ear function without requiring active patient participation. This objective test helps diagnose middle ear pathologies, eustachian tube dysfunction, and can detect certain types of hearing loss.",
      image: "https://www.shutterstock.com/image-photo/adult-man-while-tympanometry-impedance-260nw-2652881403.jpg",
      category: "diagnostic",
      duration: "15-20 minutes",
      preparation: "Ensure ears are free of excessive wax",
      included: [
        "Evaluates middle ear pressure and mobility",
        "Includes Tympanometry and Acoustic Reflex Testing",
        "Helps diagnose fluid in the ear or eustachian tube issues",
        "Non-invasive middle ear assessment"
      ],
      benefits: [
        "Quick and objective assessment",
        "Detects middle ear problems",
        "Monitors treatment progress",
        "Suitable for all ages including infants"
      ],
      whoNeedsIt: [
        "Children with frequent ear infections",
        "Adults with ear pressure or fullness",
        "Patients with conductive hearing loss",
        "Pre and post-surgical monitoring"
      ]
    },
    {
      id: 'oae-test',
      title: "Otoacoustic Emissions Test (OAE)",
      description: "A non-invasive test that detects sounds generated by the inner ear (cochlea) in response to auditory stimuli.",
      detailedDescription: "OAE testing measures sounds produced by the outer hair cells in the cochlea. This quick, objective test is excellent for screening hearing in newborns, young children, and adults. It can detect hearing loss before it becomes apparent on conventional hearing tests.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5uqY7bONylGuE7Log1c8Nx6U8HqOCXJ8sQ&s",
      category: "diagnostic",
      duration: "10-15 minutes",
      preparation: "Quiet environment required during testing",
      included: [
        "Commonly used in newborn hearing screening",
        "Assesses outer hair cell function",
        "Quick and objective cochlear health check",
        "Early detection of hearing issues"
      ],
      benefits: [
        "Early detection of hearing loss",
        "Objective results",
        "Suitable for all ages",
        "Monitors ototoxic medication effects"
      ],
      whoNeedsIt: [
        "Newborns and infants",
        "Patients on ototoxic medications",
        "Noise-exposed workers",
        "Hearing conservation programs"
      ]
    },

    // Hearing Aid Services
    {
      id: 'hearing-aids-prescription',
      title: "Hearing Aids Prescription & Fitting",
      description: "Personalized assessment and selection of hearing aids to match the patient's hearing loss and lifestyle.",
      detailedDescription: "Our comprehensive hearing aid prescription and fitting service ensures you receive the most appropriate hearing technology for your specific needs. We consider your hearing loss pattern, lifestyle, dexterity, and personal preferences to recommend the best solution. The fitting process includes real-ear measurements to verify optimal performance.",
      image: hearingaid1,
      category: "hearing-aids",
      duration: "90-120 minutes",
      preparation: "Bring a family member for support and feedback",
      included: [
        "Accurate fitting using audiological data",
        "Trial with various models and styles",
        "Real-ear measurement for precision",
        "Lifestyle-matched hearing aid selection"
      ],
      benefits: [
        "Improved communication and quality of life",
        "Personalized to your specific needs",
        "Professional ongoing support",
        "Latest technology features"
      ],
      whoNeedsIt: [
        "First-time hearing aid users",
        "Those upgrading existing devices",
        "Patients with changing hearing needs",
        "Anyone seeking better hearing solutions"
      ]
    },
    {
      id: 'hearing-aids-trial',
      title: "Hearing Aids Trial",
      description: "Allows patients to experience different hearing aids in real-life scenarios before committing to a purchase.",
      detailedDescription: "Our hearing aid trial program lets you experience the benefits of hearing aids in your daily life before making a purchase decision. Try different models and styles to find what works best for your lifestyle, comfort, and hearing needs.",
      image: hearingaid2,
      category: "hearing-aids",
      duration: "7-30 day trial period",
      preparation: "Keep a hearing diary during trial",
      included: [
        "Try before you buy",
        "Compare multiple models",
        "Get feedback and adjust settings",
        "Real-world testing experience"
      ],
      benefits: [
        "Risk-free evaluation",
        "Experience real-world performance",
        "Compare different technologies",
        "Confident purchase decision"
      ],
      whoNeedsIt: [
        "First-time hearing aid users",
        "Those uncertain about hearing aids",
        "Patients wanting to compare options",
        "Anyone seeking confidence in their choice"
      ]
    },
    {
      id: 'hearing-aids-programming',
      title: "Hearing Aids Programming",
      description: "Customizing hearing aid settings to suit the individual's hearing profile and preferences.",
      detailedDescription: "Professional hearing aid programming ensures your devices are optimally configured for your specific hearing loss and listening preferences. We use advanced software and real-ear measurements to fine-tune your hearing aids for maximum benefit and comfort.",
      image: hearingaid3,
      category: "hearing-aids",
      duration: "45-60 minutes",
      preparation: "Bring your current hearing aids and any concerns",
      included: [
        "Fine-tuning for optimal clarity",
        "Adjustments based on real-time usage",
        "Compatible with most modern devices",
        "Personalized sound profile optimization"
      ],
      benefits: [
        "Maximized hearing aid performance",
        "Personalized listening experience",
        "Improved speech understanding",
        "Enhanced comfort in various environments"
      ],
      whoNeedsIt: [
        "New hearing aid users",
        "Those with changing hearing needs",
        "Patients experiencing difficulties",
        "Regular maintenance appointments"
      ]
    },
    {
      id: 'hearing-aids-accessories',
      title: "Hearing Aids Accessories",
      description: "Enhance hearing aid functionality with compatible tools and accessories for better performance and comfort.",
      detailedDescription: "Expand your hearing aid capabilities with our range of accessories designed to improve your listening experience in challenging situations. From wireless streaming devices to remote controls, we offer solutions to enhance your hearing aid performance.",
      image: hearingaid4,
      category: "hearing-aids",
      duration: "30-45 minutes consultation",
      preparation: "Bring your hearing aids for compatibility check",
      included: [
        "Wireless remote controls",
        "TV streamers and mobile app integration",
        "Rechargeable solutions and cleaning kits",
        "Bluetooth connectivity accessories"
      ],
      benefits: [
        "Enhanced listening in difficult situations",
        "Improved convenience and control",
        "Better connectivity with devices",
        "Extended hearing aid lifespan"
      ],
      whoNeedsIt: [
        "Active hearing aid users",
        "Those with specific listening challenges",
        "Technology enthusiasts",
        "Patients seeking enhanced functionality"
      ]
    },
    {
      id: 'hearing-aids-repair',
      title: "Hearing Aids Repair & Servicing",
      description: "Professional maintenance and repair service to keep hearing aids functioning efficiently.",
      detailedDescription: "Our comprehensive repair and servicing ensures your hearing aids continue to perform at their best. We provide both minor repairs and major overhauls, using genuine parts and following manufacturer specifications to restore optimal function.",
      image: hearingaid5,
      category: "hearing-aids",
      duration: "Same day to 1 week depending on repair",
      preparation: "Bring hearing aids, charger, and any accessories",
      included: [
        "On-site and off-site repair",
        "Replacement of damaged parts",
        "Periodic performance checkups",
        "Professional deep cleaning service"
      ],
      benefits: [
        "Extended hearing aid lifespan",
        "Maintained optimal performance",
        "Cost-effective maintenance",
        "Professional quality assurance"
      ],
      whoNeedsIt: [
        "Hearing aid users with device issues",
        "Those needing regular maintenance",
        "Patients with older hearing aids",
        "Anyone experiencing performance problems"
      ]
    },

    // Therapy Services
    {
      id: 'speech-language-therapy',
      title: "Speech & Language Therapy",
      description: "Therapy to support individuals with speech delays, articulation issues, and communication disorders.",
      detailedDescription: "Our speech and language therapy services address a wide range of communication disorders in both children and adults. We provide individualized treatment plans to improve speech clarity, language development, and overall communication effectiveness.",
      image: speechtherapy1,
      category: "therapy",
      duration: "45-60 minutes per session",
      preparation: "Bring any previous therapy reports or assessments",
      included: [
        "Individualized treatment plans",
        "Covers both children and adults",
        "Helps in language development and clarity",
        "Communication disorder rehabilitation"
      ],
      benefits: [
        "Improved communication skills",
        "Enhanced social interaction",
        "Better academic/professional performance",
        "Increased confidence in speaking"
      ],
      whoNeedsIt: [
        "Children with speech delays",
        "Adults with communication disorders",
        "Post-stroke patients",
        "Those with developmental disabilities"
      ]
    },
    {
      id: 'voice-therapy',
      title: "Voice Therapy",
      description: "Specialized care to treat voice disorders such as hoarseness, vocal fatigue, and pitch issues.",
      detailedDescription: "Voice therapy addresses various voice disorders through specialized techniques and exercises. Our program helps restore healthy voice production, prevent vocal damage, and maintain vocal health for professional voice users.",
      image: speechtherapy2,
      category: "therapy",
      duration: "45-60 minutes per session",
      preparation: "Avoid excessive voice use before sessions",
      included: [
        "Techniques to improve vocal quality",
        "Ideal for teachers, singers, and speakers",
        "Prevents vocal strain and nodules",
        "Professional voice rehabilitation"
      ],
      benefits: [
        "Restored vocal quality",
        "Prevention of vocal damage",
        "Improved professional voice use",
        "Enhanced vocal endurance"
      ],
      whoNeedsIt: [
        "Professional voice users",
        "Those with voice disorders",
        "Singers and performers",
        "Patients with vocal nodules or polyps"
      ]
    },
    {
      id: 'stuttering-therapy',
      title: "Stuttering Therapy",
      description: "Therapy designed to improve fluency and communication confidence for individuals with stuttering.",
      detailedDescription: "Our stuttering therapy program uses evidence-based techniques to improve speech fluency and communication confidence. We work with individuals of all ages to develop effective communication strategies and reduce the impact of stuttering on daily life.",
      image: speechtherapy3,
      category: "therapy",
      duration: "45-60 minutes per session",
      preparation: "Practice recommended techniques between sessions",
      included: [
        "Smooth speech techniques",
        "Anxiety reduction strategies",
        "Personalized fluency shaping",
        "Communication confidence building"
      ],
      benefits: [
        "Improved speech fluency",
        "Reduced communication anxiety",
        "Enhanced self-confidence",
        "Better social interaction"
      ],
      whoNeedsIt: [
        "Children and adults who stutter",
        "Those with fluency disorders",
        "Patients seeking confidence improvement",
        "Anyone affected by stuttering"
      ]
    },
    {
      id: 'swallowing-therapy',
      title: "Swallowing Therapy",
      description: "Rehabilitation service for individuals who have difficulty swallowing (dysphagia).",
      detailedDescription: "Swallowing therapy addresses dysphagia through specialized exercises and techniques to improve swallowing safety and efficiency. Our program helps patients regain safe swallowing function and prevent complications.",
      image: speechtherapy4,
      category: "therapy",
      duration: "45-60 minutes per session",
      preparation: "Bring recent medical reports and current diet information",
      included: [
        "Exercises to strengthen swallowing muscles",
        "Safe eating and drinking techniques",
        "Useful for stroke, trauma, or neurogenic conditions",
        "Comprehensive dysphagia management"
      ],
      benefits: [
        "Safer swallowing function",
        "Reduced risk of aspiration",
        "Improved nutrition and hydration",
        "Enhanced quality of life"
      ],
      whoNeedsIt: [
        "Stroke survivors",
        "Patients with neurological conditions",
        "Those with swallowing difficulties",
        "Post-surgical patients"
      ]
    },
    {
      id: 'auditory-verbal-therapy',
      title: "Auditory Verbal Therapy",
      description: "An early intervention approach for children with hearing loss to develop spoken language through listening.",
      detailedDescription: "Auditory Verbal Therapy is a specialized approach that teaches children with hearing loss to use their residual hearing and hearing technology to develop spoken language. This family-centered therapy involves parents as primary facilitators of their child's listening and spoken language development.",
      image: speechtherapy5,
      category: "therapy",
      duration: "45-60 minutes per session",
      preparation: "Ensure hearing devices are functioning properly",
      included: [
        "Focuses on hearing-based communication",
        "Involves both parent and child",
        "Works alongside hearing technology like cochlear implants",
        "Early intervention speech development"
      ],
      benefits: [
        "Develops listening and spoken language",
        "Maximizes hearing technology benefits",
        "Prepares for mainstream education",
        "Enhances family communication"
      ],
      whoNeedsIt: [
        "Children with hearing loss",
        "Cochlear implant recipients",
        "Families choosing spoken language",
        "Early intervention candidates"
      ]
    }
  ]

  const categories = [
    { 
      key: 'all', 
      label: 'All Services', 
      icon: Star,
      count: services.length
    },
    { 
      key: 'diagnostic', 
      label: 'Diagnostic Tests', 
      icon: Stethoscope,
      count: services.filter(s => s.category === 'diagnostic').length
    },
    { 
      key: 'hearing-aids', 
      label: 'Hearing Aid Services', 
      icon: Ear,
      count: services.filter(s => s.category === 'hearing-aids').length
    },
    { 
      key: 'therapy', 
      label: 'Therapy Services', 
      icon: Heart,
      count: services.filter(s => s.category === 'therapy').length
    }
  ]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Our Services - Just Hearing Clinic | Comprehensive Hearing Care Kottayam"
        description="Complete hearing healthcare services in Kottayam, Kerala. Diagnostic tests, hearing aids, speech therapy, and specialized treatments by expert audiologists."
        keywords="hearing services Kottayam, audiometry tests Kerala, hearing aid fitting, speech therapy Kottayam, hearing clinic services"
        canonicalUrl="https://justhearing.in/services"
        structuredData={servicesPageStructuredData}
      />
      
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

   {/* Hero Section */}
<section className="relative min-h-[35vh] md:min-h-[50vh] flex items-center overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="Our Services"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="container mx-auto px-4 pt-12 sm:pt-16 md:pt-24 relative z-10">
    <div className="max-w-4xl mx-auto text-center text-white">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-5 md:mb-6 animate-fade-in-up leading-tight">
        Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
          Services
        </span>
      </h1>
      <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300 px-4">
        Comprehensive hearing healthcare solutions for all your needs
      </p>
    </div>
  </div>
</section>


      {/* Category Filter */}
<section className="py-6 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" data-animate id="categories">
  <div className="container mx-auto px-4">
    <div
      className={`text-center mb-4 md:mb-8 transform transition-all duration-1000 ${
        visibleSections.has('categories') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {/* Optional heading */}
    </div>

    {/* Styled Dropdown for Mobile */}
    <div className="block md:hidden mb-3 flex justify-center">
      <div className="relative w-full max-w-xs">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-cyan-200 text-blue-900 font-semibold px-4 py-2 pr-10 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 appearance-none text-sm"
        >
          {categories.map((category) => (
            <option key={category.key} value={category.key} className="text-blue-900">
              {category.label} ({category.count})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-cyan-500">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Original Grid Layout for Desktop */}
    <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto">
      {categories.map((category) => {
        const IconComponent = category.icon
        const isSelected = selectedCategory === category.key

        return (
          <Button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            variant={isSelected ? "default" : "outline"}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group text-sm ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl hover:from-blue-700 hover:to-cyan-700'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-200 shadow-md'
            }`}
          >
            <IconComponent className={`w-4 h-4 mr-2 transition-transform duration-300 ${
              isSelected ? 'animate-pulse' : 'group-hover:scale-110'
            }`} />
            {category.label}
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              isSelected 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
            }`}>
              {category.count}
            </span>
          </Button>
        )
      })}
    </div>
  </div>
</section>




      {/* Services Grid - Mobile Responsive */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Mobile: Card Grid Layout */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 gap-4">
              {filteredServices.map((service, index) => (
                <Card 
                  key={service.id}
                  className={`transform transition-all duration-1000 hover:scale-105 px-2 py-2 ${
                    visibleSections.has(service.id) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  data-animate
                  id={service.id}
                >
                  <div className="relative rounded-t-lg overflow-hidden aspect-video">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <CardTitle className="text-sm font-bold text-blue-900 leading-tight">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed line-clamp-3">
                      {service.detailedDescription}
                    </p>
                    
                    <div className="mb-2">
                      <h4 className="font-semibold text-blue-900 mb-1 flex items-center text-xs">
                        <Zap className="w-3 h-3 mr-1 text-cyan-600" />
                        What's Included:
                      </h4>
                      <div className="space-y-1">
                        {service.included.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="text-cyan-600 mr-2 mt-0.5 flex-shrink-0" size={12} />
                            <span className="text-gray-700 text-xs">{feature}</span>
                          </div>
                        ))}
                        {service.included.length > 2 && (
                          <div className="text-[10px] text-gray-500 mt-1">
                            +{service.included.length - 2} more features
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Link to="/?scroll=booking">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-2 py-1 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          Book Service
                        </Button>
                      </Link>
                      <a href="tel:+918590310265" className="w-full">
                        <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 px-2 py-1 rounded-lg font-semibold transition-all duration-300 text-xs">
                          <Phone className="w-3 h-3 mr-1" />
                          Call Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop: Original Layout */}
          <div className="hidden lg:block">
            {filteredServices.map((service, index) => (
              <div 
                id={service.id}
                key={service.id}
                className={`py-16 relative overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}
                data-animate
              >
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Column (Left for even, Right for odd) */}
                    <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} transform transition-all duration-1000 ${
                      visibleSections.has(service.id) ? 'translate-x-0 opacity-100' : (index % 2 === 0 ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0')
                    }`}>
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-4 shadow-lg hover:scale-110 transition-transform duration-300">
                          <Clock className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
                          {service.title}
                        </h2>
                      </div>
                      
                      <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                        {service.detailedDescription}
                      </p>
                      
                      <div className="mb-8">
                        <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-cyan-600" />
                          What's Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.included.map((feature, i) => (
                            <div key={i} className="flex items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-300">
                              <CheckCircle className="text-cyan-600 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/?scroll=booking">
                          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book This Service
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                        <a href="tel:+918590310265">
                          <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                            Call Now
                          </Button>
                        </a>
                      </div>
                    </div>
                    
                    {/* Image Column (Right for even, Left for odd) */}
                    <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} transform transition-all duration-1000 delay-300 ${
                      visibleSections.has(service.id) ? 'translate-x-0 opacity-100' : (index % 2 === 0 ? 'translate-x-10 opacity-0' : '-translate-x-10 opacity-0')
                    }`}>
                      <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent group-hover:from-blue-900/30 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" data-animate id="process">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-8 sm:mb-16 transform transition-all duration-1000 ${
            visibleSections.has('process') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-blue-900">Our Treatment Process</h2>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              Every journey is unique, and our flexible approach ensures that your treatment evolves with your changing needs.
            </p>
          </div>
          
          {/* Mobile: Horizontal Scroll for Steps */}
          <div className="flex md:hidden gap-3 mt-6 overflow-x-auto snap-x pb-4 -mx-4 px-4">
            {[
              {
                step: 1,
                title: "Initial Consultation",
                description: "A comprehensive assessment to understand your unique history, symptoms, and goals."
              },
              {
                step: 2,
                title: "Personalized Plan",
                description: "We develop a customized treatment approach combining the best diagnostic and therapeutic techniques."
              },
              {
                step: 3,
                title: "Regular Sessions",
                description: "Ongoing therapy and follow-up appointments to implement your plan and track progress."
              },
              {
                step: 4,
                title: "Continued Support",
                description: "Long-term maintenance and adjustments to sustain your hearing health and prevent issues."
              }
            ].map((item, index) => (
              <div key={index} className={`relative min-w-[220px] max-w-[240px] snap-center transform transition-all duration-1000 hover:scale-105 ${
                visibleSections.has('process') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl hover:shadow-2xl h-full border border-gray-100 group transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-blue-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: Original Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {[
              {
                step: 1,
                title: "Initial Consultation",
                description: "A comprehensive assessment to understand your unique history, symptoms, and goals."
              },
              {
                step: 2,
                title: "Personalized Plan",
                description: "We develop a customized treatment approach combining the best diagnostic and therapeutic techniques."
              },
              {
                step: 3,
                title: "Regular Sessions",
                description: "Ongoing therapy and follow-up appointments to implement your plan and track progress."
              },
              {
                step: 4,
                title: "Continued Support",
                description: "Long-term maintenance and adjustments to sustain your hearing health and prevent issues."
              }
            ].map((item, index) => (
              <div key={index} className={`relative transform transition-all duration-1000 hover:scale-105 ${
                visibleSections.has('process') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl h-full border border-gray-100 group transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {/* Connecting line between steps (except last item) */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-1 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full animate-pulse" style={{ width: 'calc(100% - 3rem)', left: 'calc(1.5rem + 5px)', zIndex: -1 }}></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We're committed to providing the support you need at every step of your hearing care journey, ensuring the best possible outcomes for your unique needs.
            </p>
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ServicesPage