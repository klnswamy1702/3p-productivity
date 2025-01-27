// src/components/ParetoPrinciple.tsx
"use client"
// import React, { useState } from "react";

// export const ParetoPrinciple = () => {
//   const [tasks, setTasks] = useState<string[]>([]);
//   const [input, setInput] = useState("");

//   const addTask = () => {
//     if (input.trim()) {
//       setTasks((prev) => [...prev, input.trim()]);
//       setInput("");
//     }
//   };

//   const top20Percent = Math.ceil(tasks.length * 0.2);

//   return (
//     <div className="p-4 border rounded-xl shadow-md max-w-sm mx-auto mt-6">
//       <h2 className="text-xl font-semibold mb-4">Pareto Principle</h2>
//       <p className="text-sm mb-4">
//         The 80-20 rule asserts that 80% of outcomes result from 20% of causes.
//         Identify and focus on the 20% of tasks that yield the highest impact.
//       </p>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Add a task..."
//           className="w-full p-2 border rounded mb-2"
//         />
//         <button
//           onClick={addTask}
//           className="w-full bg-green-500 text-white py-2 rounded"
//         >
//           Add Task
//         </button>
//       </div>
//       <ul className="list-disc pl-5">
//         {tasks.map((task, index) => (
//           <li
//             key={index}
//             className={index < top20Percent ? "font-bold text-blue-500" : ""}
//           >
//             {task}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Check } from 'lucide-react';

export function ParetoPrinciple() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleAddTask = () => {
    if (tasks.length < 3) {
      if (newTask.trim() !== '') {
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
      } else {
        setError('Please enter a task');
      }
    } else {
      setError('You can only add up to 3 tasks');
    }
  };

  const handleEditTask = (index, taskText) => {
    setEditingTask(index);
    setEditedTaskText(taskText);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedTaskText;
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleCancelEditTask = () => {
    setEditingTask(null);
  };

  const handleMarkTaskAsComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Pareto's Principle Task Manager</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="w-full"
        />
        <Button onClick={handleAddTask} className="mt-2">
          Add Task
        </Button>
        <ul className="list-none mt-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center mb-2">
              {editingTask === index ? (
                <div className="flex items-center">
                  <Input
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    onClick={() => handleSaveTask(index)}
                    className="ml-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancelEditTask}
                    className="ml-2"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <span
                  className={`text-lg ${
                    task.completed ? 'text-gray-500 line-through' : 'text-black'
                  }`}
                >
                  {task.text}
                </span>
              )}
              <Button
                onClick={() => handleMarkTaskAsComplete(index)}
                className="ml-2"
              >
                <Check className="h-4 w-4" />
              </Button>
              {editingTask !== index && (
                <Button
                  onClick={() => handleEditTask(index, task.text)}
                  className="ml-2"
                >
                  Edit
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}