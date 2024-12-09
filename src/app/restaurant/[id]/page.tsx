'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Clock, MapPin, Heart, Users, X, MessageSquare } from 'lucide-react'
import img1 from "@/app/ima1.jpg"
import img2 from '@/app/sru5.jpg'
import img3 from '@/app/sru6.jpg'
import img4 from '@/app/sru7.jpg'
import img5 from '@/app/sru8.jpg'
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radie-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock restaurant data
const initialRestaurant = {
  id: 1,
  name: 'Tasty Bits',
  rating: 3.5,
  totalRatings: 115,
  deliveryTime: 51,
  distance: '14 km',
  location: 'Podanur',
  freeDeliveryAbove: 1200,
  menu: [
    {
      id: 1,
      name: 'Chicken Gravy',
      price: 175.50,
      originalPrice: 195,
      discount: 10,
      image: img1,
      type: 'non-veg',
      isBestseller: true,
      ratings: [],
    },
    {
      id: 2,
      name: 'Chicken Biryani',
      price: 214.20,
      originalPrice: 238,
      discount: 10,
      image: img2,
      type: 'non-veg',
      ratings: [
        { rating: 4, comment: "Delicious biryani!" },
        { rating: 5, comment: "Best in town" }
      ],
      stars: 4,
      description: 'Traditional seeraga samba cooked biryani with succulent pieces [bone in]',
    },
    {
      id: 3,
      name: 'White Rice with Chicken Gravy [Half]',
      price: 207,
      originalPrice: 230,
      discount: 10,
      image: img4,
      type: 'non-veg',
      description: 'White Rice [300 g]+Chicken Gravy [50 g]+1 Egg+Rasam+Leaf',
      ratings: [],
    },
    // Add more menu items to test pagination
    {
      id: 4,
      name: 'Vegetable Fried Rice',
      price: 150,
      originalPrice: 180,
      discount: 15,
      image: img3,
      type: 'veg',
      ratings: [],
    },
    {
      id: 5,
      name: 'Paneer Butter Masala',
      price: 220,
      originalPrice: 250,
      discount: 12,
      image: img5,
      type: 'veg',
      ratings: [],
    },
    {
      id: 6,
      name: 'Tandoori Chicken',
      price: 280,
      originalPrice: 320,
      discount: 12,
      image: img1,
      type: 'non-veg',
      ratings: [],
    },
    {
      id: 7,
      name: 'Garlic Naan',
      price: 40,
      originalPrice: 50,
      discount: 20,
      image: img2,
      type: 'veg',
      ratings: [],
    },
  ]
}

type MenuItem = {
  id: number
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  type: 'veg' | 'non-veg' | 'egg'
  isBestseller?: boolean
  ratings: Array<{ rating: number; comment: string }>
  stars?: number
  description?: string
}

type SortOption = 'price-low-high' | 'price-high-low' | 'rating-high-low'

export default function RestaurantPage() {
  const { toast } = useToast()
  const [activeFilter, setActiveFilter] = useState<'all' | 'veg' | 'egg' | 'non-veg'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('rating-high-low')
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [selectedItemForReview, setSelectedItemForReview] = useState<MenuItem | null>(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showTopPicks, setShowTopPicks] = useState(false)
  const [showSpicyOnly, setShowSpicyOnly] = useState(false)
  const [restaurant, setRestaurant] = useState(initialRestaurant)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredItems = restaurant.menu.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTopPicks = !showTopPicks || item.isBestseller || (item.stars && item.stars >= 4)
    return matchesFilter && matchesSearch && matchesTopPicks
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price
      case 'price-high-low':
        return b.price - a.price
      case 'rating-high-low':
        return ((b.stars || 0) - (a.stars || 0))
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const addToCart = (item: MenuItem) => {
    const cartItem = { ...item, quantity: 1 }
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItemIndex = existingCart.findIndex((i: typeof cartItem) => i.id === item.id)
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart))
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
      className: "bg-black text-white",
    })
  }

  const toggleWishlist = (itemId: number) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
      return newWishlist
    })
    
    toast({
      title: wishlist.includes(itemId) ? "Removed from Wishlist" : "Added to Wishlist",
      description: `Item has been ${wishlist.includes(itemId) ? 'removed from' : 'added to'} your wishlist.`,
      className: "bg-black text-white",
    })
  }

  const handleReviewSubmit = () => {
    if (!selectedItemForReview) return

    const newReview = {
      rating: reviewRating,
      comment: reviewComment
    }

    setRestaurant(prevRestaurant => {
      const updatedMenu = prevRestaurant.menu.map(item => {
        if (item.id === selectedItemForReview.id) {
          const updatedRatings = [...item.ratings, newReview]
          const averageRating = updatedRatings.reduce((acc, curr) => acc + curr.rating, 0) / updatedRatings.length
          return {
            ...item,
            ratings: updatedRatings,
            stars: Math.round(averageRating)
          }
        }
        return item
      })

      return {
        ...prevRestaurant,
        menu: updatedMenu
      }
    })

    setShowReviewDialog(false)
    setReviewRating(5)
    setReviewComment('')
    setSelectedItemForReview(null)

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
      className: "bg-black text-white",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {restaurant.rating} ★
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {restaurant.deliveryTime} mins
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {restaurant.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {restaurant.totalRatings} ratings
                </span>
              </div>
            </div>
            
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
            <span className="text-red-500">🛵</span>
            <span>Free Delivery above ₹{restaurant.freeDeliveryAbove}</span>
          
          </div>
        </div>
      </div>
      {/* After the free delivery section */}
{/* After the free delivery section */}
<div className="mt-4 flex items-center space-x-4 ">
  <div className="relative w-64  bg-black text-white ml-20"> {/* Reduced width to w-64 (256px) */}
    <Input
      type="text"
      placeholder={`Search in ${restaurant.name}`}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10 w-full" // Added w-full to ensure input fills the container
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  </div>
  <Link href="/Menu">
    <Button variant="outline" className="gap-2  bg-black text-white">
      <span className="text-xl">🍽️</span>
      Menu
    </Button>
  </Link>
</div>

      {/* Filters and Search */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-4 items-center">
            <Button 
              variant={activeFilter === 'all' ? "default" : "outline"}
              onClick={() => setShowFilters(true)}
            >
              Filters ▼
            </Button>
            <Button 
              variant={activeFilter === 'veg' ? "default" : "outline"}
              onClick={() => setActiveFilter('veg')}
              className="flex items-center gap-2"
            >
              <span className="w-4 h-4 border-2 border-green-500 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </span>
              Veg
            </Button>
            <Button 
              variant={activeFilter === 'egg' ? "default" : "outline"}
              onClick={() => setActiveFilter('egg')}
              className="flex items-center gap-2"
            >
              🥚 Egg
            </Button>
            <Button 
              variant={activeFilter === 'non-veg' ? "default" : "outline"}
              onClick={() => setActiveFilter('non-veg')}
              className="flex items-center gap-2"
            >
              <span className="w-4 h-4 border-2 border-orange-500 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              </span>
              Non-veg
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
        <div className="space-y-6">
          {paginatedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex justify-between p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {item.type === 'non-veg' && (
                        <span className="w-4 h-4 border-2 border-orange-500 rounded-full flex items-center justify-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        </span>
                      )}
                      {item.type === 'veg' && (
                        <span className="w-4 h-4 border-2 border-green-500 rounded-full flex items-center justify-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        </span>
                      )}
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.isBestseller && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Bestseller
                        </Badge>
                      )}
                    </div>
                    {item.ratings && item.ratings.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (item.stars || 0)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {item.ratings.length} ratings
                        </span>
                      </div>
                    )}
                    <div className="mt-2">
                      <span className="font-semibold">₹{item.price.toFixed(2)}</span>
                      {item.discount > 0 && (
                        <>
                          <span className="text-gray-500 line-through ml-2">
                            ₹{item.originalPrice}
                          </span>
                          <span className="text-green-600 ml-2">
                            {item.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        <span className="text-sm">Add to Wishlist</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItemForReview(item)
                          setShowReviewDialog(true)
                        }}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Write a Review</span>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 relative">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 bg-black text-white hover:bg-gray-800"
                      onClick={() => addToCart(item)}
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Search Bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-black text-white border-t p-4"> */}
        {/* <div className="container mx-auto flex gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder={`Search in ${restaurant.name}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Link href="/Menu">
         
          <Button variant="outline" className="gap-2">
            <span className="text-xl">🍽️</span>
            Menu
          </Button></Link>
        </div> */}
      {/* </div> */}

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Filters and Sorting
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Sort by</h3>
              <RadioGroup value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-low-high" id="price-low-high" />
                  <Label htmlFor="price-low-high">Price - low to high</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-high-low" id="price-high-low" />
                  <Label htmlFor="price-high-low">Price - high to low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rating-high-low" id="rating-high-low" />
                  <Label htmlFor="rating-high-low">Rating - high to low</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Top picks</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="top-picks"
                  checked={showTopPicks}
                  onChange={(e) => setShowTopPicks(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="top-picks">Show only top-rated and bestseller items</Label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Dietary preference</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="spicy"
                  checked={showSpicyOnly}
                  onChange={(e) => setShowSpicyOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="spicy">🌶️ Spicy</Label>
              </div>
            </div>

            <div className="flex justify-between">
              <Button  style={{backgroundColor:'black',color:'white'}} variant="outline" onClick={() => {
                setSortBy('rating-high-low')
                setShowTopPicks(false)
                setShowSpicyOnly(false)
              }}>
                Clear All
              </Button>
              <Button  style={{backgroundColor:'black',color:'white'}} onClick={() => setShowFilters(false)} >
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 cursor-pointer ${
                    index < reviewRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setReviewRating(index + 1)}
                />
              ))}
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
            <Button style={{backgroundColor:'black',color:'white'}} onClick={handleReviewSubmit}>Submit Review</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

