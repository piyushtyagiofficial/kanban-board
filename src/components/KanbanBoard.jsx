import React, { useState } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import { useTask } from '../context/TaskContext';
import { Plus } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-red-100 border-red-200' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100 border-yellow-200' },
  { id: 'done', title: 'Done', color: 'bg-green-100 border-green-200' }
];

const KanbanBoard = () => {
  const { tasks, loading } = useTask();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Project Board
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={handleAddTask}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 shadow-premium hover:shadow-hover transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {COLUMNS.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={getTasksByStatus(column.id)}
            onEditTask={handleEditTask}
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;

