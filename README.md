# Hapi User Authentication Service

This is a Hapi service for authenticating users.

There are routes for an initial sign-up `/api/users` and also subsequent authentications `/api/users/authenticate`.

The initial signup requires a username, email and password. Upon successful signup, the application returns a JWT valid for one day. Subsequent authentications check for either username or email and password and also return a JWT valid for one day.

The application uses MongoDB 3.2, so you'll need to have it installed locally.

For development, run:

`$ npm install`

Create a `.env` file in the project root based on the examples in the `.env.example` file.

Start the application with:

`$ npm run start`

For production, build the application with Babel:

`$ npm run build`

This will compile the application and output the result into a directory named `dist`.
