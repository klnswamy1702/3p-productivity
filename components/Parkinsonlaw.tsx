// src/components/ParkinsonLaw.tsx
"use client";
// import React, { useState } from "react";

// export const ParkinsonLaw = () => {
//   const [task, setTask] = useState("");
//   const [deadline, setDeadline] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isStarted, setIsStarted] = useState(false);

//   const startTask = () => {
//     setIsStarted(true);
//     setTimeLeft(deadline * 60);
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsStarted(false);
//           alert("Time's up!");
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   return (
//     <div className="p-4 border rounded-xl shadow-md max-w-sm mx-auto mt-6">
//       <h2 className="text-xl font-semibold mb-4">Parkinsons Law</h2>
//       <p className="text-sm mb-4">
//         Parkinsons Law states that work expands to fill the time available for
//         its completion. Set strict deadlines to boost efficiency.
//       </p>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           placeholder="Task description..."
//           className="w-full p-2 border rounded mb-2"
//         />
//         <input
//           type="number"
//           value={deadline}
//           onChange={(e) => setDeadline(Number(e.target.value))}
//           placeholder="Deadline (minutes)"
//           className="w-full p-2 border rounded mb-2"
//         />
//         <button
//           onClick={startTask}
//           className="w-full bg-purple-500 text-white py-2 rounded"
//           disabled={isStarted}
//         >
//           Start Task
//         </button>
//       </div>
//       {isStarted && (
//         <div className="text-center text-xl">
//           Time Left: {Math.floor(timeLeft / 60)}:
//           {(timeLeft % 60).toString().padStart(2, "0")}
//         </div>
//       )}
//     </div>
//   );
// };

import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Edit, Check, Trash } from "lucide-react"
import { formatDistanceToNow, parseISO } from 'date-fns'

export function ParkinsonLaw() {
  const [tasks, setTasks] = useState<{ id: number, name: string, deadline: Date, time: number, completed: boolean, editing: boolean }[]>([])
  const [taskName, setTaskName] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [taskTime, setTaskTime] = useState('')
  const [taskIdCounter, setTaskIdCounter] = useState(0)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [editingTaskName, setEditingTaskName] = useState('')

  const addTask = () => {
    if (taskName && taskDeadline && taskTime) {
      const deadline = parseISO(taskDeadline)
      const time = parseInt(taskTime, 10) * 60 * 1000 // Convert minutes to milliseconds
      setTasks([...tasks, { id: taskIdCounter, name: taskName, deadline, time, completed: false, editing: false }])
      setTaskIdCounter(taskIdCounter + 1)
      setTaskName('')
      setTaskDeadline('')
      setTaskTime('')
    }
  }

  const startTimer = (id: number) => {
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex !== -1) {
      const task = tasks[taskIndex]
      const interval = setInterval(() => {
        if (task.time > 0 && !task.completed) {
          setTasks(prevTasks => prevTasks.map(t => t.id === id ? { ...t, time: t.time - 1000 } : t))
        } else {
          clearInterval(interval)
          setTasks(prevTasks => prevTasks.map(t => t.id === id ? { ...t, completed: true } : t))
        }
      }, 1000)
    }
  }

  const completeTask = (id: number) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: true } : task))
  }

  const editTask = (id: number, name: string) => {
    setEditingTaskId(id)
    setEditingTaskName(name)
  }

  const saveTask = (id: number) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, name: editingTaskName, editing: false } : task))
    setEditingTaskId(null)
    setEditingTaskName('')
  }

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      <Card className="w-full max-w-2xl mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Parkinsons law</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="task-name">Task Name</Label>
              <Input id="task-name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="task-deadline">Deadline</Label>
              <Input id="task-deadline" type="datetime-local" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="task-time">Time (minutes)</Label>
              <Input id="task-time" type="number" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className="mt-1" />
            </div>
          </div>
          <Button onClick={addTask} className="mt-4">Add Task</Button>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl">
        {tasks.map(task => (
          <Card key={task.id} className="mb-4">
            <CardHeader>
              <CardTitle>
                {task.editing || editingTaskId === task.id ? (
                  <div className="flex items-center space-x-2">
                    <Input value={editingTaskName} onChange={(e) => setEditingTaskName(e.target.value)} autoFocus />
                    <Button variant="outline" onClick={() => saveTask(task.id)}>Save</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
                    <div className="flex space-x-2">
                      {!task.completed && (
                        <>
                          <Button variant="outline" onClick={() => editTask(task.id, task.name)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="outline" onClick={() => completeTask(task.id)}><Check className="h-4 w-4" /></Button>
                        </>
                      )}
                      <Button variant="outline" onClick={() => deleteTask(task.id)}><Trash className="h-4 w-4" /></Button>
                    </div>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {task.completed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-red-500">{formatDistanceToNow(task.deadline, { addSuffix: true })}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Time Remaining: {task.completed ? '00:00' : new Date(task.time).toISOString().substr(11, 8)}</span>
                {!task.completed && (
                  <Button onClick={() => startTimer(task.id)}>Start Timer</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
