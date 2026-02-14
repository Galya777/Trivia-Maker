# 🎯 Trivia Maker - Backend

NestJS backend API for the Trivia Maker platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start the server |
| `npm run start:dev` | Start with watch mode |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run seed` | Seed the database |

## 🏗️ Project Structure

```
src/
├── modules/
│   ├── users/          # User management
│   ├── tests/          # Test/Quiz CRUD
│   ├── competitions/   # Competition system
│   └── active-tests/   # WebSocket real-time tests
├── userEngine/         # JWT Authentication
├── prisma/             # Database schema
└── ...
```

## 🛠️ Tech Stack

- **NestJS 8** - Framework
- **Prisma** - Database ORM
- **Passport + JWT** - Authentication
- **Socket.io** - Real-time WebSockets
- **TypeScript** - Type safety

## 📝 Features

- User CRUD operations
- Test/Quiz management
- JWT authentication
- Role-based access
- Real-time active tests
- Competition tracking
- Static file serving

## 🔧 Configuration

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/trivia
JWT_SECRET=your_secret_key
PORT=3000
```

## 🔌 API Endpoints

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Tests
- `GET /tests` - List all tests
- `GET /tests/:id` - Get test by ID
- `POST /tests` - Create test
- `PUT /tests/:id` - Update test

### Auth
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
