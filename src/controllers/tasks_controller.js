import Task from '../models/task_model.js';
import { format } from 'date-fns';
import jwt from 'jsonwebtoken';

// Get all tasks
export const getAllTasks = async (req, res) => {
  const token = req.cookies.token;

  //console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_JWT);
    const userId = decoded.id;

    // Fetch tasks by userId
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, due } = req.body;

  const token = req.cookies.token;

  console.log(req.body);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!title || !description || !due) {
    return res.status(400).json({ message: 'Please fill all inputs' });
  }

  const decoded = jwt.verify(token, process.env.TOKEN_JWT);
  const userId = decoded.id;

  try {
    const date = format(new Date(), 'dd/MM/yyyy'); 

    const newTask = new Task({
      title,
      description,
      date,
      due,
      complete: false,
      userId
    });

    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.body;

  console.log(req.body);

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};
