const jwt = require('jsonwebtoken');
const saml = require('passport-saml');
jest.mock('jsonwebtoken');
jest.mock('passport-saml');

describe('samlStrategy used by the passport', () => {
  it('should return a jwtToken with correct values', done => {
    // Mock jwt.sign to return a predefined token
    jwt.sign.mockReturnValue('mockToken');

    // Mock saml.Strategy
    saml.Strategy.mockImplementation((config, callback) => {
      // Call the callback with a predefined profile
      callback(null, {
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'testRole',
        school: 'testSchool',
        program: 'testProgram'
      }, (err, user) => {
        // Decode the token
        const decoded = jwt.decode(user.token);

        // Check if the fields exist and have correct values
        expect(decoded).toHaveProperty('email', 'test@example.com');
        expect(decoded).toHaveProperty('first_name', 'Test');
        expect(decoded).toHaveProperty('last_name', 'User');
        expect(decoded).toHaveProperty('role', 'testRole');
        expect(decoded).toHaveProperty('school', 'testSchool');
        expect(decoded).toHaveProperty('program', 'testProgram');
        expect(decoded).toHaveProperty('authorization_checked', false);
        expect(decoded).toHaveProperty('is_logged_in', true);

        done();
      });
    });
  });
});