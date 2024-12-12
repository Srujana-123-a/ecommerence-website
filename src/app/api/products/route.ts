import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      imageUrl: body.imageUrl,
      isAvailable: body.isAvailable === 'true',
    },
  })
  return NextResponse.json(product, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      imageUrl: body.imageUrl,
      isAvailable: body.isAvailable === 'true',
    },
  })
  return NextResponse.json(product)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const product = await prisma.product.delete({
    where: { id: Number(id) },
  })
  return NextResponse.json(product)
}

