import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-red-100 border-red-200' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100 border-yellow-200' },
  { id: 'done', title: 'Done', color: 'bg-green-100 border-green-200' }
];

const KanbanBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Project Board</h2>
        <button
          onClick={handleAddTask}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Plus className="h-5 w-5" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;