import React from "react";
import StreamCard from "./StreamCard";

export default function TaskStream({ tasks, dispatch }) {
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No tasks in stream
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <StreamCard
          key={task.id}
          task={task}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}