import React, { useState, useEffect } from 'react';
import { Heart, Star, Award, Users, Shield, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutusimage from "../../assets/images/aboutusimage.jpeg"


const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ patients: 0, years: 0, brands: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) {
            animateCounters();
            setHasAnimated(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { patients: 100000, years: 17, brands: 10 }; // 1 lakh = 100,000
    const startTime = Date.now();
    
    const updateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCounters({
        patients: Math.floor(targets.patients * progress),
        years: Math.floor(targets.years * progress),
        brands: Math.floor(targets.brands * progress)
      });
      
      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };
    
    updateCounters();
  };

  // Format patients count to show as "1 Lakh"
  const formatPatientsCount = (count) => {
    if (count >= 100000) {
      return "1 Lakh+";
    } else if (count >= 10000) {
      const lakhs = (count / 100000).toFixed(1);
      return `${lakhs} Lakh`;
    } else if (count >= 1000) {
      return `${Math.floor(count / 1000)}K+`;
    }
    return count.toString();
  };

  return (
    <div id="about-section" className="py-6 sm:py-16 px-2 sm:px-6 lg:px-8 mobile-section-spacing">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 items-center mb-8 sm:mb-16 lg:mb-20">
          {/* Left Side - Image */}
          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 group">
              <img 
                src={aboutusimage}
                alt="Just Hearing Clinic team" 
                className="w-full h-40 xs:h-48 sm:h-auto object-cover group-hover:scale-105 transition-transform duration-500 mobile-image"
              />
              
            </div>
          </div>

          {/* Right Side - Content */}
          <div className={`space-y-5 sm:space-y-8 transform transition-all duration-700 sm:duration-1000 sm:delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div>
              <h2 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-6 mobile-heading-scale">
                Committed to Exceptional Hearing Care
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-2 sm:mb-6 mobile-text-scale">
                Founded in 2008 by Remya & Uday, experienced audiologists and speech-language pathologists, 
                Just Hearing began with a simple vision: making quality hearing care accessible and affordable for everyone.
              </p>
              <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mobile-text-scale">
                What started as a clinic has grown into a trusted Private Limited Company since 2014, 
                dedicated to giving people the dignity of being heard through compassionate, professional care.
              </p>
            </div>

            {/* Why Choose Us Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 mobile-grid-1">
              <div className={`space-y-4 transform transition-all duration-700 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-cyan-200 transition-all duration-300">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-900">Quality Assurance</h3>
                <p className="text-gray-600 text-xs sm:text-base mobile-text-scale">
                  Advanced hearing tests with accurate results and hearing aids of all brands & models.
                </p>
              </div>

              <div className={`space-y-4 transform transition-all duration-700 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-cyan-200 transition-all duration-300">
                  <Award className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-900">Certified Expertise</h3>
                <p className="text-gray-600 text-xs sm:text-base mobile-text-scale">
                  Certified audiologists with years of clinical and hospital practice experience.
                </p>
              </div>

              <div className={`space-y-4 transform transition-all duration-700 delay-900 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-cyan-200 transition-all duration-300">
                  <CreditCard className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-900">Affordable Care</h3>
                <p className="text-gray-600 text-xs sm:text-base mobile-text-scale">
                  Reliable & reachable hearing solutions with convenient EMI options available.
                </p>
              </div>

              <div className={`space-y-4 transform transition-all duration-700 delay-1100 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center hover:scale-110 hover:bg-cyan-200 transition-all duration-300">
                  <Heart className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-900">Personalized Service</h3>
                <p className="text-gray-600 text-xs sm:text-base mobile-text-scale">
                  Comprehensive care tailored to your individual hearing needs and lifestyle.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transform transition-all duration-700 sm:delay-1300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            } mobile-flex-col mobile-gap-4`}>
              <Link to="/about">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto touch-target mobile-button text-sm sm:text-base">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 mt-8 sm:mt-16 transform transition-all duration-700 sm:duration-1000 sm:delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } mobile-grid-1`}>
          <div className="text-center p-3 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform mobile-card-spacing">
            <div className="text-lg sm:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">{formatPatientsCount(counters.patients)}</div>
            <div className="text-gray-600 text-xs sm:text-base">Patients Served</div>
          </div>
          <div className="text-center p-3 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform mobile-card-spacing">
            <div className="text-lg sm:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">{counters.years}+</div>
            <div className="text-gray-600 text-xs sm:text-base">Years of Excellence</div>
          </div>
          <div className="text-center p-3 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform mobile-card-spacing">
            <div className="text-lg sm:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">{counters.brands}+</div>
            <div className="text-gray-600 text-xs sm:text-base">Brand Collaborations</div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUsSection;