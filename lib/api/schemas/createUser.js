'use strict';

import Joi from 'joi';

const userValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export { userValidationSchema };
