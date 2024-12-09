import Link from 'next/link'
import { FaPaypal, FaCcMastercard, FaCcVisa, FaCcDiscover, FaCcJcb } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <Link href="/FoodZone">
              <h2 className="text-xl font-semibold mb-4 hover:text-orange-500 transition-colors duration-300">
                Food Zone
              </h2>
            </Link>
          </div>

          {/* Our Menus */}
          <div>
            <Link href="/ourMenu">
              <h3 className="text-xl font-semibold mb-4 hover:text-orange-500 transition-colors duration-300">
                Our Menus
              </h3>
            </Link>
          </div>

          {/* Contact & Download */}
          <div>
            <h3 className="text-xl font-semibold mb-4 hover:text-orange-500 transition-colors duration-300">
              Contact Us
            </h3>
            <div>
              <ul>
                <li>+44 (0) 9865 124 765</li>
                <li>+44 (0) 9861 432 543</li>
                <li>www.yourdomain.com</li>
                <li>info@yourdomain.com</li>
                <li>11 Beaufort Court Canal Wharf UK E10AL</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            ©2024. All rights reserved by Food Zone
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm">Accept For</span>
            <div className="flex space-x-2">
              <div className="bg-white h-8 w-12 rounded flex items-center justify-center text-gray-800">
                <FaPaypal size={20} />
              </div>
              <div className="bg-white h-8 w-12 rounded flex items-center justify-center text-gray-800">
                <FaCcMastercard size={20} />
              </div>
              <div className="bg-white h-8 w-12 rounded flex items-center justify-center text-gray-800">
                <FaCcVisa size={20} />
              </div>
              <div className="bg-white h-8 w-12 rounded flex items-center justify-center text-gray-800">
                <FaCcDiscover size={20} />
              </div>
              <div className="bg-white h-8 w-12 rounded flex items-center justify-center text-gray-800">
                <FaCcJcb size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
