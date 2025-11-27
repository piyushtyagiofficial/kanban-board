import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useTask } from '../context/TaskContext';

const Column = ({ column, tasks, onEditTask }) => {
  const { moveTask } = useTask();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    const sourceStatus = e.dataTransfer.getData('sourceStatus');
    
    if (sourceStatus !== column.id) {
      moveTask(taskId, column.id);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{column.title}</h3>
        <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div
        className={`min-h-96 space-y-3 p-4 rounded-lg border-2 border-dashed ${column.color} transition-colors duration-200 ${
          isDragOver ? 'border-blue-400 bg-blue-50' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.map(task => (
          <TaskCard
            key={task.id || task._id}
            task={task}
            onEdit={() => onEditTask(task)}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here or create new ones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;