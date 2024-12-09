import Image from 'next/image'
import Link from 'next/link'
import { ImageSlider } from '../components/image-slider'
import img1 from '@/app/ima1.jpg'
import img2 from '@/app/ima2.jpg'
import img3 from '@/app/ima3.jpg'
import img4 from '@/app/ima4.jpg'

const restaurants = [
  { 
    id: 1, 
    name: 'Tasty Bites', 
    cuisine: 'Italian', 
    rating: 4.5,
    image: img1
  },
  { 
    id: 2, 
    name: 'Spice Garden', 
    cuisine: 'Indian', 
    rating: 4.2,
    image: img2
  },
  { 
    id: 3, 
    name: 'Sushi Express', 
    cuisine: 'Japanese', 
    rating: 4.7,
    image: img3
  },
  { 
    id: 4, 
    name: 'Burger Palace', 
    cuisine: 'American', 
    rating: 4.0,
    image: img4
  },
]

export default function Home() {
  return (
    <div>  <h1 style={{marginLeft:'400px',color:'orange',fontSize:'50px',paddingBottom:'60px',fontFamily:'cursive', fontStyle:'italic'}}>Food Court</h1>
    <div className="min-h-screen bg-gray-100">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
        
          <ImageSlider />
        </div>
        <h1 className="text-3xl font-bold mb-6">Popular Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-48 w-full">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    style={{objectFit: 'cover'}}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <p className="text-gray-700 font-semibold">{restaurant.rating.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            
            </Link>
          ))}
        </div>
      </main>
    </div>
    </div>
  )
}
