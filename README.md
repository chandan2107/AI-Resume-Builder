# AI-Powered Resume Builder

A full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) that helps users create professional, ATS-friendly resumes in minutes.

## Features

- **Multiple Templates**: Choose from a variety of beautifully designed, professional templates including Classic, Modern, Minimal, Creative, Harvard, and more.
- **Real-Time Preview**: See your resume update instantly as you type in your details.
- **Color Customization**: Personalize your resume with a wide range of accent colors.
- **Smart Sections**: Dedicated forms for Personal Info, Professional Summary, Experience, Education, Projects, and Skills.
- **Export to PDF**: Download your finished resume instantly in a high-quality PDF format.
- **Privacy Controls**: Choose to keep your resume private or make it public to share via a unique link.
- **User Authentication**: Secure signup and login to save and manage multiple resumes.

## Tech Stack

**Frontend:**
- React (with Vite)
- Tailwind CSS for styling
- Redux Toolkit for state management
- React Router DOM for navigation
- Lucide React for consistent iconography

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose for the database
- JSON Web Tokens (JWT) for authentication

## Project Structure

The project is structured as a monorepo with separate `client` and `server` directories.

```bash
ResumeBuilder/
├── client/          # React frontend application
│   ├── src/         # Source components, pages, and assets
│   ├── public/      # Static files
│   └── package.json # Frontend dependencies
├── server/          # Node.js backend application
│   ├── controllers/ # API logic
│   ├── models/      # MongoDB schemas
│   ├── routes/      # Express API routes
│   └── package.json # Backend dependencies
└── README.md        # Project documentation
```

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or a MongoDB Atlas URI

### Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd ResumeBuilder
   ```

2. **Backend Setup:**
   Navigate into the `server` directory, install dependencies, and configure your environment variables.
   ```bash
   cd server
   npm install
   ```
   *Create a `.env` file in the `server` directory and add the following variables:*
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   # Add other required environment variables here
   ```

3. **Frontend Setup:**
   Navigate into the `client` directory, install dependencies, and configure environment variables if needed.
   ```bash
   cd ../client
   npm install
   ```
   *Create a `.env` file in the `client` directory and configure the API URL:*
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application Locally

You can run the frontend and backend servers together or separately.

**Terminal 1 (Backend):**
```bash
cd server
npm run server # or npm start / npm run dev depending on your package.json scripts
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

The frontend application will typically be accessible at `http://localhost:5173/` (or the port Vite specifies).

## Deployment

To deploy this application:
1. Ensure your backend provides production-ready CORS headers and handles the frontend's static files if deploying together.
2. The frontend can be easily deployed to platforms like Vercel or Netlify.
3. The backend can be deployed to services like Render, Heroku, or DigitalOcean Apps. Ensure standard `.env` variables are securely added to the platform.
