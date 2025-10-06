const request = require('supertest');
const app = require('../index.js');

// Add beforeAll and afterAll hooks
let server;

beforeAll(async () => {
  const PORT = process.env.TEST_PORT || 8001;
  server = app.listen(PORT);
  return new Promise((resolve) => server.once('listening', resolve));
});

afterAll(async () => {
  return new Promise((resolve) => server.close(resolve));
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