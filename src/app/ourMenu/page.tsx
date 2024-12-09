import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from '../components/footer'
import imm from "@/app/sru6.jpg"
import im1 from "@/app/sru5.jpg"
import imm2 from "@/app/sru8.jpg"

export default function MenuCard() {
  const menuSections = [
    {
      title: "BURGERS",
      image: imm,
      items: [
        { name: "Cabernet Franc", price: 5.50 },
        { name: "Cabernet Sauvignon", price: 5.50 },
        { name: "Chianti", price: 5.50 },
        { name: "Dornfelder", price: 2.60 },
        { name: "Merlot", price: 3.90 },
        { name: "Montepulciano", price: 5.60 },
        { name: "Pinot Noir", price: 5.50 },
      ]
    },
    {
      title: "HOT DOGS",
      image: im1,
      items: [
        { name: "Cabernet Franc", price: 5.50 },
        { name: "Cabernet Sauvignon", price: 5.50 },
        { name: "Chianti", price: 5.50 },
        { name: "Dornfelder", price: 2.60 },
        { name: "Merlot", price: 3.90 },
        { name: "Montepulciano", price: 5.60 },
        { name: "Pinot Noir", price: 5.50 },
      ]
    },
    {
      title: "DRINKS",
      image: imm2,
      items: [
        { name: "Cabernet Franc", price: 5.50 },
        { name: "Cabernet Sauvignon", price: 5.50 },
        { name: "Chianti", price: 5.50 },
        { name: "Dornfelder", price: 2.60 },
        { name: "Merlot", price: 3.90 },
        { name: "Montepulciano", price: 5.60 },
        { name: "Pinot Noir", price: 5.50 },
      ]
    }
  ]

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-[#FFC107] p-4">
          {menuSections.map((section, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm flex-shrink-0">
                  <Image
                    src={section.image}
                    alt={section.title.toLowerCase()}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-red-600" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {section.title}
                </h2>
              </div>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-600 text-white text-center py-3">
          <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Impact, sans-serif' }}>
            TAKE AWAY
          </h2>
          <p className="text-sm">Restaurant XYZ</p>
          <p className="text-xs">Milky Way Street 88 - 8888 Galaxy</p>
        </div>
      </CardContent>
    </Card>
  )
}

