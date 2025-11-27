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
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move border-l-4 ${getStatusColor()} group`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(task.createdAt)}
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;