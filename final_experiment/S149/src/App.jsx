import React from "react";
import TaskWriter from "./components/TaskWriter";
import TaskStream from "./components/TaskStream";
import StreamFilter from "./components/StreamFilter";
import StreamMeta from "./components/StreamMeta";
import { useStream } from "./hooks/useStream";
import { useStreamStorage } from "./hooks/useStreamStorage";

export default function App() {
  const { state, dispatch, filteredTasks } = useStream();
  useStreamStorage(state.tasks, dispatch);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Task Stream
        </h1>

        <TaskWriter dispatch={dispatch} />

        <StreamFilter
          filter={state.filter}
          dispatch={dispatch}
        />

        <TaskStream
          tasks={filteredTasks}
          dispatch={dispatch}
        />

        <StreamMeta
          tasks={state.tasks}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}