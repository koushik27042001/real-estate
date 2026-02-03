# Real Estate Backend

Backend API for real estate application with role-based authentication.

## Setup

1. Install dependencies: `npm install`
2. Set up MongoDB (local or cloud)
3. Create `.env` file with:
   - MONGO_URI=mongodb://localhost:27017/real-estate
   - JWT_SECRET=your-secret-key
   - PORT=5000
4. Run: `npm start` or `npm run dev`

## API Endpoints

- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (requires auth)