import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductBookingModal } from '../ProductBookingModal';

// Updated products data - exactly 2 hearing aids, 1 battery, 1 ear tip
const featuredProducts = [
  {
    id: "ha1",
    name: "Signia Pure Charge&Go X",
    brand: "Signia",
    price: 2499.00,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 45,
    category: "Hearing Aids",
    type: "RIC",
    features: ["Rechargeable", "Bluetooth", "Tinnitus Relief", "Water Resistant"]
  },
  {
    id: "ha2",
    name: "Siemens Intuis 4 BTE",
    brand: "Siemens",
    price: 1899.00,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 32,
    category: "Hearing Aids",
    type: "BTE",
    features: ["Digital Processing", "Noise Reduction", "Feedback Management"]
  },
  {
    id: "bat1",
    name: "Hearing Aid Battery Size 312",
    brand: "Signia",
    price: 14.00,
    image: "https://i.ebayimg.com/images/g/ZwsAAOSwms5lHSkC/s-l1200.jpg",
    rating: 4.6,
    reviewCount: 78,
    category: "Accessories",
    subcategory: "Battery",
    size: "312 (Brown)",
    quantity: "8 pcs"
  },
  {
    id: "tip1",
    name: "BTE Ear Tip - Medium",
    brand: "Siemens",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 31,
    category: "Accessories",
    subcategory: "Ear Tip and Tube",
    size: "M",
    compatibility: "Compatible with BTE Hearing Aids",
    quantity: "1 Pair"
  }
];

export function ProductsSection() {
  const [visibleProducts, setVisibleProducts] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProducts(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const products = document.querySelectorAll('[data-product-card]');
    products.forEach(product => observer.observe(product));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="py-6 sm:py-16 lg:py-20 bg-gray-50 mobile-section-spacing">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-4 mobile-heading-scale">
            Premium Hearing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 animate-gradient-x">
              Solutions
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mobile-text-scale">
            Discover our carefully selected range of advanced hearing aids and accessories designed to enhance your daily life
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12 mobile-grid-1">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              id={`product-${index}`}
              data-product-card
              className={`group bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-500 hover:bg-gray-50 transform border border-gray-100 ${
                visibleProducts.has(`product-${index}`) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              } hover:scale-105 hover:-translate-y-2`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <span className="inline-block px-3 py-1 bg-[#182945]/10 text-[#182945] text-xs font-medium rounded-full">
                  {product.subcategory || product.category}
                </span>
                <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
              </div>
              
              <div className="aspect-square mb-3 sm:mb-4 overflow-hidden rounded-md bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-[#182945] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                {/* Product specific details */}
                <div className="text-sm text-gray-600 space-y-1">
                  {product.type && <div>Type: {product.type}</div>}
                  {product.size && <div>Size: {product.size}</div>}
                  {product.quantity && <div>Quantity: {product.quantity}</div>}
                  {product.compatibility && <div className="text-xs">{product.compatibility}</div>}
                </div>

                {/* Features for hearing aids */}
                {product.features && (
                  <div className="flex flex-wrap gap-1 mobile-gap-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors duration-200">
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors duration-200">
                        +{product.features.length - 2} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-colors duration-200 ${
                          i < Math.floor(product.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {product.rating} ({product.reviewCount} Reviews)
                  </span>
                </div>
                
                <div className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                  ${product.price.toFixed(2)}
                </div>
                
                <div className="flex gap-2 pt-1 sm:pt-2">
                  {product.category === "Hearing Aids" ? (
                    <button
                      className="flex-1 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1 group touch-target mobile-button"
                      onClick={() => { setSelectedProduct(product); setModalOpen(true); }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="group-hover:animate-pulse">Book Now</span>
                    </button>
                  ) : (
                    <button
                      className="flex-1 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1 group touch-target mobile-button"
                      onClick={() => { setSelectedProduct(product); setModalOpen(true); }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="group-hover:animate-pulse">Buy Now</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Products CTA */}
        <div className="text-center">
          
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mobile-flex-col mobile-gap-4">
              <Link to="/products">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group w-full sm:w-auto touch-target mobile-button">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View All Products
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 hover:border-cyan-500 text-gray-700 hover:text-cyan-600 font-semibold px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto touch-target mobile-button"
              >
                Get Expert Advice
              </Button>
            </div>
          
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
      {/* Product Booking Modal */}
      <ProductBookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={selectedProduct} />
    </section>
  );
}