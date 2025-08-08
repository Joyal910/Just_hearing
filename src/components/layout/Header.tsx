import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Phone, Award, Clock, MapPin, Menu, X, Ear, Instagram, Youtube } from "lucide-react"
import logo from "../../assets/faivon/logo.png"

interface HeaderProps {
  isScrolled: boolean
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export function Header({ isScrolled, isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const location = useLocation()

  return (
    <>
      {/* Utility Bar */}
      <div className="text-white py-2 text-xs sm:text-sm" style={{ backgroundColor: '#01174a' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="hidden sm:inline">Puthupally, Kottayam, Kerala</span>
              <span className="sm:hidden">Kottayam, Kerala</span>
            </div>

            {/* Working Hours, Phone & Social Media */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>+91-8590310265</span>
              </div>
              {/* Social Media Icons */}
              <div className="flex items-center space-x-3">
                <a 
                  href="https://www.instagram.com/justhearing.info?igsh=ZTlmY256MHhzNmNt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.youtube.com/@justhearing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Mobile & Tablet - Phone and Social Icons */}
            <div className="lg:hidden flex items-center space-x-3">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span className="text-xs sm:text-sm">+91-8590310265</span>
              </div>
              {/* Mobile Social Media Icons */}
              <div className="flex items-center space-x-2">
                <a 
                  href="https://www.instagram.com/your_instagram_profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.youtube.com/your_youtube_channel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-white transition-colors"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header - Pill Shaped Floating & Sticky */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'top-2 sm:top-4' : 'top-10 sm:top-14'
      }`}>
        <div className="container mx-auto px-2 sm:px-4">
          <div className={`flex items-center justify-between transition-all duration-300 rounded-full px-3 sm:px-6 py-2 sm:py-3 mx-2 sm:mx-4 ${
            isScrolled 
              ? "bg-white/95 backdrop-blur-md shadow-xl border border-white/20 transform scale-95" 
              : "bg-white/90 backdrop-blur-sm shadow-lg border border-white/10"
          }`}>
           <Link to="/" className="flex items-center">
  <div className="p-2 sm:p-3 rounded-lg">
    <img 
      src={logo} 
      alt="Just Hearing Logo" 
      className="h-6 sm:h-8 scale-150 sm:scale-[1.75] origin-left object-contain" 
    />
  </div>
</Link>



            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8">
              <Link 
                to="/about" 
                className={`font-medium transition-colors ${
                  location.pathname === '/about' 
                    ? 'text-cyan-600' 
                    : 'text-blue-900 hover:text-cyan-600'
                }`}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`font-medium transition-colors ${
                  location.pathname === '/services' 
                    ? 'text-cyan-600' 
                    : 'text-blue-900 hover:text-cyan-600'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/products" 
                className={`font-medium transition-colors ${
                  location.pathname === '/products' 
                    ? 'text-cyan-600' 
                    : 'text-blue-900 hover:text-cyan-600'
                }`}
              >
                Products
              </Link>
              <Link 
                to="/gallery" 
                className={`font-medium transition-colors ${
                  location.pathname === '/gallery' 
                    ? 'text-cyan-600' 
                    : 'text-blue-900 hover:text-cyan-600'
                }`}
              >
                Gallery
              </Link>
              <Link 
                to="/patient-stories" 
                className={`font-medium transition-colors ${
                  location.pathname === '/patient-stories' 
                    ? 'text-cyan-600' 
                    : 'text-blue-900 hover:text-cyan-600'
                }`}
              >
                Patient Stories
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors ${
                  location.pathname === '/contact' 
                    ? 'text-cyan-600' 
                    : 'text-blue-900 hover:text-cyan-600'
                }`}
              >
                Contact
              </Link>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 lg:px-6 py-2 text-sm lg:text-base rounded-full">
                <Link to="/?scroll=booking">Free Appointment</Link>     
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="xl:hidden p-2 touch-target" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="xl:hidden mt-2 sm:mt-4 mx-2 sm:mx-4">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 px-6 py-4">
                {/* Mobile Utility Info */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-cyan-600" />
                      <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-cyan-600" />
                      <span>Puthupally, Kottayam</span>
                    </div>
                    {/* Mobile Menu Social Icons */}
                    <div className="flex items-center space-x-4 pt-2">
                      <span className="text-xs text-gray-500">Follow us:</span>
                      <div className="flex space-x-3">
                        <a 
                          href="https://www.instagram.com/your_instagram_profile" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-600 hover:text-cyan-700 transition-colors"
                          aria-label="Follow us on Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a 
                          href="https://www.youtube.com/your_youtube_channel" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-600 hover:text-cyan-700 transition-colors"
                          aria-label="Subscribe to our YouTube channel"
                        >
                          <Youtube className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col space-y-3 sm:space-y-4">
                  <Link 
                    to="/about" 
                    className={`font-medium ${
                      location.pathname === '/about' 
                        ? 'text-cyan-600' 
                        : 'text-blue-900 hover:text-cyan-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/services" 
                    className={`font-medium ${
                      location.pathname === '/services' 
                        ? 'text-cyan-600' 
                        : 'text-blue-900 hover:text-cyan-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link 
                    to="/products" 
                    className={`font-medium ${
                      location.pathname === '/products' 
                        ? 'text-cyan-600' 
                        : 'text-blue-900 hover:text-cyan-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    to="/gallery" 
                    className={`font-medium ${
                      location.pathname === '/gallery' 
                        ? 'text-cyan-600' 
                        : 'text-blue-900 hover:text-cyan-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link 
                    to="/patient-stories" 
                    className={`font-medium ${
                      location.pathname === '/patient-stories' 
                        ? 'text-cyan-600' 
                        : 'text-blue-900 hover:text-cyan-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Patient Stories
                  </Link>
                  <Link 
                    to="/contact" 
                    className={`font-medium ${
                      location.pathname === '/contact' 
                        ? 'text-cyan-600' 
                        : 'text-blue-900 hover:text-cyan-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full rounded-full py-3 text-base touch-target">
                    <Link to="/?scroll=booking">Free Appointment</Link> 
                  </Button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}