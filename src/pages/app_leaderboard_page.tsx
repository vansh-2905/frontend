'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function LeaderboardPage() {
  const router = useRouter()

  // This would typically come from a real scoring system
  const scores = [
    { name: 'User', score: 85 },
    { name: 'Russia', score: 78 },
    { name: 'China', score: 82 },
    { name: 'India', score: 80 },
  ].sort((a, b) => b.score - a.score)

  const handlePlayAgain = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Debate Results</h1>
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left p-2">Rank</th>
              <th className="text-left p-2">Participant</th>
              <th className="text-right p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((participant, index) => (
              <tr key={participant.name} className={index === 0 ? "bg-yellow-100" : ""}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{participant.name}</td>
                <td className="p-2 text-right">{participant.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <Button onClick={handlePlayAgain}>Play Again</Button>
        </div>
      </div>
    </div>
  )
}