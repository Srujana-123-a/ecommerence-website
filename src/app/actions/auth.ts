'use server'

import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.flatten().fieldErrors, 
      success: false,
      message: ''
    }
  }

  // Here you would typically create the user in your database
  // For this example, we'll just simulate a successful sign-up
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

  return { success: true, message: 'Account created successfully!', error: null }
}

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.flatten().fieldErrors, 
      success: false,
      message: ''
    }
  }

  // Here you would typically verify the user's credentials
  // For this example, we'll just simulate a successful sign-in
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

  return { success: true, message: 'Signed in successfully!', error: null }
}

