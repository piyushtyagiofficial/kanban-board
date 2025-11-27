export const validateTask = (req, res, next) => {
  const { title, status } = req.body;
  const errors = [];

  // Only validate title if it's provided (for updates)
  if (title !== undefined) {
    if (!title || title.trim().length === 0) {
      errors.push('Title is required');
    } else if (title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }
  }

  // Validate status
  if (status && !['todo', 'in-progress', 'done'].includes(status)) {
    errors.push('Status must be either todo, in-progress, or done');
  }

  // Validate description length
  if (req.body.description && req.body.description.length > 500) {
    errors.push('Description cannot exceed 500 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};