'use client'

import { useState, useEffect } from 'react'
import { Nav } from '../components/nav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
            <p className="text-md text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/home">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.restaurantId}`} className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
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
            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </div>
        )}
      </main>
    </div>
  )
}

