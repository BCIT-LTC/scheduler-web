const jwt = require('jsonwebtoken');
const passport = require('../../middleware/passport');

// Import samlStrategy
const samlStrategy = passport._strategies.samlStrategy;

// Mock profile data
const mockProfile = {
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'user',
    school: 'Example School',
    program: 'Example Program'
};

// Mock done function
const mockDone = jest.fn();

// Spy on jwt.sign to verify it's called with the expected arguments
jest.spyOn(jwt, 'sign');

describe('samlStrategy', () => {
    it('should generate JWT token', async () => {
        // Call the samlStrategy callback function with the mock profile and done function
        await samlStrategy._verify(mockProfile, mockDone);

        // Assert that the done function was called
        expect(mockDone).toHaveBeenCalled();

        // Assert that jwt.sign is called with the expected arguments
        expect(jwt.sign).toHaveBeenCalledWith(
            expect.objectContaining({
                email: mockProfile.email,
                first_name: mockProfile.first_name,
                last_name: mockProfile.last_name,
                role: mockProfile.role,
                school: mockProfile.school,
                program: mockProfile.program,
                authorization_checked: false,
                is_logged_in: true
            }),
            process.env.JWT_AUTH_SIGNING_KEY
        );
    });
});
