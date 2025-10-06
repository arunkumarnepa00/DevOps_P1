const request = require('supertest');
const app = require('../index.js');

// Add timeout configuration at top
jest.setTimeout(10000);


// Add cleanup after all tests
afterAll(async () => {
  // Close any remaining connections
  await new Promise(resolve => setTimeout(resolve, 500));
  // If app has a close/shutdown method, call it here
  if (app.close) {
    await app.close();
  }
});


describe('GET /', () => {
  it('should return "Hello, World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});

describe('GET /api/users', () => {
    it('should return a list of users', async () => {   
        const response = await request(app).get('/api/users');  
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ]);
    });

    it('should handle invalid routes', async () => {
        const response = await request(app).get('/api/invalid');
        expect(response.status).toBe(404);
    });

    it('should return a list of users with correct types', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('id', expect.any(Number));
        expect(response.body[0]).toHaveProperty('name', expect.any(String));
    });
});