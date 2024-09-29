'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [topic, setTopic] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      router.push(`/debate?topic=${encodeURIComponent(topic)}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Virtual MUN Simulator</h1>
        <p className="text-xl text-white mb-8">Debate with AI representatives from Russia, China, and India</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <Input
            type="text"
            placeholder="Enter discussion topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Start Debate
          </Button>
        </div>
      </form>
    </div>
  )
}