import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let items = [
  { id: 1, name: 'Sample Item 1', description: 'This is a sample item for testing' },
  { id: 2, name: 'Sample Item 2', description: 'Another sample item' }
];
let nextId = 3;

// Validation middleware
const validateItem = (req, res, next) => {
  const { name, description } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Name is required and must be a non-empty string' 
    });
  }
  
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Description is required and must be a non-empty string' 
    });
  }
  
  next();
};

// Routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  if (email === 'test@example.com' && password === 'password123') {
    return res.json({ 
      success: true, 
      message: 'Login successful',
      user: { email: 'test@example.com' }
    });
  }
  
  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', validateItem, (req, res) => {
  const { name, description } = req.body;
  
  const newItem = {
    id: nextId++,
    name: name.trim(),
    description: description.trim()
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', validateItem, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items[itemIndex] = {
    ...items[itemIndex],
    name: name.trim(),
    description: description.trim()
  };
  
  res.json(items[itemIndex]);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json({ message: 'Item deleted successfully', item: deletedItem });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
  });
});

export default app;