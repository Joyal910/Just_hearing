import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Package, User, MapPin, Phone, Mail, ShoppingCart, CheckCircle, AlertTriangle } from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  type?: string
  features?: string[]
  subcategory?: string
  size?: string
  quantity?: string
  compatibility?: string
}

interface ProductBookingModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function ProductBookingModal({ isOpen, onClose, product }: ProductBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    quantity: "1",
    preferredDate: "",
    timeSlot: "",
    specialRequests: "",
    urgency: "Normal"
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required"
    if (!formData.timeSlot) newErrors.timeSlot = "Time slot is required"
    
    if (formData.phone && !/^[+]?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatWhatsAppMessage = (product: Product, formData: any) => {
    const totalPrice = product.price * parseInt(formData.quantity)
    const currentDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const message = `🛒 *NEW PRODUCT BOOKING*

📦 *PRODUCT DETAILS*
• Product: ${product.name}
• Brand: ${product.brand}
• Category: ${product.category}${product.type ? `\n• Type: ${product.type}` : ''}${product.size ? `\n• Size: ${product.size}` : ''}
• Unit Price: ₹${product.price.toFixed(2)}
• Quantity: ${formData.quantity}
• *Total: ₹${totalPrice.toFixed(2)}*

👤 *CUSTOMER DETAILS*
• Name: ${formData.fullName}
• Phone: ${formData.phone}${formData.email ? `\n• Email: ${formData.email}` : ''}

📍 *DELIVERY ADDRESS*
• Address: ${formData.address}
• City: ${formData.city}
• Pincode: ${formData.pincode}

📅 *PREFERRED SCHEDULE*
• Date: ${formData.preferredDate}
• Time: ${formData.timeSlot}
• Urgency: ${formData.urgency}${formData.specialRequests ? `\n\n💬 *SPECIAL REQUESTS*\n${formData.specialRequests}` : ''}

⏰ *Booked on:* ${currentDate}

---
Please confirm this booking and provide payment details.
Thank you! 🎧`

    return message
  }

  const openWhatsApp = (message: string) => {
    const phoneNumber = "918590310265" // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message)
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    // Try multiple methods to ensure it works
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // On mobile, try to open the WhatsApp app directly
      window.location.href = whatsappUrl
    } else {
      // On desktop, open in new tab
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      if (!newWindow) {
        // Fallback if popup is blocked
        window.location.href = whatsappUrl
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateForm() || !product) return

    setIsSubmitting(true)

    try {
      // Format the WhatsApp message
      const whatsappMessage = formatWhatsAppMessage(product, formData)
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Open WhatsApp
      openWhatsApp(whatsappMessage)
      
      setIsSuccess(true)
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          pincode: "",
          quantity: "1",
          preferredDate: "",
          timeSlot: "",
          specialRequests: "",
          urgency: "Normal"
        })
        onClose()
      }, 3000)
      
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an error processing your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendToWhatsAppAgain = () => {
    if (!product) return
    const message = formatWhatsAppMessage(product, formData)
    openWhatsApp(message)
  }

  const copyToClipboard = () => {
    if (!product) return
    const message = formatWhatsAppMessage(product, formData)
    navigator.clipboard.writeText(message).then(() => {
      alert('Message copied to clipboard! You can paste it in WhatsApp manually.')
    })
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          // Success State
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Booking Sent! 🎉</h3>
            <p className="text-gray-700 mb-6">
              Your booking request has been sent to WhatsApp. If WhatsApp didn't open automatically, please use the buttons below.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 text-sm">
                <strong>What's Next:</strong><br/>
                • You'll receive a WhatsApp confirmation<br/>
                • Our team will call you within 2 hours<br/>
                • We'll arrange delivery/pickup as per your preference
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={sendToWhatsAppAgain}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📱 Open WhatsApp Again
              </Button>
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                📋 Copy Message
              </Button>
            </div>
          </div>
        ) : (
          // Booking Form
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Book Product
              </DialogTitle>
              <DialogDescription>
                Complete your booking for this product. We'll contact you to confirm the details.
              </DialogDescription>
            </DialogHeader>

            {/* Product Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                  <p className="text-lg font-bold text-blue-600">₹{product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <Input
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address (Optional)
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Address Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Delivery Address *
                </label>
                <Textarea
                  placeholder="Enter your complete address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <Input
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <Input
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                    className={errors.pincode ? 'border-red-500' : ''}
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Package className="w-4 h-4 inline mr-1" />
                    Quantity
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num.toString()}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.urgency}
                    onChange={(e) => handleInputChange("urgency", e.target.value)}
                  >
                    <option value="Normal">Normal (3-5 days)</option>
                    <option value="Urgent">Urgent (1-2 days)</option>
                    <option value="Emergency">Emergency (Same day)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Preferred Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.preferredDate ? 'border-red-500' : ''}
                  />
                  {errors.preferredDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.preferredDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    className={`w-full p-3 border rounded-md ${errors.timeSlot ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.timeSlot}
                    onChange={(e) => handleInputChange("timeSlot", e.target.value)}
                  >
                    <option value="">Select time slot...</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <Textarea
                  placeholder="Any special instructions or requests..."
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                />
              </div>

              {/* Total Price Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{(product.price * parseInt(formData.quantity)).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.quantity} × ₹{product.price.toFixed(2)} each
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending to WhatsApp...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Send to WhatsApp
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By booking this product, you agree to our terms and conditions. 
                We'll contact you via WhatsApp to confirm payment and delivery details.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Demo component to test the modal
export default function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const sampleProduct = {
    id: "1",
    name: "Premium Hearing Aid",
    brand: "AudioTech",
    price: 29999,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=center",
    category: "Hearing Aids",
    type: "Digital",
    size: "Medium"
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">WhatsApp Booking Demo</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">How it works:</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Fill out the booking form with your details</li>
            <li>• Click "Send to WhatsApp" to open WhatsApp with pre-filled message</li>
            <li>• If WhatsApp doesn't open automatically, use the manual options</li>
            <li>• Your booking details will be sent to Just Hearing Clinic</li>
          </ul>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <img 
            src={sampleProduct.image} 
            alt={sampleProduct.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-xl font-semibold">{sampleProduct.name}</h3>
            <p className="text-gray-600">{sampleProduct.brand} • {sampleProduct.category}</p>
            <p className="text-2xl font-bold text-blue-600">₹{sampleProduct.price.toFixed(2)}</p>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Book This Product
        </Button>
      </div>
      
      <ProductBookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={sampleProduct}
      />
    </div>
  )
}