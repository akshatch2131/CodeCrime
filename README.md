# 🔎 CodeCrime – Debug Like a Detective

> An AI-powered gamified debugging learning platform where developers investigate and solve realistic software bugs like detectives.

---

## 📌 About the Project

**CodeCrime** is a gamified debugging platform designed to help students and developers improve their real-world debugging skills.

Unlike traditional coding platforms that mainly focus on solving programming problems, CodeCrime provides realistic debugging scenarios where users investigate:

- 🐛 Source Code
- 📜 Application Logs
- 🗄️ Database States
- 🔗 API Traces
- 🤖 AI-generated Hints

The user analyzes the evidence, identifies the root cause of the bug, and submits a diagnosis.

The platform uses a detective-style approach to make debugging more interactive, practical, and engaging.

---

## 🎯 Project Objective

The main objective of CodeCrime is to provide a practical environment for learning debugging skills through realistic software bug investigations.

The platform aims to:

- Improve debugging and problem-solving skills
- Provide realistic debugging scenarios
- Teach developers how to analyze logs and API traces
- Help users understand database-related issues
- Provide AI-assisted debugging hints
- Make debugging more engaging through gamification
- Track user progress using XP, scores, and leaderboards

---

## 🚀 Key Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Secure Password Hashing

### 📊 Dashboard
- User statistics
- XP
- Progress
- Solved cases
- Current streak
- Recent activity

### 🗂️ Case Repository
Users can browse different debugging cases based on difficulty.

### 📋 Case Briefing
Each case provides information about the software issue and investigation objective.

### 🕵️ Investigation Interface
Users investigate bugs using multiple sources of evidence:

- Source Code
- Logs
- Database State
- API Traces

### 💻 Code Editor
A Monaco-based code editor is used to provide a professional coding environment similar to modern development tools.

### 🤖 AI Hint System
The AI assistant provides contextual hints to help users investigate the bug without directly revealing the answer.

### 📝 Bug Diagnosis
Users submit their diagnosis after investigating the case.

### 🏆 Gamification
The platform includes:

- XP
- Scores
- Leaderboards
- Achievements
- Progress Tracking
- Streaks

### 👤 Detective Profile
Users can view:

- Solved Cases
- XP
- Rank
- Achievements
- Progress

### 🛠️ Admin Panel
Admins can manage:

- Debugging Cases
- Users
- Case Difficulty
- Case Data

---

# 🧑‍💻 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- React Query
- Monaco Editor
- Recharts

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## AI

- Gemini API

## Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

---

# 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  React Frontend  │
                    │      + Vite      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │     REST API     │
                    └──────┬─────┬─────┘
                           │     │
              ┌────────────┘     └─────────────┐
              ▼                                ▼
      ┌──────────────────┐             ┌──────────────────┐
      │     MongoDB      │             │   Gemini AI API  │
      │     Database     │             │   Hint System    │
      └──────────────────┘             └──────────────────┘
