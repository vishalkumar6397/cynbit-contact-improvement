
# Cynbit Contact Form Improvement

A full-stack contact inquiry application developed as part of the Cynbit Full Stack Developer Intern assessment.

## Live Demo

Frontend: https://cynbit-contact-improvement.vercel.app/

Backend: https://cynbit-contact-improvement.onrender.com/

## Features

- Responsive contact form
- Full Name, Email, Phone, Company and Industry fields
- Client-side form validation
- Backend API integration
- Server-side input validation
- MongoDB database integration
- Successful inquiry submission feedback
- CORS configuration for frontend and backend communication

## Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Deployment**
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## Project Structure

```text
cynbit-contact-improvement/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── public/
├── src/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/vishalkumar6397/cynbit-contact-improvement.git
cd cynbit-contact-improvement
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure frontend environment

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start frontend

```bash
npm run dev
```

### 5. Configure backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 6. Start backend

```bash
node server.js
```

## API Endpoint

**POST** `/api/inquiries`

Submits contact inquiry details and stores them in MongoDB.

## Environment Variables

Never commit `.env` files or expose database credentials.

## Author

Vishal Kumar
