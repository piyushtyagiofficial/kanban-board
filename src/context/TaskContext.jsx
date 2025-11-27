import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          const taskId = (task.id || task._id)?.toString();
          const payloadId = (action.payload.id || action.payload._id)?.toString();
          return taskId === payloadId ? action.payload : task;
        })
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => {
          const taskId = (task.id || task._id)?.toString();
          const deleteId = action.payload?.toString();
          return taskId !== deleteId;
        })
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  loading: true,
  error: null
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const tasks = await taskService.getTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      // Fallback to localStorage
      const localTasks = taskService.getTasksFromLocalStorage();
      dispatch({ type: 'SET_TASKS', payload: localTasks });
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      // Fallback to localStorage
      const newTask = taskService.createTaskInLocalStorage(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      console.error('API update failed, trying localStorage:', error);
      // Fallback to localStorage
      try {
        const updatedTask = taskService.updateTaskInLocalStorage(id, updates);
        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      } catch (localError) {
        console.error('LocalStorage update also failed:', localError);
        // Reload tasks to ensure consistency
        loadTasks();
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      console.error('API delete failed, trying localStorage:', error);
      // Fallback to localStorage
      try {
        taskService.deleteTaskFromLocalStorage(id);
        dispatch({ type: 'DELETE_TASK', payload: id });
      } catch (localError) {
        console.error('LocalStorage delete also failed:', localError);
        // Reload tasks to ensure consistency
        loadTasks();
      }
    }
  };

  const moveTask = async (id, newStatus) => {
    try {
      // Find the current task to preserve other fields
      const currentTask = state.tasks.find(task => {
        const taskId = (task.id || task._id)?.toString();
        return taskId === id?.toString();
      });
      
      if (currentTask) {
        await updateTask(id, { 
          title: currentTask.title,
          description: currentTask.description,
          status: newStatus 
        });
      } else {
        throw new Error('Task not found for move operation');
      }
    } catch (error) {
      console.error('Error moving task:', error);
      // Reload tasks to ensure consistency
      loadTasks();
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        loadTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};