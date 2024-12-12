import Link from "next/link";
import Image from "next/image";

import { ImageSlider } from "../components/image-slider";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center my-8 text-orange-500 dark:text-orange-400">Welcome to Food Court</h2>
      <ImageSlider />
      <h1 className="text-2xl font-semibold text-center mt-8 mb-4 text-gray-800 dark:text-gray-200">Featured Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <Image src="/sru1.jpg" alt="Spice Haven" width={400} height={200} className="w-full object-cover h-48" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Spice Haven</h3>
            <p className="text-gray-600 dark:text-gray-300">Experience the flavors of India!</p>
            <Link href="/restaurant/1" className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
              View Menu
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <Image src="/sru2.jpg" alt="Sushi Delight" width={400} height={200} className="w-full object-cover h-48" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Sushi Delight</h3>
            <p className="text-gray-600 dark:text-gray-300">Fresh and authentic Japanese cuisine!</p>
            <Link href="/restaurant/2" className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
              View Menu
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <Image src="/sru3.jpg" alt="Pasta Paradise" width={400} height={200} className="w-full object-cover h-48" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Pasta Paradise</h3>
            <p className="text-gray-600 dark:text-gray-300">Authentic Italian pasta and more!</p>
            <Link href="/restaurant/3" className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

