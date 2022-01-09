import request from 'supertest';
import app from '../../app';

describe('POST /api/users/signout', function() {
    it('removes the cookie after sign out', async function() {
        await request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(201);

        const response = await request(app)
        .post('/api/users/signout')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(200);

        expect(response.get('Set-Cookie')[0]).toBe('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
    });
  });