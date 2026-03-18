# Sarthi - Your Career Guide (Server)

This is the backend of the Sarthi project, built with **Node.js**, **Express**, and **MongoDB**.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Authentication**: JWT / OTP-based login
- **Email**: Nodemailer

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

### Installation
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server with hot-reload:
```bash
npm run dev
```
The server will be available at `http://localhost:5000`.

### Environment Variables
Create a `.env` file in the `server` directory. Consult the team for the required keys (MongoDB URI, JWT Secret, Email credentials, etc.).

## API Structure
- `src/controllers`: Request handling logic.
- `src/models`: Database schemas.
- `src/routes`: Endpoint definitions.
- `src/middleware`: Auth and validation logic.
