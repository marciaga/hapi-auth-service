'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
export { User };
