'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import Image from 'next/image'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  isAvailable: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      const productData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        category: formData.get('category') as string,
        imageUrl: formData.get('imageUrl') as string,
        isAvailable: formData.get('isAvailable') === 'on',
      }
      
      if (currentProduct) {
        await updateProduct({ ...productData, id: currentProduct.id })
      } else {
        await createProduct(productData)
      }
      setCurrentProduct(null)
      fetchProducts()
      toast({
        title: "Success",
        description: currentProduct ? "Product updated successfully" : "Product created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createProduct = async (product: Omit<Product, 'id'>) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (!response.ok) throw new Error('Failed to create product')
  }

  const updateProduct = async (product: Product) => {
    const response = await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (!response.ok) throw new Error('Failed to update product')
  }

  const deleteProduct = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete product')
      fetchProducts()
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            name="name" 
            required 
            defaultValue={currentProduct?.name || ''}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            required 
            defaultValue={currentProduct?.description || ''}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01" 
            required 
            defaultValue={currentProduct?.price || ''}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            name="category" 
            required 
            defaultValue={currentProduct?.category || ''}
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input 
            id="imageUrl" 
            name="imageUrl" 
            required 
            defaultValue={currentProduct?.imageUrl || ''}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="isAvailable" 
            name="isAvailable"
            defaultChecked={currentProduct?.isAvailable || false}
          />
          <Label htmlFor="isAvailable">Available</Label>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : (currentProduct ? 'Update' : 'Create')} Product
        </Button>
      </form>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={200} 
                height={200} 
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="mt-2">{product.description}</p>
              <p className={`mt-2 ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {product.isAvailable ? 'Available' : 'Not Available'}
              </p>
              <div className="mt-4 space-x-2">
                <Button onClick={() => setCurrentProduct(product)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteProduct(product.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

