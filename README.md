# Competitive Programming Dashboard

A full-stack web application that aggregates competitive programming statistics from Codeforces and LeetCode into a single dashboard with visual insights.

# Features

User login with protected dashboard

Fetches live data from:

Codeforces (rating, rank, max rating, contest count)

LeetCode (total solved, easy/medium/hard breakdown, ranking)

Interactive charts for LeetCode problem distribution

Persistent user profiles using localStorage

Clean and responsive UI built with Tailwind CSS

Backend API built with Node.js and Express

# Tech Stack

Frontend

React

React Router DOM

Tailwind CSS

Recharts (for charts)

Vite

Backend

Node.js

Express.js

Native Fetch API

Codeforces Public API

LeetCode GraphQL API

# Setup Instructions
Prerequisites

Node.js (v18 or higher recommended)

npm

Backend Setup
cd backend
npm install
node server.js


Backend runs at:

http://localhost:5000

Frontend Setup
cd frontend/cp-dashboard-frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

Usage

Open the frontend URL.

Click Login (mock authentication).

Enter your:

Codeforces username

LeetCode username

Click Save Profiles.

View your live stats and charts.

Logout to return to login screen.

API Endpoints
Codeforces
GET /api/codeforces/:handle


Returns:

Rating

Rank

Max rating

Contest count

LeetCode
GET /api/leetcode/:username

