const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB подключение
mongoose.connect('mongodb+srv://SPEC:selim@spec.qqcpstm.mongodb.net/Python', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Схемы для MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  gems: { type: Number, default: 0 },
  avatar: { type: String, default: '👤' },
  // Доступ к урокам - просто true/false для каждого урока
  lesson1: { type: Boolean, default: true },   // Первый урок доступен всем
  lesson2: { type: Boolean, default: false },
  lesson3: { type: Boolean, default: false },
  lesson4: { type: Boolean, default: false },
  lesson5: { type: Boolean, default: false },
  lesson6: { type: Boolean, default: false },
  lesson7: { type: Boolean, default: false },
  lesson8: { type: Boolean, default: false },
  lesson9: { type: Boolean, default: false },
  lesson10: { type: Boolean, default: false },
  lesson11: { type: Boolean, default: false },
  lesson12: { type: Boolean, default: false },
  lesson13: { type: Boolean, default: false },
  lesson14: { type: Boolean, default: false },
  lesson15: { type: Boolean, default: false },
  // Прогресс по урокам - теперь прямо в документе пользователя
  progress: {
    type: Map,
    of: {
      progress: { type: Number, default: 0 }, // 0-100%
      completed: { type: Boolean, default: false },
      score: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 },
      timeSpent: { type: Number, default: 0 }, // в секундах
      lastAttempt: { type: Date, default: Date.now },
      lastUpdated: { type: Date, default: Date.now }
    },
    default: new Map()
  },
  createdAt: { type: Date, default: Date.now }
});

// Middleware для автоматического создания полей уроков при создании пользователя
userSchema.pre('save', function(next) {
  // Убеждаемся, что все поля уроков существуют
  for (let i = 1; i <= 15; i++) {
    const lessonKey = `lesson${i}`;
    if (this[lessonKey] === undefined) {
      this[lessonKey] = i === 1 ? true : false; // lesson1 = true, остальные = false
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Простая инициализация - ничего не нужно
console.log('✅ Система готова к работе');

// Роуты

// Регистрация
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    
    // Проверяем, существует ли пользователь
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь уже существует' });
    }
    
    // Создаем объект пользователя со всеми полями уроков
    const userData = {
      username,
      password,
      name,
      lesson1: true,   // Первый урок доступен всем
      lesson2: false,  // Остальные уроки заблокированы
      lesson3: false,
      lesson4: false,
      lesson5: false,
      lesson6: false,
      lesson7: false,
      lesson8: false,
      lesson9: false,
      lesson10: false,
      lesson11: false,
      lesson12: false,
      lesson13: false,
      lesson14: false,
      lesson15: false
    };
    
    // Создаем нового пользователя
    const user = new User(userData);
    await user.save();
    
    console.log('✅ Пользователь создан со всеми полями уроков:', user.username);
    
    res.json({ 
      message: 'Пользователь создан успешно', 
      userId: user._id,
      username: user.username,
      name: user.name
    });
  } catch (error) {
    console.error('❌ Ошибка при создании пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Вход
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('🔐 Попытка входа:', { username });
    
    const user = await User.findOne({ username, password });
    if (!user) {
      console.log('❌ Неверный логин или пароль для:', username);
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    
    // Собираем информацию о доступах к урокам
    const lessonAccess = {};
    for (let i = 1; i <= 15; i++) {
      const lessonKey = `lesson${i}`;
      lessonAccess[lessonKey] = user[lessonKey] || false;
    }
    
    console.log('✅ Успешный вход для пользователя:', user.name);
    console.log('📚 Доступы к урокам:', lessonAccess);
    
    res.json({ 
      message: 'Вход выполнен успешно', 
      userId: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      level: user.level,
      experience: user.experience,
      gems: user.gems,
      lessonAccess
    });
  } catch (error) {
    console.error('❌ Ошибка при входе:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Сохранение прогресса
app.post('/api/progress', async (req, res) => {
  try {
    const { userId, lessonId, progress, completed, score, timeSpent } = req.body;
    
    console.log('📊 Сохранение прогресса:', { userId, lessonId, progress, completed, score, timeSpent });
    
    // Проверяем, есть ли у пользователя доступ к уроку
    const user = await User.findById(userId);
    const lessonKey = `lesson${lessonId}`;
    
    if (!user) {
      console.log('❌ Пользователь не найден:', userId);
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    if (!user[lessonKey]) {
      console.log('❌ Нет доступа к уроку:', lessonKey);
      return res.status(403).json({ error: 'Нет доступа к уроку' });
    }
    
    // Находим или создаем запись о прогрессе
    const lessonIdStr = lessonId.toString();
    let progressRecord = user.progress.get(lessonIdStr);
    
    if (progressRecord) {
      // Обновляем существующий прогресс
      progressRecord.progress = progress;
      progressRecord.completed = completed;
      progressRecord.score = score || progressRecord.score;
      progressRecord.attempts += 1;
      progressRecord.timeSpent += timeSpent || 0;
      progressRecord.lastAttempt = new Date();
      progressRecord.lastUpdated = new Date();
      progressRecord.lessonId = parseInt(lessonIdStr); // добавляем lessonId
    } else {
      // Создаем новый прогресс
      progressRecord = {
        lessonId: parseInt(lessonIdStr), // добавляем lessonId
        progress,
        completed,
        score: score || 0,
        attempts: 1,
        timeSpent: timeSpent || 0,
        lastAttempt: new Date(),
        lastUpdated: new Date()
      };
    }
    
    user.progress.set(lessonIdStr, progressRecord);
    await user.save();
    
    console.log('✅ Прогресс сохранен для урока', lessonId, ':', progressRecord);
    
    // Если урок завершен, обновляем статистику пользователя
    if (completed) {
      const xpGained = Math.floor(score || 100);
      user.experience += xpGained;
      user.level = Math.floor(user.experience / 100) + 1;
      user.gems += Math.floor(xpGained / 10);
      await user.save();
      console.log('🎉 Урок завершен! XP:', xpGained, 'Новый уровень:', user.level);
    }
    
    res.json({ 
      message: 'Прогресс сохранен', 
      progress: progressRecord,
      userStats: {
        level: user.level,
        experience: user.experience,
        gems: user.gems
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение прогресса пользователя
app.get('/api/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📊 Запрос прогресса для пользователя:', userId);
    
    const user = await User.findById(userId);
    if (!user) {
      console.log('❌ Пользователь не найден:', userId);
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const progress = user.progress && typeof user.progress.entries === 'function'
      ? Array.from(user.progress.entries()).map(([lessonId, progressData]) => ({
          lessonId: parseInt(lessonId),
          ...progressData
        }))
      : [];
    
    console.log('📈 Прогресс пользователя:', progress);
    res.json(progress);
  } catch (error) {
    console.error('❌ Ошибка при получении прогресса:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение прогресса всех пользователей (для отображения друзей)
app.get('/api/progress', async (req, res) => {
  try {
    const allUsers = await User.find();
    
    // Группируем по пользователям
    const usersProgress = {};
    allUsers.forEach(user => {
      const userId = user._id.toString();
      if (!usersProgress[userId]) {
        usersProgress[userId] = {
          user: {
            _id: user._id,
            username: user.username,
            name: user.name
          },
          lessons: []
        };
      }
      const progressArray = user.progress && typeof user.progress.entries === 'function'
        ? Array.from(user.progress.entries())
        : [];
      progressArray.forEach(([lessonId, progressData]) => {
        usersProgress[userId].lessons.push({
          lessonId: parseInt(lessonId),
          progress: progressData.progress,
          completed: progressData.completed,
          lastUpdated: progressData.lastUpdated
        });
      });
    });
    
    res.json(Object.values(usersProgress));
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение списка всех пользователей
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username name role level experience lesson1 lesson2 lesson3 lesson4 lesson5 lesson6 lesson7 lesson8 lesson9 lesson10 lesson11 lesson12 lesson13 lesson14 lesson15');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение всех пользователей с прогрессом и активностью
app.get('/api/users/all', async (req, res) => {
  try {
    // Получаем всех пользователей
    const users = await User.find({}, 'username name role level experience createdAt');
    
    // Формируем ответ с информацией о каждом пользователе
    const usersWithProgress = users.map(user => {
      // Проверяем, что progress существует и является Map
      const userProgress = user.progress && typeof user.progress.entries === 'function' 
        ? Array.from(user.progress.entries())
        : [];
      const completedLessons = userProgress
        .filter(([lessonId, progressData]) => progressData.completed)
        .map(([lessonId, progressData]) => parseInt(lessonId));
      
      // Находим текущий урок (последний активный)
      let currentLesson = null;
      if (userProgress.length > 0) {
        const lastActive = userProgress.reduce((latest, current) => 
          new Date(current[1].lastUpdated) > new Date(latest[1].lastUpdated) ? current : latest
        );
        currentLesson = parseInt(lastActive[0]);
      }
      
      // Находим последнюю активность
      let lastActivity = null;
      if (userProgress.length > 0) {
        const lastUpdate = userProgress.reduce((latest, current) => 
          new Date(current[1].lastUpdated) > new Date(latest[1].lastUpdated) ? current : latest
        );
        lastActivity = lastUpdate[1].lastUpdated;
      }
      
      // Исправляем дату создания, если она неправильная
      let createdAt = user.createdAt;
      if (!createdAt || createdAt > new Date()) {
        createdAt = new Date(); // Устанавливаем текущую дату
      }
      
      return {
        _id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        level: user.level,
        experience: user.experience,
        createdAt: createdAt,
        currentLesson: currentLesson,
        completedLessons: completedLessons,
        lastActivity: lastActivity,
        totalLessons: userProgress.length,
        completedCount: completedLessons.length
      };
    });
    
    // Сортируем по последней активности (активные пользователи сверху)
    usersWithProgress.sort((a, b) => {
      if (!a.lastActivity && !b.lastActivity) return 0;
      if (!a.lastActivity) return 1;
      if (!b.lastActivity) return -1;
      return new Date(b.lastActivity) - new Date(a.lastActivity);
    });
    
    res.json(usersWithProgress);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление активности пользователя
app.post('/api/user/:userId/activity', async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentLesson } = req.body;
    
    // Обновляем время последней активности в прогрессе
    if (currentLesson) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      const lessonKey = `lesson${currentLesson}`;
      const currentLessonStr = currentLesson.toString();
      const progressRecord = user.progress.get(currentLessonStr);
      if (progressRecord) {
        progressRecord.lastUpdated = new Date();
        user.progress.set(currentLessonStr, progressRecord);
        await user.save();
      }
    }
    
    res.json({ message: 'Активность обновлена' });
  } catch (error) {
    console.error('Ошибка при обновлении активности:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение доступных уроков для пользователя
app.get('/api/user/:userId/lessons', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    // Получаем прогресс пользователя
    const userProgress = user.progress && typeof user.progress.entries === 'function'
      ? Array.from(user.progress.entries())
      : [];
    const progressMap = {};
    userProgress.forEach(([lessonId, progressData]) => {
      progressMap[parseInt(lessonId)] = progressData;
    });
    
    // Формируем список уроков с доступностью
    const lessons = [];
    for (let i = 1; i <= 15; i++) {
      const lessonKey = `lesson${i}`;
      const hasAccess = user[lessonKey];
      const progress = progressMap[i] || null;
      
      lessons.push({
        lessonId: i,
        title: `Урок ${i}`,
        hasAccess,
        progress: progress ? {
          progress: progress.progress,
          completed: progress.completed,
          score: progress.score,
          attempts: progress.attempts,
          timeSpent: progress.timeSpent,
          lastAttempt: progress.lastAttempt
        } : null
      });
    }
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Простой роут для обновления доступа к урокам (для админов)
app.put('/api/admin/user/:userId/lesson/:lessonId', async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    const { hasAccess } = req.body;
    
    const lessonKey = `lesson${lessonId}`;
    const updateData = {};
    updateData[lessonKey] = hasAccess;
    
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json({ message: `Доступ к уроку ${lessonId} ${hasAccess ? 'предоставлен' : 'отозван'}`, user });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение статистики пользователя
app.get('/api/user/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const progress = user.progress && typeof user.progress.values === 'function'
      ? Array.from(user.progress.values())
      : [];
    const completedLessons = progress.filter(p => p.completed).length;
    const totalProgress = progress.reduce((sum, p) => sum + p.progress, 0);
    const averageProgress = progress.length > 0 ? totalProgress / progress.length : 0;
    const totalTimeSpent = progress.reduce((sum, p) => sum + p.timeSpent, 0);
    const totalAttempts = progress.reduce((sum, p) => sum + p.attempts, 0);
    
    const stats = {
      user: {
        name: user.name,
        level: user.level,
        experience: user.experience,
        streak: user.streak,
        gems: user.gems
      },
      lessons: {
        completed: completedLessons,
        total: progress.length,
        averageProgress: Math.round(averageProgress),
        totalTimeSpent,
        totalAttempts
      }
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Простой тестовый endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Сервер работает!', timestamp: new Date().toISOString() });
});

// Получение списка всех пользователей
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username name role level experience lesson1 lesson2 lesson3 lesson4 lesson5 lesson6 lesson7 lesson8 lesson9 lesson10 lesson11 lesson12 lesson13 lesson14 lesson15');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URL: mongodb://localhost:27017/duolingo`);
}); 