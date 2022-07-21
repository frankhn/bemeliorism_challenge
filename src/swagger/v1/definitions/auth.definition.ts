export default {
  AuthLoginSchema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        description: 'Content',
        type: 'string',
        example: 'harfrank2@gmail.com',
      },
      password: {
        description: 'Password',
        type: 'string',
        example: '********',
      },
    },
  },
  AuthCreateSchema: {
    type: 'object',
    required: ['name', 'email', 'dateOfBirth', 'password'],
    properties: {
      name: {
        description: 'name',
        type: 'string',
        example: 'al',
      },
      email: {
        description: 'email',
        type: 'string',
        example: 'mika',
      },
      dateOfBirth: {
        description: 'Content',
        type: 'ObjectId',
        example: '20/05/2021',
      },
      password: {
        description: 'password',
        type: 'string',
        example: 'mika232',
      },
    },
  },
  AuthCurrentUserSchema: {
    type: 'object',
  },
};
