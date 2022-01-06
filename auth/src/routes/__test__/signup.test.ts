import request from 'supertest';
import app from '../../app';

describe('POST /api/users/signup', function() {
    it('create a user', function(done) {
      request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'asdfghjkl'})
        .expect(201, done);
    });
  });