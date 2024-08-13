import request from 'supertest';
import app from '../src/app';

describe('GET /items', () => {
  it('should return items with prices', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
