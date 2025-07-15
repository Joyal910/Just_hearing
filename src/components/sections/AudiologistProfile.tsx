import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function AudiologistProfile() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('audiologist-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="audiologist-section" className="py-6 sm:py-16 lg:py-20 bg-gray-50 mobile-section-spacing">
      <div className="container mx-auto px-2 sm:px-4">
        <div className={`text-center mb-6 sm:mb-16 transform transition-all duration-700 sm:duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-4 mobile-heading-scale">Meet Kottayam's Leading Hearing Care Expert</h2>
        </div>

        <div className={`max-w-2xl sm:max-w-4xl mx-auto transform transition-all duration-700 sm:duration-1000 sm:delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Card className="border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500 group">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 p-4 sm:p-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0 mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?_gl=1*uub3fv*_ga*NTAwNzc5MzMuMTc1MDAwODcyMA..*_ga_8JE65Q40S6*czE3NTE3MzE2NzYkbzMkZzEkdDE3NTE3MzE3MzQkajIkbDAkaDA."
                  alt="Remya Ravi - Chief Audiologist"
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 sm:gap-6 text-center md:text-left px-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 sm:mb-2 group-hover:text-cyan-600 transition-colors duration-300">Remya Ravi, M.ASLP</h3>
                  <p className="text-base sm:text-lg text-cyan-600 font-semibold group-hover:text-blue-600 transition-colors duration-300">Chief Audiologist & Speech-Language Pathologist | Co-founder</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1 text-base sm:text-lg">Qualifications & Experience</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base leading-relaxed space-y-1 text-left">
                      <li>Master's in Audiology & Speech Language Pathology - Sri Ramachandra Medical College, Chennai</li>
                      <li>15+ Years Clinical Experience</li>
                      <li>Consultant at SDM Medical College, Hubli</li>
                      <li>Expert in Diagnostics & Patient-Centered Care</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1 text-base sm:text-lg">Professional Approach</h4>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Remya brings deep expertise in diagnostics, speech and language disorders, audiology, and patient-centered care. Her approach blends clinical excellence with empathy, focusing on accessible and innovative solutions for individuals with hearing and communication challenges.
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <a href="/#booking">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 group w-full sm:w-auto touch-target mobile-button text-base sm:text-lg mt-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="group-hover:animate-pulse">Book Appointment with Dr Remya</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* Custom CSS for shadow effect */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}