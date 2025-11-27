import React, { createContext, useContext, useReducer, useEffect } from 'react';

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
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
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
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      // Fallback to localStorage
      dispatch({ type: 'SET_TASKS', payload: localTasks });
    }
  };

  const addTask = async (taskData) => {
    try {
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      // Fallback to localStorage
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }
  };

  const updateTask = async (id, updates) => {
    try {
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      // Fallback to localStorage
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    }
  };

  const deleteTask = async (id) => {
    try {
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      // Fallback to localStorage
      dispatch({ type: 'DELETE_TASK', payload: id });
    }
  };

  const moveTask = async (id, newStatus) => {
    await updateTask(id, { status: newStatus });
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