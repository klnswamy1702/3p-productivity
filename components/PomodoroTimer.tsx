"use client";

import { useState, useEffect } from 'react'
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input';
import { Play, Pause, X } from "lucide-react"

export function PomodoroTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      playSound()
      if (mode === 'focus') {
        setMode('break')
        setTimeLeft(breakTime * 60)
      } else {
        setMode('focus')
        setTimeLeft(focusTime * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, mode, focusTime, breakTime])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode('focus')
    setTimeLeft(focusTime * 60)
  }

  const playSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAAAAAAAD//8A')
    audio.play()
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleFocusTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0 && value <= 60) {
      setFocusTime(value)
      if (mode === 'focus') setTimeLeft(value * 60)
    }
  }

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0 && value <= 15) {
      setBreakTime(value)
      if (mode === 'break') setTimeLeft(value * 60)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        
        <CardHeader>
          <CardTitle className="text-2xl text-center">Pomodoro Timer</CardTitle>
        </CardHeader>

        {/* <p className='text-center'>The Pomodoro Technique is a time management method that helps you work more productively by breaking your work into focused intervals. The technique uses a timer to create a rhythm of work and breaks, which can help you reduce distractions and increase your focus. 
        </p> */}
        <CardContent className="space-y-10">
          <div className="flex justify-center space-x-4">
            <Button
              variant={mode === 'focus' ? 'default' : 'outline'}
              onClick={() => {
                setMode('focus')
                setTimeLeft(focusTime * 60)
                setIsActive(false)
              }}
            >
              Focus
            </Button>
            <Button
              variant={mode === 'break' ? 'default' : 'outline'}
              onClick={() => {
                setMode('break')
                setTimeLeft(breakTime * 60)
                setIsActive(false)
              }}
            >
              Break
            </Button>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold mb-8">{formatTime(timeLeft)}</div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm font-medium">Focus Time</p>
                <Input
                  type="number"
                  value={focusTime.toString()}
                  onChange={handleFocusTimeChange}
                  min={1}
                  max={60}
                  className="w-16 text-center"
                />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm font-medium">Break Time</p>
                <Input
                  type="number"
                  value={breakTime.toString()}
                  onChange={handleBreakTimeChange}
                  min={1}
                  max={15}
                  className="w-16 text-center"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                onClick={toggleTimer}
                className="w-32"
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={resetTimer}
                className="w-32"
              >
                <X className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

