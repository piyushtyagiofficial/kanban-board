import React from 'react';
import { Calendar, CreditCard as Edit, Trash2, GripVertical } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useTask();

  const handleDragStart = (e) => {
    const taskId = (task.id || task._id)?.toString();
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceStatus', task.status);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      const taskId = (task.id || task._id)?.toString();
      deleteTask(taskId);
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'todo': return 'border-l-red-400';
      case 'in-progress': return 'border-l-yellow-400';
      case 'done': return 'border-l-green-400';
      default: return 'border-l-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`relative group bg-white rounded-xl p-4 shadow-premium hover:shadow-hover transition-all duration-300 cursor-move border-l-4 ${getStatusColor()} hover:scale-[1.02] active:scale-100`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      
      <div className="flex items-start justify-between pr-6">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
          <Calendar className="h-3 w-3 mr-1.5" />
          {formatDate(task.createdAt)}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;