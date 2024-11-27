'use client'

import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { signUp, signIn } from '@/app/actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

const initialState = {
  error: null as { [key: string]: string[] } | null,
  success: false,
  message: '',
}

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [state, formAction] = useFormState(isSignUp ? signUp : signIn, initialState)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formAction(formData)
  }

  useEffect(() => {
    if (state.success) {
      router.push('/home')
    }
  }, [state.success, router])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
        <CardDescription>
          {isSignUp ? 'Create a new account' : 'Sign in to your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
              {state.error && 'name' in state.error && (
                <p className="text-sm text-red-500">{state.error.name?.[0]}</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            {state.error && 'email' in state.error && (
              <p className="text-sm text-red-500">{state.error.email?.[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state.error && 'password' in state.error && (
              <p className="text-sm text-red-500">{state.error.password?.[0]}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="w-full">
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
        {state.success && (
          <p className="text-center text-green-500 mt-4">
            {state.message}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

