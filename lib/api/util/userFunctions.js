'use strict';

import Boom from 'boom';
import bcrypt from 'bcrypt';
import { User } from '../model/User';

const verifyUniqueUser = (req, res) => {
    // Find an entry from the database that matches either the email or username
    User.findOne({
        $or: [
            { email: req.payload.email },
            { username: req.payload.username }
        ]
    }, (err, user) => {
        // Check whether the username or email is already taken and error out if so
        if (user) {
            if (user.username === req.payload.username) {
                return res(Boom.badRequest('Username taken'));
            }
            if (user.email === req.payload.email) {
                return res(Boom.badRequest('Email taken'));
            }
        }
        // If everything checks out, send the payload through to the route handler
        return res(req.payload);
    });
}

const verifyCredentials = (req, res) => {
    const password = req.payload.password;

    // Find an entry from the database that matches either the email or username
    User.findOne({
        $or: [
            { email: req.payload.email },
            { username: req.payload.username }
        ]
    }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (isValid) {
                    return res(user);
                }
                else {
                    return res(Boom.badRequest('Incorrect password!'));
                }
            });
        } else {
            return res(Boom.badRequest('Incorrect username or email!'));
        }
    });
}


export { verifyUniqueUser, verifyCredentials };
