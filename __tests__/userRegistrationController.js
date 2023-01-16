const { userRegistrationController } = require('../src/controllers/users');
const authService = require('../src/services/authService');

jest.mock('../src/services/authService');

describe('test POST user/signup controller:', function () {
  const reqMock = {
    body: {
      email: 'email@email.com',
      password: 'password123',
    },
  };

  const resMock = {
    status: jest.fn(),
    json: jest.fn(),
  };

  const createdUserMock = {
    email: 'email@email.com',
    subscription: 'starter',
    avatarURL: '/some/path',
  };

  authService.createUser.mockResolvedValue(createdUserMock);

  test('status code is 201 in response status;', async () => {
    await userRegistrationController(reqMock, resMock);

    expect(resMock.status).lastCalledWith(201);
  });

  test('user credentials are returned in response json;', async () => {
    await userRegistrationController(reqMock, resMock);

    const [userCredentials] = resMock.json.mock.lastCall;

    expect(userCredentials).toEqual(createdUserMock);
  });
});
