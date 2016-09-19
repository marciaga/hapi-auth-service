'use strict';

import User from '../model/User';
import authenticateUserSchema from '../schemas/authenticateUser';
import { verifyCredentials } from '../util/userFunctions';
import { createToken } from '../util/token';

const usersAuthenticate = {
    method: 'POST',
    path: '/api/users/authenticate',
    config: {
        // Check the user's password against the DB
        pre: [
            { method: verifyCredentials, assign: 'user' } // the assign is the key referenced below in req.pre.user
        ],
        handler: (req, res) => {

            // If the user's password is correct, we can issue a token.
            // If it was incorrect, the error will bubble up from the pre method
            res({ id_token: createToken(req.pre.user) }).code(201);
        },
        validate: {
            payload: authenticateUserSchema
        }
    }
}

export { usersAuthenticate };
