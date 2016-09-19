'use strict';

import Hapi from 'hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as routes from './api/routes';
// import ENV Vars
dotenv.config();

const port = 3000;
const dbUrl = process.env.DB_URL;
// Mongoose lets you use whatever promise library you want. We use the native ES6.
mongoose.Promise = global.Promise;

export const createServer = (port, dbUrl) => {

    const server = new Hapi.Server();

    server.connection({ port: port });

    server.route(
        Object.keys(routes).map(key => routes[key])
    );


    // Start the server
    server.start((err) => {
        if (err) {
            throw err;
        }
        // Once started, connect to Mongo through Mongoose
        mongoose.connect(dbUrl, {}, (err) => {
            if (err) {
                throw err;
            }
        });
        console.log(`Server running at ${server.info.uri}`);
    });
    return server;
}

createServer(port, dbUrl);
