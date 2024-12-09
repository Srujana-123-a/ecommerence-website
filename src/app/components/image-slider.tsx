'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import one from '@/app/sru5.jpg'
import two from '@/app/sru6.jpg'
import three from '@/app/sru7.jpg'
import four from '@/app/sru8.jpg'

const sliderImages = [
  one,
  two,
  three,
  four,
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      {sliderImages.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-4000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
