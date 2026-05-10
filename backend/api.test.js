import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index.js';

describe('API Endpoints', () => {
  it('GET /tasks should return all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'AI által tesztelt feladat' }); // JAVÍTVA: text helyett title
    
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('AI által tesztelt feladat'); // JAVÍTVA: title
});
});