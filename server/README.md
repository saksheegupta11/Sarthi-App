# 🛠️ Sarthi - Backend (Server)

This is the backend of the Sarthi platform, providing a secure API for user authentication, AI assessments, and resource discovery.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Auth**: JWT & OTP (Nodemailer)
- **AI Integration**: Google Gemini API

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
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

### ⚙️ Environment Variables
Check the `.env.example` file for the required keys. You will need:
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secure string for token signing.
- `GEMINI_API_KEY`: Your Google Gemini API key.
- `EMAIL_USER` & `EMAIL_PASS`: For OTP delivery.

---

## 📂 API Structure
- `src/controllers`: Request handling logic.
- `src/models`: Database schemas.
- `src/routes`: API endpoint definitions.
- `src/services`: External integrations (Gemini, college API, etc.).
- `src/middleware`: Auth and validation logic.
