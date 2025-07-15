import { useState, useEffect } from "react"
import React, { useCallback } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons"
import { Button } from "@/components/ui/button"
import { ProductBookingModal } from "@/components/ProductBookingModal"
import { Star, Search, ChevronLeft, ChevronRight, Calendar, ShoppingCart, ArrowRight, Phone, Filter, X, ChevronDown, ChevronUp } from "lucide-react"

// SearchBar component with proper typing and memoization
interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: () => void
}

const SearchBar = React.memo<SearchBarProps>(({ searchQuery, setSearchQuery, handleSearch }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg bg-white"
    />
  </div>
), (prevProps, nextProps) => {
  return prevProps.searchQuery === nextProps.searchQuery
})

SearchBar.displayName = 'SearchBar'

export function ProductsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hearing Aid Products
  const hearingAidProducts = [
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
      id: "ha3",
      name: "Signia Silk X CIC",
      brand: "Signia",
      price: 3299.00,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 28,
      category: "Hearing Aids",
      type: "CIC",
      features: ["Invisible Fit", "Instant Fit", "Bluetooth", "Own Voice Processing"]
    },
    {
      id: "ha4",
      name: "Siemens Motion 13P ITE",
      brand: "Siemens",
      price: 2099.00,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 38,
      category: "Hearing Aids",
      type: "ITE",
      features: ["Custom Fit", "Telecoil", "Volume Control", "Battery Door"]
    }
  ]

  // Accessories Products
  const accessoriesProducts = [
    // Batteries
    {
      id: "bat1",
      name: "Hearing Aid Battery Size 10",
      brand: "Signia",
      price: 12.50,
      image: "https://5.imimg.com/data5/SELLER/Default/2021/4/LG/AA/LO/11129334/siemens-signia-10-hearing-aid-batteries.jpg",
      rating: 4.5,
      reviewCount: 89,
      category: "Accessories",
      subcategory: "Battery",
      size: "10 (Yellow)",
      quantity: "6 pcs"
    },
    {
      id: "bat2",
      name: "Hearing Aid Battery Size 13",
      brand: "Siemens",
      price: 13.00,
      image: "https://cdn11.bigcommerce.com/s-pem0vhg/images/stencil/1280x1280/products/91/2035/HEARING-SAVERS-Siemens-Signia-hearing-aid-batteries-size-13-clean__47908.1660090362.jpg?c=2?imbypass=on",
      rating: 4.4,
      reviewCount: 67,
      category: "Accessories",
      subcategory: "Battery",
      size: "13 (Orange)",
      quantity: "6 pcs"
    },
    {
      id: "bat3",
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
      id: "bat4",
      name: "Hearing Aid Battery Size 675",
      brand: "Siemens",
      price: 15.50,
      image: "https://medineeds.in/cdn/shop/products/675-1_e1058e63-ff77-4d5c-8a96-0c26573da240.jpg?v=1676011389",
      rating: 4.7,
      reviewCount: 56,
      category: "Accessories",
      subcategory: "Battery",
      size: "675 (Blue)",
      quantity: "6 pcs"
    },
    // Ear Tips and Tubes
    {
      id: "tip1",
      name: "BTE Ear Tip - Small",
      brand: "Signia",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 23,
      category: "Accessories",
      subcategory: "Ear Tip and Tube",
      size: "S",
      compatibility: "Compatible with BTE Hearing Aids",
      quantity: "1 Pair"
    },
    {
      id: "tip2",
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
    },
    {
      id: "tip3",
      name: "BTE Ear Tip - Large",
      brand: "Signia",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 18,
      category: "Accessories",
      subcategory: "Ear Tip and Tube",
      size: "L",
      compatibility: "Compatible with BTE Hearing Aids",
      quantity: "1 Pair"
    },
    // Waxguard/Filter System
    {
      id: "wax1",
      name: "WG 3.0 NanoCare Filter",
      brand: "Signia",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 42,
      category: "Accessories",
      subcategory: "Waxguard / Filter System",
      productCode: "WG 3.0",
      quantity: "8 filters",
      compatibility: "Universal compatibility"
    },
    // Click Sleeves
    {
      id: "sleeve1",
      name: "Click Sleeve - Vented Small",
      brand: "Siemens",
      price: 22.00,
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 15,
      category: "Accessories",
      subcategory: "Click Sleeves",
      size: "S",
      type: "Vented",
      quantity: "6 pcs/blister"
    },
    {
      id: "sleeve2",
      name: "Click Sleeve - Closed Medium",
      brand: "Signia",
      price: 22.00,
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 19,
      category: "Accessories",
      subcategory: "Click Sleeves",
      size: "M",
      type: "Closed",
      quantity: "6 pcs/blister"
    },
    // Click Domes
    {
      id: "dome1",
      name: "Click Dome - Open 8mm",
      brand: "Signia",
      price: 20.00,
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 24,
      category: "Accessories",
      subcategory: "Click Domes",
      size: "8mm",
      type: "Open",
      quantity: "6 pcs/blister"
    },
    {
      id: "dome2",
      name: "Click Dome - Closed 10mm",
      brand: "Siemens",
      price: 20.00,
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 18,
      category: "Accessories",
      subcategory: "Click Domes",
      size: "10mm",
      type: "Closed",
      quantity: "6 pcs/blister"
    },
    // Custom Moulds
    {
      id: "mold1",
      name: "Custom Ear Mould",
      brand: "Clinic Custom",
      price: 0, // Price upon consultation
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 35,
      category: "Accessories",
      subcategory: "Custom Moulds",
      isCustom: true,
      description: "Custom made from ear impression"
    }
  ]
  // Combine all products
  const allProducts = [...hearingAidProducts, ...accessoriesProducts]

  // Main categories and subcategories for hearing aid clinic
  const mainCategories = [
    { name: "All Products", count: allProducts.length },
    { name: "Hearing Aids", count: hearingAidProducts.length },
    { name: "Accessories", count: accessoriesProducts.length }
  ]

  const accessorySubcategories = [
    { name: "Batteries", count: accessoriesProducts.filter(p => p.subcategory === "Battery").length },
    { name: "Ear Tips & Tubes", count: accessoriesProducts.filter(p => p.subcategory === "Ear Tip and Tube").length },
    { name: "Filters & Waxguards", count: accessoriesProducts.filter(p => p.subcategory === "Waxguard / Filter System").length },
    { name: "Click Sleeves", count: accessoriesProducts.filter(p => p.subcategory === "Click Sleeves").length },
    { name: "Click Domes", count: accessoriesProducts.filter(p => p.subcategory === "Click Domes").length },
    { name: "Custom Moulds", count: accessoriesProducts.filter(p => p.subcategory === "Custom Moulds").length }
  ]

  // Product filtering and pagination
  const PRODUCTS_PER_PAGE = 6
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState("All Products")
  const [isAccessoriesExpanded, setIsAccessoriesExpanded] = useState(false)

  const filteredCatalogProducts = allProducts.filter(product => {
    const matchesCategory = selectedCatalogCategory === "All Products" || 
      product.category === selectedCatalogCategory ||
      (selectedCatalogCategory === "Batteries" && product.subcategory === "Battery") ||
      (selectedCatalogCategory === "Ear Tips & Tubes" && product.subcategory === "Ear Tip and Tube") ||
      (selectedCatalogCategory === "Filters & Waxguards" && product.subcategory === "Waxguard / Filter System") ||
      (selectedCatalogCategory === "Click Sleeves" && product.subcategory === "Click Sleeves") ||
      (selectedCatalogCategory === "Click Domes" && product.subcategory === "Click Domes") ||
      (selectedCatalogCategory === "Custom Moulds" && product.subcategory === "Custom Moulds")
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredCatalogProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const displayedCatalogProducts = filteredCatalogProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const handleSearch = () => {
    setCurrentPage(1)
  }

  // Memoize the search handler to prevent unnecessary re-renders
  const memoizedHandleSearch = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const handleBookNow = (product) => {
    setSelectedProduct(product)
    setIsBookingModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
    setSelectedProduct(null)
  }

  const handleCatalogCategorySelect = (category) => {
    setSelectedCatalogCategory(category)
    setCurrentPage(1)
    
    // If Accessories is clicked, expand/collapse subcategories
    if (category === "Accessories") {
      setIsAccessoriesExpanded(!isAccessoriesExpanded)
    } else {
      // If other categories are selected, collapse accessories
      setIsAccessoriesExpanded(false)
    }
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gray-50 transform hover:scale-[1.02] border border-gray-100">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-block px-2 py-1 bg-[#182945]/10 text-[#182945] text-xs font-medium rounded-full">
          {product.subcategory || product.category}
        </span>
        <span className="text-xs text-gray-500 font-medium truncate ml-2">{product.brand}</span>
      </div>
      
      <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-[#182945] transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        {/* Product specific details */}
        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
          {product.type && <div>Type: {product.type}</div>}
          {product.size && <div>Size: {product.size}</div>}
          {product.quantity && <div>Quantity: {product.quantity}</div>}
          {product.compatibility && <div className="text-xs">{product.compatibility}</div>}
          {product.productCode && <div>Code: {product.productCode}</div>}
        </div>

        {/* Features for hearing aids */}
        {product.features && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
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
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        
        <div className="text-lg sm:text-xl font-bold text-gray-900">
          {product.isCustom ? (
            <span className="text-xs sm:text-sm text-gray-600">Price upon consultation</span>
          ) : (
            `$${product.price.toFixed(2)}`
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          {product.isCustom ? (
            <button className="flex-1 px-3 py-2 bg-[#182945] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#182945]/90 transition-colors duration-200 shadow-md flex items-center justify-center gap-1 sm:gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Book Ear Impression</span>
              <span className="sm:hidden">Book</span>
            </button>
          ) : product.category === "Hearing Aids" ? (
            <button 
              onClick={() => handleBookNow(product)}
              className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-md flex items-center justify-center gap-1 sm:gap-2"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </button>
          ) : (
            <button 
              onClick={() => handleBookNow(product)}
              className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-md flex items-center justify-center gap-1 sm:gap-2"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Buy Now</span>
              <span className="sm:hidden">Buy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // Mobile Filter Button
  const MobileFilterButton = () => (
    <button
      onClick={() => setIsMobileFiltersOpen(true)}
      className="lg:hidden fixed bottom-10 left-4 z-40 bg-[#182945] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#182945]/90 transition-colors duration-200 flex items-center gap-2"
    >
      <Filter className="w-5 h-5" />
      <span className="font-medium">Filters</span>
    </button>
  )

  // Mobile Filters Modal
  const MobileFiltersModal = () => (
    <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFiltersOpen(false)} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters & Search</h2>
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
          {/* Search Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Search Products</h3>
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={memoizedHandleSearch}
            />
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {mainCategories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => handleCatalogCategorySelect(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedCatalogCategory === category.name 
                        ? "bg-[#182945] text-white shadow-md" 
                        : "text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCatalogCategory === category.name 
                        ? "bg-white text-[#182945]" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                  
                  {/* Subcategories for Accessories */}
                  {category.name === "Accessories" && isAccessoriesExpanded && (
                    <div className="ml-4 mt-2 space-y-1">
                      {accessorySubcategories.map((subcategory) => (
                        <button
                          key={subcategory.name}
                          onClick={() => handleCatalogCategorySelect(subcategory.name)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 text-sm ${
                            selectedCatalogCategory === subcategory.name 
                              ? "bg-[#182945]/10 text-[#182945] shadow-sm" 
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <span className="font-medium">{subcategory.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCatalogCategory === subcategory.name 
                              ? "bg-[#182945]/20 text-[#182945]" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {subcategory.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Brands */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Brands</h3>
            <div className="space-y-1">
              <button className="w-full text-left p-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Signia
              </button>
              <button className="w-full text-left p-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Siemens
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const CategorySidebar = () => (
    <div className="w-64 bg-white rounded-lg p-6 shadow-lg h-fit border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      
      <div className="space-y-3">
        {/* Main Categories */}
        {mainCategories.map((category) => (
          <div key={category.name}>
            <button
              onClick={() => handleCatalogCategorySelect(category.name)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 group ${
                selectedCatalogCategory === category.name 
                  ? "bg-[#182945] text-white shadow-md" 
                  : "text-gray-900 hover:text-[#182945]"
              }`}
            >
              <span className="font-medium">{category.name}</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                selectedCatalogCategory === category.name 
                  ? "bg-white text-[#182945]" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {category.count}
              </span>
            </button>
            
            {/* Subcategories for Accessories */}
            {category.name === "Accessories" && isAccessoriesExpanded && (
              <div className="ml-4 mt-2 space-y-2">
                {accessorySubcategories.map((subcategory) => (
                  <button
                    key={subcategory.name}
                    onClick={() => handleCatalogCategorySelect(subcategory.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 text-sm ${
                      selectedCatalogCategory === subcategory.name 
                        ? "bg-[#182945]/10 text-[#182945] shadow-sm" 
                        : "text-gray-700 hover:text-[#182945]"
                    }`}
                  >
                    <span className="font-medium">{subcategory.name}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      selectedCatalogCategory === subcategory.name 
                        ? "bg-[#182945]/20 text-[#182945]" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {subcategory.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            Signia
          </button>
          <button className="w-full text-left p-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            Siemens
          </button>
        </div>
      </div>
    </div>
  )

  const Pagination = () => (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={typeof page !== 'number'}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm ${
              page === currentPage 
                ? "bg-[#182945] text-white shadow-md" 
                : typeof page === 'number'
                ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                : "text-gray-400 cursor-default"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
    {/* Hero Section */}
<section className="relative min-h-[35vh] md:min-h-[50vh] flex items-center overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="Our Services"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="container mx-auto px-4 pt-12 sm:pt-16 md:pt-24 relative z-10">
    <div className="max-w-4xl mx-auto text-center text-white">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-5 md:mb-6 animate-fade-in-up leading-tight">
        Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white animate-gradient-x">
          Products
        </span>
      </h1>
      <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fade-in-up animation-delay-300 px-4">
        Premium hearing aids and accessories made to enhance you daily life.
      </p>
    </div>
  </div>
</section>


      {/* Products Section */}
      <section className="py-6 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-8 relative">
            {/* Left Sidebar - Fixed Container */}
            <div className="w-64 flex-shrink-0">
              {/* Combined Sticky Sidebar */}
              <div className="sticky top-24 space-y-4">
                {/* Search Section */}
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Products</h2>
                  <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={memoizedHandleSearch}
                  />
                </div>
                
                {/* Categories Section */}
                <CategorySidebar />
              </div>
            </div>

            {/* Scrollable Products Grid */}
            <div className="flex-1 min-h-screen">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCatalogProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && <Pagination />}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Search Bar */}
            <div className="mb-6 bg-white rounded-lg p-4 shadow-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Search Products</h2>
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={memoizedHandleSearch}
              />
            </div>

            {/* Mobile Category Pills */}
            <div className="mb-6">
              <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
                {mainCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCatalogCategorySelect(category.name)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedCatalogCategory === category.name
                        ? "bg-[#182945] text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Products Grid - 2 columns on mobile, 3 on tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {displayedCatalogProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Mobile Pagination */}
            {totalPages > 1 && <Pagination />}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4 sm:gap-0">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center sm:mr-4">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">Ready to Improve Your Hearing?</h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Schedule your free consultation today and take the first step towards better hearing
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button className="bg-gradient-to-r from-[#182945] to-[#182945]/80 hover:from-[#182945]/90 hover:to-[#182945] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#182945] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10 w-full sm:w-auto">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Call +91-9876543210
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionButtons />
      
      {/* Mobile Filter Button */}
      <MobileFilterButton />
      
      {/* Mobile Filters Modal */}
      <MobileFiltersModal />
      
      {/* Product Booking Modal */}
      <ProductBookingModal 
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        product={selectedProduct}
      />

      {/* Custom CSS for mobile optimizations */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Touch-friendly button sizing */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Smooth scrolling for mobile */
        @media (max-width: 1024px) {
          html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductsPage