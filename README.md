# Task Manager Web Application

## Overview

Task Manager is a full-stack web application that allows users to register, log in, and manage their personal tasks. Users can create, update, delete, and mark tasks as completed. Each user can access only their own tasks.

The application uses a REST API, JWT authentication, and MongoDB for data storage.



## Technologies

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, dotenv
**Frontend:** HTML, CSS/Bootstrap, JavaScript (fetch API)


## Features

* User registration and login
* Password hashing with bcrypt
* JWT authentication
* CRUD operations for tasks
* Protected routes
* MongoDB database storage



## Architecture

The backend follows a modular structure:

* Models — database schemas
* Routes — API endpoints
* Controllers — business logic
* Middleware — authentication

Flow: Client → API → Database → Response



## API Endpoints

**Authentication**

* POST /api/auth/register
* POST /api/auth/login

**Tasks (Protected)**

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/:id
* DELETE /api/tasks/:id



## Setup

1. Install dependencies
   npm install

2. Create `.env` file
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_secret_key
   PORT=5000

3. Run server
   npm run dev

Server runs on http://localhost:5000




