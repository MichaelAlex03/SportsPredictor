# MatchPredictor - Application Architecture

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Frontend Structure](#frontend-structure)
5. [Backend Structure](#backend-structure)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Authentication Flow](#authentication-flow)
9. [Data Models](#data-models)
10. [Future Enhancements](#future-enhancements)

---

## Project Overview

MatchPredictor is a web application that allows users to predict college football game outcomes using advanced analytics and machine learning. Users can track their prediction accuracy, compete with friends in leagues, and climb leaderboards.

### Current Features
- User authentication (sign up/sign in)
- College football game predictions
- Prediction accuracy tracking
- Friend competitions and leagues
- Global and league leaderboards

### Future Scope
- Additional sports (NFL, NBA, MLB, Soccer, etc.)
- Live game tracking
- Advanced analytics and insights
- Mobile applications (iOS/Android)

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React Context / Zustand (TBD)
- **HTTP Client:** Fetch API / Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod / Joi

### Database
- **Primary Database:** PostgreSQL
- **ORM:** Prisma / TypeORM
- **Caching:** Redis (optional, for performance)

### External APIs
- **Sports Data:** ESPN API / SportsRadar API
- **Real-time Updates:** WebSockets (Socket.io)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Next.js Frontend (Port 3000)                │   │
│  │  - Landing Page      - Sign In/Sign Up                │   │
│  │  - Dashboard         - Predictions                    │   │
│  │  - Leaderboards      - Profile                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS (REST API)
                              │ WebSocket (Real-time)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Express.js Backend (Port 5000)                 │   │
│  │  - Authentication Middleware                          │   │
│  │  - Rate Limiting                                      │   │
│  │  - Request Validation                                 │   │
│  │  - Error Handling                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                    │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌─────────┐  │
│  │   Auth    │  │   Games   │  │Predictions│  │ Leagues │  │
│  │ Service   │  │  Service  │  │  Service  │  │ Service │  │
│  └───────────┘  └───────────┘  └───────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  ┌──────────────────────┐      ┌──────────────────────┐     │
│  │  PostgreSQL Database │      │  External Sports API │     │
│  │  - Users             │      │  - Live Scores       │     │
│  │  - Games             │      │  - Team Stats        │     │
│  │  - Predictions       │      │  - Schedules         │     │
│  │  - Leagues           │      └──────────────────────┘     │
│  └──────────────────────┘                                    │
│                                                               │
│  ┌──────────────────────┐                                    │
│  │   Redis Cache        │                                    │
│  │  - Session Storage   │                                    │
│  │  - Leaderboards      │                                    │
│  └──────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Structure

```
matchpredictor/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Global styles
│   │
│   ├── signin/
│   │   └── page.tsx               # Sign in page
│   │
│   ├── signup/
│   │   └── page.tsx               # Sign up page
│   │
│   ├── dashboard/                 # Protected routes
│   │   ├── layout.tsx             # Dashboard layout
│   │   └── page.tsx               # Dashboard home
│   │
│   ├── predictions/
│   │   ├── page.tsx               # All predictions
│   │   ├── new/
│   │   │   └── page.tsx           # Create prediction
│   │   └── [id]/
│   │       └── page.tsx           # Prediction detail
│   │
│   ├── games/
│   │   ├── page.tsx               # Games list
│   │   └── [id]/
│   │       └── page.tsx           # Game detail
│   │
│   ├── leaderboard/
│   │   ├── page.tsx               # Global leaderboard
│   │   └── weekly/
│   │       └── page.tsx           # Weekly leaderboard
│   │
│   ├── leagues/
│   │   ├── page.tsx               # My leagues
│   │   ├── new/
│   │   │   └── page.tsx           # Create league
│   │   └── [id]/
│   │       └── page.tsx           # League detail
│   │
│   ├── profile/
│   │   └── page.tsx               # User profile
│   │
│   └── api/                       # API routes (if using Next.js API)
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts
│
├── components/
│   ├── ui/                        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── predictions/
│   │   ├── PredictionCard.tsx
│   │   ├── PredictionForm.tsx
│   │   └── PredictionList.tsx
│   │
│   ├── games/
│   │   ├── GameCard.tsx
│   │   ├── GameList.tsx
│   │   └── LiveScore.tsx
│   │
│   └── leaderboard/
│       ├── LeaderboardTable.tsx
│       └── RankBadge.tsx
│
├── lib/
│   ├── api.ts                     # API client
│   ├── auth.ts                    # Auth utilities
│   ├── utils.ts                   # Helper functions
│   └── types.ts                   # TypeScript types
│
├── hooks/
│   ├── useAuth.ts
│   ├── usePredictions.ts
│   └── useGames.ts
│
├── context/
│   └── AuthContext.tsx
│
├── public/
│   ├── images/
│   └── icons/
│
├── docs/
│   └── ARCHITECTURE.md            # This file
│
└── package.json
```

---

## Backend Structure

```
backend/
├── src/
│   ├── index.ts                   # Entry point
│   ├── app.ts                     # Express app setup
│   │
│   ├── config/
│   │   ├── database.ts            # Database configuration
│   │   ├── jwt.ts                 # JWT configuration
│   │   └── env.ts                 # Environment variables
│   │
│   ├── middleware/
│   │   ├── auth.ts                # JWT authentication
│   │   ├── errorHandler.ts       # Global error handler
│   │   ├── validate.ts            # Request validation
│   │   └── rateLimiter.ts        # Rate limiting
│   │
│   ├── routes/
│   │   ├── index.ts               # Route aggregator
│   │   ├── auth.routes.ts         # Auth routes
│   │   ├── users.routes.ts        # User routes
│   │   ├── games.routes.ts        # Game routes
│   │   ├── predictions.routes.ts  # Prediction routes
│   │   ├── leagues.routes.ts      # League routes
│   │   └── leaderboard.routes.ts  # Leaderboard routes
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── games.controller.ts
│   │   ├── predictions.controller.ts
│   │   ├── leagues.controller.ts
│   │   └── leaderboard.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts        # Business logic for auth
│   │   ├── users.service.ts
│   │   ├── games.service.ts
│   │   ├── predictions.service.ts
│   │   ├── leagues.service.ts
│   │   └── sportsAPI.service.ts   # External API integration
│   │
│   ├── models/                    # Database models (if using ORM)
│   │   ├── User.model.ts
│   │   ├── Game.model.ts
│   │   ├── Prediction.model.ts
│   │   ├── League.model.ts
│   │   └── LeagueMember.model.ts
│   │
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── prediction.validator.ts
│   │   └── league.validator.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts                 # JWT utilities
│   │   ├── password.ts            # Password hashing
│   │   └── logger.ts              # Logging utility
│   │
│   └── types/
│       ├── express.d.ts           # Express type extensions
│       └── index.ts               # Shared types
│
├── prisma/                        # If using Prisma
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────────┐         ┌──────────────┐
│    Users    │◄────────│   Predictions   │────────►│    Games     │
└─────────────┘         └─────────────────┘         └──────────────┘
      │ 1                                                   │ 1
      │                                                     │
      │ N                                                   │ N
      │                                                     │
┌─────▼──────────┐                                  ┌──────▼───────┐
│ LeagueMembers  │                                  │    Teams     │
└─────┬──────────┘                                  └──────────────┘
      │ N
      │
      │ 1
┌─────▼──────┐
│  Leagues   │
└────────────┘
```

### Table Schemas

#### **Users**
```sql
CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email             VARCHAR(255) UNIQUE NOT NULL,
  password_hash     VARCHAR(255) NOT NULL,
  full_name         VARCHAR(255) NOT NULL,
  avatar_url        VARCHAR(500),
  total_predictions INTEGER DEFAULT 0,
  correct_predictions INTEGER DEFAULT 0,
  accuracy_rate     DECIMAL(5,2) DEFAULT 0.00,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

#### **Games**
```sql
CREATE TABLE games (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id     VARCHAR(100) UNIQUE,  -- ID from external API
  home_team_id    UUID REFERENCES teams(id),
  away_team_id    UUID REFERENCES teams(id),
  home_team_score INTEGER,
  away_team_score INTEGER,
  game_date       TIMESTAMP NOT NULL,
  game_status     VARCHAR(20) DEFAULT 'scheduled',  -- scheduled, live, completed
  week_number     INTEGER,
  season_year     INTEGER NOT NULL,
  venue           VARCHAR(255),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_games_date ON games(game_date);
CREATE INDEX idx_games_status ON games(game_status);
CREATE INDEX idx_games_week ON games(week_number, season_year);
```

#### **Teams**
```sql
CREATE TABLE teams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id   VARCHAR(100) UNIQUE,
  name          VARCHAR(255) NOT NULL,
  abbreviation  VARCHAR(10),
  logo_url      VARCHAR(500),
  conference    VARCHAR(100),
  division      VARCHAR(100),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teams_name ON teams(name);
```

#### **Predictions**
```sql
CREATE TABLE predictions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  game_id             UUID REFERENCES games(id) ON DELETE CASCADE,
  predicted_winner_id UUID REFERENCES teams(id),
  predicted_home_score INTEGER,
  predicted_away_score INTEGER,
  confidence_level    VARCHAR(20),  -- low, medium, high
  is_correct          BOOLEAN,
  points_earned       INTEGER DEFAULT 0,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_user_game UNIQUE(user_id, game_id)
);

CREATE INDEX idx_predictions_user ON predictions(user_id);
CREATE INDEX idx_predictions_game ON predictions(game_id);
CREATE INDEX idx_predictions_correct ON predictions(is_correct);
```

#### **Leagues**
```sql
CREATE TABLE leagues (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id  UUID REFERENCES users(id),
  invite_code VARCHAR(50) UNIQUE NOT NULL,
  is_private  BOOLEAN DEFAULT true,
  max_members INTEGER DEFAULT 50,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leagues_invite_code ON leagues(invite_code);
```

#### **LeagueMembers**
```sql
CREATE TABLE league_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id   UUID REFERENCES leagues(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  role        VARCHAR(20) DEFAULT 'member',  -- admin, member
  joined_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_league_user UNIQUE(league_id, user_id)
);

CREATE INDEX idx_league_members_league ON league_members(league_id);
CREATE INDEX idx_league_members_user ON league_members(user_id);
```

---

## API Endpoints

### Authentication Endpoints

#### **POST /api/auth/signup**
Create a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### **POST /api/auth/login**
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### **POST /api/auth/refresh**
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### **GET /api/auth/me**
Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "totalPredictions": 45,
    "correctPredictions": 32,
    "accuracyRate": 71.11
  }
}
```

---

### Games Endpoints

#### **GET /api/games**
Get list of games with optional filters.

**Query Parameters:**
- `status` (optional): `scheduled`, `live`, `completed`
- `week` (optional): Week number (1-15)
- `season` (optional): Season year (default: current year)
- `team` (optional): Team ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "uuid",
        "homeTeam": {
          "id": "uuid",
          "name": "Alabama Crimson Tide",
          "logoUrl": "https://..."
        },
        "awayTeam": {
          "id": "uuid",
          "name": "Georgia Bulldogs",
          "logoUrl": "https://..."
        },
        "homeTeamScore": null,
        "awayTeamScore": null,
        "gameDate": "2025-11-20T19:00:00Z",
        "gameStatus": "scheduled",
        "weekNumber": 12,
        "venue": "Bryant-Denny Stadium"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

#### **GET /api/games/:id**
Get single game details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "homeTeam": {
      "id": "uuid",
      "name": "Alabama Crimson Tide",
      "record": "9-1",
      "logoUrl": "https://..."
    },
    "awayTeam": {
      "id": "uuid",
      "name": "Georgia Bulldogs",
      "record": "10-0",
      "logoUrl": "https://..."
    },
    "homeTeamScore": 31,
    "awayTeamScore": 28,
    "gameDate": "2025-11-20T19:00:00Z",
    "gameStatus": "completed",
    "weekNumber": 12,
    "venue": "Bryant-Denny Stadium",
    "predictionStats": {
      "totalPredictions": 1247,
      "homeTeamPredictions": 623,
      "awayTeamPredictions": 624
    }
  }
}
```

---

### Predictions Endpoints

#### **POST /api/predictions**
Create a new prediction.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "gameId": "uuid",
  "predictedWinnerId": "uuid",
  "predictedHomeScore": 31,
  "predictedAwayScore": 28,
  "confidenceLevel": "high"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "gameId": "uuid",
    "predictedWinnerId": "uuid",
    "predictedHomeScore": 31,
    "predictedAwayScore": 28,
    "confidenceLevel": "high",
    "createdAt": "2025-11-14T12:00:00Z"
  }
}
```

#### **GET /api/predictions**
Get user's predictions.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): `pending`, `correct`, `incorrect`
- `season` (optional): Season year
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response (200):**
```json
{
  "success": true,
  "data": {
    "predictions": [
      {
        "id": "uuid",
        "game": {
          "id": "uuid",
          "homeTeam": { "name": "Alabama", "logoUrl": "..." },
          "awayTeam": { "name": "Georgia", "logoUrl": "..." },
          "gameDate": "2025-11-20T19:00:00Z",
          "gameStatus": "completed"
        },
        "predictedWinnerId": "uuid",
        "predictedHomeScore": 31,
        "predictedAwayScore": 28,
        "actualHomeScore": 31,
        "actualAwayScore": 28,
        "isCorrect": true,
        "pointsEarned": 10,
        "confidenceLevel": "high"
      }
    ],
    "stats": {
      "total": 45,
      "correct": 32,
      "incorrect": 10,
      "pending": 3,
      "accuracyRate": 71.11
    }
  }
}
```

#### **PUT /api/predictions/:id**
Update a prediction (only before game starts).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "predictedWinnerId": "uuid",
  "predictedHomeScore": 35,
  "predictedAwayScore": 31
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "predictedWinnerId": "uuid",
    "predictedHomeScore": 35,
    "predictedAwayScore": 31,
    "updatedAt": "2025-11-14T13:00:00Z"
  }
}
```

---

### Leagues Endpoints

#### **POST /api/leagues**
Create a new league.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "SEC Champions League",
  "description": "For the best SEC predictors",
  "isPrivate": true,
  "maxMembers": 50
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "SEC Champions League",
    "description": "For the best SEC predictors",
    "inviteCode": "SEC-CHAMP-2025",
    "isPrivate": true,
    "maxMembers": 50,
    "creatorId": "uuid",
    "createdAt": "2025-11-14T12:00:00Z"
  }
}
```

#### **POST /api/leagues/:id/join**
Join a league using invite code.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "inviteCode": "SEC-CHAMP-2025"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "leagueId": "uuid",
    "userId": "uuid",
    "role": "member",
    "joinedAt": "2025-11-14T12:00:00Z"
  }
}
```

#### **GET /api/leagues/:id/leaderboard**
Get league leaderboard.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "leagueId": "uuid",
    "leagueName": "SEC Champions League",
    "rankings": [
      {
        "rank": 1,
        "user": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatarUrl": "https://..."
        },
        "totalPredictions": 45,
        "correctPredictions": 35,
        "accuracyRate": 77.78,
        "totalPoints": 350
      },
      {
        "rank": 2,
        "user": {
          "id": "uuid",
          "fullName": "Jane Smith",
          "avatarUrl": "https://..."
        },
        "totalPredictions": 43,
        "correctPredictions": 32,
        "accuracyRate": 74.42,
        "totalPoints": 320
      }
    ]
  }
}
```

---

### Leaderboard Endpoints

#### **GET /api/leaderboard/global**
Get global leaderboard.

**Query Parameters:**
- `season` (optional): Season year
- `limit` (optional): Number of results (default: 100)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rankings": [
      {
        "rank": 1,
        "user": {
          "id": "uuid",
          "fullName": "John Doe",
          "avatarUrl": "https://..."
        },
        "totalPredictions": 120,
        "correctPredictions": 92,
        "accuracyRate": 76.67,
        "totalPoints": 920
      }
    ],
    "currentUserRank": {
      "rank": 42,
      "totalPredictions": 45,
      "correctPredictions": 32,
      "accuracyRate": 71.11,
      "totalPoints": 320
    }
  }
}
```

---

## Authentication Flow

### JWT Token Strategy

```
┌─────────────┐                                    ┌──────────────┐
│   Client    │                                    │    Server    │
└──────┬──────┘                                    └──────┬───────┘
       │                                                  │
       │  1. POST /api/auth/login                        │
       │     { email, password }                         │
       ├─────────────────────────────────────────────────►
       │                                                  │
       │                      2. Validate credentials    │
       │                         Generate JWT tokens     │
       │                                                  │
       │  3. { accessToken, refreshToken }               │
       ◄─────────────────────────────────────────────────┤
       │                                                  │
       │  4. Store tokens                                │
       │     (httpOnly cookie or localStorage)           │
       │                                                  │
       │  5. GET /api/predictions                        │
       │     Authorization: Bearer <accessToken>         │
       ├─────────────────────────────────────────────────►
       │                                                  │
       │                      6. Verify JWT token        │
       │                         Decode user info        │
       │                         Process request         │
       │                                                  │
       │  7. { predictions: [...] }                      │
       ◄─────────────────────────────────────────────────┤
       │                                                  │
       │  8. Access token expires (15 min)               │
       │                                                  │
       │  9. POST /api/auth/refresh                      │
       │     { refreshToken }                            │
       ├─────────────────────────────────────────────────►
       │                                                  │
       │                      10. Verify refresh token   │
       │                          Generate new access    │
       │                                                  │
       │  11. { accessToken }                            │
       ◄─────────────────────────────────────────────────┤
       │                                                  │
```

### Token Structure

**Access Token Payload:**
```json
{
  "userId": "uuid",
  "email": "john@example.com",
  "iat": 1699900000,
  "exp": 1699900900
}
```

**Refresh Token Payload:**
```json
{
  "userId": "uuid",
  "email": "john@example.com",
  "tokenVersion": 1,
  "iat": 1699900000,
  "exp": 1700504800
}
```

### Middleware Implementation

```typescript
// middleware/auth.ts
export const authenticate = async (req, res, next) => {
  try {
    // 1. Extract token from header or cookie
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
```

---

## Data Models

### TypeScript Interfaces

```typescript
// User Model
interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  avatarUrl?: string;
  totalPredictions: number;
  correctPredictions: number;
  accuracyRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Game Model
interface Game {
  id: string;
  externalId?: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  gameDate: Date;
  gameStatus: 'scheduled' | 'live' | 'completed';
  weekNumber: number;
  seasonYear: number;
  venue?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Team Model
interface Team {
  id: string;
  externalId?: string;
  name: string;
  abbreviation?: string;
  logoUrl?: string;
  conference?: string;
  division?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Prediction Model
interface Prediction {
  id: string;
  userId: string;
  gameId: string;
  predictedWinnerId: string;
  predictedHomeScore?: number;
  predictedAwayScore?: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  isCorrect?: boolean;
  pointsEarned: number;
  createdAt: Date;
  updatedAt: Date;
}

// League Model
interface League {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  inviteCode: string;
  isPrivate: boolean;
  maxMembers: number;
  createdAt: Date;
  updatedAt: Date;
}

// LeagueMember Model
interface LeagueMember {
  id: string;
  leagueId: string;
  userId: string;
  role: 'admin' | 'member';
  joinedAt: Date;
}

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

## Future Enhancements

### Phase 1 (Current)
- ✅ User authentication
- ✅ College football predictions
- ✅ Basic leaderboards
- ✅ League system

### Phase 2 (Next 3-6 months)
- 🔲 Live game tracking with WebSockets
- 🔲 Advanced analytics dashboard
- 🔲 Email notifications for game results
- 🔲 Social features (follow users, comments)
- 🔲 Mobile responsive improvements

### Phase 3 (6-12 months)
- 🔲 NFL predictions
- 🔲 NBA predictions
- 🔲 MLB predictions
- 🔲 Machine learning prediction suggestions
- 🔲 Premium features / subscription model

### Phase 4 (12+ months)
- 🔲 Native mobile apps (iOS/Android)
- 🔲 International sports (Soccer, Cricket, etc.)
- 🔲 Fantasy sports integration
- 🔲 Live chat and community features
- 🔲 API for third-party integrations

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/matchpredictor
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# External APIs
SPORTS_API_KEY=your-sports-api-key
SPORTS_API_URL=https://api.sportsdata.io/v3/cfb

# CORS
CORS_ORIGIN=http://localhost:3000

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Development Guidelines

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd matchpredictor
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up database**
   ```bash
   # Create database
   createdb matchpredictor

   # Run migrations
   npm run migrate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   cd backend && npm run dev
   ```

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Create feature branches for new features

### Testing

- Write unit tests for business logic
- Write integration tests for API endpoints
- Use Jest for testing framework
- Aim for >80% code coverage

---

**Last Updated:** November 14, 2025
**Version:** 1.0.0
**Maintainer:** Michael Lleverino
