'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radie-group'
import Link from 'next/link'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
}

type Order = {
  id: string;
  items: CartItem[];
  totalPrice: number;
  name: string;
  address: string;
  place: string;
  pincode: string;
  deliveryDate: string;
  paymentMethod: string;
  orderDate: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [place, setPlace] = useState('')
  const [pincode, setPincode] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const { toast } = useToast()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const removeFromCart = (itemId: number, restaurantId: number) => {
    const updatedCart = cart.filter(item => !(item.id === itemId && item.restaurantId === restaurantId))
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
      variant: "destructive",
    })
  }

  const updateQuantity = (itemId: number, restaurantId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, restaurantId)
      return
    }
    const updatedCart = cart.map(item => 
      item.id === itemId && item.restaurantId === restaurantId 
        ? { ...item, quantity: newQuantity } 
        : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (!name || !address || !place || !pincode || !deliveryDate) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      totalPrice,
      name,
      address,
      place,
      pincode,
      deliveryDate,
      paymentMethod,
      orderDate: new Date().toISOString(),
    }

    // Store the new order
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const updatedOrders = [...existingOrders, newOrder]
    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    // Clear the cart and reset the form
    setCart([])
    localStorage.removeItem('cart')
    setName('')
    setAddress('')
    setPlace('')
    setPincode('')
    setDeliveryDate('')
    setPaymentMethod('credit_card')
    setShowCheckout(false)

    toast({
      title: "Order Placed Successfully",
      description: "Thank you for your order!",
    })

    // Redirect to the order history page
    router.push('/orders')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="sm"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </Button>
        </div>
        {cart.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Your cart is empty</p>
            <p className="text-md text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/home">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.restaurantId}`} className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.restaurantId, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="ml-4"
                      onClick={() => removeFromCart(item.id, item.restaurantId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold">Total:</p>
                <p className="text-2xl font-bold text-orange-500">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <Button 
              className="w-full mt-6" 
              onClick={() => setShowCheckout(!showCheckout)}
            >
              {showCheckout ? 'Hide Checkout' : 'Proceed to Checkout'}
              {showCheckout ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>

            {showCheckout && (
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your street address"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="place">Place</Label>
                    <Input
                      id="place"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      placeholder="Enter your city or town"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter your pincode"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  className="w-full mt-6" 
                  onClick={handleCheckout}
                >
                  Place Order
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

