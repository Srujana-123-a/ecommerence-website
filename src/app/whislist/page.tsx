import { Nav } from '../components/nav'

const wishlistItems = [
  { id: 1, name: 'Margherita Pizza', restaurant: 'Tasty Bites' },
  { id: 2, name: 'Chicken Tikka Masala', restaurant: 'Spice Garden' },
  { id: 3, name: 'California Roll', restaurant: 'Sushi Express' },
]

export default function Wishlist() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        <div className="bg-white rounded-lg shadow-md">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border-b last:border-b-0 p-4">
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-600">{item.restaurant}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

