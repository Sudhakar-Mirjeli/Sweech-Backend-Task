# 🛠️ Backend Developer Interview Task

This is a NestJS-based backend project built using TypeScript, PostgreSQL, and Prisma ORM. The environment is containerized using Docker Compose.
---

## 🔧 Tech Stack

- **Backend Framework**:(Express-based)
- **Language**: TypeScript
- **Database**: PostgreSQL 14.2
- **ORM**: Prisma
- **Auth**: JWT (Bearer Token)
- **Containerization**: Docker, Docker Compose
- **Linting & Formatting**: ESLint
---

## 📦 Project Structure


├── Sweech-Backend-Task\
│ ├── src/ # Source code\
│ ├── prisma/ # Prisma schema and migrations\
│ ├── Dockerfile # Backend service container\
│ └── ...\
│
├── docker-compose.yml # Multi-container setup\


## 🚀 Getting Started

### Prerequisites

- Docker
- Node.js LTS
- npm

1. Clone the repository:

    git clone https://github.com/Sudhakar-Mirjeli/Sweech-Backend-Task.git
    cd Sweech-Backend-Task
. 
    Install Dependencies
    npm install

2. Start the services using Docker Compose:
   docker-compose up --build

3. Access the backend API at: http://localhost:3000

4. Prisma Studio (optional for DB inspection):\
   npx prisma studio

⚙️ Environment Variables\
    Inside Sweech-Backend-Task, create a .env file:\
    DATABASE_URL=postgresql://postgres:postgres@db:5432/backend_task\
    JWT_SECRET=your_256_bit_hex\
    JWT_EXPIRATION=20m


🔄 Prisma Setup\
  After container is running:\

  npx prisma generate\
  npx prisma migrate dev --name init

Implemented Features
1. **Authentication**\
  🔐 POST /members/signup: Register user with validations\
  🔐 POST /members/login: Login and receive JWT\

  All protected routes require Bearer token

2. **User APIs**\
  PATCH /members/profile: Update name/password (auth required)

3. **Posts**\
  POST /posts: Create post\
  GET /posts: Paginated post listing\
  GET /posts/:id: Post detail view

4. **Comments**\
  POST /posts/:postId/comments: Add comment\
  GET /posts/:postId/comments: Cursor-based pagination\
  DELETE /posts/:postId/comments/:commentId: Only comment/post owner can delete

5. **Login Records**\
  Automatically recorded on login (user ID, time, IP)\
  GET /login-records: Fetch last 30 login records

6. **Login Rankings**\
  GET /login-records/weekly-rankings: Weekly login count rankings (Mon-Sun)\
  Proper handling of tie-ranks and empty data

👨‍💻 Author
Sudhakar Mirjeli

