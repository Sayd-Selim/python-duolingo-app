const mongoose = require('mongoose');

// Подключение к MongoDB
mongoose.connect('mongodb+srv://SPEC:selim@spec.qqcpstm.mongodb.net/Python', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Схема пользователя (такая же как в server.js)
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

const User = mongoose.model('User', userSchema);

async function checkUsers() {
  try {
    console.log('🔍 Проверка пользователей в базе данных...\n');
    
    const users = await User.find({});
    
    if (users.length === 0) {
      console.log('❌ Пользователей не найдено');
      return;
    }
    
    console.log(`📋 Найдено пользователей: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.username})`);
      console.log(`   Роль: ${user.role}, Уровень: ${user.level}`);
      console.log(`   Доступы к урокам:`);
      
      for (let i = 1; i <= 15; i++) {
        const lessonKey = `lesson${i}`;
        const hasAccess = user[lessonKey];
        const status = hasAccess ? '✅' : '❌';
        console.log(`     Урок ${i}: ${status} ${hasAccess ? 'Доступен' : 'Заблокирован'}`);
      }
      
      console.log(''); // пустая строка между пользователями
    });
    
    console.log('💡 Чтобы дать доступ к уроку:');
    console.log('1. Откройте MongoDB Compass');
    console.log('2. Найдите пользователя в коллекции "users"');
    console.log('3. Измените lesson2: false на lesson2: true');
    console.log('4. Сохраните изменения');
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkUsers(); 