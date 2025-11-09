import Task from '../models/Task.js';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getAllTasks = async (req, res, next) => {
  try {
    const { status, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // Build query - only get tasks for logged in user
    const query = { user: req.user.id };
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    
    const tasks = await Task.find(query).sort(sortOptions);
    
    res.json({
      status: 'success',
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }
    
    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to access this task'
      });
    }
    
    res.json({
      status: 'success',
      data: task
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid task ID format'
      });
    }
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status: status || 'Pending',
      dueDate
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }
    
    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this task'
      });
    }
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        dueDate
      },
      {
        new: true, // Return updated document
        runValidators: true // Run model validators
      }
    );
    
    res.json({
      status: 'success',
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid task ID format'
      });
    }
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }
    
    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this task'
      });
    }
    
    await task.deleteOne();
    
    res.json({
      status: 'success',
      message: 'Task deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid task ID format'
      });
    }
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await Task.countDocuments({ user: req.user.id });
    
    const statsObject = {
      total,
      pending: 0,
      inProgress: 0,
      completed: 0
    };
    
    stats.forEach(stat => {
      if (stat._id === 'Pending') statsObject.pending = stat.count;
      if (stat._id === 'In-progress') statsObject.inProgress = stat.count;
      if (stat._id === 'Completed') statsObject.completed = stat.count;
    });
    
    res.json({
      status: 'success',
      data: statsObject
    });
  } catch (error) {
    next(error);
  }
};
