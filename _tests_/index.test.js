const request = require('supertest');
const app = require('../index.js');

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
});