"use client";

import React, { useState } from "react";
import { Task, TaskStatus } from "../types";
import { DragDropContext } from "@hello-pangea/dnd"
import KanbanColumnHeader from "./kanban-column-header";

interface DataKanbanProps {
  data: Task[];
}

type TasksState = {
  [key in TaskStatus]: Task[];
};

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

export default function DataKanban({ data }: DataKanbanProps) {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    console.log("🚀 ~ DataKanban ~ initialTasks:", initialTasks)

    data.forEach((task) => {
        initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
  });
  return <DragDropContext onDragEnd={() => {}}>
    <div className="flex overflow-x-auto">
        {boards.map((board) => (
          <div key={board} className="flex-1 bg-muted mx-2 p-1.5 rounded-md min-w-[200px]">
            <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
            />
            {/* <div className="flex flex-col gap-2">
              {tasks[status].map((task) => (
                <div key={task.$id} className="bg-gray-100 p-2 rounded">
                  {task.name}
                </div>
              ))}
            </div> */}
          </div>
        ))}
    </div>
  </DragDropContext>;
}
