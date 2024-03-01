// Import necessary modules and functions for testing
const express = require('express');
const supertest = require('supertest');
const router = require('../../routes/check_authorization');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// Mock the fetch function
global.fetch = jest.fn();

describe('Authorization Route', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/auth/authorize', router);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should redirect to / on successful authorization and jwt token set', async () => {
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'user',
        school: 'Test School',
        program: 'Test Program'
      })
    });

    const response = await supertest(app)
      .post('/auth/authorize')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(302); // Check for redirect status
    expect(response.headers['set-cookie']).toBeTruthy(); // Check if cookie is set

    // Check if authroized_checked and is_logged_in are set to true in the cookie
    const cookies = response.headers['set-cookie'].map(cookie.parse);
    const jwtToken = cookies.find(c => c.jwt).jwt; 
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_AUTH_SIGNING_KEY); 
    expect(decodedToken.authorization_checked).toBe(true);
    expect(decodedToken.is_logged_in).toBe(true);

    expect(response.headers.location).toBe('/'); // Check if redirected to '/'
  });

  it('should handle API bad request error', async () => {
    // Mock API response with error
    fetch.mockResolvedValueOnce({
      status: 400,
      json: async () => ({ error: 'error 400' })
    });

    const response = await supertest(app)
      .post('/auth/authorize')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad request sent to API: error 400'); 
  });

  it('should handle API cannot perform request error', async () => {
    // Mock API response with error
    fetch.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ error: 'error 500' })
    });

    const response = await supertest(app)
      .post('/auth/authorize')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('API cannot perform the request: error 500'); 
  });

  it('should handle API unknown error', async () => {
    // Mock API response with error
    fetch.mockResolvedValueOnce({
      status: 403,
      json: async () => ({ error: 'unkown error' })
    });

    const response = await supertest(app)
      .post('/auth/authorize')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Unknown error: unkown error'); 
  });

  it('should handle API unreachable error', async () => {
    // Mock API call to throw an error
    fetch.mockRejectedValueOnce(new Error('could not connect to API'));

    const response = await supertest(app)
      .post('/auth/authorize')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(500); 
    expect(response.body.error).toBe('API unreachable: could not connect to API'); 
  });
});
