import Task from '../models/Task.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = asyncHandler(async (req, res) => {
  const { status } = req.query;
  
  let query = {};
  if (status) {
    query.status = status;
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  
  res.status(200).json(tasks);
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description: description || '',
    status: status || 'todo'
  });

  res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await Task.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
});