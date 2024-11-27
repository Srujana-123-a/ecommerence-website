
import { Nav } from '../components/nav'
import { Button } from '@/components/ui/button'

const cartItems = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1 },
  { id: 2, name: 'Chicken Tikka Masala', price: 14.99, quantity: 2 },
  { id: 3, name: 'California Roll', price: 8.99, quantity: 1 },
]

export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4 last:border-b-0">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-2xl font-bold text-orange-500">${total.toFixed(2)}</p>
          </div>
          <Button className="w-full mt-6">Proceed to Checkout</Button>
        </div>
      </main>
    </div>
  )
}

