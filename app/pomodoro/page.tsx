// src/components/PomodoroTimer.tsx
"use client";
import React, { useState, useEffect } from "react";

export const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25); // in minutes
  const [breakTime, setBreakTime] = useState(5); // in minutes
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!isRunning && timer) {
      clearInterval(timer);
    }
    return () => timer && clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsWorkMode(!isWorkMode);
      setTimeLeft((isWorkMode ? breakTime : workTime) * 60);
    }
  }, [timeLeft, isWorkMode, breakTime, workTime]);

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Pomodoro Principle</h2>
      <p className="text-sm mb-4">
        The Pomodoro Technique is a time management method that encourages
        focused work sessions followed by short breaks to maximize
        productivity.
      </p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="block text-sm">Work (min):</label>
          <input
            type="number"
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
            className="w-16 p-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Break (min):</label>
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
            className="w-16 p-1 border rounded"
          />
        </div>
      </div>
      <div className="text-center text-xl mb-4">
        {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}
        :
        {Math.floor(timeLeft % 60)
          .toString()
          .padStart(2, "0")}
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(workTime * 60);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
