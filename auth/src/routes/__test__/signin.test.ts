import request from 'supertest';
import app from '../../app';

describe('POST /api/users/signin', function() {
    it('fails when email which is not exist is supplied', async function() {
      await request(app)
        .post('/api/users/signin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(400);
    });
    it('fails when password which is not exist is not correct', async function() {
        await request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(201);

        await request(app)
        .post('/api/users/signin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'wrongpassword'})
        .expect(400);
    });

    it('responds with a cookie when a valid credentials are provided', async function() {
        await request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(201);

        const response = await request(app)
        .post('/api/users/signin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
  });