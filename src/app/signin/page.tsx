'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import Image from 'next/image'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      console.log('Sign in successful')
      router.push('/home')
    } else {
      console.log('Invalid credentials')
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-foreground">Sign in to your account</h2>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Button type="submit" className="w-full">Sign in</Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link href="/signup" className="text-sm text-primary hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="mt-2 text-center">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <div className="w-full max-w-sm lg:w-96">
          <Image
            className="object-cover rounded-lg"
            src="/signin.jpg"
            alt="Sign In Illustration"
            width={384} // Match the max width of the form
            height={512} // Adjust proportionally
          />
        </div>
      </div>
    </div>
  )
}
