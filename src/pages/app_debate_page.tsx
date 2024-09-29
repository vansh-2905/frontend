'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from 'next/navigation'

type Message = {
  sender: string
  content: string
}

type Participant = 'User' | 'Russia' | 'China' | 'India'

export default function DebatePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [currentSpeaker, setCurrentSpeaker] = useState<Participant>('User')
  const [timeLeft, setTimeLeft] = useState(60)
  const [isDebateEnded, setIsDebateEnded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const topic = searchParams.get('topic') || 'Unknown Topic'

  useEffect(() => {
    if (timeLeft > 0 && !isDebateEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (!isDebateEnded) {
      const nextSpeaker = getNextSpeaker()
      setCurrentSpeaker(nextSpeaker)
      setTimeLeft(60)
      if (nextSpeaker !== 'User') {
        simulateAIResponse(nextSpeaker)
      }
    }
  }, [timeLeft, isDebateEnded])

  const getNextSpeaker = (): Participant => {
    const speakers: Participant[] = ['User', 'Russia', 'China', 'India']
    const currentIndex = speakers.indexOf(currentSpeaker)
    return speakers[(currentIndex + 1) % speakers.length]
  }

  const simulateAIResponse = (country: Participant) => {
    setTimeout(() => {
      const aiMessage = `AI response from ${country} about ${topic}`
      setMessages(prev => [...prev, { sender: country, content: aiMessage }])
      setCurrentSpeaker(getNextSpeaker())
      setTimeLeft(60)
    }, Math.random() * 3000 + 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userInput.trim()) {
      setMessages(prev => [...prev, { sender: 'User', content: userInput }])
      setUserInput('')
      setCurrentSpeaker(getNextSpeaker())
      setTimeLeft(60)
    }
  }

  const handleEndDebate = () => {
    setIsDebateEnded(true)
    toast({
      title: "Debate Ended",
      description: "Redirecting to the leaderboard...",
    })
    setTimeout(() => router.push('/leaderboard'), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">MUN Debate: {topic}</h1>
      </header>
      <div className="flex-1 flex">
        <ScrollArea className="w-3/4 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Card key={index} className={`${message.sender === 'User' ? 'ml-auto' : ''} max-w-md`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder-${message.sender.toLowerCase()}.jpg`} alt={message.sender} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{message.sender}</span>
                  </div>
                  <p className="mt-2">{message.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <div className="w-1/4 p-4 bg-muted">
          <h2 className="text-xl font-bold mb-4">Participants</h2>
          <ul className="space-y-2">
            {(['User', 'Russia', 'China', 'India'] as Participant[]).map((participant) => (
              <li
                key={participant}
                className={`p-2 rounded ${currentSpeaker === participant ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {participant} {participant === 'User' && '(You)'}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="font-bold">Time Left: {timeLeft}s</h3>
            <Progress value={(timeLeft / 60) * 100} className="mt-2" />
          </div>
        </div>
      </div>
      <footer className="bg-muted p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={currentSpeaker !== 'User' || isDebateEnded}
          />
          <Button type="submit" disabled={currentSpeaker !== 'User' || isDebateEnded}>
            Send
          </Button>
          <Button onClick={handleEndDebate} variant="secondary">
            End Debate
          </Button>
        </form>
      </footer>
    </div>
  )
}