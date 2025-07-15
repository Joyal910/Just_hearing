import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 sm:gap-3 z-50 animate-fade-in-up mobile-floating">
      <a href="tel:+918590310265">
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group touch-target">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-pulse" />
        </Button>
      </a>
      <a href="https://wa.me/918590310265" target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-2xl rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group touch-target">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
        </Button>
      </a>
      
      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
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
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 2s both;
        }
      `}</style>
    </div>
  )
}