import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Stethoscope, Ear, Heart } from "lucide-react"
import { Link } from "react-router-dom"

const serviceCategories = [
  {
    id: 'diagnostic',
    title: "Diagnostic Tests",
    description: "Comprehensive hearing assessments and evaluations",
    icon: Stethoscope,
    image: "https://images.pexels.com/photos/5214420/pexels-photo-5214420.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: [
      "Pure Tone Audiometry (PTA)",
      "Speech Audiometry", 
      "Impedance Audiometry",
      "Otoacoustic Emissions Test (OAE)",
      "Special Tests (TDT, SISI, ABLB)"
    ],
    features: [
      "Comprehensive hearing threshold testing",
      "Advanced diagnostic equipment",
      "Detailed audiogram analysis",
      "Professional assessment reports"
    ]
  },
  {
    id: 'hearing-aids',
    title: "Hearing Aid Services", 
    description: "Complete hearing aid solutions and support",
    icon: Ear,
    image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: [
      "Hearing Aids Prescription & Fitting",
      "Hearing Aids Trial",
      "Hearing Aids Programming", 
      "Hearing Aids Accessories",
      "Hearing Aids Repair & Servicing"
    ],
    features: [
      "Latest 2025 hearing aid technology",
      "Custom fitting and programming",
      "30-day trial period",
      "Professional ongoing support"
    ]
  },
  {
    id: 'therapy',
    title: "Therapy Services",
    description: "Specialized rehabilitation and therapy programs", 
    icon: Heart,
    image: "https://images.pexels.com/photos/6303655/pexels-photo-6303655.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: [
      "Speech & Language Therapy",
      "Voice Therapy",
      "Stuttering Therapy",
      "Swallowing Therapy", 
      "Auditory Verbal Therapy"
    ],
    features: [
      "Individualized treatment plans",
      "Expert speech-language pathologists",
      "Family-centered approach",
      "Evidence-based therapy techniques"
    ]
  }
]

export function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('[data-service-card]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-6 sm:py-16 lg:py-20 bg-white mobile-section-spacing">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-16">
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-4 mobile-heading-scale">
            Complete Hearing Care{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 animate-gradient-x">
              Under One Roof
            </span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mobile-text-scale">
            From comprehensive diagnostics to advanced hearing solutions, we provide everything you need for optimal hearing health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 mb-6 sm:mb-12 mobile-grid-1 px-2 sm:px-0">
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon
            
            return (
              <Card
                key={category.id}
                id={`service-card-${index}`}
                data-service-card
                className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 group transform ${
                  visibleCards.has(`service-card-${index}`) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-6 opacity-0'
                } hover:scale-105 hover:-translate-y-1`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Service Image */}
                <div className="relative h-32 sm:h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-base sm:text-xl text-blue-900 group-hover:text-cyan-600 transition-colors">
                    {category.title}
                  </CardTitle>
                  <p className="text-gray-600 text-xs sm:text-base mobile-text-scale">{category.description}</p>
                </CardHeader>

                <CardContent className="space-y-2 sm:space-y-4 p-3 sm:p-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Key Features:</h4>
                    <ul className="space-y-1">
                      {category.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="mobile-text-scale">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Button */}
                  <a href="#booking" className="block">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-300 hover:scale-105 group touch-target mobile-button text-sm sm:text-base">
                      Book This Service
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="bg-gray-50 shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-4 sm:p-8">
              <h3 className="text-base sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4 mobile-heading-scale">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-base mobile-text-scale">
                Our experienced audiologists will help you determine the best approach for your specific hearing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mobile-flex-col mobile-gap-4">
                <a href="#booking">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-8 py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto touch-target mobile-button text-sm sm:text-base">
                    Book Free Consultation
                  </Button>
                </a>
                <Link to="/services">
                  <Button variant="outline" className="border-2 border-gray-300 hover:border-cyan-500 text-gray-700 hover:text-cyan-600 px-4 sm:px-8 py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto touch-target mobile-button text-sm sm:text-base">
                    View All Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Custom CSS for gradient animation */}
      <style jsx>{`
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
  );
}