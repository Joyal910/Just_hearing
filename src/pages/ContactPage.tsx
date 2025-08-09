import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SEOHead } from "@/components/seo/SEOHead"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar, Award, AlertTriangle, CheckCircle, ArrowRight, Shield, Lock, Users, Star, HeadphonesIcon, Stethoscope, Building2, Globe } from "lucide-react"
import banner from "../assets/banner/about us.jpg"


export function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "phone"
  })
  const [errors, setErrors] = useState({})
  const [openFAQ, setOpenFAQ] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Just Hearing Clinic",
    "description": "Contact Just Hearing Clinic in Kottayam, Kerala. Book appointments, get directions, and reach our expert audiologists for hearing care services.",
    "url": "https://justhearing.in/contact",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Just Hearing Clinic",
      "telephone": "+91-8590310265",
      "email": "info@justhearing.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Puthupally",
        "addressLocality": "Kottayam",
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      }
    }
  }

  // Enhanced form validation with security checks
  const validateForm = () => {
    const newErrors = {}
    
    // Name validation with security checks
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters"
    } else if (!/^[a-zA-Z\s.-]+$/.test(formData.name.trim())) {
      newErrors.name = "Name contains invalid characters"
    }
    
    // Email validation with enhanced security
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    } else if (formData.email.trim().length > 254) {
      newErrors.email = "Email address is too long"
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (formData.phone.trim() && !/^[\+]?[\d\s\-\(\)]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = "Subject must be less than 200 characters"
    }
    
    // Message validation with security checks
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = "Message must be less than 5000 characters"
    }
    
    // Check for potential spam patterns
    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/gi, // URLs (basic check)
      /\b(?:viagra|casino|lottery|winner|congratulations|urgent|act now)\b/gi,
      /(.)\1{10,}/g, // Repeated characters
    ]
    
    const allText = `${formData.name} ${formData.email} ${formData.subject} ${formData.message}`.toLowerCase()
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allText)) {
        newErrors.spam = "Message appears to contain spam content"
        break
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Sanitize input to prevent XSS while preserving spaces and normal text
  const sanitizeInput = (input) => {
    return input
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
      // Note: We preserve quotes, apostrophes, and spaces for normal text input
  }

  const handleInputChange = (field, value) => {
    // Apply sanitization only for security-critical fields, preserve spaces and normal punctuation
    let sanitizedValue = value
    
    // Only sanitize against actual security threats, not normal text
    if (field === 'name' || field === 'message') {
      sanitizedValue = sanitizeInput(value) // This now preserves spaces
    } else {
      sanitizedValue = sanitizeInput(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError("")
    }
  }

  // Generate CSRF-like token (simple timestamp-based for client-side)
  const generateFormToken = () => {
    return btoa(`${Date.now()}-${Math.random()}`).slice(0, 16)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")
    
    try {
      // Prepare form data for Formspree
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('name', formData.name.trim())
      formDataToSend.append('email', formData.email.trim())
      formDataToSend.append('phone', formData.phone.trim())
      formDataToSend.append('subject', formData.subject.trim())
      formDataToSend.append('message', formData.message.trim())
      formDataToSend.append('preferredContact', formData.preferredContact)
      
      // Add metadata for security and tracking
      formDataToSend.append('_subject', `New Contact Form Submission - ${formData.subject}`)
      formDataToSend.append('_replyto', formData.email.trim())
      formDataToSend.append('_next', window.location.href) // Redirect back to same page
      formDataToSend.append('_captcha', 'false') // Disable default captcha (Formspree will handle spam)
      
      // Add timestamp and user agent for additional security context
      formDataToSend.append('_timestamp', new Date().toISOString())
      formDataToSend.append('_source', 'justhearing.in')
      formDataToSend.append('_token', generateFormToken())

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xdkdpzor', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setIsSubmitSuccessful(true)
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          preferredContact: "phone"
        })
        
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(
        error.message.includes('network') || error.message.includes('fetch')
          ? 'Network error. Please check your connection and try again.'
          : 'Failed to submit form. Please try again or contact us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Clinic",
      details: [
        "Just Hearing Clinic",
        "Puthupally, Kottayam",
        "Kerala, India - 686011"
      ],
      action: "Get Directions",
      color: "#01194a"
    },
    {
      icon: Phone,
      title: "Call / WhatsApp Us",
      details: [
        "+91-8590310265",
      ],
      action: "Call Now",
      color: "#01194a"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@justhearing.in",
      ],
      action: "Send Email",
      color: "#01194a"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Saturday: 9:00 AM - 5:00 PM",
        
      ],
      action: "Book Appointment",
      color: "#01194a"
    }
  ]

  
  

  

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      <SEOHead 
        title="Contact Us - Just Hearing Clinic | Book Appointment Kottayam, Kerala"
        description="Contact Just Hearing Clinic in Puthupally, Kottayam, Kerala. Book free hearing assessment, get directions, call +91-8590310265. Expert audiologists ready to help."
        keywords="contact just hearing clinic, book appointment Kottayam, hearing clinic address Kerala, audiologist contact Puthupally, hearing test booking Kottayam"
        canonicalUrl="https://justhearing.in/contact"
        structuredData={contactPageStructuredData}
      />
      
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-[35vh] md:min-h-[50vh] flex items-center overflow-hidden" data-animate id="hero">
        <div className="absolute inset-0">
          <img 
            src={banner}
            alt="Contact us background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 pt-16 sm:pt-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up leading-tight">
              Contact{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
                Us
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300 px-4">
              We're here to help with all your hearing care needs
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Actions - Mobile First */}
      <section className="py-8 sm:py-12" style={{ backgroundColor: "#f4f4f4" }}>
        <div className="container mx-auto px-4">
          
          

          {/* Contact Information Cards - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#01194a' }}>
              Multiple Ways to Reach Us
            </h2>
            <p className="text-base sm:text-lg px-4" style={{ color: '#2B2B2B' }}>
              Choose the most convenient way to get in touch
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div 
                    className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <IconComponent className="w-6 sm:w-8 h-6 sm:h-8" style={{ color: info.color }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-center" style={{ color: '#01194a' }}>
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-4 sm:mb-6 text-center">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-xs sm:text-sm leading-relaxed" style={{ color: '#2B2B2B' }}>
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button 
                    className="w-full font-semibold rounded-lg transition-all duration-300 text-white text-sm sm:text-base py-2 sm:py-3"
                    style={{ backgroundColor: info.color }}
                    onClick={() => {
                      if (info.title === "Call / WhatsApp Us") {
                        window.location.href = 'tel:+918590310265'
                      } else if (info.title === "Email Us") {
                        window.location.href = 'mailto:info@justhearing.in'
                      } else if (info.title === "Visit Our Clinic") {
                        window.open('https://www.google.com/maps/place/Just+Hearing+clinic/@9.557094,76.5697406,536m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b062f728bdb7a33:0xeefc0bd6dc46b019!8m2!3d9.557094!4d76.5709162!16s%2Fg%2F11k3vk2vyq?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D', '_blank', 'noopener,noreferrer')
                      } else if (info.title === "Working Hours") {
                        window.location.href = 'tel:+918590310265'
                      }
                    }}
                  >
                    {info.action}
                  </Button>
                </motion.div>
              )
            })}
          </div>

          {/* Main Content - Mobile First Layout */}
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Contact Form - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div 
                  className="px-4 sm:px-8 py-4 sm:py-6"
                  style={{ backgroundColor: '#01194a' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Send className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Send Us a Message</h2>
                      <p className="text-sm sm:text-base text-blue-100">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {isSubmitSuccessful ? (
                  <motion.div 
                    className="p-6 sm:p-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full mb-4 sm:mb-6"
                      style={{ backgroundColor: '#6EC5E920' }}
                    >
                      <CheckCircle size={24} className="sm:w-8 sm:h-8" style={{ color: '#6EC5E9' }} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#01194a' }}>
                      Message Sent Successfully!
                    </h3>
                    <p className="mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: '#2B2B2B' }}>
                      Your message has been securely delivered to our team. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitSuccessful(false)}
                      className="px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold rounded-xl transition-all duration-300"
                      style={{ backgroundColor: '#6EC5E9' }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-4 sm:p-8">
                    {/* Error Display */}
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-red-800 text-sm">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      </div>
                    )}

                    {/* Spam Detection Warning */}
                    {errors.spam && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-yellow-800 text-sm">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>{errors.spam}</span>
                        </div>
                      </div>
                    )}

                    {/* Mobile: Single column layout, Desktop: Two column */}
                    <div className="space-y-4 sm:space-y-6 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#01194a' }}>
                            Full Name <span style={{ color: '#ff0125' }}>*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={`border-2 rounded-lg h-12 text-base ${
                              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                            }`}
                            maxLength={100}
                            autoComplete="name"
                            required
                          />
                          {errors.name && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              <span>{errors.name}</span>
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#01194a' }}>
                            Email Address <span style={{ color: '#ff0125' }}>*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`border-2 rounded-lg h-12 text-base ${
                              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                            }`}
                            maxLength={254}
                            autoComplete="email"
                            required
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#01194a' }}>
                            Phone Number <span className="text-gray-400">(Optional)</span>
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91-XXXXXXXXXX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className={`border-2 rounded-lg h-12 text-base ${
                              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                            }`}
                            autoComplete="tel"
                          />
                          {errors.phone && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: '#01194a' }}>
                            Subject <span style={{ color: '#ff0125' }}>*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            className={`w-full px-4 py-3 h-12 text-base border-2 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 ${
                              errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            required
                          >
                            <option value="">Select a subject...</option>
                            <option value="Appointment Booking">Appointment Booking</option>
                            <option value="Hearing Test Inquiry">Hearing Test Inquiry</option>
                            <option value="Hearing Aid Consultation">Hearing Aid Consultation</option>
                            <option value="General Question">General Question</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.subject && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              <span>{errors.subject}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#01194a' }}>
                          Preferred Contact Method
                        </label>
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="phone"
                              checked={formData.preferredContact === "phone"}
                              onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                              className="mr-2 text-blue-600 focus:ring-blue-600"
                            />
                            <span>Phone</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContact"
                              value="email"
                              checked={formData.preferredContact === "email"}
                              onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                              className="mr-2 text-blue-600 focus:ring-blue-600"
                            />
                            <span>Email</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#01194a' }}>
                          Message <span style={{ color: '#ff0125' }}>*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your inquiry, symptoms, or any questions you have..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className={`border-2 rounded-lg resize-none text-base ${
                            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                          }`}
                          maxLength={5000}
                          required
                        />
                        <div className="flex justify-between items-center mt-1">
                          {errors.message ? (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              <span>{errors.message}</span>
                            </p>
                          ) : (
                            <span></span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formData.message.length}/5000
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 sm:py-4 px-6 sm:px-8 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-base sm:text-lg"
                        style={{ backgroundColor: '#ff0125' }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
            
            {/* Map and Office Info - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#01194a' }}>
                    Visit Our Office
                  </h2>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.4422176204394!2d76.5709162!3d9.557094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062f728bdb7a33%3A0xeefc0bd6dc46b019!2sJust%20Hearing%20clinic!5e0!3m2!1sen!2sin!4v1752321442792!5m2!1sen!2sin"
                      width="100%"
                      height="250"
                      className="sm:h-[300px]"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button
                      className="text-white font-semibold rounded-lg transition-all duration-300 px-6 py-3"
                      style={{ backgroundColor: '#6EC5E9' }}
                      onClick={() =>
                        window.open(
                          "https://www.google.com/maps/place/Just+Hearing+clinic/@9.557094,76.5697406,536m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b062f728bdb7a33:0xeefc0bd6dc46b019!8m2!3d9.557094!4d76.5709162!16s%2Fg%2F11k3vk2vyq?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D",
                          "_blank"
                        )
                      }
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>

                {/* Office Features - Mobile Cards */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div 
                          className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#01194a20' }}
                        >
                          <Building2 className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: '#01194a' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#01194a' }}>
                            By Car
                          </h3>
                          <p className="text-xs sm:text-sm" style={{ color: '#2B2B2B' }}>
                            Free parking available on-site
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div 
                          className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#6EC5E920' }}
                        >
                          <Users className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: '#6EC5E9' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#01194a' }}>
                            Public Transport
                          </h3>
                          <p className="text-xs sm:text-sm" style={{ color: '#2B2B2B' }}>
                            Bus stop 2 minutes walk away
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div 
                          className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#ff012520' }}
                        >
                          <Shield className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: '#ff0125' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#01194a' }}>
                            Accessibility
                          </h3>
                          <p className="text-xs sm:text-sm" style={{ color: '#2B2B2B' }}>
                            Wheelchair accessible entrance
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                
                
              </div>
            </motion.div>
          </div>

          

          

          
        </div>
      </section>

      <Footer />
      <FloatingActionButtons />
    </div>
  )
}
export default ContactPage