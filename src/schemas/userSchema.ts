export const userCreateSchema = {
    type: 'object',
    properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string', format: 'email' }
    },
    required: ['firstname', 'lastname', 'email', 'password'],
    additionalProperties: false
};


export const userUpdateSchema = {
    type: 'object',
    properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
    },
    required: [],
    additionalProperties: false
};