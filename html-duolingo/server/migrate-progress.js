const mongoose = require('mongoose');

// Подключение к MongoDB
mongoose.connect('mongodb+srv://SPEC:selim@spec.qqcpstm.mongodb.net/Python', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Старая схема Progress (для чтения существующих данных)
const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  lastAttempt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

// Новая схема пользователя с прогрессом
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
  lesson1: { type: Boolean, default: true },
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
  progress: {
    type: Map,
    of: {
      progress: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
      score: { type: Number, default: 0 },
      attempts: { type: Number, default: 0 },
      timeSpent: { type: Number, default: 0 },
      lastAttempt: { type: Date, default: Date.now },
      lastUpdated: { type: Date, default: Date.now }
    },
    default: new Map()
  },
  createdAt: { type: Date, default: Date.now }
});

const Progress = mongoose.model('Progress', progressSchema);
const User = mongoose.model('User', userSchema);

async function migrateProgress() {
  try {
    console.log('🔄 Начинаем миграцию прогресса...\n');
    
    // Получаем все записи прогресса
    const allProgress = await Progress.find({});
    console.log(`📊 Найдено записей прогресса: ${allProgress.length}`);
    
    if (allProgress.length === 0) {
      console.log('✅ Нет данных для миграции');
      return;
    }
    
    // Группируем прогресс по пользователям
    const progressByUser = {};
    allProgress.forEach(progress => {
      const userId = progress.userId.toString();
      if (!progressByUser[userId]) {
        progressByUser[userId] = [];
      }
      progressByUser[userId].push(progress);
    });
    
    console.log(`👥 Пользователей с прогрессом: ${Object.keys(progressByUser).length}\n`);
    
    // Обновляем каждого пользователя
    let updatedUsers = 0;
    for (const [userId, userProgress] of Object.entries(progressByUser)) {
      try {
        const user = await User.findById(userId);
        if (!user) {
          console.log(`⚠️  Пользователь ${userId} не найден, пропускаем`);
          continue;
        }
        
        // Добавляем прогресс в Map пользователя
        userProgress.forEach(progress => {
          user.progress.set(progress.lessonId.toString(), {
            progress: progress.progress,
            completed: progress.completed,
            score: progress.score,
            attempts: progress.attempts,
            timeSpent: progress.timeSpent,
            lastAttempt: progress.lastAttempt,
            lastUpdated: progress.lastUpdated
          });
        });
        
        await user.save();
        updatedUsers++;
        console.log(`✅ Пользователь ${user.name} обновлен (${userProgress.length} уроков)`);
        
      } catch (error) {
        console.error(`❌ Ошибка при обновлении пользователя ${userId}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Миграция завершена!`);
    console.log(`📈 Обновлено пользователей: ${updatedUsers}`);
    console.log(`📊 Перенесено записей прогресса: ${allProgress.length}`);
    
    // Опционально: удаляем старую коллекцию
    console.log('\n🗑️  Удаляем старую коллекцию Progress...');
    await mongoose.connection.db.dropCollection('progresses');
    console.log('✅ Старая коллекция удалена');
    
  } catch (error) {
    console.error('❌ Ошибка при миграции:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Соединение с базой данных закрыто');
  }
}

// Запускаем миграцию
migrateProgress(); 