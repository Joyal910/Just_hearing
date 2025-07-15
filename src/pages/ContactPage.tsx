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
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar, Award, AlertTriangle, CheckCircle, ArrowRight} from "lucide-react"

export function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "phone"
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  // Add state for mobile FAQ accordion
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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
    "url": "https://justhearingclinic.com/contact",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "Just Hearing Clinic",
      "telephone": "+91-8590310265",
      "email": "info@justhearingclinic.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Puthupally",
        "addressLocality": "Kottayam",
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create WhatsApp message template
    const whatsappMessage = `*Contact Form Submission - Just Hearing Clinic*

👤 *Contact Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

🏥 *Inquiry Details:*
Subject: ${formData.subject}
Preferred Contact: ${formData.preferredContact}

💬 *Message:*
${formData.message}

---
*Please respond to this inquiry at your earliest convenience.*

Thank you!`

    // WhatsApp number (replace with actual clinic number)
    const whatsappNumber = '918590310265'
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank')
    
    setIsSubmitting(false)
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
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+91-8590310265",
        "Emergency: +91-9876543211",
        "Toll Free: 1800-123-4567"
      ],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@justhearingclinic.com",
        "appointments@justhearingclinic.com",
        "support@justhearingclinic.com"
      ],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Saturday: 9:00 AM - 6:00 PM",
        "Sunday: 10:00 AM - 4:00 PM",
        "Emergency: 24/7 Available"
      ],
      action: "Book Appointment"
    }
  ]

  const quickActions = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule your free hearing assessment",
      action: "Schedule Now",
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Phone,
      title: "Emergency Call",
      description: "24/7 emergency hearing support",
      action: "Call Emergency",
      color: "bg-blue-600 hover:bg-blue-700"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Contact Us - Just Hearing Clinic | Book Appointment Kottayam, Kerala"
        description="Contact Just Hearing Clinic in Puthupally, Kottayam, Kerala. Book free hearing assessment, get directions, call +91-8590310265. Expert audiologists ready to help."
        keywords="contact just hearing clinic, book appointment Kottayam, hearing clinic address Kerala, audiologist contact Puthupally, hearing test booking Kottayam"
        canonicalUrl="https://justhearingclinic.com/contact"
        structuredData={contactPageStructuredData}
      />
      
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center overflow-hidden" data-animate id="hero">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Contact us background"
            className="w-full h-full object-cover"
          />
        </div>
         <div className="absolute inset-0 bg-black/50"></div>
        
      
        
        <div className="container mx-auto px-2 sm:px-4 pt-20 sm:pt-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
              Contact{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
                Us
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300">
              We're here to help with all your hearing care needs
            </p>
            
           
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-6 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-4 sm:mb-12 lg:mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white p-1.5 sm:p-4 lg:p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-3 lg:mb-4">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-[11px] sm:text-lg lg:text-xl font-bold mb-0.5 sm:mb-2 text-blue-900">{info.title}</h3>
                  <div className="space-y-0.5 sm:space-y-1 mb-1 sm:mb-4">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-[10px] sm:text-sm lg:text-base leading-tight">{detail}</p>
                    ))}
                  </div>
                  <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white text-[10px] sm:text-sm lg:text-base py-0.5 sm:py-2 min-h-0 h-6 sm:h-auto">
                    <span 
                      onClick={() => {
                        if (info.title === "Call Us") {
                          window.location.href = 'tel:+918590310265'
                        } else if (info.title === "Email Us") {
                          window.location.href = 'mailto:info@justhearingclinic.com'
                        } else if (info.title === "Visit Our Clinic") {
                          window.open('https://www.google.com/maps/place/Just+Hearing+clinic/@9.557094,76.5709162,17z', '_blank', 'noopener,noreferrer')
                        } else if (info.title === "Working Hours") {
                          window.location.href = 'tel:+918590310265'
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {info.action}
                    </span>
                  </Button>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-900 to-cyan-600 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Send className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Send Us a Message</h2>
                      <p className="text-white/90 text-xs sm:text-sm lg:text-base">We'll respond via WhatsApp</p>
                    </div>
                  </div>
                </div>

                {isSubmitSuccessful ? (
                  <motion.div 
                    className="p-6 sm:p-8 lg:p-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-100 text-green-600 rounded-full mb-3 sm:mb-4 lg:mb-6">
                      <CheckCircle size={24} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900">Message Sent Successfully!</h3>
                    <p className="text-gray-700 mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base">
                      Your message has been forwarded to WhatsApp. Our team will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitSuccessful(false)}
                      className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`text-xs sm:text-sm lg:text-base ${
                            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`text-xs sm:text-sm lg:text-base ${
                            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          placeholder="+91-XXXXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="text-xs sm:text-sm lg:text-base border-gray-200 hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          className={`w-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border-2 rounded-xl focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 outline-none transition-all duration-200 text-xs sm:text-sm lg:text-base ${
                            errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <option value="">Select a subject...</option>
                          <option value="appointment">Book Appointment</option>
                          <option value="consultation">General Consultation</option>
                          <option value="hearing-aids">Hearing Aid Inquiry</option>
                          <option value="pediatric">Pediatric Care</option>
                          <option value="tinnitus">Tinnitus Treatment</option>
                          <option value="emergency">Emergency</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4 sm:gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                            className="mr-1 sm:mr-2 text-cyan-600 focus:ring-cyan-600"
                          />
                          <span className="text-xs sm:text-sm lg:text-base">Phone</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                            className="mr-1 sm:mr-2 text-cyan-600 focus:ring-cyan-600"
                          />
                          <span className="text-xs sm:text-sm lg:text-base">Email</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your inquiry, symptoms, or any questions you have..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`text-xs sm:text-sm lg:text-base resize-none ${
                          errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3 sm:pt-4 lg:pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                            Send Message via WhatsApp
                          </>
                        )}
                      </Button>
                      
                      <p className="text-center text-[10px] sm:text-xs lg:text-sm text-gray-500 mt-2 sm:mt-3 lg:mt-4">
                        Your message will be forwarded to WhatsApp for quick response
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
            
            {/* Map and Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 text-blue-900 hidden xs:block">Visit Our Office</h2>
              <div className="rounded-lg overflow-hidden h-[120px] xs:h-[160px] sm:h-[250px] lg:h-[300px] mb-4 sm:mb-6 lg:mb-8 relative flex items-center justify-center bg-white">
                <div className="text-center w-full">
                  <div className="relative mb-1 sm:mb-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.4422176204394!2d76.5709162!3d9.557094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062f728bdb7a33%3A0xeefc0bd6dc46b019!2sJust%20Hearing%20clinic!5e0!3m2!1sen!2sin!4v1752321442792!5m2!1sen!2sin"
                      width="100%"
                      height="100"
                      className="sm:h-[180px] lg:h-[250px]"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <Button
                    className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] sm:text-sm lg:text-base px-2 sm:px-4"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/place/Just+Hearing+clinic/@9.557094,76.5709162,17z",
                        "_blank"
                      )
                    }
                  >
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* Directions */}
              <div className="grid grid-cols-1 gap-2 sm:gap-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-0.5 sm:mb-1">By Car</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Free parking available on-site</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-0.5 sm:mb-1">Public Transport</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Bus stop 2 minutes walk away</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-0.5 sm:mb-1">Accessibility</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Wheelchair accessible entrance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          {/* Mobile: FAQ as accordion, Desktop: grid */}
          <div className="block lg:hidden">
            {/* Mobile Accordion */}
            {[
              {
                q: "What are your consultation fees?",
                a: "Initial hearing assessment is completely free. Detailed consultation fees start from ₹500."
              },
              {
                q: "Do you accept insurance?",
                a: "Yes, we accept most major health insurance plans. Please bring your insurance card for verification."
              },
              {
                q: "How long does a hearing test take?",
                a: "A comprehensive hearing assessment typically takes 45-60 minutes including consultation."
              },
              {
                q: "Do you provide home visits?",
                a: "Yes, we offer home visits for elderly patients and those with mobility issues within Kottayam district."
              }
            ].map((faq, i) => (
              <div key={i} className="mb-2">
                <button
                  className="w-full text-left bg-white p-3 rounded-lg shadow-md font-semibold text-blue-900 flex justify-between items-center"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  aria-expanded={openFAQ === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span>{faq.q}</span>
                  <span className={`transform transition-transform duration-200 ${openFAQ === i ? 'rotate-90' : ''}`}>▶</span>
                </button>
                {openFAQ === i && (
                  <div id={`faq-panel-${i}`} className="bg-gray-50 p-3 text-gray-700 text-sm rounded-b-lg border-t">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Desktop grid FAQ (unchanged) */}
            <motion.div
              className="bg-white p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-blue-900">What are your consultation fees?</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Initial hearing assessment is completely free. Detailed consultation fees start from ₹500.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-blue-900">Do you accept insurance?</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Yes, we accept most major health insurance plans. Please bring your insurance card for verification.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-blue-900">How long does a hearing test take?</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                A comprehensive hearing assessment typically takes 45-60 minutes including consultation.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-blue-900">Do you provide home visits?</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Yes, we offer home visits for elderly patients and those with mobility issues within Kottayam district.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-10 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-0 sm:mr-4 mb-2 sm:mb-0">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">Ready to Improve Your Hearing?</h2>
          </div>
          <p className="text-base sm:text-xl text-blue-100 mb-4 sm:mb-8 max-w-2xl mx-auto">
            Schedule your free consultation today and take the first step towards better hearing
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="#booking">
              <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Schedule Free Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
            <a href="tel:+918590310265">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
      `}</style>
    </div>
  )
}
