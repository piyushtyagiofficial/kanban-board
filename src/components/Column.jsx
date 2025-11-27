import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useTask } from '../context/TaskContext';
import { Plus } from 'lucide-react';

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

  const getColumnColor = () => {
    switch (column.id) {
      case 'todo': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="glass rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 shadow-premium hover:shadow-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-6 rounded-full ${getColumnColor()}`}></div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">{column.title}</h3>
        </div>
        <span className={`${getColumnColor()} text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-sm`}>
          {tasks.length}
        </span>
      </div>
      
      <div
        className={`min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] space-y-3 p-3 sm:p-4 rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50/50 scale-[1.02] shadow-inner' 
            : `${column.color} border-opacity-50`
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
          <div className="text-center py-16 sm:py-20 text-gray-400">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full ${getColumnColor()} opacity-20 flex items-center justify-center`}>
              <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <p className="text-sm font-medium">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here or create new ones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;