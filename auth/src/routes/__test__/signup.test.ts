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

    it('duplicate email', function() {
        request(app)
          .post('/api/users/signup')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send({email: 'test@test.com', password: 'asdfghjkl'})
          .expect(201);

          request(app)
          .post('/api/users/signup')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send({email: 'test@test.com', password: 'asdfghjkl'})
          .expect(400);
      });

    it('invalid email', function(done) {
      request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'testtest.com', password: 'asdfghjkl'})
        .expect(400, done);
    });
    it('invalid password', function(done) {
      request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com', password: 'as'})
        .expect(400, done);
    });
    it('missing email', function(done) {
      request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({ password: 'asdfghjkl'})
        .expect(400, done);
    });
    it('missing password', function(done) {
      request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({email: 'test@test.com'})
        .expect(400, done);
    });

    it('sets a cookie after a successful signup', async function() {
        const response = await request(app)
          .post('/api/users/signup')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send({email: 'test@test.com', password: 'asdfghjkl'})
          .expect(201);
          
          expect(response.get('Set-Cookie')).toBeDefined();
      });
  });