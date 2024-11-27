import Link from 'next/link'
import { Nav } from '../components/nav'

const restaurants = [
  { id: 1, name: 'Tasty Bites', cuisine: 'Italian', rating: 4.5 },
  { id: 2, name: 'Spice Garden', cuisine: 'Indian', rating: 4.2 },
  { id: 3, name: 'Sushi Express', cuisine: 'Japanese', rating: 4.7 },
  { id: 4, name: 'Burger Palace', cuisine: 'American', rating: 4.0 },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Popular Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                <p className="text-orange-500 font-bold">Rating: {restaurant.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

