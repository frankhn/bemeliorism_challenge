import { customResponse } from '../constants/responses';

export default {
  '/auth/signup': {
    post: {
      tags: ['Authentication'],
      summary: 'Create a account',
      parameters: [
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/AuthCreateSchema',
          },
        },
      ],
      responses: customResponse({
        201: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 201,
              },
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/AuthCreateSchema',
                },
              },
            },
          },
        },
      }),
    },
  },
  '/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Login',
      parameters: [
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/AuthLoginSchema',
          },
        },
      ],
      responses: customResponse({
        201: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 201,
              },
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/AuthLoginSchema',
                },
              },
            },
          },
        },
      }),
    },
  },
  '/auth/me': {
    get: {
      tags: ['Authentication'],
      summary: 'Currenct authenticated user',
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'JWT Web Token',
          type: 'string',
          required: true,
          example: 'JWT token',
        },
      ],
      responses: customResponse({
        201: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 201,
              },
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/AuthCurrentUserSchema',
                },
              },
            },
          },
        },
      }),
    },
  },
};
