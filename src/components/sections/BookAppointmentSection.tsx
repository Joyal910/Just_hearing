import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"

export default function BookAppointmentSection() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "", 
    concerns: "",
    preferredDate: "",
    urgency: ""
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('booking')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const services = [
    "Free Hearing Assessment",
    "Hearing Aid Consultation",
    "Pediatric Hearing Test",
    "Tinnitus Evaluation",
    "Hearing Aid Repair",
    "Follow-up Appointment"
  ]

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.fullName || !formData.phone || !selectedService || !formData.preferredDate || !selectedTime) {
      alert("Please fill in all required fields")
      return
    }

    // Create WhatsApp message
    const message = `*New Appointment Request*

*Patient Details:*
Name: ${formData.fullName}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.age ? `Age: ${formData.age}` : ''}
${formData.urgency ? `Urgency: ${formData.urgency}` : ''}

*Service Required:*
${selectedService}

*Preferred Schedule:*
Date: ${formData.preferredDate}
Time: ${selectedTime}

${formData.concerns ? `*Additional Information:*
${formData.concerns}` : ''}

*Submitted at:* ${new Date().toLocaleString()}`

    // WhatsApp URL
    const whatsappNumber = "919741621014"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank')
  }

  return (
    <section id="booking" className="py-6 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className={`text-center mb-6 sm:mb-12 transform transition-all duration-700 sm:duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-4">
            Book Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-cyan-600 animate-gradient-x">
              FREE Consultation
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step towards better hearing. Schedule your comprehensive hearing assessment.
          </p>
        </div>

        {/* Appointment Form */}
        <div className={`max-w-3xl mx-auto transform transition-all duration-700 sm:duration-1000 sm:delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Card className="border-0 shadow-2xl bg-white hover:shadow-3xl transition-shadow duration-500">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-cyan-600 text-white rounded-t-lg hover:from-blue-800 hover:to-cyan-500 transition-all duration-300 p-3 sm:p-6">
              <CardTitle className="text-base sm:text-2xl flex items-center gap-2">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                Schedule Your Appointment
              </CardTitle>
              <CardDescription className="text-blue-100 text-xs sm:text-base">
                Fill out the form below and we'll contact you to confirm your appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <Input
                      placeholder="+91-XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Age</label>
                    <Input
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Service and Urgency */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Select Service *</label>
                    <select
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-md transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Urgency Level (Optional)</label>
                    <select
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-md transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                      value={formData.urgency}
                      onChange={(e) => handleInputChange("urgency", e.target.value)}
                    >
                      <option value="">Select urgency...</option>
                      <option value="Routine Check-up">Routine Check-up</option>
                      <option value="Urgent (Within 24 hours)">Urgent (Within 24 hours)</option>
                      <option value="Emergency (Same day)">Emergency (Same day)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Schedule */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                    <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                    <select
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-md transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    >
                      <option value="">Select time slot...</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <Textarea
                    placeholder="Let us know any specific concerns or requests"
                    value={formData.concerns}
                    onChange={(e) => handleInputChange("concerns", e.target.value)}
                    className="transition-all duration-300 hover:border-cyan-400 focus:border-cyan-500 text-sm sm:text-base"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg py-2 sm:py-3 mt-1 sm:mt-2 text-sm sm:text-base shadow-lg"
                  onClick={handleSubmit}
                >
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  )
}