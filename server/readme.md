# Node.js Express Server with MongoDB and Additional Features

## Overview

This repository contains the implementation of a Node.js server using the Express framework, MongoDB for the database, bcryptjs for password encryption, JWT tokens for access token generation and verification, and Cashfree for payment generation and verification.

Installation
To install the required dependencies, navigate to the directory where you'd like to store your project and use the following commands:

```
mkdir node-express-server
cd node-express-server
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cashfree --save
npm install nodemon --save-dev
```

Server Setup
The server is set up using Express by configuring the main server file as server.js. Here's a high-level overview of the setup process:

Initialize the Express app, set up middleware, and connect to MongoDB.
Implement user authentication and authorization with bcryptjs for encryption, JWT for access tokens, and user-protected and admin-protected routes for user and admin-specific functionality.
Integrate Cashfree for payment generation and verification.
API Endpoints
User Authentication:

POST /api/auth/register - Register a new user
POST /api/auth/login - User login and token generation
GET /api/auth/user - User profile (user-protected route)
PUT /api/auth/user/:id - Update user information (user-protected route)
DELETE /api/auth/user/:id - Delete user account (admin-protected route)
User Management:

GET /api/users - Get all users (admin-protected route)
GET /api/users/:id - Get a specific user (admin-protected route)
PUT /api/users/:id - Update user information (admin-protected route)
DELETE /api/users/:id - Delete a user account (admin-protected route)
Payment Processing:

POST /api/payment/generate - Generate a payment link
POST /api/payment/verify - Verify the payment status
Middleware
Auth Middleware - Verifies the user's access token in the request header and matches it with the user's ID for user-protected routes.
Admin Middleware - Restricts access to admin-specific API endpoints.
Running the Server
Start the server using the following command:

bash

npm start
To run the server in development mode with automatic restart on file changes, use the following command:

bash

npm run dev
That's a brief introduction to the Node.js server with Express, MongoDB, and additional features. Further details about the routes, middleware, and server setup can be found in the codebase.

For additional details about the implemented API endpoints, middleware, or server setup, please refer to the source code.
