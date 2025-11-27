import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Local storage fallback functions
const STORAGE_KEY = 'kanban_tasks';

export const getTasksFromLocalStorage = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const createTaskInLocalStorage = (taskData) => {
  const tasks = getTasksFromLocalStorage();
  const newTask = {
    id: `local_${Date.now()}`,
    ...taskData,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasksToLocalStorage(tasks);
  return newTask;
};

export const updateTaskInLocalStorage = (id, updates) => {
  const tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.findIndex(task => {
    const taskId = task.id || task._id;
    return taskId === id || taskId?.toString() === id?.toString();
  });
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    saveTasksToLocalStorage(tasks);
    return tasks[taskIndex];
  }
  throw new Error('Task not found');
};

export const deleteTaskFromLocalStorage = (id) => {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter(task => {
    const taskId = task.id || task._id;
    return taskId !== id && taskId?.toString() !== id?.toString();
  });
  saveTasksToLocalStorage(filteredTasks);
};

// API functions
export const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch tasks from server');
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to create task on server');
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to update task on server');
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to delete task from server');
  }
};