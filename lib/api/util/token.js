'use strict';

import jwt from 'jsonwebtoken';

const createToken = (user) => {
    // Sign the JWT
    return jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: "1d"
        }
    );
}

export { createToken };
