# Python Duolingo App

Duolingo-style Python learning web application with interactive lessons, practice tasks, and progress tracking.

## 🚀 Демо режим

Приложение работает в **демо режиме** без необходимости авторизации. Пользователи могут сразу начать обучение!

### Текущие доступные уроки:
- ✅ Урок 1: Введение в Python
- ✅ Урок 2: Переменные. Вывод и ввод данных
- ✅ Урок 3: Типы данных
- 🔒 Остальные уроки будут открываться постепенно

### Как открыть новые уроки:
См. файл [DEMO_INSTRUCTIONS.md](./DEMO_INSTRUCTIONS.md) для подробных инструкций.

## Features

- 🐍 Interactive Python lessons
- 🎯 Practice tasks with code execution
- 📊 Progress tracking
- 🏆 Achievement system
- 👥 User authentication
- 📱 Responsive design

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```
html-duolingo/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   └── hooks/             # Custom hooks
├── server/                # Node.js backend
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
└── public/                # Static files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sayd-Selim/python-duolingo-app.git
cd python-duolingo-app
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Set up environment variables
Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

5. Start the development servers

Frontend:
```bash
npm start
```

Backend:
```bash
cd server
npm run dev
```

## Deployment

### Railway (Backend)
The backend is configured for deployment on Railway. Simply connect your GitHub repository to Railway and it will automatically deploy.

### Frontend
The frontend can be deployed on Vercel, Netlify, or any other static hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.








Конечно! Я исправил проблему с тестом. Проблема была в том, что useEffect, который загружает сохраненные ответы, специально сбрасывал isCorrect в null для тестовых вопросов, что перезаписывало правильный ответ, который вы только что отправили.
Теперь когда вы правильно отвечаете на тест:
handleAnswerSubmit устанавливает isCorrect в true
Ответ сохраняется с помощью saveStepAnswer
useEffect загружает сохраненный ответ и восстанавливает isCorrect в true (вместо сброса в null)
Это должно исправить проблему, когда тест не позволял вам продолжить. Попробуйте тест снова - теперь он должен работать правильно и показывать зеленое сообщение об успехе, позволяя вам завершить урок.