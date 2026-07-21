# DevShelf

A community-curated directory of developer resources — APIs, UI libraries, and utilities — with search, filtering, sorting, and likes. Built to be the place you bookmark instead of a scattered pile of browser tabs.

Try DevShelf : [DevShelf](https://dev-shelf-lime.vercel.app/)
## Features

- **Browse & discover** — resources organized into categories (API, UI Library, Utilities) with category-specific fallback artwork
- **Search & sort** — filter by title/description and sort by newest, oldest, or most-liked
- **Add a resource** — submit new resources through a validated form (rejects empty fields and malformed URLs before hitting the API)
- **Like / unlike** — like counts persist to MongoDB and your own likes persist locally across sessions
- **Copy & open links** — one-click copy-to-clipboard and open-in-new-tab actions on every resource card
- **Sanitized input** — backend middleware strips MongoDB operator keys (`$...`) from incoming request bodies to prevent NoSQL injection

## Tech Stack

**Frontend:** React 19, Vite, Material UI (MUI), Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose

## Project Structure

```
devshelf/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Resource.js        # Resource schema
│   ├── routes/
│   │   └── resourceRoutes.js  # GET / POST / like / unlike endpoints
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── HeroSection.jsx
        │   └── ResourceCard.jsx
        └── pages/
            └── Dashboard.jsx
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo
```bash
git clone [Add your repo URL here]
cd devshelf
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `backend/.env` file:
```env
PORT=5000
MONGO_URI=[Add your MongoDB connection string here]
```

```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create a `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint                        | Description               |
|--------|----------------------------------|----------------------------|
| GET    | `/api/resources`                | List all resources         |
| POST   | `/api/resources`                | Create a new resource      |
| PATCH  | `/api/resources/:id/like`       | Increment a resource's likes |
| PATCH  | `/api/resources/:id/unlike`     | Decrement a resource's likes |

## Deployment

The frontend is hosted on Vercel and backend on Render. Update the environment variables to point to the proper service and API routing

## Author

Mohamed Idris Umaeer — [Github](https://github.com/Md-IdrisUmaeer)
