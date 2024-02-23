const request = require('supertest');
const fetchMock = require('jest-fetch-mock');
const app = require("../../app");
const jwt = require("jsonwebtoken");
const utilities = require("../utilities");
const { token } = utilities;

describe('Authorization Endpoint', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });
  
  it('should return a 302 status and set a cookie', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ 
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User',
      role: 'admin',
      school: 'Test School',
      program: 'Test Program',
    }), { status: 200 });

    const res = await request(app)
      .post('/auth/authorize')
      .set({Authorization: token}); // set this if your endpoint requires authorization

    expect(res.statusCode).toEqual(302); // The status code should be 302 because the endpoint redirects
    expect(res.headers['set-cookie']).toBeDefined(); // Check that a cookie is set
    
    const decoded = jwt.decode(res.headers['set-cookie'][0].split('=')[1]);
    expect(decoded.authorization_checked).toBe(true);
    expect(decoded.is_logged_in).toBe(true);
    
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});