# 🎯 Trivia Maker - Frontend

Angular 18 frontend application for the Trivia Maker platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Angular dev server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run watch` | Watch mode for development |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── home/           # Home page
│   ├── userEngine/     # Login & Register
│   ├── tests/          # Test management
│   ├── competitions/   # Competition features
│   └── ...
├── exam/               # Quiz/Exam module (NgRx)
│   ├── containers/     # Smart components
│   ├── data/           # Services
│   ├── logic/          # NgRx store, actions, effects, reducers
│   └── ...
└── libs/               # Custom libraries
    ├── router-store-ser/
    └── match-observable/
```

## 🛠️ Tech Stack

- **Angular 18** - Framework
- **NgRx** - State management
- **RxJS** - Reactive programming
- **TypeScript** - Type safety

## 📝 Features

- User authentication (login/register)
- Quiz/exam taking with timer
- Multiple choice questions
- Real-time results
- Competition system
- Responsive design

## 🔧 Configuration

Edit `src/environments/environment.ts` to configure API endpoints.
