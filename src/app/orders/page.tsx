'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'



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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
     
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link href="/home">
              <Button className="w-full">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p className="text-gray-600">Placed on: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="mb-4">
                  <p><strong>Delivery to:</strong> {order.name}</p>
                  <p>{order.address}, {order.place}, {order.pincode}</p>
                  <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  {order.items.map((item) => (
                    <div key={`${item.id}-${item.restaurantId}`} className="flex justify-between items-center mb-2">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-4 font-bold">
                    <span>Total:</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

