# MERN Application

[Visit Remindertools.com](https://remindertools.com/)

![Preview of Remindertools](https://remindertools.com/remindertools_cozy_landing.png)

This is a **MERN stack** application built to manage user authentication, tasks, and other functionality. The application uses **React** for the frontend, **Node.js/Express** for the backend, **MongoDB** as the database, and **JWT** for secure authentication.

---

## Features

- **Authentication**: User registration, login, and token-based authentication using JWT.
- **Task Management**: Manage tasks with CRUD operations.
- **User Management**: Handle user data securely.
- **Frontend Integration**: React-based client integrated with the backend.
- **Secure Routes**: Middleware for token validation to protect API endpoints.
- **Environment Configuration**: Environment variables managed using `dotenv`.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Vite**: For faster development and build processes.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for managing APIs.
- **JWT**: For secure token-based authentication.
- **Cookie-Parser**: For handling cookies in requests.
- **Morgan**: For request logging during development.

### Database
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally or on a remote server)

---

### Backend Setup

1. **Install backend dependencies**
   ```bash
   npm install
2. **Set up environment variables:**
   ```plaintext
    TOKEN_JWT=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string

3. **Start the backend server**
   ```bash
   npm run dev

### Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd client

2. **Install frontend dependencies:**
   ```bash
   npm install

3. **Start the development server**:
   ```bash
   npm run dev

## Important!

4. **Development Configuration:**
    While in development mode, all frontend routes requiring API calls must include the complete backend URL. For example:
   ```javascript
   const loginUrl = "http://localhost:PORT/login"; // Replace PORT with your backend port number