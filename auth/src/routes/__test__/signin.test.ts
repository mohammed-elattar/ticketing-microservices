import request from 'supertest';
import app from '../../app';
import { user } from '../../tests/setup';

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
        global.signIn();
        await request(app)
        .post('/api/users/signin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({...user, password: 'wrongpassword'})
        .expect(400);
    });

    it('responds with a cookie when a valid credentials are provided', async function() {
        await global.signIn();
        const response = await request(app)
        .post('/api/users/signin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({...user})
        .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
  });