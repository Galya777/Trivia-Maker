# 🎯 Trivia Maker

A full-stack web application for creating, managing, and playing trivia quizzes and tests. Built with Angular (frontend) and NestJS (backend).

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat&logo=angular)
![NestJS](https://img.shields.io/badge/NestJS-8-E0234E?style=flat&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Overview

Trivia Maker is a comprehensive platform for creating and taking interactive quizzes. It features user authentication, test management, real-time active tests via WebSockets, and competitive features through competitions.

## 🏗️ Architecture

```
Trivia-Maker/
├── front-end/          # Angular 18 SPA
│   └── src/
│       ├── app/        # Main application modules
│       ├── exam/       # Exam/quiz logic with NgRx
│       ├── libs/       # Custom libraries (router-store, match-observable)
│       └── environments/
└── back-end/           # NestJS API
    └── src/
        ├── users/      # User management
        ├── tests/      # Test/Quiz management
        ├── competitions/ # Competition system
        ├── active-tests/ # Real-time WebSocket tests
        └── userEngine/ # Authentication (JWT + Passport)
```

## ✨ Features

### Frontend (Angular)
- 📝 **Quiz/Exam System** - Take interactive quizzes with timer and scoring
- 🔐 **User Authentication** - Login and registration with JWT tokens
- 🎮 **Multiple Choice Questions** - Support for single and multi-choice answers
- ⏱️ **Timer Functionality** - Timed quiz sessions with auto-submit
- 📊 **Results & Analytics** - View test results and scores
- 🏆 **Competitions** - Compete with other users
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **State Management** - NgRx for predictable state handling

### Backend (NestJS)
- 🔒 **JWT Authentication** - Secure API access with JSON Web Tokens
- 👥 **User Management** - Full CRUD operations for users
- 📝 **Test Management** - Create, read, update, delete tests
- ⚡ **Real-time Tests** - WebSocket support for live quiz sessions
- 🏅 **Competition System** - Track and manage competitions
- 🗄️ **Database** - Prisma ORM with (configurable) database
- 📦 **RESTful API** - Clean API design

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20.20.0 or higher
- **npm** v8+ 
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Trivia-Maker
   ```

2. **Set up Node.js version**
   ```bash
   # Using nvm (recommended)
   nvm install 20.20.0
   nvm use 20.20.0
   ```

3. **Install Frontend dependencies**
   ```bash
   cd front-end
   npm install
   ```

4. **Install Backend dependencies**
   ```bash
   cd back-end
   npm install
   ```

### Running the Application

#### Frontend Development Server
```bash
cd front-end
npm start
```
Navigate to `http://localhost:4200/`

#### Backend Development Server
```bash
cd back-end
npm run start:dev
```
The API will be available at `http://localhost:3000`

#### Run Both Simultaneously
```bash
# Terminal 1 - Frontend
cd front-end && npm start

# Terminal 2 - Backend
cd back-end && npm run start:dev
```

## 📁 Project Structure

### Frontend (`front-end/`)

| Directory | Description |
|----------|-------------|
| `src/app/` | Main Angular modules and components |
| `src/exam/` | Quiz/exam feature with NgRx state management |
| `src/app/home/` | Home page component |
| `src/app/userEngine/` | User authentication (login/register) |
| `src/app/tests/` | Test listing and management |
| `src/app/competitions/` | Competition features |
| `src/libs/` | Custom utility libraries |

### Backend (`back-end/`)

| Module | Description |
|--------|-------------|
| `users/` | User CRUD operations |
| `tests/` | Test/Quiz management |
| `competitions/` | Competition system |
| `active-tests/` | Real-time WebSocket test handling |
| `userEngine/` | JWT authentication & Passport strategies |
| `prisma/` | Database schema and migrations |

## 🔧 Configuration

### Frontend Environment
Edit `front-end/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### Backend Environment
The backend uses NestJS ConfigModule. Create a `.env` file in `back-end/`:
```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=3000
```

## 🧪 Testing

### Frontend Tests
```bash
cd front-end
npm test
```

### Backend Tests
```bash
cd back-end
npm run test        # Unit tests
npm run test:cov   # Coverage report
```

## 📦 Tech Stack

### Frontend
- **Framework**: Angular 18
- **State Management**: NgRx (Store, Effects, Router-Store)
- **Styling**: CSS/SCSS
- **HTTP**: Angular HttpClient
- **Testing**: Karma, Jasmine

### Backend
- **Framework**: NestJS 8
- **Database**: Prisma ORM
- **Authentication**: Passport + JWT
- **Real-time**: Socket.io
- **Testing**: Jest

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Galya Dodova** - Trivia Maker © 2022

---

<p align="center">
  Made with ❤️ using Angular & NestJS
</p>
