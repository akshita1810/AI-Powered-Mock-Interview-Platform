A full-stack mock interview simulator where users practice role-specific technical interviews with Google Gemini AI. The AI asks one question at a time, evaluates each answer with constructive feedback, and generates a detailed performance report after 5 questions. Every session is permanently stored in MongoDB.

![Screenshots Placeholder](./docs/screenshots-placeholder.png)

> Add screenshots of the Landing Page, Interview Screen, and Performance Report here.

---

## Features
- **JWT Authentication** — Signup, login, logout, and protected routes with persistent sessions
- **8 Tech Roles** — Frontend, Backend, Full Stack, Software Engineer, AI/ML, Data Analyst, Data Scientist, DevOps
- **Stateful AI Interviews** — Gemini generates one question at a time, remembering prior Q&A context
- **Real-time Feedback** — Constructive evaluation after every answer
- **Performance Reports** — Overall summary, strengths, weaknesses, suggestions, and a 0–100 score
- **Interview History** — Permanent storage with full transcripts and progress tracking
- **Modern UI** — Glassmorphism, gradients, animations, dark/light mode, fully responsive

---

## Tech Stack
| Layer | Technologies |
|-------|-------------|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios, Context API, Framer Motion, React Icons |
| Backend | Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs, Gemini API |
| AI | Google Gemini 1.5 Flash |

---

## Folder Structure
```
MockInterviewPlatform/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── context/         # Auth, Interview, Theme contexts
│       ├── layouts/         # App layout wrappers
│       ├── pages/           # Route pages
│       ├── services/        # API service layer
│       └── utils/           # Helpers & constants
├── server/                  # Express backend
│   ├── config/              # Database connection
│   ├── controllers/         # Route handlers (MVC)
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # Mongoose schemas
│   ├── prompts/             # Gemini prompt templates
│   ├── routes/              # API routes
│   └── services/            # Gemini AI service
└── README.md
```

---

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd MockInterviewPlatform
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your credentials:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/interviewai
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Frontend setup
```bash
cd ../client
npm install
```

---

## Running Locally
Open two terminal windows:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health

---

## Environment Variables
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `CLIENT_URL` | Frontend URL for CORS (default: http://localhost:5173) |
| `GEMINI_API_KEY` | Google Gemini API key |

---

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get current user profile | Yes |

### Interview
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/interview/start` | Start session & generate Q1 | Yes |
| POST | `/api/interview/:id/answer` | Submit answer, get feedback & next Q | Yes |
| POST | `/api/interview/:id/complete` | Generate final performance report | Yes |
| GET | `/api/interview/history` | List all user interviews | Yes |
| GET | `/api/interview/:id` | Get full interview transcript | Yes |

### Example: Start Interview
```bash
POST /api/interview/start
Authorization: Bearer <token>
Content-Type: application/json

{ "role": "Frontend Developer" }
```

---

## Interview Workflow
```
Landing → Signup/Login → Dashboard → Role Selection → Interview (5 Q&A)
  → Performance Report → History → Transcript
```

The AI engine generates questions sequentially — never all at once. Each next question considers all previous questions, answers, and feedback.

---

## Future Improvements
- [ ] Voice-based interview mode (speech-to-text)
- [ ] Timed interview sessions with countdown
- [ ] Company-specific interview tracks (FAANG, startups)
- [ ] PDF export of performance reports
- [ ] Leaderboard and peer comparison
- [ ] Admin dashboard for analytics
- [ ] Resume upload for personalized questions
- [ ] Multi-language support

---

## License
MIT
