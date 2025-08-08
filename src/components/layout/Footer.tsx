import { Ear, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter, ArrowRight, Calendar, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [visibleSections, setVisibleSections] = useState(new Set())

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    const ctaElement = document.getElementById('cta')
    if (ctaElement) observer.observe(ctaElement)

    return () => observer.disconnect()
  }, [])

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Patient Stories", path: "/patient-stories" },
    { name: "Contact Us", path: "/contact" }
  ]

  const services = [
    "Free Hearing Assessment",
    "Hearing Aid Fitting",
    "Pediatric Audiology",
    "Tinnitus Treatment",
    "Speech Therapy",
    "Hearing Aid Repair"
  ]

  const contactInfo = [
    {
      icon: MapPin,
      label: "Visit Us",
      value: "Puthupally, Kottayam",
      subValue: "Kerala, India - 686011"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+91-8590310265",
      subValue: "Emergency: +91-9876543211"
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@justhearingclinic.com",
      subValue: "appointments@justhearingclinic.com"
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Mon-Sat: 9:00 AM - 6:00 PM",
      subValue: "Sunday: 10:00 AM - 4:00 PM"
    }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 text-white overflow-hidden">
      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" id="cta">
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
       
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className={`flex flex-col sm:flex-row items-center justify-center mb-6 gap-4 transform transition-all duration-1000 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">Ready to Improve Your Hearing?</h2>
          </div>
          <p className={`text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-300 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Schedule your free consultation today and take the first step towards better hearing
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-500 ${
            visibleSections.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Link to="/?scroll=booking" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 sm:px-8 py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group w-full sm:w-auto inline-flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <a href="tel:+918590310265" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm bg-white/10 w-full sm:w-auto inline-flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call +91-8590310265
            </a>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t border-white/10"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 rounded-xl shadow-lg">
                  <Ear className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold">Just Hearing</h3>
                  <p className="text-blue-200 font-medium text-sm sm:text-base">Clinic</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto sm:mx-0">
                Kottayam's premier hearing care center, dedicated to transforming lives through exceptional 
                audiological services since 2008. We combine cutting-edge technology with compassionate care.
              </p>
              
              {/* Social Media */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white text-base sm:text-lg">Follow Us</h4>
                <div className="flex justify-center sm:justify-start space-x-3">
                  {[
                    { icon: Facebook, href: "https://www.facebook.com/justhearingclinic", color: "hover:bg-blue-600", label: "Facebook" },
                    { icon: Instagram, href: "https://www.instagram.com/justhearingclinic", color: "hover:bg-pink-600", label: "Instagram" },
                    { icon: Linkedin, href: "https://www.linkedin.com/company/justhearingclinic", color: "hover:bg-blue-700", label: "LinkedIn" },
                    { icon: Twitter, href: "https://twitter.com/justhearingclinic", color: "hover:bg-blue-400", label: "Twitter" }
                  ].map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 shadow-lg`}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-xl sm:text-xl lg:text-2xl mb-6 text-white flex items-center justify-center sm:justify-start">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-cyan-400" />
                Quick Links
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      className="text-blue-200 hover:text-white transition-all duration-300 flex items-center justify-center sm:justify-start group text-sm sm:text-base hover:translate-x-2 py-1"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" />
                      <span className="group-hover:text-cyan-300 transition-colors duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-xl sm:text-xl lg:text-2xl mb-6 text-white flex items-center justify-center sm:justify-start">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-cyan-400" />
                Our Services
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-blue-200 hover:text-white transition-all duration-300 text-sm sm:text-base flex items-center justify-center sm:justify-start group cursor-pointer hover:translate-x-2 py-1">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" />
                      <span className="group-hover:text-cyan-300 transition-colors duration-300">{service}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-xl sm:text-xl lg:text-2xl mb-6 text-white flex items-center justify-center sm:justify-start">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-cyan-400" />
                Contact Info
              </h4>
              <div className="space-y-4 sm:space-y-5">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon
                  return (
                    <div 
                      key={index} 
                      className="flex items-start justify-center sm:justify-start space-x-3 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        if (contact.icon === Phone) {
                          window.location.href = 'tel:+918590310265'
                        } else if (contact.icon === Mail) {
                          window.location.href = 'mailto:info@justhearingclinic.com'
                        } else if (contact.icon === MapPin) {
                          window.open('https://www.google.com/maps/place/Just+Hearing+clinic/@9.557094,76.5709162,17z', '_blank', 'noopener,noreferrer')
                        }
                      }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300 flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300 text-sm sm:text-base">{contact.label}</p>
                        <p className="text-blue-200 text-sm sm:text-base break-words">{contact.value}</p>
                        <p className="text-blue-300 text-xs sm:text-sm break-words">{contact.subValue}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm py-4 sm:py-6 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-blue-200 text-sm sm:text-base text-center sm:text-left">
                © {currentYear} Just Hearing Clinic. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}