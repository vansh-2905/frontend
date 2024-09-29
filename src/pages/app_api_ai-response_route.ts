import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { country, topic } = await request.json()
  
  // Simulate AI response generation
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))
  
  const response = `As the representative of ${country}, I believe that regarding ${topic}, we should consider...`
  
  return NextResponse.json({ response })
}