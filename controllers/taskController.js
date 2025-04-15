const Task = require('../models/Task');
const helpers = require('../utils/helpers');

// Get all tasks with pagination and filtering
exports.getAllTasks = async (req, res, next) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const filterCompleted = req.query.filterCompleted;
    const filterPriority = req.query.filterPriority;
    
    // Build query
    const query = {};
    if (filterCompleted === 'true') query.completed = true;
    if (filterCompleted === 'false') query.completed = false;
    if (filterPriority) query.priority = filterPriority;
    
    // Calculate pagination values
    const skip = (page - 1) * limit;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query with pagination
    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Count total documents for pagination
    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);
    
    // Generate pagination data
    const pagination = helpers.generatePagination(page, totalPages, '/tasks');
    
    res.render('tasks/index', { 
      title: 'All Tasks',
      tasks,
      pagination,
      filters: {
        completed: filterCompleted,
        priority: filterPriority
      },
      sorting: {
        sortBy,
        sortOrder
      },
      helpers
    });
  } catch (error) {
    next(error);
  }
};

// Render create task form
exports.renderCreateForm = (req, res) => {
  res.render('tasks/create', { 
    title: 'Create New Task',
    helpers
  });
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate: dueDate || null
    });
    await newTask.save();
    res.redirect('/tasks');
  } catch (error) {
    next(error);
  }
};

// Get single task
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('404', { url: req.originalUrl });
    }
    res.render('tasks/show', { 
      title: task.title,
      task,
      helpers
    });
  } catch (error) {
    next(error);
  }
};

// Render edit task form
exports.renderEditForm = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('404', { url: req.originalUrl });
    }
    res.render('tasks/edit', { 
      title: `Edit: ${task.title}`,
      task,
      helpers
    });
  } catch (error) {
    next(error);
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const completed = req.body.completed === 'on';
    
    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      priority,
      completed,
      dueDate: dueDate || null
    });
    
    res.redirect(`/tasks/${req.params.id}`);
  } catch (error) {
    next(error);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  } catch (error) {
    next(error);
  }
};

// Toggle task completion status
exports.toggleComplete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('404', { url: req.originalUrl });
    }
    
    task.completed = !task.completed;
    await task.save();
    
    // Redirect back to referrer or tasks list
    const redirectUrl = req.get('Referer') || '/tasks';
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};