'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

const links = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Cart', href: '/cart', icon: ShoppingCart },
]

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const isRestaurantPage = pathname.startsWith('/restaurant/')

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {isRestaurantPage ? (
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <Link href="/home" className="text-2xl font-bold text-orange-500">FoodApp</Link>
      )}
      <div className="flex space-x-4">
        {links.map((link) => {
          const LinkIcon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-1 ${
                pathname === link.href ? 'text-orange-500' : 'text-gray-600'
              }`}
            >
              <LinkIcon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

