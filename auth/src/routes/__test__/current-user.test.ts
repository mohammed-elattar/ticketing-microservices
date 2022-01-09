import request from 'supertest';
import app from '../../app';

describe('POST /api/users/current-user', function() {
    it('responds with details about the current user', async function() {
        const authResponse = await request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(201);
        
        const cookie = authResponse.get('Set-Cookie');
        
        const response = await request(app)
        .get('/api/users/currentuser')
        .set('Accept', 'application/json')
        .set('Cookie', cookie)
        .expect(200);
        expect(response.body.currentUser.email).toEqual('test@test.com');
    });
  });