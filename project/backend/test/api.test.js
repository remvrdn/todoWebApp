import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../server.js';

describe('API Tests', () => {
  describe('POST /login', () => {
    test('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(200);
      
      assert.strictEqual(response.body.success, true);
      assert.strictEqual(response.body.message, 'Login successful');
      assert.strictEqual(response.body.user.email, 'test@example.com');
    });
    
    test('should fail with invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' })
        .expect(401);
      
      assert.strictEqual(response.body.error, 'Invalid credentials');
    });
    
    test('should fail with missing email', async () => {
      const response = await request(app)
        .post('/login')
        .send({ password: 'password123' })
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Email and password are required');
    });
    
    test('should fail with missing password', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com' })
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Email and password are required');
    });
  });
  
  describe('GET /items', () => {
    test('should return items array', async () => {
      const response = await request(app)
        .get('/items')
        .expect(200);
      
      assert(Array.isArray(response.body));
      assert(response.body.length >= 0);
    });
  });
  
  describe('POST /items', () => {
    test('should create new item with valid data', async () => {
      const newItem = {
        name: 'Test Item',
        description: 'Test Description'
      };
      
      const response = await request(app)
        .post('/items')
        .send(newItem)
        .expect(201);
      
      assert.strictEqual(response.body.name, newItem.name);
      assert.strictEqual(response.body.description, newItem.description);
      assert(typeof response.body.id === 'number');
    });
    
    test('should fail with missing name', async () => {
      const response = await request(app)
        .post('/items')
        .send({ description: 'Test Description' })
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Name is required and must be a non-empty string');
    });
    
    test('should fail with empty name', async () => {
      const response = await request(app)
        .post('/items')
        .send({ name: '   ', description: 'Test Description' })
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Name is required and must be a non-empty string');
    });
    
    test('should fail with missing description', async () => {
      const response = await request(app)
        .post('/items')
        .send({ name: 'Test Item' })
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Description is required and must be a non-empty string');
    });
  });
  
  describe('PUT /items/:id', () => {
    test('should update existing item', async () => {
      // First create an item
      const createResponse = await request(app)
        .post('/items')
        .send({ name: 'Original Name', description: 'Original Description' });
      
      const itemId = createResponse.body.id;
      
      // Then update it
      const updateData = {
        name: 'Updated Name',
        description: 'Updated Description'
      };
      
      const response = await request(app)
        .put(`/items/${itemId}`)
        .send(updateData)
        .expect(200);
      
      assert.strictEqual(response.body.name, updateData.name);
      assert.strictEqual(response.body.description, updateData.description);
      assert.strictEqual(response.body.id, itemId);
    });
    
    test('should fail with invalid ID', async () => {
      const response = await request(app)
        .put('/items/invalid')
        .send({ name: 'Test', description: 'Test' })
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Invalid ID format');
    });
    
    test('should fail with non-existent ID', async () => {
      const response = await request(app)
        .put('/items/99999')
        .send({ name: 'Test', description: 'Test' })
        .expect(404);
      
      assert.strictEqual(response.body.error, 'Item not found');
    });
  });
  
  describe('DELETE /items/:id', () => {
    test('should delete existing item', async () => {
      // First create an item
      const createResponse = await request(app)
        .post('/items')
        .send({ name: 'To Delete', description: 'Will be deleted' });
      
      const itemId = createResponse.body.id;
      
      // Then delete it
      const response = await request(app)
        .delete(`/items/${itemId}`)
        .expect(200);
      
      assert.strictEqual(response.body.message, 'Item deleted successfully');
      assert.strictEqual(response.body.item.id, itemId);
    });
    
    test('should fail with invalid ID', async () => {
      const response = await request(app)
        .delete('/items/invalid')
        .expect(400);
      
      assert.strictEqual(response.body.error, 'Invalid ID format');
    });
    
    test('should fail with non-existent ID', async () => {
      const response = await request(app)
        .delete('/items/99999')
        .expect(404);
      
      assert.strictEqual(response.body.error, 'Item not found');
    });
  });
  
  describe('Health Check', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      assert.strictEqual(response.body.status, 'OK');
      assert(response.body.timestamp);
    });
  });
});