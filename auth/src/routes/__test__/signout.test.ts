import request from 'supertest';
import app from '../../app';
import { user } from '../../tests/setup';

describe('POST /api/users/signout', function() {
    it('removes the cookie after sign out', async function() {
        await global.signIn();

        const response = await request(app)
        .post('/api/users/signout')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({...user})
        .expect(200);

        expect(response.get('Set-Cookie')[0]).toBe('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
    });
  });