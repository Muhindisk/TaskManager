// API service layer - Connect this to your Express backend

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Handle API errors
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Fetch all tasks
export const getAllTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

// Fetch single task by ID
export const getTaskById = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

// Create new task
export const createTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

// Update task
export const updateTask = async (id, task) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

// Delete task
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};
